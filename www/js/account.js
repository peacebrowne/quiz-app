const account_link = document.getElementById('account')

account_link.addEventListener('click',()=>{

    hideElement('#home-section')
    showElement('#user-account')
    hideElement('#dropdown-icon')
    showElement('#account-back-icon')

})

const back_account_icon = document.getElementById('account-back-icon')
back_account_icon.addEventListener('click',() => {
    
    hideElement('#user-account')
    hideElement('#account-back-icon')
    showElement('#home-section')
    showElement('#dropdown-icon')
    info.forEach(i => {
        i.style.display = 'none';
        i.previousElementSibling.lastElementChild.className = angle_up
    })

})

let angle_up = 'fa fa-angle-up'
let angle_down = 'fa fa-angle-down'
let info = document.querySelectorAll('.info');

const items = document.querySelectorAll('.account-items')
items.forEach(li => {
    li.addEventListener('click',()=>{
        
        let angle = li.firstElementChild.lastElementChild
        let list = li.lastElementChild;

        if(angle.className == angle_up){

            angleDown(angle,list)

        }else if(angle.className == angle_down){

            angleUp(angle,list)

        }
    })
})

const angleDown = (angle,list) =>{

    info.forEach(i => {
        i.style.display = 'none';
        i.previousElementSibling.lastElementChild.className = angle_up
    })
    remove_account_info.style.display = 'none'
    angle.className = angle_down
    list.style.display = 'block'

}

const angleUp = (angle,list) => {

    angle.className = angle_up
    list.style.display = 'none'

}


const user_profile = document.getElementById('user-profile')
const userProfile = () =>{

    let objectStore = db.transaction("userData","readonly").objectStore("userData");
    let request = objectStore.get(mail)

    request.onsuccess = event => {

        let result = event.target.result;
        let print = `  <ul>
                <li>
                    <span class="list-title">Name:</span>   <span class="list-item">${result.firstname} ${result.lastname} </span>
                </li>
                <li>
                    <span class="list-title">Username:</span>   <span class="list-item-space"> ${result.username}</span>
                </li>
                <li>
                    <span class="list-title">Email:</span>      <span class="list-item-space"> ${result.email}</span>
                </li>
            </ul>`
            user_profile.innerHTML = print;
    }

}

const background_color = document.getElementById('background-color')
const changeBgColor = () =>{

    let objectStore = db.transaction("userColor","readonly").objectStore("userColor");
    let request = objectStore.get(mail)

    request.onsuccess = event => {
        let result = event.target.result.colors;
        let print = `  <ul>
                <li>
                    <span class="list-title">Background Color:</span>   <span class="list-item">${result.bgColor} </span>  <span class="form-control" style="width:50px;height:40px; border:none;background-color:${result.bgColor}"></span> 
                </li>
            </ul>`
            background_color.innerHTML = print;
    }

}

const total_questions = document.getElementById('total-questions')
const totalNumberOfQuestion = () =>{

    let objectStore = db.transaction("userQuestions","readonly").objectStore("userQuestions");
    let request = objectStore.get(mail)

    request.onsuccess = event => {
        let result = event.target.result.questions;
        let print = `  <ul>
                <li>
                    <span class="list-title">Total Questions:</span>   <span class="list-item">${result.length} </span> 
                </li>
            </ul>`
            total_questions.innerHTML = print;
    }

}

window.addEventListener('load',()=>{
    setTimeout(()=>{
        userProfile()
        changeBgColor()
        totalNumberOfQuestion()
    },5)
})

const yes_btn = document.getElementById('yes-btn')
const no_btn = document.getElementById('no-btn')
const remove_account_option = document.getElementById('remove-account')
const remove_account_info = document.getElementById('remove-account-item')

remove_account_option.addEventListener('click', ev => {
    remove_account_option.children[1].style.display = 'block'
    info.forEach(i => {
        i.style.display = 'none';
        i.previousElementSibling.lastElementChild.className = angle_up
    })
})

no_btn.addEventListener('click', ev =>{
    ev.stopImmediatePropagation()
    remove_account_option.children[1].style.display = 'none'
})

yes_btn.addEventListener('click', ev =>{
    ev.stopImmediatePropagation()
    remove_account()
})

// remove account.

const remove_account = () => {

    // userData
    let userData = db.transaction("userData","readwrite").objectStore("userData")
    userData.delete(mail)

    // userQuestions
    let userQuestions = db.transaction("userQuestions","readwrite").objectStore("userQuestions")
    userQuestions.delete(mail)

    // userColors
    let userColor = db.transaction("userColor","readwrite").objectStore("userColor")
    userColor.delete(mail)

    Swal.fire({
        icon: 'error',
        title: `Your account has successfully been deleted`,
        confirmButtonText: "Close"
    })
        localStorage.removeItem('email');
        localStorage.removeItem('bg-Color')
        localStorage.removeItem('color')
    setTimeout(()=>{

        location.replace('sign_up.html')
        return ;

    },1000)

}