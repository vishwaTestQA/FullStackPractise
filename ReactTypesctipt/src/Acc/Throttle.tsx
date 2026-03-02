const inp = document.querySelector("#text")
const p = document.getElementById("para")


function throttle(fn, delay, leading=true){
  let timeout = null;
  let last = 0;
  let remaining = delay;
  
  return (...args) => {  
    const now = Date.now()   //170000                       170100
                             //170000            170100 - 170000 > 2000
    if(last === 0){
      fn(...args)
      last = now;       //170000
      leading = false;
    }
 
    clearTimeout(timeout)
    remaining = delay - (now - last)
    
    timeout = setTimeout(function() {
        fn(...args)
        last = now;
        timeout = null;
        remaining = delay;
    }, remaining);
  }
}

const throttled = throttle((...args) => p.innerText = args, 2000, true)

inp.addEventListener('input',(e) => throttled(e.target.value))
