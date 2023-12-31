const express = require("express")
const cors = require("cors")
require("dotenv").config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;



app.use(express.json());
app.use(cors());



app.get("/",(req, res)=>{
    res.send("Server is running")
})



const uri = "mongodb+srv://cse2112020031:VWhUPD2zvtEyNvz6@cluster0.by40fgv.mongodb.net/?retryWrites=true&w=majority";

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
    // await client.connect();
    const toyCollection = client.db("toystore").collection("toys")

    app.get('/alltoys',async(req,res)=>{
        console.log(req.query.email);
        let query ={}
        if(req.query?.email){
            query ={email:req.query.email}
        }
        const result =await toyCollection.find(query).toArray();
        res.send(result); 
    })

    app.get('/category',async(req,res)=>{
        console.log(req.query.category);
        let query ={}
        if(req.query?.category){
            query ={email:req.query.category}
        }
        const result =await toyCollection.find(query).toArray();
        res.send(result); 
    })

    app.get("/alltoys/:id",async(req,res)=>{
        const id = req.params.id;
        console.log(id);
        const query = {_id: new ObjectId(id)}
        const result = await toyCollection.findOne(query);
        res.send(result)
    })
    app.delete("/alltoys/:id",async(req,res)=>{
        const id = req.params.id;
        console.log(id);
        const query = {_id: new ObjectId(id)}
        const result = await toyCollection.deleteOne(query);
        res.send(result)
    })
    app.put("/alltoys/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const reqBody = req.body;
    
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
    
        const updateDoc = {
          $set: {
            customerName: reqBody.customerName,
            email: reqBody.email,
            price: reqBody.price,
            photoURL: reqBody.photoURL,
            sellerName: reqBody.sellerName,
            category: reqBody.category,
            rating: reqBody.rating,
            quantity: reqBody.quantity,
          },
        };
    
        const result = await toyCollection.updateOne(filter, updateDoc, options);
    
        res.send(result);
        console.log(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while updating the toy.");
      }
    });


    app.post("/alltoys",async(req,res)=>{
        const toy =req.body;
        console.log(toy);
        const result = await toyCollection.insertOne(toy);
        res.send(result);
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




app.listen(port,()=>{
    console.log(`server is running on port : ${port}`)
})