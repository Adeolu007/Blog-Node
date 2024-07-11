const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res)=>{
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
    })
    user = await user.save();

    if(!user)
        return res.status(400).send('The user cannot be created')

    res.send(user);
}

const getUsers = async(req, res)=>{
    const userList = await User.find().select('-passwordHash')

    if(!userList){
        res.status(500).json({success: false})
    }
    res.send(userList)

}

const getSingleUser = async(req,res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
}

const deleteUser = async (req, res)=>{
    await  User.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
}

const loginUser = async (req, res)=>{
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!user){
        return res.status(400).send('User not found')
    }

    if(user && bcrypt.compareSync(req.body.passwordHash,user.passwordHash)){
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            }, 
            secret,
            {expiresIn: '1d'}
        )
        res.status(200).send({user:user.email, token: token})
    } else {
        res.status(400).send('password is wrong')
    }
}

module.exports = {
    registerUser,
    getUsers,
    getSingleUser,
    deleteUser,
    loginUser
}