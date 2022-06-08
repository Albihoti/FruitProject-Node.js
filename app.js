
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser:true});



const fruitSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please check your data entry, no name specified"]
    },
    rating: {
        type:Number,
        min:1,
        max:10
    },
    review: String
});

 const Fruit = mongoose.model("Fruit", fruitSchema);
// const fruit = new Fruit({

//     rating:8,
//     review: "pretty solid as fruit"
// });

// fruit.save();
const people = new mongoose.Schema({
    name:String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", people);
const pineapple = new Fruit({
    name: "Pineapple",
    rating:9,
    review:"Great fruit"
});
pineapple.save();

const mango = new Fruit({
    name:"Mango",
    rating:10,
    review:"very good for coctails"
})
mango.save();
Person.updateOne({name:"Amy"},{favoriteFruit:mango}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Success");
    }
})

// const person = new Person({
//     name: "Amy",
//     age: 22,
//     favoriteFruit: pineapple
// });

// person.save();


// const kiwi = new Fruit({
//     name: "kiwi",
//     rating: 10,
//     review: "very green"
// });
// const orange = new Fruit({
//     name: "orange",
//     rating: 9,
//     review: "very orange"
// });
// const banana = new Fruit({
//     name: "bannana",
//     rating: 8,
//     review: "very yellow"
// });
// Fruit.insertMany([kiwi,orange,banana], function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("succesfully saved all fruits")
//     }
// });

// Fruit.find(function(err, fruits){
//     if(err){
//         console.log(err)}
//         else{
//             mongoose.connection.close();
//             fruits.forEach(function(fruit){
//                 console.log(fruit.name)
//             })
//         }
    
// });
// Fruit.updateOne(
//     {_id:"629bd395b3839a4ab6d929fb"}, {name:"Peach"}, function(err){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("Succes");}
//         });

// Fruit.deleteOne({name:"Peach"}, function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Successfully lloged!");
//     }
// });

// Person.deleteMany(
//     {name: "Albi"}, function(err){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("Success")
//         }
    
// });
const findDocumetns = function(db, callback){
    const collection = db.collection('fruits');
    collection.find({}).toArray(function(err, fruits){
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits);
        callback(fruits);
    });
}