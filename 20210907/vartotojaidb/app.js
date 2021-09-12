const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;
const ObjectId=mongodb.ObjectId;

const connectionURL='mongodb://127.0.0.1:27017';
const dbName = 'vartotojai';

MongoClient.connect(connectionURL, (error, client)=> {
if (error){
   return  console.log("nepavyksta prisijungti")
}
console.log("sekmingai prisijungta")

const db=client.db(dbName);
// db .collection('vardai').insertOne({
//     vardas:'Jonas',
//     pavarde:'Jonaitis',
//     atlyginimas: 1200
// }, (error, result)=>{
//     if (error){
//      return console.log('irasas neisiterpe')
//     }
//     console.log('irasas itertptas')
// });

// paimti Gedinimas is duomenu bazes
// db.collection('vardai').findOne({vardas:'Jonas',
// amzius:76},(error, user)=>{
//     if(error){
//         return "ivyko klaida paimant irasa";
//     }
//     console.log(user)
// })
// db.collection('vardai').findOne({_id: new ObjectId('6137a8109c592ec1394088c9'),
// },(error, user)=>{
//     if(error){
//         return "ivyko klaida paimant irasa";
//     }
//     console.log(user)
// })

//imam visus kolekcijos duomenis
// db.collection('vardai').find({
//     vardas:"Jonas"
// }).toArray((error, users)=>{
// if(error){
//     return console.log('neina paimti irasu');
// }
// console.log(users);
// });
//suzinokime kiek yra JOnu
db.collection('vardai').find({
    vardas:"Jonas"
}).count((error, users)=>{
    if(error){
        return console.log('neina paimti irasu');
    }
    console.log("Viso Jonu yra " +users);
    }) ;
});


//MONGO DB 
// C:\Users\kauna\Desktop\mongoDB\mongodb\bin\mongod.exe --dbpath='C:\Users\kauna\Desktop\mongoDB\data'