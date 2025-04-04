const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');

const register = async (req,res) => {
    const {username, email, password} = req.body;
    try{
        const user = await User.create({username,email,password});
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({user:{username: user.username},token});
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({msg:error});
    }
}
module.exports = {register};