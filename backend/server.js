import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const expressInstance = express()
expressInstance.use(cors())
expressInstance.use(express.json())

await mongoose.connect("mongodb://mongo:27017/testdb");

const ItemSchema = new mongoose.Schema({
    name: String
})

const Item = mongoose.model("item", ItemSchema)


expressInstance.get("/items", async (req,res)=>{
    const items = await Item.find()
    res.json(items)
    
})

expressInstance.post("/items",async (req, res)=>{
    const item = await Item.create({name:req.body.name})
    res.json(item)
})


expressInstance.listen(5000, ()=>{
    console.log("servier is running on port 5000")
})