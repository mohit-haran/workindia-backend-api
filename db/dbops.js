const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit:10,
    password:"Mohit@123",
    user:"mohit",
    host:'localhost',
    port:'3306',
    database:'workindia',
    insecureAuth:true
});

let dbops = {};

dbops.addAgent = (agent_id,passowrd) => {

    return new Promise((resolve,reject)=>{

        const values = [[agent_id,passowrd]];
        pool.query("Insert into agent_details(agent_id,password) values ?",[values],(err,result)=>{
        
            if(err){
                return reject(err);
            }

            return resolve(result);
        });
    });
};

dbops.authenticateAgent = (agent_id) =>{

    return new Promise((resolve,reject)=>{

        pool.query("Select id, agent_id, password from agent_details where agent_id=?",agent_id,(err,result)=>{
        
            if(err){
                return reject(err);
            }

            return resolve(result);
        });
    });
};

dbops.getList = (agent_id) => {

    return new Promise((resolve,reject)=>{

        pool.query("Select id,title,description,category,due_date from todolist where agent_id=? Order By due_date",agent_id,(err,result)=>{

            if(err){
                return reject(err);
            }

            return resolve(result);
        });
    });
};

dbops.addTodo = (todo) =>{

    return new Promise((resolve,reject)=>{

        const values = [[todo.title,todo.description,todo.category,todo.due_date,todo.agent_id]];
        pool.query("Insert into todolist(title,description,category,due_date,agent_id) values ?",[values],(err,result)=>{

            if(err){
                return reject(err);
            }

            return resolve(result);
        });
    });
};

module.exports = dbops;

