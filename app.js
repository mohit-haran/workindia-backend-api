const express = require('express');
const cors = require('cors');
const authenticationRouter = require('./routes/authenticationRouter');
const listRouter = require('./routes/listRouter');

const app = express();

app.use(cors());

app.use('/app/agent',authenticationRouter);
app.use('/app/sites',listRouter);

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
})