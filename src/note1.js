
const ff = ()=>{
    return [1,2,3];
};

ff.myObj = {name:'Kalea', age:25 };

ff.myFunc = ()=>{
    return [4,5,6]
};

console.log(ff());
console.log(ff.myObj);
console.log(ff.myFunc());

let myObj = {
    id: 123,
    func: ()=>{
    }
};
