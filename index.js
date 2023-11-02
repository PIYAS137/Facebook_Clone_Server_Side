
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PROT || 5020
const cors = require('cors')




// middlewares 
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.frg7rqf.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const usersCollection = client.db("FB_CLONE_DB").collection("usersCollection");
    const postCollection = client.db("FB_CLONE_DB").collection("postCollection");

    // get users------------------>>>>
    app.get('/users',async(req,res)=>{
      res.send("GET USER")
      console.log("object");
    })

    // user users-------------------->>>>
    app.post('/users',async(req,res)=>{
      const data = req.body;
      const result = await usersCollection.insertOne(data)
      res.send(result)
    })
    
    //create post------------------>>>>
    app.post('/createPost',async(req,res)=>{
      const data = req.body;
      const result = await postCollection.insertOne(data)
      res.send(result)
    })

    // get all posts---------------->>>>
    app.get('/getPosts',async(req,res)=>{
      const result =await postCollection.find({}).toArray()
      res.send(result)
    })
    







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send("Server is Run Successfully !");
})


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})