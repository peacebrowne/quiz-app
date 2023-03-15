/**
 * 
 * @param {object} questions - 
 */
const storage = questions =>{
    localStorage.setItem('database',JSON.stringify(questions)) 
}

const get_storage = () => {
    return JSON.parse(localStorage.getItem('database'))
}

// reinitialising input field
const reInitializeForm = data =>  data.forEach
(input => input.value = '');

onload = () =>{

    const db = get_storage()
    if( db === null ) storage(base)
    database = JSON.parse(localStorage.getItem('database'))
    
}

const icons = {

    success: 'fa-check',
    danger: 'fa-times',

}

const msg = {
    del: 'question successfully deleted',
    edit: 'question successfully edited',
    add: 'question successfully added',
    correct: 'correct',
    wrong: 'wrong',
    input: 'please enter required field',
    high_number: 'Selected number of questions is higher than selected topic questions'
}

const btn_txt ={
    ok: 'ok',
    next: 'next',
    restart: 'restart',
    game_over: 'game over',
    finish: 'finish'
}

let current_section = '.home-section';
let previous_section;
const header = element('header');
const views = element('.views')
let form_status;


/**
 * Handling click events on home section
 * html-collection [quiz , add-question and view-questions]
 *  *  @param clas - class to toggle
 */
const home_section = element('.home-section');
const home_view = ele => {

    const target = ele.target;
    if(target.className.includes('quiz')) {

        show_section('.quiz-form')
        section_title('quis form')
        questions_topics()

    }
    else if(target.className.includes('add')) {

        show_section('.add-and-edit-section')
        section_title('add question')
        form_status = 'add';

    }
    else if(target.className.includes('view')) {

        show_section('.view-question-section')
        section_title('view question')
        const db = get_storage()
        view_question(db)

    }
    
}
home_section.addEventListener('click', home_view)

const questions_topics = () => {

    const db = get_storage();
    const topics = [] , result = [];

    for(const val of db){
        if(!topics.includes(val.topic)) {
            topics.push(val.topic)
            const n = db.filter(item => item.topic == val.topic);
            result.push({t:val.topic,n:n.length})

        } 
    }

    result.push({t:'general',n:db.length})
    display_topic(result)

}

const topics = element('.topics')
const display_topic = topic => {
    
    topics.innerHTML = '';
    const title = document.createElement('option');
    title.innerHTML = 'please select topic';
    topics.append(title)

    topic.forEach(t => {
        const ele = document.createElement('option');
        ele.innerHTML = `${t.t} - ${t.n}`
        topics.insertAdjacentElement('beforeend',ele)

    })
}

let random_question;
let count = 0;
let back_up;

const start_quiz = ev =>{

    ev.preventDefault()
    back_up = []

    const result = validate_quiz_form();
    if(!result) return;
    random_question = all_questions(result);
    
    const rn = random_number(random_question.length)

    show_section('.card-section')
    card(random_question[rn]);
    back_up.push(random_question.splice(rn,1));
    next_question_number()
    count++;

}

const card_question_number = element('.card-question-number')

const next_question_number = () => {
    card_question_number.innerHTML = `<span> ${back_up.length} / ${random_question.length+back_up.length}</span>`
}

const next_question = quesions => {

    hideEle('.banner');
    const rn = random_number(quesions.length)
    card(quesions[rn]);
    back_up.push(quesions.splice(rn,1));
    next_question_number()
    // console.log('backup questions',back_up.flat())
    // console.log('current questions',quesions)

}


const random_number = n => {
    return Math.floor(Math.random() * n)
}

const card_body = element('.card-body');
const card_section = element('.card-section');
const correct_hidden_answer = element('.hidden-answer p');

card_section.addEventListener('click', ev => {

    ev.stopImmediatePropagation()
    const target = ev.target;

    if(target.className.includes('show-ans-btn')) hidden_answer(target);
    else if(target.parentElement.className.includes('option-answer') || 
            target.className.includes('option-answer')){

        if(random_question.length === 0){

            if(correct_answer(target)) showBanner(icons.success,msg.correct,btn_txt.finish)
            else showBanner(icons.danger,msg.wrong,btn_txt.finish);
            return

        }

        if(correct_answer(target)) showBanner(icons.success,msg.correct,btn_txt.next)
        else showBanner(icons.danger,msg.wrong,btn_txt.next);

    }

})

const correct_answer = ele => {
        
    if(ele.textContent == correct_hidden_answer.textContent ||
        ele.nextElementSibling.textContent == correct_hidden_answer.textContent)
    {
        return true;
    } 

}



const hidden_answer = ele => {

    if( ele.dataset.value == 'show' ){

        ele.dataset.value = 'hide';
        ele.textContent = 'hide ans';
        hideEle('.card-body')
        showEle('.hidden-answer')

    }else{

        ele.dataset.value = 'show';
        ele.textContent = 'show ans';
        showEle('.card-body')
        hideEle('.hidden-answer')

    }

}

