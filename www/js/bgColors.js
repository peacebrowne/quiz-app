window.addEventListener("load",()=>{
    
    setTimeout(()=>{
        setBgColor()
    },5)

})

mail = localStorage.getItem('email')

request = indexedDB.open('cardDB',)
db;
request.addEventListener('error', err => console.warn(err))

request.addEventListener('success', ev =>{
    db = ev.target.result
})


const bg_color = document.getElementById('bg-color')
bg_color.addEventListener('click', () =>{

    hideElement('#dropdown-icon')
    showElement('#colors-back-icon')
    hideElement('#home-section')
    showElement('#change-bg-color')
    
})



const colors_title = document.querySelector('#change-bg-color .title')
const bg_btn = document.getElementById('bg-btn')

const colors_back_icon = document.getElementById('colors-back-icon')
colors_back_icon.addEventListener('click',()=>{
    showElement('#dropdown-icon')
    hideElement('#colors-back-icon')
    showElement('#home-section')
    hideElement('#change-bg-color')
    colors_title.style.backgroundColor = 'white';
    colors_title.style.color = 'black'
    bg_btn.style.display = ''
})


const colors = document.querySelectorAll('.colors');
colors.forEach(color => {
    color.addEventListener('click', () => {
        
        if(bg_btn.style.display == ''){
            bg_btn.style.display = 'flex'
        } 

        let set_color = color.id;
        if(set_color == 'default') {

            colors_title.style.backgroundColor = '#1266f1'
            colors_title.style.color = 'white'
            localStorage.setItem('bg-color','#1266f1')
            localStorage.setItem('color','white')
            return

        }
        colors_title.style.backgroundColor = set_color;
        colors_title.style.color = 'white'
            
    })
})

const set_bgColorBtn = document.getElementById('set-bg-btn')
set_bgColorBtn.addEventListener('click' , () =>{

    let generalColor = colors_title.style.backgroundColor;

    let transaction = db.transaction("userColor","readwrite").objectStore("userColor")
    let objectStore = transaction.get(mail)

    objectStore.onsuccess = event =>{

        let result = event.target.result;
        let store = result.colors;
        store.bgColor = generalColor;
        localStorage.setItem('bgColor',generalColor)

        transaction.put(result)

        document.querySelectorAll('.bg').forEach(ele =>{
    
            ele.style.backgroundColor = colors_title.style.backgroundColor
            
        })
    }

})


const setBgColor = () =>{
    
    let transaction = db.transaction("userColor","readonly").objectStore("userColor")
    let objectStore = transaction.get(mail)

    objectStore.onsuccess = event =>{

        let result = event.target.result;
        let store = result.colors;

        if(store.bgColor === undefined) {

            document.querySelectorAll('.bg').forEach(ele =>{

                ele.style.backgroundColor = '#1266f1'

            })

            return;

        }

        document.querySelectorAll('.bg').forEach(ele =>{
    
            ele.style.backgroundColor = store.bgColor;
            
        })
    }

}
