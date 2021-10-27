const faker = require("faker");
const fs = require ('fs');

faker.locale = "fr";

const category = [];
const type = ['Null', 'Green', 'Brown', 'All']

let random = () => {
  return Math.floor(Math.random() * 4);

}



for (let i = 0; i < 100; i++) {
    category.push({

        category: type[random()]
        // fistname: faker.name.firstName(),
        // lastname: faker.name.lastName(),
        // username: faker.internet.userName(),
        // mail: faker.internet.email(),
        // password: faker.internet.password(),
        // role: faker.datatype.boolean(),
        // image: faker.image.image(),
        // longitude: faker.address.longitude(),
        // latitude: faker.address.latitude(),
        // address: faker.address.streetName(),
        // locality: faker.address.city(),
        // zip_code: faker.address.zipCode(),
        // user_id: i + 1,

    })

}

console.table(category)

const categoryJson = JSON.stringify(category);
fs.writeFile('fakeCategory.json', categoryJson, function(err, res){
  if(err) console.log(err)
})

// const usersJson = JSON.stringify(users);
// fs.writeFile('fakeUsers.json', usersJson, function(err, result){
//   if(err) console.log(err)
// });


// console.table(users);
