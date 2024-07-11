const express = require('express')
const router = express.Router()
const {registerUser, getSingleUser, getUsers, deleteUser, loginUser} = require('../controllers/user')
const {createPost} = require('../controllers/post')

//users
router.route('/register').post(registerUser)
router.route('/').get(getUsers)
router.route('/:id').get(getSingleUser).delete(deleteUser)
router.route('/login').post(loginUser)

//post
router.route('/post/create').post(createPost)

module.exports = router
