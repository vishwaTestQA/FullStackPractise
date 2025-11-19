// import axios from 'axios'
// import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.8/dist/axios.esm.browser.min.js";

const head = document.querySelector('h3')
const res  = head.innerText
console.log(res);

let textFlag = false   
let textElem='';   //if it declared inside the function itslef , then in every click this becomes null, so we cant remove
//  const elem = document.getElementsByClassName('btn')
 document.querySelector('.btn').addEventListener("click", () => {
    console.log("btton is clicked")
    textFlag = !textFlag;
    if(textFlag){
    console.log(textFlag);
    textElem = document.createElement("div")
    textElem.setAttribute("class", "divTitle")
    textElem.textContent = "button is clicked"
    head.appendChild(textElem)
    }else{
    head.removeChild(textElem)
    }
})

function handleInput(e){
    // console.log(e.target)
    console.log(e.target.value)
}

let uploadFlag = false;
let uploadElem  = null;
let pswdEle = null;
let submit = null;
let text=null;
let input = document.querySelector('#inputEle')
document.querySelector('.upload').addEventListener("click", () => {
  console.log("btton is clicked")
    uploadFlag = !uploadFlag;
    if(uploadFlag){
    uploadElem = document.createElement("input")
    uploadElem.setAttribute("id", "inputEle")
    uploadElem.setAttribute("type", "text")
    uploadElem.setAttribute("value", "")
    head.appendChild(uploadElem)

    pswdEle = document.createElement("input")
    pswdEle.setAttribute("id", "pswd")
    pswdEle.setAttribute("type", "text")
    // pswdEle.setAttribute("value", "")
    head.appendChild(pswdEle)

    submit = document.createElement("button")
    submit.setAttribute('class', 'submit')
    submit.textContent = "submit"
    submit.style.color = 'black'
    head.appendChild(submit)

    uploadElem.addEventListener('keyup', handleInput)
    submit.addEventListener('click', handleSubmit)

    }else{
    head.removeChild(uploadElem)    
    head.removeChild(submit)
    head.removeChild(pswdEle)
    }
})

function handleSubmit(){
   console.log(uploadElem.value)
   axios.post("http://localhost:4500/user", {username: uploadElem.value, password: pswdEle.value})
}

const allUserBtn = document.querySelector('.btn-allUsers')
allUserBtn.addEventListener('click', async ()=>{
    const users = await axios.get("http://localhost:4500/user")
    console.log(users)
    // head.innerText = JSON.stringify(users.data.allusers)
    // let li = null;
    const ulElem = document.createElement("ul");
    users.data.allusers.forEach(user =>{
    const li = document.createElement('li');
    li.textContent = user.username
    ulElem.appendChild(li)
    })
    head.appendChild(ulElem)
})



// uploadElem.addEventListener('keyup', handleInput) //should not declare outside listener wont work
//listening typing
// ==================





















