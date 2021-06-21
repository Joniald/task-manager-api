// CRUD
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

// Generating new id
//const id = new ObjectID();
//console.log(id.id.length);
//console.log(id.toHexString().length);
//console.log(id);
//console.log(id.getTimestamp());

const connectionURL = process.env.URL_CONNECTION;
const databaseName = "task-manager";

MongoClient.connect(connectionURL, { useNewUrlParser:true }, (error, client)=>{
     if (error) {
         return console.log("Unable to connect");
     }
     console.log("Connected correctly");
     //const db = client.db(databaseName);
    
//     // Update and incriment one
//   db.collection("users").updateOne({
//         _id:new ObjectID("60c0bc18868c5d378c121f5f")},
//         {
//         $set: {
//             name:"Andi"
//         }
//         }
//     ).then((result)=>{
//         console.log(result);
//     }).catch((error)=>{
//         console.log(error);
//     })

//     db.collection("users").updateOne({
//         _id:new ObjectID("60c0bc18868c5d378c121f5f")},
//         {
//         $inc: {
//             age:1
//         }
//         }
//     ).then((result)=>{
//         console.log(result);
//     }).catch((error)=>{
//         console.log(error);
//     }) 


//////////////////////////////////////////////////////////

// // Update many
// db.collection("tasks").updateMany({completed:true},{$set:{completed:false}})
//   .then((result)=>{console.log(result)})
//   .catch((error)=>{console.log(error)})

//////////////////////////////////////////////////////////

// Delete many

// db.collection("users").deleteMany({
//     age:36
// }).then((result)=>{
//     console.log(result);
// }).catch((error)=>{
//     console.log(error);
// })

// db.collection("tasks").deleteOne({
//     _id:new ObjectID("60c0a15f25cfea3d5883d021")
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })
    
    /////////////////////////////////////////////////////////////////////
    
    //  // Find one document
    //  db.collection('users').findOne({name:"Anna"}, (error, result)=>{
    //      if (error) {
    //          return console.log("Can not find the user. Plese try other query");
    //      }
    //      console.log(result)
    //  })

    
    ///////////////////////////////////////////////////////////////////
    
    // // Find many documents
    // db.collection("users").find({age:34}).toArray((error, result)=>{
    //     console.log(result)
    // })

    // db.collection("users").find({age:34}).count((error, result)=>{
    //     console.log(result)
    // })

    
    ////////////////////////////////////////////////////////////////

    // // Find one and many in tasks document
    // db.collection("tasks").findOne({_id:new ObjectID("60c0a15f25cfea3d5883d020")},(error,result)=>{
    //    if (error) {
    //        return console.log("Can not find any task")
    //    }
    //    console.log(result);
    // })

    // db.collection("tasks").find({completed:true}).toArray((error,result)=>{
    //     if (error) {
    //         return console.log("Can not find any task")
    //     }
    //     console.log(result);
    // })

    
     ///////////////////////////////////////////////////////
     
    //  // Insert one
    //  db.collection('users').insertOne({
    //      name:"Joniald",
    //      age: 36
    //  },(error, result)=>{
    //     if (error) {
    //         return console.log("Unable to insers users");
    //     }
    //     console.log(result.ops)
    //  })

    
    ///////////////////////////////////////////////////////

     /*
     // Insert many
     db.collection("users").insertMany([
         {
          name:"Anna",
          age: 34
         },
         {
          name:"Nikos",
          age: 35
         }
    ],(error, result)=>{
        if (error) {
            return console.log("Unable to insert documents");
        }
         console.log(result.ops);
    })
    */


    /////////////////////////////////////////////////////////

    /*
    // another collection with the name tasks
    db.collection("tasks").insertMany([
        {
            description: "Send message",
            completed: true
        },
        {
            description: "Test message",
            completed: true
        },
        {
            description: "Recive message",
            completed: false
        }
    ],(error,result)=>{
        if (error) {
            return console.log("Unable to insert documents");
        }

        console.log(result.ops)
    })
    */
})