const card = question => {
    
    let ele = ` <h5>${question.question}</h5>`;
    const result = options(question.answers);
    ele += result;
    correct_hidden_answer.textContent = question.correctAns;
    card_body.innerHTML = ele;

}

const options = answers => {

    let result = '';
    const opt = ['a','b','c'];
    
    for (let i = 0; i < opt.length; i++) {
        
        const rn = random_number(answers.length)
        result += `
            <div class="option-answer">
            <span class="opt">${opt[i]}</span>
            <p>${answers[rn]}</p>
            <span></span>
            </div>
        `
        answers.splice(rn,1);

    }

    return result;

}

const all_questions = data =>{
    const db = get_storage(), result = [];

    if(data.t === 'general'){

        for(let i = 0; i < data.n; i++){
            const rn = random_number(db.length)
            result.push(db[rn])
            db.splice(rn,1)
        }

    }else{

        for(let i = 0; i < data.n; i++){
            const questions = db.filter(val => val.topic.includes(data.t))
            const rn = random_number(questions.length)
            result.push(questions[rn])
            db.splice(rn,1)
        }

    }
    return result;
}

const validate_quiz_form = () =>{

    const input = element('.quiz-form form input')
    const select = element('.quiz-form form select')
    
    if(input.value == '' || select.value == 'please select topic') {

        showBanner(icons.danger,msg.input,btn_txt.ok)

    }else {

        const data = {
            t: select.value.split('-')[0].trim(),
            tq: +select.value.split('-')[1],
            n: +input.value
        }

        if(data.n > data.tq) {
            showBanner(icons.danger,msg.high_number,btn_txt.ok)
            return;
        }

        reInitializeForm([input])
        return data;

    }

}

const start_btn = element('.start-btn')
start_btn.addEventListener('click', start_quiz)

/**
 * Shows current section
 *  *  @param section - section to display
 */
const show_section = section => {

    hideEle(current_section);
    showEle(section);
    previous_section = current_section;
    current_section = section;
    showEle('header');

}

const section_title = title => header.children[0].lastElementChild.textContent = title;

/**
    Take user back to the previous section
 * if previous section is home section hide currnet section, else
 * hide current section and show previouse section and then set current section to 
 * previous section and previous section to home section
 */
const back_btn = element('header .fa-arrow-left')
const back = () => {

    if(previous_section === '.home-section'){

        hideEle(current_section);
        showEle('.home-section')
        current_section = '.home-section'
        hideEle('header')

    }else{

        hideEle(current_section)
        showEle(previous_section)
        current_section = previous_section
        previous_section = '.home-section';

    }
    
}
back_btn.addEventListener('click',back)

/**
 * Displaying first 5 quesions one after another.
 *  *  @param {data} - objects, containing a question.
 */
let view_btn;
const view = data => {

    let div = document.createElement('div')
    div.classList.add('question')
    div.setAttribute('id', data.id)
    let questions = user_questions(data)
    div.innerHTML = questions
    views.insertAdjacentElement('afterbegin',div)

}

/**
 * Displaying first 5 quesions one after another on user screen.
 *  *  @param {data} - objects, containing a question.
 */
const user_questions = data => {

    if(data.status === 'default'){
        return `
            <h5>${data.question}</h5>
            <h5><strong>ans: ${data.correctAns} </strong></h5>
        `
    }
    
    return `
    <h5>${data.question}</h5>
    <h5><strong>ans: ${data.correctAns} </strong></h5>
    <div class="view-btn">
        <button href="#"  class="edit-btn">Edit</button>
        <button href="#" class="delete-btn">Delete</button>
    </div>

`
}

/**
 * Displaying question form.
 *  *  @param ev - targeted button that was clicked, either (add or edit).
 */
const question_form = ev => {

    ev.preventDefault()
    let result = validate_question_form()

    // if user wants to add question
    if(form_status == 'add' ){

        if(result != undefined ) {
            add_question(result)
            showBanner(icons.success,msg.add,btn_txt.ok)
            return 
        }
    
    }
    // if user wants to edit question
    else if(form_status == 'edit'){

        if(result != undefined ) {
            edit_question(result)
            showBanner(icons.success,msg.edit,btn_txt.ok)
            return;
        }
    }
}

const submit = element('.submit-btn')
submit.addEventListener('click', question_form)

/**
 * Gets question from question form for validation.
 *  *  @returns {objects} - objects, containing validated question.
 */
