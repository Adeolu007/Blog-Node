const express = require('express')
const router = express.Router()
const {registerUser, getSingleUser, getUsers, deleteUser, loginUser} = require('../controllers/user')
const {createPost,getAllPost,getSinglePost,getAllCommentsInPost} = require('../controllers/post')
const {createComment,getSingleComment, getAllCommentsForPost} = require('../controllers/comment')

//users
router.route('/register').post(registerUser)
router.route('/').get(getUsers)
router.route('/:id').get(getSingleUser).delete(deleteUser)
router.route('/login').post(loginUser)

//post
router.route('/post/create').post(createPost)
router.route('/post').get(getAllPost)
router.route('/post/:id').get(getSinglePost)
router.route('/post/allcomments/:id').get(getAllCommentsInPost)

// comment
router.route('/comment/create').post(createComment)
router.route('/comment/:id').get(getSingleComment)
router.route('/post/comments/:id').get(getAllCommentsForPost)
module.exports = router
