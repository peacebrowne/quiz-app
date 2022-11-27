
// logging out
const logOut = document.getElementById('log-out')
logOut.addEventListener('click',()=>{
    storage_remove()
    location.replace("sign_up.html")
})

const storage_remove = () =>{

    localStorage.removeItem('email')
    localStorage.removeItem('bgColor')
    localStorage.removeItem('un')

}

const account_name = () =>{
    let un = localStorage.getItem('un')
    let name = document.querySelector('header #name-initial strong')
    name.textContent = un
    
};
account_name()


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
})

let email = localStorage.getItem('email')



// const quiz = document.getElementById('quiz');
const add_question = document.getElementById('add-question')
const view_question = document.getElementById('view-question')

let message;


// add questions section
add_question.addEventListener('click',()=>{
    message = 'added'
    hideElement('#dropdown-icon')
    showElement('#add-back-icon')
    hideElement('#home-section')
    showElement('#add-question-section')
})

const add_question_topic = document.getElementById('topic')
const add_question_form = document.querySelectorAll('#add-question-section form .opt')
const add_question_textarea = document.querySelector('#add-question-section form textarea')
const add_question_correctAns = document.querySelector('#add-question-section #correct-ans')
const add_question_submitBtn = document.querySelector('#add-question-section #submit-btn')
const add_back_icon = document.getElementById('add-back-icon')

// const add_question_back_home = document.querySelector('#add-question-section #back-home')
add_back_icon.addEventListener('click',()=>{
    showElement('#home-section')
    showElement('#dropdown-icon')
    hideElement('#add-back-icon')
    hideElement('#add-question-section')
    
    // reinitialize add question form
    reInitializeForm(add_question_form)
    // add_question_correctAns.value = add_question_correctAns.children[0].value
    add_question_textarea.value = ''
        totalNumberOfQuestion()
})

const add_question_data = () =>{

    let questionData = {};

    if(add_question_topic.value === ''){
        Swal.fire({
            icon: 'error',
            title: `Please enter the ${add_question_topic.name} field`,
            confirmButtonText: "Close"
        })
        return ;
    }
    questionData[add_question_topic.name] = add_question_topic.value;

    // validating question
    if(add_question_textarea.value === ''){
        Swal.fire({
            icon: 'error',
            title: `Please enter the ${add_question_textarea.name} field`,
            confirmButtonText: "Close"
        })
        return ;
    }
    questionData[add_question_textarea.name] = add_question_textarea.value;
    
    // validating for empty answers
    let answers = [];
    for(const i of add_question_form){
        // const name = i.name.split('-')[0]
        const name = i.name;
        if(i.value == ''){

            Swal.fire({
                icon: 'error',
                title: `Please enter the ${name} field`,
                confirmButtonText: "Close"
            })
            return;

        }
        answers.push(i.value)
        // questionData[name.split('-')[0]] = i.value;

    }
    questionData['answers'] = answers;

    if(add_question_correctAns.value == ''){
        
        Swal.fire({
            icon: 'error',
            title: `Please select the ${add_question_correctAns.id}`,
            confirmButtonText: "Close"
        })
        return;

    }
    questionData[add_question_correctAns.name] = add_question_correctAns.value
    questionData['status'] = 'personal'
    
    return questionData
}


const get_added_question = data =>{

    if(data !== undefined) {
        add_question_validation(data)
        return
    }else return;

}


// validatind added question
const add_question_validation = data => {

    let transaction = db.transaction("userQuestions","readonly").objectStore('userQuestions');
    let dbObject = transaction.get(email)

    dbObject.onsuccess = event =>{
        let questions = event.target.result.questions;
        
        let question_id = generate_questionID(questions)

        data['id'] = question_id;
        submit_added_question(data)

    }

}

// generating added question id
const generate_questionID = questions =>{
    let randomNumber = 0;

    for (let i = 0; i < 5; i++) {
       randomNumber += Math.floor(Math.random() * 1000)
    }
     
    return randomNumber;

}

