import { MongoClient } from "mongodb";

const url = process.env.DB_URL;
let client;
 export const connectToMongodb =()=>{
    MongoClient.connect(url).then(clientInstance =>{
        client = clientInstance
        console.log("we are connected with the db ::)");
    }).catch(err =>{
        console.log(err);
    })
}

export const getDB = () =>{
      return client.db();
}

// export default connectToMongodb;