import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user_auth.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;
const projectDetails = {
    name: 'User Authentication and Authorization API'
}

app.use(bodyParser.json());
app.use('',userRoutes);

app.get('/',(req,res)=>{
    res.json(projectDetails)
})


//start server
app.listen(PORT, ()=> console.log(`server is running on http://localhost:${PORT}`));