// subimtting added question
const submit_added_question = data =>{

    let transaction = db.transaction("userQuestions","readwrite").objectStore('userQuestions');
    let dbObject = transaction.get(email)

    dbObject.onsuccess = event =>{
        let question = event.target.result;
        question.questions.push(data)

        // update question database
        transaction.put(question)

        reInitializeForm(add_question_form)
        // add_question_correctAns.value = add_question_correctAns.children[0].value
        add_question_textarea.value = '';
        add_question_topic.value = '';
        Swal.fire({
            icon: 'success',
            title: `Question Successfully ${message}`,
        })
        return ;

    }
    
}

// add question submit btn
add_question_submitBtn.addEventListener('click', ev =>{
    ev.preventDefault();
    get_added_question(add_question_data())

})


view_question.addEventListener('click', ev => {

    hideElement('#dropdown-icon')
    hideElement('#initial')
    showElement('#search-form')
    showElement('#view-back-icon')
    hideElement('#home-section')
    showElement('#view-question-section')
    read_questions()

})

const view_question_bar = document.getElementById('view-question-section')
const view_question_bar_title = document.querySelector('#view-question-section .title')
const view_back_icon = document.getElementById('view-back-icon')
view_back_icon.addEventListener('click', ev =>{

    hideElement('#view-question-section')
    hideElement('#search-form')
    hideElement('#view-back-icon')
    showElement('#home-section')
    showElement('#dropdown-icon')
    showElement('#initial')
    // location.reload()
    view_question_bar.innerHTML = `
        <div class="form-control title">
            <span>VIEW QUESTION</span>
        </div>
    `

})

const edit_back_icon = document.getElementById('edit-back-icon')
edit_back_icon.addEventListener('click', ev=>{

    hideElement('#edit-question-section')
    showElement('#search-form')
    hideElement('#edit-back-icon')
    showElement('#view-back-icon')
    showElement('#view-question-section')
    // showElement('#dropdown-icon')
    hideElement('#initial')
    view_question_bar.innerHTML = `
        <div class="form-control title">
            <span>VIEW QUESTION</span>
        </div>
    `
    read_questions()
})

let defaultQ ;

const getDefaultQuestion = questions =>{
    defaultQ = questions
}

const read_questions = () =>{

    let transaction = db.transaction("userQuestions","readonly").objectStore('userQuestions');
    let dbObject = transaction.get(email)

    let all_questions = []
    all_questions.push(defaultQ)

    dbObject.onsuccess = event =>{

        let questions = event.target.result.questions;
        all_questions.push(questions)

        // console.log(all_questions.flat())
        
        display_user_questions(all_questions.flat().reverse())
        delete_questionBtn()
        edit_questionBtn()

    }
}

let pagQuestions = [];

// display all user questions
const display_user_questions = questions =>{
    let pag = [];
    
    for (let i = 0; i <= questions.length; i++) {
        pag.push(questions[i]);

        if(questions[i] == undefined && pag.length != 0){
            pag.pop()
            pagQuestions.push(pag)
            break;
        }
        else if(pag.length === 10 ){
            pagQuestions.push(pag)
            pag = [];
        }
        
    }
    // console.log(pagQuestions)
    pagDisplay(0)
    

}

const pagDisplay = n =>{
    pagQuestions[n].forEach( question => {

        views(question)
        // console.log(question)
    })
}

let pagination = document.getElementById('pagination')
const pagBtns = document.querySelectorAll('.pag')

pagBtns.forEach(btn => {
    btn.addEventListener('click',ev =>{
        pagBtns.forEach(b => {
            if(b.id == 'active') b.id ='';
            btn.id ='active';
        })

        let content = ev.target.textContent;
        if(content == '>>'){
            // console.log(content)
        }else if(content == '<<'){

        }else{

            if(pagQuestions[+content] == undefined) return
            let previous = document.querySelectorAll('.view-question-option');
            previous.forEach(ele => ele.remove())
            pagDisplay(+content)

        }
    })
})



