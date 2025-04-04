const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please Enter a Password of atleast 8 characters'],
        minlength: 8,
    },

});

    // password Hashing before saving to database
    userSchema.pre('save', async function(next){
        const salt=bcrypt.genSaltSync(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    });

    userSchema.methods.comparePassword = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password);
    }

    userSchema.methods.createJWT = function(){
        return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_LIFETIME
        });
    }

    module.exports = mongoose.model('User',userSchema);


