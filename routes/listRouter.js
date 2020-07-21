const express = require('express');
const bodyParser = require('body-parser');
const databaseOperations = require('../database/databaseOperations');

const listRouter = express.Router();

listRouter.use(bodyParser.json());
listRouter.use(bodyParser.urlencoded({extended:false}));

listRouter.route('/')
.get((req,res,next)=>{
    res.statusCode = 403;
    res.send("GET request Forbidden on /app/sites");
})
.post(async(req,res,next)=>{
    req.body.agent_id = req.query.agent_id;
    try
    {
        let results = await databaseOperations.addTodo(req.body);
        if(results){
            res.status(200).json({status:"success",status_code:200});
        }
    }
    catch(error)
    {
        res.status(500).json({status:"failure",status_code:500});
    }
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.send("PUT request Forbidden on /app/sites");
})
.delete((req,res,next)=>{
    res.statusCode = 403;
    res.send("DELETE request Forbidden on /app/sites");
});

listRouter.route('/list')
.get(async(req,res,next)=>{
    let agent_id = req.query.agent_id;

    try
    {
        let results = await databaseOperations.getList(agent_id);
        res.status(200).json({list:results});
    }
    catch(error)
    {
        res.statusCode = 404;
        res.status(404).json({status:"failure"});
    }
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.send("DELETE request Forbidden on /app/sites/list");
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.send("PUT request Forbidden on /app/sites/list");
})
.delete((req,res,next)=>{
    res.statusCode = 403;
    res.send("DELETE request Forbidden on /app/sites/list");
});



module.exports = listRouter;