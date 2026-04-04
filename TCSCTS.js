const arr = [1,2,[1,2,3,[1,2],1,2],1,2]

const flattenArray = (arr1) => {
   return arr1.reduce((acc, v) => {
    //  return Array.isArray(v) ? acc.concat(flattenArray(v)) : acc.concat(v)
     return Array.isArray(v) ? acc.concat(flattenArray(v)) : acc.concat(v)
   },[])
}

console.log(flattenArray(arr))

const mixedArr = [1,2,3,['a','b',['c',['d']]],{id:1, name:"vish", phone:[123, 345,[245,256]]},[4,5,[6,7]]]

function flattenAll(mxd) {
    if(Array.isArray(mxd)){
       return mxd.flatMap(itm => flattenAll(itm))
    }

   // Case 2: Object (but not null)
  if (typeof mxd === 'object' && mxd !== null) {
    const newObj = {};

    for (const key in mxd) {
      const value = mxd[key];

      if (Array.isArray(value)) {
        // Flatten array inside object
        newObj[key] = flattenAll(value);
      } else {
        // Keep as-is
        newObj[key] = value;
      }
    }
}
    //this will flatten all even object values will be appended without the keys in an array
    // if (typeof mxd === 'object' && mxd !== null) {
    //    return Object.values(mxd).flatMap(flattenAll)
    // }

    return mxd;
}

const r = flattenAll(mixedArr)
console.log(r)

const obj = [
    {id:1, user: "jerry"},
    {id:2, user: "tom"},
    {id:3, user: "doggy"},
]

Array.prototype.cusMap = function(cb){
    const result = []
   for(let i =0; i<this.length; i++){
    result.push(cb(this[i], i, this))
   }
   return result
}

const res = obj.cusMap(ob => ob.id === 1 ? {...ob, user: ob.user.toUpperCase()} : ob)

console.log(res)

// const flattenAll () {

// }

const arrRev = [1,2,3,4,5]

console.log(arrRev.reduce((acc, val) => [val, ...acc], []));

const s1 = [1,2,3,4] 
const s2 = [5,6,7,8]

function merge(a, b) {
  return [...a, ...b].sort((x, y) => x - y);
}

console.log(merge(s2, s1))

const vowels = "Aeivstraodriu"
function countVowels(str) {
  return str.match(/[aeiou]/gi)?.length || 0;
}
console.log(countVowels(vowels))


const mveZer = [1,0,4,5,0,6,0]
//moves zero
// function movesZero(nums){
//    return [...mveZer.filter(it => it!==0), ...mveZer.filter(it => it === 0)]
// }
function movesZero(nums){
   return [ ...nums.filter(it => it === 0), ...nums.filter(it => it!==0)]
}
console.log(movesZero(mveZer))


function isAnagram(a, b){
  return a.split('').sort().join('') === b.split('').sort().join('')
}

console.log(isAnagram("silent", "lentis"))


const longWord = "Javascript is a scripting language"
let longest = "";
longWord.split(' ').forEach(word => {
   if(word.length > longest.length){
     longest = word
   }  
})
console.log(longest)


//kth largest
function kthLargest(arr, k){
    let heap = []

    for(let i =0 ; i<arr.length; i++){
        heap.push(arr[i])
        heap.sort((a,b) => b - a)      //maintains in decending = > big to small

        if(heap.length > k){
            heap.pop()
        }
    }
    return heap[k-1]
}

console.log(kthLargest([3,5,7,2,7,8,9], 2))

function kthSmallest(arr, k){
    const minHeap = []

    for(let i =0; i<arr.length; i++){
        minHeap.push(arr[i])
        minHeap.sort((a,b) => a - b)

        if(minHeap.length > k){
            minHeap.pop()
        }
    }

    return minHeap[k-1]
}

console.log(kthSmallest([3,5,7,2,7,8,9],2))

//kthFrequent
function topKthFrequent(arr, k) {
  const map = {}
  for(let i =0; i<arr.length; i++){
     map[arr[i]] = (map[arr[i]] || 0) + 1
  }


//   const res = Object.entries(map).sort((a,b) => b[1] - a[1]) 
 const res = Object.keys(map).sort((a,b) => map[b] - map[a])
  return (res.slice(0, k))
}

console.log(topKthFrequent(["a","b","c","a","a","d","e","c","e"],2))


//palindrome
const palind = "madam";
const palind2 = "JAVASCRIPT IS A IS JAVASCRIPT";

function palindrom(str) {
   let l = 0;
   let r = str.length-1;
   
   while(l<r){
    if(str[l] !== str[r]) return false
    l++;
    r--
   }
   return true
   }

   console.log(palindrom(palind))

   
// function palindromWord(str) {
//   const splitted = str.split(" ")
//   let start = 0;
//   let end = splitted.length-1;
//   while(start < end){
//     let l = 0;
//     let r = splitted[start].length - 1;
//     while()

//     start++
//     end--
//   }
//    for(let i = 0; i<splitted.length; i++){
//    let l = 0;
//    let r = splitted[i].length-1;
//    while(l<r){
//     if(splitted[i][l] !== splitted[i][r]) return false
//     l++;
//     r--
//    }
//    }

//    return true
//    }

   console.log(palindrom(palind2))

   //primeNumbers

   function prime(n){
    if(n === 0 || n === 1) return false
    if(n === 2) return true
    for(let i = 2; i< Math.sqrt(n); i++){
        if(n % i === 0) return false
    }
    return true
   }

   console.log(prime(10))
   console.log(prime(27))
   console.log(prime(29))


   function fibonacci(n){

   }

const original = {
  name: "vish",
  address: {
    city: "Chennai"
  },
  skills: ["js", "react"]
};

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  let copy = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    copy[key] = deepClone(obj[key]);
  }

  return copy;
}

console.log(deepClone(original))

const people = [
  { name: "Alice", city: "Chennai" },
  { name: "Bob", city: "Bangalore" },
  { name: "Charlie", city: "Chennai" },
  { name: "David", city: "Delhi" },
  { name: "Eve", city: "Bangalore" }
];

const p = people.reduce((acc, ppl) => {
  const city =  ppl.city
  if(!acc[city]){
    acc[city] = []
  }
  acc[city].push(ppl)
  return acc
},{})

const p1 = people.reduce((acc, ppl) => {
  const city =  ppl.city
   acc[city] ? acc[city].push(ppl) : acc[city] = []
   return acc
  },{})

  const p3 = people.reduce((acc, ppl) => {
  const city =  ppl.city
   acc[city] ? acc[city].push(ppl) : acc[city] = []
   return acc
  },{})

console.log(p3)

  const p4 = people.reduce((acc, ppl) => {
  return acc[ppl.city] ||= [].push(ppl)
  },{})

  console.log(p4)





