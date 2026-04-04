console.log(process.env.NODE_ENV)

class EventEmitter{
    constructor(){
      this.events= {}
    }

    on(eventName, callback){
        if(!this.events[eventName]){
            this.events[eventName] = []
        }
        this.events[eventName].push(callback)
    }

    emit(eventName){
        if(!this.events[eventName]){
            return
        }
        this.events[eventName].forEach(cb => cb())
    }

    Off(eventName, callback){
        if(!this.events[eventName]) return
        delete this.events[eventName]
    }

    offOne(eventName, callback){
        if(!this.events[eventName]) return
        this.events[eventName] = this.events[eventName].filter(cb => cb !== callback)
    }

    once(eventName, callback){
        const onceCb = () => {
            callback()
            this.offOne(eventName, onceCb)
        }
      this.on(eventName, onceCb)
    }
}

const e = new EventEmitter()

e.on("add", () => {console.log(10+5)})
e.on("add", () => {console.log(10+15)})
e.on("subtract", () => {console.log(10-5)})
e.once("add", () => {console.log(10+50)})
e.once("add", () => {console.log(10+70)})
e.on("subtract", () => {console.log(10-5)})

console.log(e.events)

e.emit("add")
console.log("=================")
e.emit("add")
e.emit("subtract")

e.Off("add")
console.log(e.events)

// function onceExecute(cb){
//     let flag = true
//     return (...args) => {
//        if(flag){
//          const result = cb(...args)
//          flag= false
//        } 
//     }
// }

