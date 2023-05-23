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





async function run() {
  try {
    
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while updating the toy.");
      }
    });


    finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.listen(port,()=>{
    console.log(`server is running on port : ${port}`)
})