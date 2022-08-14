let card_request = indexedDB.open('cardDB',1)
let card_db;
card_request.addEventListener('error', err => console.warn(err))

card_request.addEventListener('success', ev => {

    card_db = ev.target.result;

})

const quiz = document.getElementById('quiz');
let topic;

// go to select option section to start quiz
quiz.addEventListener('click',()=>{
     all_topics = [];
    hideElement('#dropdown-icon')
    showElement('#quiz-back-icon')
    hideElement('#home-section')
    showElement('#form-options-section')
    defaultQuestion_topic()
    get_topics()
    number_of_questions.value = ''
    selectedTopic.value = selectedTopic.children[0].textContent

})



// back to home section
const quiz_back_icon = document.getElementById('quiz-back-icon')
quiz_back_icon.addEventListener('click',()=>{

    showElement('#dropdown-icon')
    hideElement('#quiz-back-icon')
    showElement('#home-section')
    hideElement('#form-options-section')

    // reinitialize option form
    let option = `
        <option id="disable" selected disabled>Please select topic..</option>
        `
    
    // updating previous topics.
    selectedTopic.replaceChildren()
    selectedTopic.innerHTML = option
        
})


const general_topic = () =>{

    let total_question = 0;

    // getting total number of questions from all listed topics
    document.querySelectorAll('#select-options .option').forEach( t => {

        // storing total numbers of question from each topic to General topic in total questoin variable
       total_question += +t.value.split('-')[1];

    })

    // creating a new option element to add total numbers of question to general topic.

    let option = document.createElement('option')
    option.classList.add('option')
    option.setAttribute('id','general')
    option.setAttribute('value',`general-${total_question}`)
    option.textContent = `GENERAL Q(${total_question})`
    selectedTopic.appendChild(option)
        
    // Appending the total number of question element after the first option in the topic list.
    let disable = document.getElementById('disable');
    disable.insertAdjacentElement("afterend",option)

}
    

// insert topic for selection
const insert_topics = topic =>{

    // Appending each topic from the questions database.
    topic.forEach(top =>{

        let option = document.createElement('option')
        option.classList.add('option')
        option.setAttribute('value',`${top.t}-${top.q}`)
        option.textContent = `${top.t} Q(${top.q})`
        selectedTopic.appendChild(option)

    })

}

// let total = 0

// const total_number_question = numb =>{

//     total += +numb

// }

let all_topics = [];


// getting default question topics
const defaultQuestion_topic = () =>{

    // Getting all default questions from questions.js file.
    let default_questions =  outPut_questions();

    question.push(default_questions);
    // let all_topics = [];

    // iterating through the default questions to get all questions with the same topic and store it in the All topic array
    default_questions.forEach(question => {

        // checking if the a topic already exist. If true dont't add.
        let value = all_topics.some(val => val.t === question.topic)

        // If false add topic.
        if (value === false) {
            let topic = question.topic
            let quest = default_questions.filter( q => q.topic === topic)
            
            // adding topic and total number of questions with the topic.
            all_topics.push({
                t:topic,
                q: quest.length
            })

        }

    })

    // insert_topics(all_topics)
    
}


// getting all topics from user added question in database
const get_topics = () =>{

    // outPut_questions()

    // making request to database to get user added question.
    let transaction = card_db.transaction("userQuestions","readonly").objectStore('userQuestions');
    let dbObject = transaction.get(email)
    
    // if request is successful
    dbObject.onsuccess = event =>{

        // storing result in result variable.
        let result = event.target.result.questions;
        question.push(result);

        result.forEach( a => {

            // checking if the a topic already exist. 
            let value = all_topics.find( val => val.t === a.topic )
            
            // If true add one to the existing topic question.
            if( value != undefined) value.q += 1;

            // If false add topic.
            if ( value === undefined ) {

                let topic = a.topic
                let quest = result.filter( q => q.topic === topic)
                // adding topic and total number of questions with the topic.
                all_topics.push({
                    t:topic,
                    q: quest.length
                })

            }

        })
        console.log(all_topics)
        insert_topics(all_topics)
        general_topic()

    }

}

// start quiz
const number_of_questions = document.querySelector('#select-options input')
const selectedTopic = document.querySelector('#form-options-section select')

const start_quiz = document.querySelector('#form-options-section #start-btn')

