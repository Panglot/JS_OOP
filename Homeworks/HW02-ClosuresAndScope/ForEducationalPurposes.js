var Person = function (fName, lastName, age) {
    var firstName = fName;
    var lastname = lastName;
    var age = age;


    function getName(){
        return firstName;
    }

    function setName(name) {
        firstName = name;
    }


    return {
        getName: getName,
        setName: setName
    }


};

var testPerson = new Person("ivan","ivanov", 23);

console.log(testPerson.getName());
testPerson.setName("kircho");
console.log(testPerson.getName());
console.log(testPerson);

var testPerson2 = new Person("test asd", "testov", 90);
console.log(testPerson2.getName());
console.log(testPerson2);
