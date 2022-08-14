let mail = localStorage.getItem('email')

const stay_login =() =>{
    if (mail != undefined) {
        
        location.replace("card.html")

    }
    else return;
   
}
stay_login()

 let input_data = document.querySelectorAll('#sign-up form input')

document.querySelector('#login #other-opt #signUp-link').addEventListener('click',()=>{
    hideElement('#login')
    showElement('#sign-up')
    reInitializeForm(input_data);

})

document.querySelector('#login #other-opt #forget-link').addEventListener('click',()=>{
    hideElement('#login')
    showElement('#forget-password')
})

document.querySelector('#forget-password #other-opt #login-link').addEventListener('click',()=>{
    hideElement('#forget-password')
    showElement('#login')
})

document.querySelector('#reset-password #other-opt #login-link').addEventListener('click',()=>{
    hideElement('#reset-password')
    showElement('#login')
})

document.querySelector('#sign-up #other-opt #login-link').addEventListener('click',()=>{
    hideElement('#sign-up')
    showElement('#login')
})



let request = indexedDB.open('cardDB',1)
let db;
let store;
let objectStore;
let userQuestions;
let generalQuestions;
request.addEventListener('error', err => console.warn(err))

request.addEventListener('success', ev =>{
    db = ev.target.result
    // console.log('success', db)
})



request.addEventListener('upgradeneeded', ev =>{
    db = ev.target.result
    // console.log('upgrade', db)
    
    if(! db.objectStoreNames.contains('userData')){
        objectStore = db.createObjectStore('userData', {
            keyPath: 'email'
        })
       
    
    }

    if(! db.objectStoreNames.contains('userQuestions')){
        userQuestions = db.createObjectStore('userQuestions', {
            keyPath: 'email'
        })
       
    }

    if(! db.objectStoreNames.contains('userColor')){
        objectStore = db.createObjectStore('userColor', {
            keyPath: 'email'
        })
    
    }

   
    
})


// let input_data;

// sign up
const  signUp = () => {
    let userData = {};
    input_data = document.querySelectorAll('#sign-up form input')

    for(const input of input_data){
        
        if(input.value === ''){
            
            Swal.fire({
                icon: 'erroreadDatabaser',
                title: `Please enter the ${input.name} field`,
                confirmButtonText: "Close"
            })
            return ;
            
        }
        userData[input.name] = input.value;

    }
    return userData;
    // console.log(userData)
   
}


// Reading from data base to check for existing data
const signUp_validation = data => {

    let mail = emailVAlidation(data.email);
    if(mail === undefined) return;

    let contact = contactValidation(data.contact)
    if(contact === undefined) return;

    // making transaction with db to read data only
    let transaction = db.transaction("userData","readonly").objectStore("userData");

    let user = transaction.get(data.email)

    // return user to login form after 2sec
    user.onsuccess = event => {

        let result = user.result;

        // if user account does not exist store user data
        if(result === undefined){
            
            storedUserData(data);
            return ;

        }
        if(result.email === data.email){
            Swal.fire({
                icon: 'error',
                title: `Sorry user this email already exist`,
                confirmButtonText: "Close"
            })
            return;
        }
        
    }
    
};


// storing data to database if there's no existing data
const storedUserData = data => {
 
    // make transaction with db
    let dbObject = db.transaction("userData","readwrite").objectStore('userData');
    dbObject.add(data);

    // dbObject.onsuccess = event => {

        added_question_table(data.email)
        added_color_table(data.email)

    // }

    // prompt user to log in.
    Swal.fire({
        icon:'success',
        title: `You can now login`,
        // confirmButtonText: ""
    });

    // reinitialize form to empty.
    reInitializeForm(input_data);
  
    // return user to login form
    setTimeout(()=>{

        hideElement('#sign-up')
        showElement('#login')

    },3000)
    return; 

};

// localStorage

// creating table in db for user added question
const added_question_table = mail =>{

    let data = {
        email: mail,
        questions:[]
    }

    let dbObject = db.transaction("userQuestions","readwrite").objectStore('userQuestions');
    dbObject.add(data);

}

const added_color_table = mail =>{
    
    let data = {
        email: mail,
        colors:{ bgColor : '#1266f1'}
    }

    let dbObject = db.transaction("userColor","readwrite").objectStore('userColor');
    dbObject.add(data);

}

// storing user email in local storage
const localStore = (email,un) =>{

    // store email in localstorage
    // localStorage.setItem('initial', Array.from(fn)[0].toUpperCase() + Array.from(ln)[0].toUpperCase())
    localStorage.setItem('un', Array.from(un)[0].toUpperCase())
    localStorage.setItem('email',email)
    return;
}

// Checking for valid contact
const contactValidation = num =>{
    let contact = +num;
    
    if(!contact){
        Swal.fire({
            icon: 'erroreadDatabaser',
            title: `Invalid Number`,
            confirmButtonText: "Close"
        });
        return ;
    }

    let contactString = `${contact}`
    if(contactString.length === 10 || contactString.length === 9){
        return contactString;
       
    }else{

        Swal.fire({
            icon: 'erroreadDatabaser',
            title: `Contact should be 9 or 10 digits`,
            confirmButtonText: "Close"
        });
        return ;

    }
    
}

