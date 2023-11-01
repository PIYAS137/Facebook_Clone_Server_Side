

const express = require('express')
const app = express()
const port = process.env.PROT || 5020




app.get('/',(req,res)=>{
    res.send("Server is Run Successfully !");
})


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})