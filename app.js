const express=require('express');
const bodyparser=require('body-parser');
const https=require('https');
const app=express();
app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
   res.sendFile(__dirname+"/index.html"); 
});
app.post("/",(req,res)=>{
    const firstname=req.body.fname;
    const secondname=req.body.lname;
    const mail=req.body.email;

    const data={
    members:[
        {
            email_address : mail,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:secondname
            }
        }
    ]
   };
   const jsondata=JSON.stringify(data);
   const url="https://us21.api.mailchimp.com/3.0/lists/9db427d6ee";
   const options={
    method:"POST",
    auth:"sohail:8279274a0ff031e81fcfc18674f3adbd-us21"
   }
    const request=https.request(url,options,(response)=>{
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
       response.on("data",(data)=>{
        console.log(JSON.parse(data));

       });
   })
    request.write(jsondata);
    request.end();
});
app.post("/failure",(req,res)=>{
  res.redirect("/");
});
app.listen(process.env.PORT||3000,(req,res)=>{
    console.log("i am running a 3000");
})



