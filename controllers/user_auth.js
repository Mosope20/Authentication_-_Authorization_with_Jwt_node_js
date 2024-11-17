import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;
import dotenv from 'dotenv';
dotenv.config();

const users = [{username:"sope123",password:"12345",id: uuidv4()}];//temporary data base with demo details
export const blacklistedTokens = [];// tokens are sent here after users logout to render them invalid

//Method to view all users
export const allUsers = (req,res)=>
{const currentUser = users.find(user => user.username === req.user.username);// getting current username parsed with jwt
    if (!currentUser) {
        return res.status(404).send('User not found');
    }
    res.json(currentUser);
};

//Method to sign up
export const newUser = async (req,res)=>{
    const {username, password} = req.body; //getting user input from UI
    if (!username || !password) {return res.status(400).send('Username and password are required');}// checking if user filled both fields
    const existingUser = users.find(user => user.username === username);//checking if username exists
    if (existingUser) {return res.status(400).send('Username already exists');}
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);// hashing user password
        const user = { username: username, password: hashedPassword, id: uuidv4()}
         users.push(user)// pushing user into database
         //console.log(users)
         res.status(201).send('Account Created!');
     }
     catch{
         res.status(500).send('Error Creating Account!');
     }
};

//Login existing user
export const loginUser = async (req,res)=>{

    const {username, password} = req.body; //getting user input from UI
    if (!username || !password) {return res.status(400).send('Username and password are required');}// checking if user filled both fields
    //console.log(username + password)
    const index = users.findIndex(user => user.username === username);// Checking if the user exists, there are better means for this but I wanted to play around a bit (wink)
    //console.log(index)

    if(index === -1){return res.status(400).send('User does not exist!');}
    try{
        const currentUser = users[index];//getting user details
        const isMatch = await bcrypt.compare(password, currentUser.password);//compairing user password to hashed password

        if(isMatch){
            //require('crypto').randomBytes(64).toString('hex') use this to generate a token for process.env.ACCESS_TOKEN_SECRET
        const accessToken = jwt.sign({id:currentUser.id,username:currentUser.username},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1h'  });//using jwt to create a unique signed token for current user to be used for authorization
        //console.log(accessToken)
        res.json({message: `Welcome ${currentUser.username}`,
        accessToken});//copy token in postman
        }
        else{res.status(401).send('Incorrect details');}
    }

    catch(error){
        console.error('Error in login process:',error)
        res.status(500).send('Something went wrong');
    }
}

// Updating user account
export const updateUser = async (req,res)=>{
    const{username ,password} = req.body;//geting updated user details

    const currentUser = users.find(user => user.id === req.user.id);//getting user details using user id
    console.log(currentUser)
    if (!currentUser) {return res.status(404).send('User not found');}
    
    try {
        if(username) currentUser.username = username; //updating username if username was entered by user
        //console.log(currentUser.username)
        if(password){
            const hashedPassword = await bcrypt.hash(password, saltRounds);//updating and hashing password if password was entered by user
            currentUser.password = hashedPassword;
        } 
        console.log(currentUser.password)
        res.status(201).send(`User with the id ${currentUser.username} has been updated`);
     }

     catch{
         res.status(500).send('Something went wrong while updating the user');
     }
    
}


//logout user account
export const logoutUser = (req, res) => {
    //getting token from user
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    if (!token) return res.status(401).send('Unauthorized');

    // add the token to the blacklist
    blacklistedTokens.push(token);

    res.send('You have logged out').redirect('/login'); 
};

//delete user account
export const deleteUserAccount = (req, res) => {
    // Authenticate and get the logged-in user's information
    const userIndex = users.findIndex(user => user.id === req.user.id);

    // Check if the user exists
    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }

    // remove the user from the array
    users.splice(userIndex, 1);

    // send success response
    res.send('Your account has been deleted successfully');
};