const views = q =>{
    let question_div = document.createElement('div')
    question_div.classList.add('form-control')
    question_div.classList.add('view-question-option')
    question_div.setAttribute('id', `q-${q.id}`)
    let print;

    if(q.status === 'default'){
         print = `
        <div class="view-question form-control">
            <span>
                <strong>${q.question}</strong>
            </span>
        </div>
        <div class="view-answer form-control">
            <span style=" color: #04AA6D; font-weight: bold;">
                <strong style=" color: black;">Ans:</strong> ${q.correctAns}
            </span>
        </div>
    `
    }else{

     print = `
        <div class="view-question form-control">
            <span>
                <strong>${q.question}</strong>
            </span>
        </div>
        <div class="view-answer form-control">
            <span>
                <strong>Ans:</strong> ${q.correctAns}
            </span>
        </div>
        <div class="view-btn form-control">
            <a href="#"  class="btn btn-primary edit-btn">Edit</a>
            <a href="#" class="btn btn-primary delete-btn">Delete</a>
        </div>
        <span class="topic" style="display:none">
            ${q.topic}
        </span>
        <span class="a" style="display:none">
            ${q.answers[0]}
        </span>
        <span class="b" style="display:none">
            ${q.answers[1]}
        </span>
        <span class="c" style="display:none">
            ${q.answers[2]}
        </span>
        <span class="d" style="display:none">
            ${q.answers[3]}
        </span>
    
    `}

    question_div.innerHTML = print;
    pagination.insertAdjacentElement('beforebegin',question_div)

}

// Delete questions  buttons from database
const delete_questionBtn = () =>{

    let deleteBtn = document.querySelectorAll('.delete-btn')

    deleteBtn.forEach(btn => {
        btn.addEventListener('click', ev =>{
            message = 'deleted'

            // get deleted question id
            let id = questionID(ev)

            // make a transaction with the database
            let transaction = db.transaction("userQuestions","readwrite").objectStore('userQuestions');
            let dbObject = transaction.get(email)

            dbObject.onsuccess = event =>{

                let response = event.target.result
                let request = response.questions;

                for (let i = 0; i < request.length; i++) {
                    const element = request[i];

                    if(id === element.id){
                        request.splice(i,1)

                        transaction.put(response)
                        remove_question(ev)

                        Swal.fire({
                            icon: 'success',
                            title: `Question Successfully ${message}`,
                        })
                        totalNumberOfQuestion()

                        return ;

                    }
                    
                }
                

            }

        })
    })

}


// deleted question id
const questionID = ev =>{

    let term = ev.target.parentElement.parentElement.id;
    
    return +term.split('-')[1];

}

const remove_question = ev =>{

    let removedQuestion = ev.target.parentElement.parentElement;
    removedQuestion.remove()


}

// Editing question
const edit_question_SubmitBtn = document.querySelector('#edit-question-section #submit-btn')
const edit_question_topic = document.querySelector('#edit-question-section #topic')
const edit_quiz_question = document.querySelector('#edit-question-section textarea')
const edit_correct_answer = document.querySelector('#edit-question-section #correct-ans')
const edit_first_option = document.querySelector('#edit-question-section #first-option')
const edit_second_option = document.querySelector('#edit-question-section #second-option')
const edit_third_option = document.querySelector('#edit-question-section #third-option')
// const edit_question_correctAns = document.querySelector('#edit-question-section select')
// const edit_question_backBtn = document.querySelector('#edit-question-section #back-home')
let editQ_id;
let question_index;
// edit question btn
const edit_questionBtn = ()=>{

    const edit_btn = document.querySelectorAll('.edit-btn')

    edit_btn.forEach(btn => {

        // if edit btn is clicked 
        btn.addEventListener('click', ev =>{

            editQ_id = +ev.target.parentElement.parentElement.id.split('-')[1];
           
            // make transaction with db to get edited question by it's id
            let transaction = db.transaction("userQuestions","readonly").objectStore('userQuestions');
            let dbObject = transaction.get(email)

            dbObject.onsuccess = event =>{

                let data = event.target.result
                let result = data.questions
                let question = result.find( q => q.id === editQ_id)
                // console.log(question)
                question_index = result.indexOf(question)
                open_editor(question)
                

            }
           
        })
    })


}

