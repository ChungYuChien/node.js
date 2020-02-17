class Person {
    constructor(name='noname', age=20) {
        this.name = name;
        this.age = age;
    }

    toJSON(){
        return JSON.stringify({
            name: this.name,
            age: this.age,
        })
    }
}
let myVar = 30;
module.exports = {Person, myVar};