const emailVAlidation = email =>{
    
    if(email.endsWith('@gmail.com') || email.endsWith('@yahoo.com') ){
        return email
    }else{
        Swal.fire({
            icon: 'erroreadDatabaser',
            title: `Invalid Email Address`,
            confirmButtonText: "Close"
        });
        return ;
    };
    
};

const signUp_btn = document.querySelector('#sign-up #submitBtn')
signUp_btn.addEventListener('click', ev => {
    ev.preventDefault()
    signUp_validation(signUp())
})

// login
const login = () => {
    let userData = {};
    input_data = document.querySelectorAll('#login form input')

    for(const input of input_data){
        
        if(input.value === ''){
            
            Swal.fire({
                icon: 'erroreadDatabaser',
                title: `Please enter the ${input.name} field`,
                confirmButtonText: "Close"
            })
            return ;
            
        }
        userData[input.name] = input.value;

    }
    return userData;

}

const login_validation = data =>{
    let mail = emailVAlidation(data.email);

    if(mail === undefined) return;

    // make transaction to get data from db
    let transaction = db.transaction("userData","readonly").objectStore("userData");
   
    let user = transaction.get(data.email)
    // return user to login form after 2sec
    user.onsuccess = event => {
        let result = user.result;

        if(result === undefined){
            Swal.fire({
                icon: 'error',
                title: `Email does not exist. Please sign up.`,
                confirmButtonText: "Close"
            })
            // location.reload()
            return ;
        }

        if(result.password === data.password){
            localStore(data.email,result.username)

            // Swal.fire({
            //     title: `Thanks for logging in `,
            //     // confirmButtonText: "Close"
            // })
            reInitializeForm(input_data)
            setTimeout(()=>{
                location.replace('card.html')
            },2000)
            return;
        }

        Swal.fire({
            icon: 'error',
            title: `Wrong username or password`,
            confirmButtonText: "Close"
        })
        return ;

    }

}

const login_btn = document.querySelector('#login #submitBtn')
login_btn.addEventListener('click', ev => {

    ev.preventDefault()
    login_validation(login())

})


// forget password

const forget_password = () => {
    input_data = document.querySelectorAll('#forget-password form input')
    let userData = {}

    for(const input of input_data){
        
        if(input.value === ''){
            
            Swal.fire({
                icon: 'erroreadDatabaser',
                title: `Please enter the ${input.name} field`,
                confirmButtonText: "Close"
            })
            return ;
            
        }
        userData[input.name] = input.value;

    }
    return userData;

}

let new_password;

const forgetPwd_validation = data =>{

    // validating email
    let mail = emailVAlidation(data.email);
    if(mail === undefined) return;

    // make transaction to get data from db
    let transaction = db.transaction("userData","readonly").objectStore("userData");
    let user = transaction.get(data.email)

    user.onsuccess = event =>{
        if(user.result === undefined) {

            Swal.fire({
                icon: 'error',
                title: `Wrong username or password`,
                confirmButtonText: "Close"
            })
            return ;
        }

        new_password = user.result
        reInitializeForm(input_data)
        hideElement('#forget-password')
        showElement('#reset-password')
    }

}


const forgetPwd_btn = document.querySelector('#forget-password #submitBtn')
forgetPwd_btn.addEventListener('click', ev => {

    ev.preventDefault()
    forgetPwd_validation(forget_password())

})



// reset password

const reset_password = () => {
    input_data = document.querySelectorAll('#reset-password form input')
    let userData = {}
   
    for (let i = 0; i < input_data.length; i++) {
       const data = input_data[i]

        if(data.value === ''){

            Swal.fire({
                icon: 'erroreadDatabaser',
                title: `Please enter the ${data.name} field`,
                confirmButtonText: "Close"
            })
            return ;
        }
   
        userData[data.name] = data.value;
       
    }
    return userData;

}


const reset_validation = data =>{

    // make transaction to get data from db
    let transaction = db.transaction("userData","readwrite").objectStore("userData");
    
    let user = transaction.get(new_password.email)

    // return user to login form after 2sec
    user.onsuccess = event =>{

        let result = event.target.result;
        if(result === undefined) {

            Swal.fire({
                icon: 'error',
                title: `Wrong username or password`,
                confirmButtonText: "Close"
            })
            return ;
        }

        // change password
        result.password = data.password
    
        // update database
        transaction.put(result)
        Swal.fire({
            icon: 'success',
            title: `New password created!`,
            confirmButtonText: "Close"
        })

        setTimeout(()=>{
            hideElement('#reset-password')
            showElement('#login')
        },3000)

        reInitializeForm(input_data)
        return ;
       
    }


}


const reset_btn = document.querySelector('#reset-password #submitBtn')
reset_btn.addEventListener('click', ev => {

    ev.preventDefault()
    reset_validation(reset_password())
})


const reInitializeForm = form =>{
    // set all input field to empty.
    form.forEach(input => input.value = '');

};







// function readDatabase(){

//     let transaction = db.transaction("userData","readonly").objectStore("userData")

//     transaction.openCursor().onsuccess = event =>{

//         let cursor = event.target.result;

//         if(cursor){
//             console.log(cursor)
//             cursor.continue()
//         }
//     }

// }



