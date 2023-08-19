const express=require("express")
const { connection } = require("./db")
const { BlackCopperModel } = require("./model/blackcopper.model")
require("dotenv").config()
const app=express()

app.use(express.json())


app.post("/add",async(req,res)=>{
    try {
        const copperdata=new BlackCopperModel(req.body)
        await copperdata.save()
   res.status(200).json({message:"Added To The DataBase",data:req.body})
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }

})

app.get("/",async(req,res)=>{
    try {
    const data =await BlackCopperModel.find()
        res.status(200).json({msg:"Data fetch Succesfully",data})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log(`Server is running at ${process.env.PORT}`)
        console.log(">>>>>>>>>>>>Connected To The DataNase >>>>>>>>>>")

    } catch (error) {
        console.log(error)
    }
})