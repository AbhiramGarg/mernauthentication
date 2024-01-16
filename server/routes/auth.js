import Router  from "express";
import { User } from "../models/user.js";
import Joi from "joi";
import bcrypt from "bcrypt"
const router = Router()

router.post('/',async(req,res) => {
    try {
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message});
        const user = await User.findOne({email:req.body.email}).then(console.log("Found!"))

        if(!user)
            return res.status(401).send({message:"Invalied Email or Password"});
        const validatePassword = await bcrypt.compare(req.body.Password,user.Password);
        if(!validatePassword)
            return res.status(401).send({message:"Invalied Email or Password"})
        const token = user.generateAuthToken();
        res.status(200).send({data:token,message:"Logged in successfully!"})
    } catch (error) {
        res.status(500).send({message:"Internal Server ErroR"});
        console.log(error)
    }
})
const validate = (data) => {
    const schema = Joi.object({
        email:Joi.string().email().required().label("Email"),
        Password:Joi.string().required().label("Password")
    })
    return schema.validate(data)
}

export default router
