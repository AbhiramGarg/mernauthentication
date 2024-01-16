import Router from "express";
import { User,validate } from "../models/user.js";
import bcrypt from "bcrypt";
const router = Router();

router.post('/',async(req,res) => {
    try {
        const {error} = validate(req.body)
        if(error)
            return res.status(400).send({message:error.details[0].message});
        const user = await User.findOne({email:req.body.email});
        if(user)
            return res.status(409).send({message:"User with this email already exist"})
        const sugar = await bcrypt.genSalt(Number(process.env.SUGAR));
        const hashPassword = await bcrypt.hash(req.body.Password,sugar);

        await new User({...req.body,Password:hashPassword}).save().then((e)=>{console.log(e)}).catch((e)=>{console.log(e)});
        res.status(201).send({message:"User Created Successfully!"})
    } catch (error) {
        res.status(500).send({message:"Internal Server"});
        console.log(error)
    }
})
export default router