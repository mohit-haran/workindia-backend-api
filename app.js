const express = require('express');
const cors = require('cors');
const authenticationRouter = require('./routes/authenticationRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/app/agent',authenticationRouter);

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
})