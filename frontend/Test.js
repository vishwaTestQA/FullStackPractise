//cache  TTL(Time-to-Live)
class Cache{
    constructor(){
        this.map = new Map();
    }

    set(key, value, ttlMs){
        const expires = Date.now() + ttlMs
        this.map.set(key, {value, expires})
    }

    get(key){
        const obj = this.map.get(key)
         if (!obj) return null;
        if(Date.now() > obj.expires){
            this.map.delete(key)
            return null
        }
        return obj;
    }
}

const cache1 = new Cache();
cache1.set("userid0", "5000", 5000)
// cache1.set("userid1", "5000", 5000)
// cache1.set("userid2", "5000", 5000)
// cache1.set("userid3", "5000", 5000)
// cache1.set("userid4", "5000", 5000)

// console.log(cache1.get("userid0"))
// console.log(cache1.get("userid1"))
// console.log(cache1.get("userid2"))
// console.log(cache1.get("userid3"))
// console.log(cache1.get("userid4"))

// setTimeout(()=> {
// console.log("4sec from setTimeout",cache1.get("userid0"))
// },1000)

// setTimeout(()=> {
// console.log("5sec from setTimeout",cache1.get("userid0"))
// },1500)

//memoization

const useMemo = (fn) => {
    let cache = new Map();
    return (...args) => {
      const key =  JSON.stringify(args) 
      if(cache.has(key)){
        console.log("keyy",key)
        return cache.get(key) 
      }
      const res = fn(...args)
      console.log("res", res)
      cache.set(key, res)
      return cache.get(key)
    }

    //   let cache = {};
    // return (...args) => {
    //   const key =  JSON.stringify(args) 
    //   if(key in cache){
    //     console.log("key", cache[key])
    //     return cache[key] 
    //   }
    //   cache[key] = fn(...args)
    //   console.log("res", cache[key])
    //   return cache[key]
    // }
}


const mem = useMemo((...args) => args)

mem(1,2,3)
mem(1,2,4)
mem(1,2,5)

mem(1,2,3)

//  try {
//             const data = setTimeout(() => fn(...args) ,2000)
//             resolve(data)
//             } catch (error) {
//              reject(error)
//             }

function promise(fn){
    return (...args) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
           try {
             const data = fn(...args)
              resolve(data)
           } catch (error) {
            reject(error) 
           }

            }, 1000)
        }) 
    }
}



// const timeout = setTimeout((...args) => {
//     console.log("solved"+ args)
// })

const someFn = (...args) => args

const timer = setTimeout((...args) => {
           try {
             const data = someFn(...args)
             console.log("outside",data)
           } catch (error) {
            
           }

 }, 1000, 20,30)

const prom = promise(someFn)
const res = await prom(20,30)
console.log("prom res", 20,30)

// timer("prm setOut")
prom("promise args").then((res) => console.log(res)).catch(err => console.log(err))


//deepclone

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;  //when 1 is passed fst time it retuns 1
 
  const output = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    output[key] = deepClone(obj[key]);   //{} is created , then {a: 1}
                    //for arrays  output.b = deepClone([2, {c:3}])
                    //[] array is created 
                    //output.0 = deepClone(1)
                    //output.1 = deepClone({c:3})
  }
  return output;
}

const input = {
  a: 1,
  b: [2, { c: 3 }],
  d: null
};

const obj = { a: 1, b: 2 };
console.log(deepClone(obj));

const obj2 = { a: { b: 10 } };
const res2 = deepClone(obj2)
console.log(res2)
res2.a.b = 20;
console.log(res2, obj2)


console.log(deepClone([1, 2, 3]));
console.log(deepClone( [1, [2, [3]]]));
console.log(deepClone( { pattern: /abc/gi }));  //wrong op becomes pattern:{}
console.log(deepClone({ today: new Date() })); // today:{}
console.log(deepClone({ m: new Map([['a', 1]]) })); // m:{}





const obj3FromObj2 = JSON.parse(JSON.stringify(obj2))
console.log("deeplclone via JsonStr", obj3FromObj2)
obj3FromObj2.a.b = 30;

console.log("affter deepClone assn", obj2, obj3FromObj2)

//Limitations
//Drops functions
// Drops undefined
// Drops symbols
// Drops non-enumerable properties
// Breaks Date → converts to string
// Breaks Map, Set

const clone4 = structuredClone(obj2)
console.log(clone4)

const clone5 = structuredClone({ pattern: /abc/gi })
console.log(clone5)
const clone6 = structuredClone({ today: new Date() })
console.log(clone6)
const clone7 = structuredClone({ m: new Map([['a', 1]]) })
console.log(clone7)

// import cloneDeep from "lodash/cloneDeep";   //for production
// const clone = cloneDeep(obj);

// 💡 Deep clone is needed when:

// You want a fully separate copy of an object so that changes in one place do NOT affect the original.



//most of the time we do shallow copy, so object.assign() is fast 
const obja = {a:1, b:2, c:[1,2,3]}
const objB = Object.assign({}, obja)
objB.a = 1000;
objB.c[1] = 100
console.log("obj a and b", obja, objB)



//Object.assign(target, sorce1, sorce2) is fast , memory cheap , 
// can use if to copy from multiple objects
//✔ Great for merging objects
// Not for nested immutability (React state updates)

//deepclone is slow and memory expensive



function flatten(obj, parent = "", result = {}) {
  for (const key in obj) {
    const newKey = parent ? parent + "." + key : key;
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      flatten(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}