

//declare array
const t = [1,3,2]

t.push(5)
console.log(t.length)

//note the arrow syntax - forEach takes a function.
t.forEach((value) => {
    console.log(value)
})

const t = [1, -1, 3]

const t2 = t.concat(5)  // creates new array - commonly used in React

console.log(t)  // [1, -1, 3] is printed
console.log(t2) // [1, -1, 3, 5] is printed

// a use of the map function
const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)  

//define objects
const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
  }

//you can add attributes easily
object1.address = 'Helsinki'


// simple obj with methods

const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
  doAddition: function(a, b) {
    console.log(a + b)
  },
}

arto.doAddition(1, 4)        // 5 is printed

// this is a reference to the function
const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)   // 25 is printed

const refToGreet = arto.greet()
refToGreet() // this does NOT work becuase of the 'this'

//simple class

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log("Hi I am " + this.name)
  }
}

const adam = new Person("adam", 20)
adam.greet()

