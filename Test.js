// Array.prototype.add = (arr)=>{
//     let total=0;
//   for(let i =0; i<arr.length;i++){
//      total = total+arr[i]
//   }
//   return total
// }

//the above one will work but prototypwe method should not take arr

// need arr.add()   and not arr.add(arr)

Array.prototype.add = function(){
   let total=0;
   for(let i =0; i<this.length; i++){
    total+=this[i];
   }
   return total;
}
const arr=[1,2,3,4,5]

let res = arr.add()
console.log(res)


Array.prototype.map = function(callback){
    let newArr=[]
    console.log(arguments)
    for(let i =0; i<this.length; i++){
        newArr.push(callback(this[i], i, this))   //1st arg itm, 2nd indx, 3rd arr
    }
    return newArr;
}

// const ret = [1,2,3,4].map((x) => i==1 ? x*2 : x)
const obj = [{id:1, isCheck: false}, {id:2, isCheck: false},{id:3, isCheck: false}]
const ret = obj.map(obj => obj.id == 1 ? {...obj, isCheck:true} : obj)
console.log(ret)




Array.prototype.filter = function(callback){
    let newArr=[]
    // console.log(arguments)  //function
    for(let i =0; i<this.length; i++){
        let res = callback(this[i], i, this);
        res && newArr.push(res)   //1st arg itm, 2nd indx, 3rd arr
    }
    return newArr;
}
console.log("filter")
const obj2 = [{id:1, isCheck: false}, {id:2, isCheck: true},{id:3, isCheck: false}]
const filt = obj2.filter(itm => itm.isCheck === false && itm)
console.log(filt)

Array.prototype.push = function(val){
    let length = this.length;
    this[length] = val;
}

Array.prototype.pop = function(val){
    let length = this.length;
    let value = this[length-1]
     
    delete this[length-1]

    return value
}

let empAArr=[]

empAArr.push(1)
empAArr.push(4)

empAArr.push(2)
empAArr.push(10)

console.log(empAArr)

empAArr.pop(10)
console.log(empAArr)


console.log("=================")
Array.prototype.cusShift = function(){
   let val = this[0];
   delete this[0];
   for(let i = 0; i< this.length; i++){
    this[i] = this[i+1]
   }
   return val
}

let shf = [1,2,3,4,5,6]
console.log(shf.cusShift())
console.log(shf)

console.log(shf.cusShift())
console.log(shf)

console.log("===================")


Array.prototype.spliceCus = function(startIndx, delCount, ...items){ // splice(start, deleteCount, ...items)
    let removed = []
    let itemLength = items.length;
    let count=0;
    console.log(items)
    for(let i=0; i<this.length; i++){
        if(i ===  startIndx){
            for(let j = i; j<(i+delCount); j++){
               removed[removed.length] = this[j]
               delete this[j]
               this[j] = items[count]
               count++;
               itemLength--;
            }
            if(itemLength){
              console.log("next ele", this[startIndx+delCount])
              console.log("next ele", items[count])

              let remItemToInsert = items.length-count
              let startFrom = startIndx+delCount; 
              for(let i = remItemToInsert; i>0 ; i--){
                 let nextEle = this[startFrom+1];       
                 this[startFrom+1] = this[startFrom];
                 this[startFrom] = items[remItemToInsert]
                 startFrom++;
              }
            }
        }
    }
}  


