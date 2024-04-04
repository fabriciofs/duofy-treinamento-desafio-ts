const obj1 = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    country: 'USA'
  }
};


// const obj2 = { ...obj1 };

// const obj2 = Object.assign({}, obj1);
const obj2 = JSON.parse(JSON.stringify(obj1))
obj2.address.city = 'Los Angeles';
obj2.age = 25;


console.log({ obj1, obj2 })

// const obj1String = JSON.stringify(obj1);

// console.log(obj1String)

// console.log(JSON.parse(obj1String))