// display question editor
const open_editor = question =>{

    hideElement('#view-question-section')
    showElement('#edit-question-section')
    showElement('#edit-back-icon')
    showElement('#initial')
    hideElement('#search-form')
    hideElement('#view-back-icon')

    for(let i = 0; i < question.answers.length; i++){

        let ans = question.answers[i]
        if(ans == question.correctAns) {

            question.answers.splice(i,1)

        }

    }

    edit_question_topic.value = question.topic;
    edit_quiz_question.value = question.question;
    edit_correct_answer.value = question.correctAns;
    edit_first_option.value = question.answers[0];
    edit_second_option.value = question.answers[1];
    edit_third_option.value = question.answers[2];

}


const question_editor = () => {

    let userData = {};
    let  edit_question_form = document.querySelectorAll('#edit-question-section .opt');
    let answers = [];

    // validating all answers and storing it in the answers array.
    for(const i of edit_question_form){
        const name = i.name.split('-')[0];
        
        if(i.value === ''){

            Swal.fire({
               icon: 'error',
               title: `Please enter the ${name} field`,
               confirmButtonText: "Close"
           })
           return ;
           
        }
        answers.push(i.value);

    }
    userData["answers"] = answers;
    userData[edit_correct_answer.name] = edit_correct_answer.value;

    // validating if question field is empty.
    if(edit_quiz_question.value === ''){
        Swal.fire({
            icon: 'error',
            title: `Please enter the ${edit_quiz_question.name} field`,
            confirmButtonText: "Close"
        })
        return ;
    }
    userData[edit_quiz_question.name] = edit_quiz_question.value;

    // validating if topic field is empty
    if(edit_question_topic.value === ''){

        Swal.fire({
            icon: 'error',
            title: `Please enter the ${edit_question_topic.name} field`,
            confirmButtonText: "Close"
        })
        return ;

    }
    userData[edit_question_topic.name] = edit_question_topic.value;

    userData['id'] = editQ_id;
    userData['status'] = 'personal';

    // if everything is successful return the user data.
    return userData

}

const submit_edit_question = editQ =>{
    message = 'edited'
 
    // make transaction with db to get edited question by it's id
    let transaction = db.transaction("userQuestions","readwrite").objectStore('userQuestions');
    let dbObject = transaction.get(email)

    dbObject.onsuccess = event => {

        let result = event.target.result;
        let question = result.questions;
        question[question_index] = editQ;

        // post updated question to database
        transaction.put(result)

        // prompt user that question is successfully edited
        Swal.fire({
            icon:'success',
            title: `Question Successfully ${message}`,
        })
        return ;

    }

}

edit_question_SubmitBtn.addEventListener('click', ev =>{
    ev.preventDefault()
    
    submit_edit_question(question_editor())

})


// reinitialising input field
const reInitializeForm = data =>{

    data.forEach(input => input.value = '');
   
}

// searching among display questions
const search_question = ev =>{

    let term = ev.target.value.toLocaleLowerCase();
    let search_items = document.querySelectorAll('#view-question-section .view-question-option .view-question span strong')
    
    search_items.forEach(q => {
        let question = q.parentElement.parentElement.parentElement;
        let content = q.textContent.toLocaleLowerCase()

        if(content.includes(term)){

            question.style.display = 'flex'

        }else{
            question.style.display = 'none'
        }

    })

}

const search = document.querySelector('#search-form input')
search.addEventListener('keyup', search_question)