Array.prototype.spliceCus2 = function(startIndx, delCount, ...items){ // splice(start, deleteCount, ...items)
    let removed = [];   
    let itemsLength = items.length;
    let needSpace = itemsLength - delCount;

       let oldArr  = [...items];
       let newArr = [];
       let remStart = null;
    //del 0 and need space 3
    for(let i = startIndx; i<this.length ; i++){
        if(delCount == 0){

            for(let j = 0; j<oldArr.length; j++){
                 newArr[newArr.length] = this[startIndx];
                 delete this[startIndx];
                 this[startIndx] = oldArr[j]
                 startIndx++;                        //if startf frm 1 => 1,2,3,4 is rmd    
                                            // stored in rm[] now 
                 if(startIndx === this.length){
                    remStart = j; 
                    break;
                }                                                    
            }

            // oldArr = [...newArr];
            // newArr = []
            // console.log(oldArr, newArr)
            console.log(oldArr, newArr, startIndx);
            break;
        }
    }

    for(let i = 0; i<remStart ; i++){
      
    }


    // let count=0;
    // console.log(items)
    // for(let i=0; i<this.length; i++){
    //     if(i ===  startIndx){
    //         for(let j = i; j<(i+delCount); j++){
    //            removed[removed.length] = this[j]
    //            delete this[j]
    //            this[j] = items[count]
    //            count++;
    //            itemLength--;
    //         }
    //         if(itemLength){
    //           console.log("next ele", this[startIndx+delCount])
    //           console.log("next ele", items[count])

    //           let remItemToInsert = items.length-count
    //           let startFrom = startIndx+delCount; 
    //           for(let i = remItemToInsert; i>0 ; i--){
    //              let nextEle = this[startFrom+1];       
    //              this[startFrom+1] = this[startFrom];
    //              this[startFrom] = items[remItemToInsert]
    //              startFrom++;
    //           }
    //         }
    //     }
    // }
} 

console.log("===========================")
const splc = [1,2,3,4,5,6]
splc.spliceCus2(0, 0, 10, 5,7,8)
console.log(splc)



const someFilter  = [1,0,2,0,3,4,0,6]

const filter = someFilter.filter(el => {
    if(el===0) return true
    return el;
})

const filter2 = someFilter.filter(el =>  el===0 || el)

console.log(filter)
console.log(filter2)

const filter3 = someFilter.filter(el => {
    if(el===0) return false
    return el;
})
console.log(filter3)


// ['bz','ba','bc','axc', 'aby','cdf']

const data = [
    {id:1,  title: 'a', body:'bz'},
    {id:2,  title: 'b', body:'axc'},
    {id:1,  title: 'b', body:'aby'},
    {id:3,  title: 'c', body:'cdf'},
    {id:3,  title: 'c', body:'ast'},
    {id: 1, title: 'a', body:'ba'},
    {id: 2, title:'a', body:'bc'},
]

const sorObjArr = ["id", 'title', 'body']

let resObj= [...data].sort((a,b) => {
   for(const sort1 of sorObjArr){                   //
     const aVal = a[sort1]
     const bVal = b[sort1]
     if(aVal === bVal) continue   //this is 
     if(typeof aVal === 'number') return aVal-bVal
     return String(aVal).localeCompare(String(bVal))
  }
 return 0
})

console.log(resObj)


//missing number in an array
const missingNum = [1,2,4,5,7];

let j = 1;

for(let i = 0; i<missingNum.length; i++){
    if(missingNum[i] !== j){
        console.log('missing num', j)
        i--;
    }
     j++;
}

 
// const n = 7;

// const total = n*((n+1)/2)

// const sum = missingNum.reduce((acc, v) => acc+v, 0)

// console.log(total - sum)


const all = [1,2,3,-1,3,6,7,8,9,0]

const ev = all.every(a => {
    console.log(a)
    if(a>0){
        return a
           
    }
 
})

const upperFirstLetter = "javascrip java selenium reactjs"

const upperRes = upperFirstLetter.split(' ').map(w => w.charAt(0).toUpperCase()).join(' ')
const upperRes2 = upperFirstLetter.split(' ').map(w => w[0].toUpperCase()+w.slice(1)).join(' ')
console.log("uperres", upperRes)
console.log("uperres", upperRes2)

console.log(upperFirstLetter.charAt(0))

function print100(num){
   if(num === 1)
    return num

   print100(num-1)
   console.log(num)
}

print100(100)