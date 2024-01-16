import Joi from "joi";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import PasswordComplexity  from "joi-password-complexity";
const userSchema = new mongoose.Schema({
    Firstname:{type:String,required:true},
    Lastname:{type:String,required:true},
    email:{type:String,required:true},
    Password:{type:String,required:true}
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token
};

export const User = mongoose.model('user',userSchema);

export const validate = (data) => {
    const schema =  Joi.object({
        Firstname:Joi.string().required().label("Firstname"),
        Lastname:Joi.string().required().label("Lastname"),
        email:Joi.string().required().label("email"),
        Password:PasswordComplexity().required().label("Password")
    });
    return schema.validate(data)
}
