'use strict'
let start=new Date()
for(let i=0;i<1000000;i++){
  let some=i**3
}
let end=new Date()
alert(`Loop competed in ${end-start} milliseconds`)