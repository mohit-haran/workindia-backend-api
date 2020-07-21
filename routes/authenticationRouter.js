const express = require('express');
const bodyParser = require('body-parser');
const dbops = require('../db/dbops');
const bcrypt = require('bcrypt');

const authenticationRouter = express.Router();
authenticationRouter.use(bodyParser.json());
authenticationRouter.use(bodyParser.urlencoded({extended:false}));

//salt rounds for the password encryption
const saltRounds = 10;

authenticationRouter.route('/')
.get((req,res,next)=>{
    res.statusCode = 403;
    res.send("GET request Forbidden on /app/agent");
})
.post((req,res,next)=>{

    bcrypt.hash(req.body.password,saltRounds,async(err,hash)=>{
        if(err)
        {
            res.statusCode = 500;
            res.json({status:"Could not hash password",status_code:500});
        }
        else
        {
            try
            {
                console.log(req.body.agent_id,hash);
                let results = await dbops.addAgent(req.body.agent_id,hash);
                if(results)
                {
                    res.json({status:"account created",status_code:200});
                }
            }
            catch(error)
            {
                res.status(200).json({status:"Could not create account",status_code:500});                
            }
        }
        
    });  
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.send("PUT request Forbidden on /app/agent");
})
.delete((req,res,next)=>{
    res.statusCode = 403;
    res.send("DELETE request Forbidden on /app/agent");
});

authenticationRouter.route('/auth')
.get((req,res,next)=>{
    res.statusCode = 403;
    res.send("GET request Forbidden on /app/agent/auth");
})
.post(async(req,res,next)=>{
    try
    {
        let results = await dbops.authenticateAgent(req.body.agent_id);
        if(results.length>0)
        {
            bcrypt.compare(req.body.password,results[0].password,(err,result)=>{
                if(result)
                {
                    res.statusCode = 200;
                    res.json({status:"success",agent_id:results[0].id,status_code:200});
                }
                else
                {
                    res.statusCode = 401;
                    res.json({status:"failure",status_code:401});                    
                }
            });
            
        }
        else
        {
            res.statusCode = 401;
            res.json({status:"failure",status_code:401});
        }
    }
    catch(error)
    {
        console.log(error);
        res.statusCode = 401;
        res.json({status:"failure",status_code:401});                
    } 
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.send("PUT request Forbidden on /app/agent/auth");
})
.delete((req,res,next)=>{
    res.statusCode = 403;
    res.send("DELETE request Forbidden on /app/agent/auth");
})


module.exports = authenticationRouter;