const express = require("express");
const http = require("http");
const app = express();
const port = 3001 || process.env.port;
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
const server = http.createServer(app);
const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host : "smtp.gmail.com",
  port : 465,
  secure : true,
  auth : {
    type : "login",
    user : process.env.EMAIL,
    pass : process.env.PASSWORD,
  },
});

app.post("/sendEmail",async (req,res)=>{
   
  try{
  transporter.sendMail({
    from : process.env.EMAIL,
    to : "9166278216jat@gmail.com",
    subject : req.body.subject,
    text : req.body.text,
    html : req.body.html,
  },(err,ress)=>{
      if(err){
	console.log(err);
	res.send("oops error occurred");
      }
      else
	res.send("Mail sent successfully");
  });
  
 
  }
  catch(err){
    console.log("Error occurred with errorCode : ",err);
  }
});

server.listen(port, "0.0.0.0", ()=>
  console.log(`Server is running on port ${port}`)
);
