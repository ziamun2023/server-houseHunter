
const express= require('express')
const cors= require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express();
const port= process.env.PORT || 5000  
require('dotenv').config()

app.use(cors())

app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0xqymst.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('House hunter')
})

app.listen(port,()=>{
    console.log(`house hunter server is running on port ${port}`)
})