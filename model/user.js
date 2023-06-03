const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
require('dotenv').config();

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
   
    tokens:[{
        token: {               
            type:String,
            required:true
        }
    }]
});

// userSchema.methods.generateAuthToken = function () {
// 	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY,
//          {
// 		expiresIn: "7d",
// 	});
// 	return token;
// };


//-----

// userSchema.methods.generateAuthToken = async function () {
//     try{
	
//         let token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
//         this.tokens = this.tokens.concat({token:token});
//         await this.save();
//         console.log(token , "user")
//         return token;
//     }catch(error){
//         console.log(error);
//         console.log("having problem with authToken")
//     }
	
// };
userSchema.methods.generateAuthToken = async function () {
    try{
	
        let token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return this.save();
    }catch(error){
        console.log(error);
        console.log("having problem with authToken")
    }
	
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
        
	});
	return schema.validate(data);
};

module.exports = { User, validate };