const quiz_data = () =>{

    let data = {}

    // validating if user want's to start quiz without choosing topic.
    if(selectedTopic.value === selectedTopic.children[0].textContent){
        Swal.fire({
            icon: 'error',
            title: `Please select your topic`,
            confirmButtonText: "Close"
        })
        return ;

    }else data[selectedTopic.name] = selectedTopic.value.split('-')[0];

    // validing if user want's to start quiz without choosing number of question to start with.
    if(number_of_questions.value === ''){

        Swal.fire({
            icon: 'error',
            title: `Please select your number of questions`,
            confirmButtonText: "Close"
        })
        return ;

    }else data[number_of_questions.name] = number_of_questions.value

    let topic_question = +selectedTopic.value.split('-')[1];
    validate_numbOfQ_and_topic(data,topic_question);

}

// validating if selected number of question is higher
const validate_numbOfQ_and_topic = (t,n) =>{

    
    let total = +t.numberQ;
    let number = n;


    // checking if the selected number of question higher than the total number of questions the selected topic has.
    if( total > number ){

        Swal.fire({
            icon: 'error',
            title: `Selected number is high...`,
            confirmButtonText: "Close"
        })
        return;

    }

    // if it's less
    generate_random_question(t)

}

let random_question;
let random_number;
let question = [];
let backUp = []
let restart_question = [];

// Generating random questions from selected number of questions
const generate_random_question = data =>{

    let all_questions = question.flat()
    let random_number = 0;
    let selected_number = +data.numberQ;
    random_question = [];

    // checking if selected topic is general.
    if(data.topic === 'general'){

        // iterating through selected number of questions.
        for(let i = 0; i < selected_number; i++){
            
            let total_length = all_questions.length;

            // generating random number from the total questions length;
            // and selecting question based on the generated random number.
            random_number = generateRandomNumber(total_length)
            random_question.push(all_questions[random_number])
            // restart_question.push(all_questions[random_number])
            all_questions.splice(random_number,1)

        }

    }

    // if selected topic is not general
    else {

        // getting all question with the selected topic.
        let selected_topic = data.topic;
        let selected_topic_questions = all_questions.filter( topic => selected_topic === topic.topic )

        // iterating through selected number of question to get random questions.
        for(let i = 0; i < selected_number; i++){

            let total_length = selected_topic_questions.length;

            random_number = generateRandomNumber(total_length)
            
            random_question.push(selected_topic_questions[random_number])
            selected_topic_questions.splice(random_number,1)
            all_questions.splice(random_number,1)

        }

    }

    // waiting to display quiz card after one second.
    setTimeout(()=>{

        hideElement('#form-options-section')
        showElement('#card')
        hideElement('#quiz-back-icon')
        showElement('#card-back-icon')
        display__first_questions(random_question)
    
    },1000)

    return ;

}

// const get_question = () =>{

//     question = [];
//     let transaction = card_db.transaction("userQuestions","readonly").objectStore('userQuestions');
//     let dbObject = transaction.get(email)

//     dbObject.onsuccess = event =>{

//         question.push(event.target.result.questions)
//         defaultQuestion_topic()
        
//     }
    
// }


const generateRandomNumber = num =>{
    
    let rn = Math.floor(Math.random() * num)
    return rn

}

start_quiz.addEventListener('click', ev => {
    ev.preventDefault()
    quiz_data()

})
const checks = document.querySelectorAll('.check')

const card_back_icon = document.getElementById('card-back-icon')
card_back_icon.addEventListener('click',()=>{
    showElement('#form-options-section')
    hideElement('#card')
    showElement('#quiz-back-icon')
    hideElement('#card-back-icon')
    hide_ans()
    // get_question()
    checks.forEach(c => c.style.display = 'none')
    score.textContent = 0;
    random_question = [];
    restart_question = [];
})


const show_and_hide_ans = document.getElementById('showAndHideAns')

show_and_hide_ans.addEventListener('click', ev =>{
    ev.preventDefault()
    
    let text = ev.target.textContent
    if(text === 'show ans'){

        show_ans()
        
    }

    if(text === 'hide ans'){

        hide_ans()

    }

})

// show answer
const show_ans = () =>{

    hideElement('#card .card')
    showElement('#hidden_ans')
    show_and_hide_ans.textContent = 'hide ans'

}

// hide answer
const hide_ans = () =>{

    showElement('#card .card')
    hideElement('#hidden_ans')
    show_and_hide_ans.textContent = 'show ans'

}

const question_bar = document.querySelector('#question-bar .question');
const question_number = document.querySelector('#question-bar .num');
const optionA = document.querySelector('#ans-bar #optionA');
const optionB = document.querySelector('#ans-bar #optionB');
const optionC = document.querySelector('#ans-bar #optionC');
const optionD = document.querySelector('#ans-bar #optionD');
const hidden_ans = document.querySelector('#hidden_ans span');
const score = document.querySelector('#score').children[1];

