const faker = require("faker");

const fs = require ('fs');

faker.locale = "fr";

const composts = [];
const type = ['Null', 'Vert', 'Marron', 'Tous types']

let random = () => {
  return Math.floor(Math.random() * 4);

}



for (let i = 0; i < 100; i++) {
    composts.push({        
        // fistname: faker.name.firstName(),
        // lastname: faker.name.lastName(),
        // username: faker.internet.userName(),
        // mail: faker.internet.email(),
        // password: faker.internet.password(),
        // role: faker.datatype.boolean(),
        // image: faker.image.image(),
        // compost_id: i + 1
        compost: type[random()],
        longitude: faker.address.longitude(-1,7),
        latitude: faker.address.latitude(43.8, 48),
        user_id: i +1        
    })

}

// console.table(users)

const compostJson = JSON.stringify(composts);
fs.writeFile('fakeComposts.json', compostJson, function(err, res){
  if(err) console.log(err)
})

// const usersJson = JSON.stringify(users);
// fs.writeFile('fakeComposts.json', usersJson, function(err, result){
//   if(err) console.log(err)
// });


// console.table(users);

// let coords = [];


// for (let i=0; i < 15; i++) {
//   let long = faker.address.longitude(-1,7);
//   let lat = faker.address.latitude(43.8, 48);
//   coords.push({long, lat});
// }


// console.table(lats);

