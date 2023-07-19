
const express= require('express')
const cors= require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express();
const jwt= require('jsonwebtoken')
const bcrypt = require('bcrypt');
const port= process.env.PORT || 5000  
require('dotenv').config()
const saltRounds = 10

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

    const db=client.db("test");
    const userCollectionUser=db.collection('Hunter-Users')
    const allProperty=db.collection('Property')




    app.post('/jwt', async (req,res)=>{
      const  email=req.body;
      console.log(email);
      const token=jwt.sign ( email, process.env.ACCESS_TOKEN_SECRET,{expiresIn : '7d',
    })
    console.log(token)
      res.send({token})

      
    })

  

    app.post('/users', async (req, res) => {
      const name= req.body.name
      const email = req.body.email;
      const password = req.body.password;
      const role=req.body.role

    
      try {
       
        const existingUser = await userCollectionUser.findOne({ email: email });
    
        if (existingUser) {
          return res.json({ error: true, message: 'User already exists' });
        }
    
   
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        const newUser = await userCollectionUser.insertOne({
          email: email,
          password: hashedPassword,
          role: role,
          name: name

        });
      
        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
        return res.json({ token: token });
      } catch (error) {
        console.error('Error creating a new user:', error);
        return res.status(500).json({ error: true, message: 'Internal server error' });
      }
    });
  


   


  


    app.post("/postProperty",async(req,res)=>{
      const body=req.body
      const result=await allProperty.insertOne(body)
      res.send(result)
    
      
      console.log(body)
    })

    app.get("/allProperty/:email",async(req,res)=>{
      const email = req.params.email;
      const query={Email: email}
      const cursor=allProperty.find(query)
      const result=await cursor.toArray()
   
      
      res.send(result)

     
      
    
    })
    app.get("/allProperty",async(req,res)=>{
   
      const result=await allProperty.find().toArray()
      res.send(result)
    
    
    })


    app.put("/update/:id", async (req, res) => {
      const id = req.params.id;
    
      const body = req.body;
  
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
        
      
          roomsize:body.roomsize,
     
          start:body.start,
          Enddata:body.Enddata,
          rent:body.rent,
          number:body.number,
          Description:body.Description
        },
      };
      const result = await allProperty.updateOne(filter, updateDoc);
      res.send(result);
    });


    app.delete('/deleteProperty/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await allProperty.deleteOne(query);
      res.send(result);
    })




    
    
    



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