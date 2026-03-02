const arr=[{id:1, name:'tom'},{id:2,name:'jerry'},{id:2, name:"doggy"}]

Array.prototype.myMap = function(cb){
    console.log(this)
    const result = []
    for(let i=0; i<this.length; i++){
        const res = cb(this[i], i, this)
        result.push(res)
    }
    return result
}

const res = arr.myMap((i) => i.id === 1 ? {...i, name:"updatedTom"} : i)

console.log(res)