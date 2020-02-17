const {Person, myVar} = require('./person');

const p1 = new Person('Bill', 25);

console.log(p1.name);
console.log(p1.toJSON());
console.log(myVar);