const validate_question_form = () => {

    const form = elementAll('.add-and-edit-section form input');
    const textarea = element('textarea');
    const question = {} , opt = [];

    for(const input of form) {

        // if an input field is empty promt user to fill in the that space.
        if(!Boolean(input.value)) {
            showBanner(icons.danger,msg.input,btn_txt.ok)
            return
        };
        
        if(input.name.includes('Option')) opt.push(input.value);
        else question[input.name] = input.value;
        
    }
    
    if(form_status == 'add'){
        question['id'] = get_storage().length;
    }else if(form_status == 'edit'){
        question['id'] = +id;
    }

    opt.push(question['correctAns'])
    question['answers'] = opt;
    question['status'] = 'user';
    question[textarea.name] = textarea.value;
    reInitializeForm([...form,...[textarea]]);
    return question;

}

/**
 * Adding new question to database
 *  *  @param {question} - objects, containing a question.
 */
const add_question = question =>{

    const db = get_storage()  
    db.push(question)
    storage(db)

}

/**
 * Editing selected question and adding it back to database
 *  *  @param {question} - objects, containing a question.
 */
const edit_question = question =>{
    
    const db = get_storage()   

    for( let i = 0; i < db.length; i++) {
        if(db[i].id == question.id){
            db[i] = question;
            storage(db)
            view_question(db)
        }
    }
}


// const banner = element('.banner .status');/
const banner = element('.banner .wrapper');
const showBanner = (i,msg,btn) => {

    const ele = `
            <div class="status">
                <i class="fa ${i}"></i>
                <h4>${msg}</h4> 
                <button>${btn}</button>
            </div>
    `
    banner.innerHTML = ele;
    showEle('.banner');

}

banner.addEventListener('click', ev => {

    const target = ev.target;
    if(target.textContent === 'ok') hideEle('.banner');
    else if(target.textContent === 'next') next_question(random_question)

})

/**
 * Displaying question in user view section
 *  *  @param ev - targeted user question button element that was clicked (edit or delete) button.
 */
let id;
let ele;

const display_questions = element('.view-question-section')
views.addEventListener('click',ev =>{
    
    const target = ev.target;
    id = target.closest('.question').id;
    ele = target.closest('.question')

    if(target.className.includes('edit-btn')) {

        form_status = 'edit';
        selected_question(id)

    }else if (target.className.includes('delete-btn')) showEle('.caution')

})

const input_topic = element('.add-and-edit-section form #topic')
const input_question = element('.add-and-edit-section form #question')
const input_correctAns = element('.add-and-edit-section form #correctAns')
const input_firstOption = element('.add-and-edit-section form #firstOption')
const input_secondOption = element('.add-and-edit-section form #secondOption')
const input_thirdOption = element('.add-and-edit-section form #thirdOption')

/**
 * Inserting each data from selected question into each input field in the question form.
 *  *  @param {id} - id for question selected for editing.
 */
const selected_question = id => {

    const question = question_id(id)
    id = question.id;
    input_topic.value = question.topic;
    input_correctAns.value = question.correctAns;
    input_question.value = question.question;
    input_firstOption.value = question.answers[0];
    input_secondOption.value = question.answers[1];
    show_section('.add-and-edit-section')

}

/**
 * Getting selected question for the database based on its id.
 *  *  @param id - question id.
 *  * @returns {objects} - returning question from db base on it id.
 */
const question_id = id => { return get_storage().find(val => val.id == id) }

const delete_question = (id,ele) => {

    // delete question form database
   const db = get_storage();

    for( let i = 0; i < db.length; i++) {
        if(db[i].id == id){
            db.splice(i,1)
            storage(db)
            
            // remove question from user interface
            ele.remove()
            view_question(db)
        }
    }

}

const caution = element('.caution')
caution.addEventListener('click', ev => {
    const button = ev.target;

    if(button.dataset.value == 'no') {
        hideEle('.caution')
        return;
    }
    else if(button.dataset.value == 'yes'){
        hideEle('.caution')
        delete_question(id,ele)
        showBanner(icons.success,msg.del,btn_txt.ok)
    }

})

/**
 * Getting all questions from database and displaying them in group of five for pagination.
 *  *  @param database - array of objects, containing all quiz questions.
 */
const view_question = database =>{

    const data = database.reverse();
    views.innerHTML = '';

    for(let i = 0; i < 4; i++){
        // pass question for displaying
        view(data[i])
    }

}

const pagination_div = element('.pagination')
const row = 4;
let position = 0;

const pagination = ev => {

    const target = ev.target;
    let page = target.dataset.value;
    
    if(target.className.includes('pag-btn')){
       
        if( page == '>>') page = ++position;
        else if(page == '<<') page = --position;
        position = page;
        page--;

        const start = +page * row;
        const end = start + row;
        const quesions = get_storage().reverse().slice(start,end)

        view_question(quesions)
        
    }

}

pagination_div.addEventListener('click', pagination )






