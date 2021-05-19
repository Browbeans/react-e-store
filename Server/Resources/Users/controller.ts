const Users = require("./users-model");
import { Request, Response } from 'express';
import bcrypt from "bcrypt";

module.exports.handleRegister = async function(req: Request, res: Response) {
    const { name, adress, phone, email, password, zip } = req.body;
    const registeredUsers = await Users.find({email: email})
    const existingUsers = registeredUsers.find((u: any) => u.email === email);

    if (existingUsers) {
        return res.status(400).json("Email already exist")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
        name: name,
        adress: adress,
        phone: phone,
        email: email,
        password: hashedPassword,
        zip: zip
    })
    newUser.save();
    res.status(201).json(newUser)
};

module.exports.handleLogin = async function(req: Request, res: Response) {
    const { email, password} = req.body

    const registeredUsers = await Users.find({email: email})
    const user = registeredUsers.find((u: any) => u.email === email);
    try {
        if(!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json('Incorrect email or password');
        }     
        
        if (req.session) {
            req.session.name = user.name
            req.session.email = user.email;
            req.session.id = user._id
        }
        res.status(204).json(null)
    } catch (error) {
        console.log(error);
    }
}

module.exports.fetchUsers = async function(req: Request, res: Response) {
    if (req.session!.name) {
        const result = await Users.find({})
        res.json(result)
    } else {
        res.json("You must login");
    }
}

module.exports.handleLogout = async function(req: Request, res: Response) {
    if (req.session!.name) {
        req.session = null;
        res.status(200).json("Logout Success!")
    }
    res.status(400).json("You are already logged out!");
}