const btnThrottle = document.querySelector('.btn-throttle');

const clickFire =  e => {console.log("fired")}
btnThrottle.addEventListener('click', throttle(clickFire))

const scroll = (e) => {console.log("scrolling")}
window.addEventListener('scroll', throttle(scroll))

function throttle(cb, delay=1000){
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