// showing the from the selected ramdom questions
const display__first_questions = q =>{
    restart_question = [];
    question_bar.textContent = q[0].question;
    question_bar.setAttribute('id',`${0}`);
    question_number.textContent = 1;
    
    hidden_ans.textContent = q[0].correctAns;
    let answers = q[0].answers;
    let options = [optionA,optionB,optionC,optionD];
    
    for(const ans of options){

        let rn = Math.floor(Math.random() * answers.length);
        ans.textContent = answers[rn];
        backUp.push(answers[rn]);
        answers.splice(rn,1);

    };

    random_question[0].answers = backUp;
    restart_question.push(random_question[0]);
    random_question.splice(0,1);

}


const options_btns = document.querySelectorAll('.option')

options_btns.forEach(btn =>{
    btn.addEventListener('click', () =>{

        let checked = checked_already()
        if(checked == 'checked') return;
        
        let correct = correct_answer(btn)
        if (correct == 'correct') return;

        let wrong =  wrong_answer(btn)
        if (wrong == 'wrong') return;
       
    })
})

// check if ans already selected
const checked_already = () =>{

    for(const btn of checks){

        if(btn.style.display == 'flex') {
            Swal.fire({
                icon: 'error',
                title: `Answer Already Selected`,
                confirmButtonText: "Close"
            })
            return 'checked'
        }

    }

}

// correct ans
const correct_answer = btn =>{

    let correct = btn.nextElementSibling.nextElementSibling;
    let ans = btn.nextElementSibling.textContent

    if(ans == hidden_ans.textContent){
        correct.style.display = 'flex'
        score.textContent = +score.textContent + 10;
        Swal.fire({
            icon: 'success',
            title: `Correct`,
        })
        return 'correct';
    }

}

const right_answers = document.querySelectorAll('.correct')
let prev_correct_ans;
let prev_wrong_ans;

// wrong ans
const wrong_answer = btn =>{

    let wrong = btn.nextElementSibling.nextElementSibling.nextElementSibling;
    let ans = btn.nextElementSibling.textContent

    if(ans != hidden_ans.textContent){

        wrong.style.display = 'flex'
        prev_wrong_ans = ans
        Swal.fire({
            icon: 'error',
            title: `Wrong!`,
            // confirmButtonText: "Close"
        })
        
    }

    for(const correct of right_answers){
       
        let answer = correct.previousElementSibling.textContent;
        if(answer === hidden_ans.textContent){
            correct.style.display = 'flex'
            prev_correct_ans = answer
            return 'wrong';
        }

    }

}


const next_btn = document.querySelector('#card-btn #nextBtn')
const finishBtn = document.querySelector('#card-btn #finishBtn')
let nextAns ;


const next_question = ev =>{

    backUp =[]
    ev.preventDefault();
    let compulsary = compulsary_ans();
    if(compulsary == 'no ans') return;

    let qn = +question_number.textContent;
    let next = qn;
    let game_over = quiz_over(0)
    if(game_over == 'quiz finish') return;

    question_bar.id = next;
    question_number.textContent = next+1;
    
    let next_question = random_question[0];
    question_bar.textContent = next_question.question;

    hidden_ans.textContent = next_question.correctAns;
    let answers = next_question.answers;
    let options = [optionA,optionB,optionC,optionD];

    for(const ans of options){

        let rn = Math.floor(Math.random() * answers.length);
        ans.textContent = answers[rn];
        backUp.push(answers[rn]);
        answers.splice(rn,1);

    };
    
    checks.forEach(c => c.style.display = 'none');
    random_question[0].answers = backUp;
    restart_question.push(random_question[0]);
    random_question.splice(0,1);

}



next_btn.addEventListener('click',next_question);

const quiz_over = (next) =>{

    if(random_question[next] === undefined){

        Swal.fire({
            icon: 'warning',
            title: `GAME OVER`,
            confirmButtonText: "OK"
        })
        hideElement('#nextBtn');
        showElement('#finishBtn');
        return 'quiz finish';

    }

}

const compulsary_ans = () =>{

    let counter = 0;
    for(const btn of checks){

        if(btn.style.display == '' || btn.style.display == 'none') counter++

    }
  
    if(counter === checks.length) {

        Swal.fire({
            icon: 'error',
            title: `Please Select Answer`,
            confirmButtonText: "Close"
        })
        return 'no ans'

    }

}

const restart_quiz = ev =>{

    ev.preventDefault();
    hideElement('#finishBtn');
    showElement('#nextBtn');

    checks.forEach(c => c.style.display = 'none')
    score.textContent = 0;
    restart_question.forEach(val => random_question.push(val))
    display__first_questions(random_question)
}

finishBtn.addEventListener('click',restart_quiz)
