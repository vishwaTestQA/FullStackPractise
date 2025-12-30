const btnThrottle = document.querySelector('.btn-throttle');

const clickFire =  e => {console.log("fired")}
btnThrottle.addEventListener('click', throttle(clickFire))

const scroll = (e) => {console.log("scrolling")}
window.addEventListener('scroll', throttle(scroll))

function throttle1(cb, delay=1000){
    let lastTime = 0;
     return(...args) => {
        const now = new Date().getTime()
        console.log(now)
        if(now - lastTime < delay) return    //17523456 - 0 < 1000   //hence firsttime cb
        cb(...args)                          // is executed 
        lastTime = now;            // lastTime = 17523456
     }
}

//lastTime = 17523456    now = 17523900   now - lastime < delay true so cb wont execute



const inpElem = document.querySelector(".inp")

const pElem = document.createElement('p')
document.body.appendChild(pElem)

inpElem.addEventListener("input", throttle((e) => {
    pElem.textContent = e.target.value
}))

const scrol = (e) => {console.log("scrolling")}
const throttledScroll = throttle(scrol)
window.addEventListener('scroll', throttledScroll)

function throttle(cb, delay=3000){
   let timer = 0;
   let last = 0; 
   let remaining = delay;
   return (...args) => {
    let now = Date.now();     //17000               17100
    let diff = now - last < remaining   // 17000<1000    100< 1000  
    if(!diff){
        cb(...args)
        last = Date.now()           //17100
        remaining = delay
    }                  //17100
    remaining = remaining - (now - last)   //900
    last = now;
    // console.log(remaining)
     clearTimeout(timer)
     setTimeout(() => {
        cb(...args)
        last = 0;
        timer = null
        remaining = delay
     }, remaining)
   }
}


const printSomething = (...args) => {
    console.log(...args)
}

const tt =  throttle(printSomething, 1000)