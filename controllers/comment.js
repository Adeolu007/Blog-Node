const express = require('express')
const Post = require('../models/Post')
 const User = require('../models/User')
const Comment = require('../models/Comment')

const createComment = async (req, res) => {


    try {
        const { content, postId, userId } = req.body;

        const post = await Post.findById(postId);
        if(!post) return res.status(400).send('Invalid Post')
            const user = await User.findById(userId);
        if(!user) return res.status(400).send('Invalid user')
    
        // Create a new comment instance
        const newComment = new Comment({
            content,
            post: postId,
            author: userId,
        });

        // Save the new comment to the database
        const savedComment = await newComment.save();

        // Populate the 'author' and 'post' fields in the saved comment
        //await savedComment.populate('author', 'username email').populate('post', 'title');

        res.status(201).json({
            success: true,
            comment: savedComment,
        });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// const getSingleComment = async (req, res) => {
//     try {
//         const commentId = req.params.id;

//         // Find the comment by its ID
//         const comment = await Comment.findById(commentId);

//         if (!comment) {
//             return res.status(404).json({ success: false, message: 'Comment not found' });
//         }

//         // Populate the 'author' and 'post' fields in the comment
//         await comment.populate('author', 'username email').populate('post', 'title').execPopulate();

//         res.status(200).json({
//             success: true,
//             comment,
//         });
//     } catch (error) {
//         console.error('Error fetching comment:', error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// const getAllCommentsForPost = async (req, res) => {
//     try {
//         const postId = req.params.postId;

//         // Find all comments related to the specified post
//         const comments = await Comment.find({ post: postId });

//         if (!comments || comments.length === 0) {
//             return res.status(404).json({ success: false, message: 'No comments found for the post' });
//         }

//         // Populate the 'author' and 'post' fields in each comment
//         await Comment.populate(comments, { path: 'author', select: 'username email' });
//         await Comment.populate(comments, { path: 'post', select: 'title' });

//         res.status(200).json({
//             success: true,
//             comments,
//         });
//     } catch (error) {
//         console.error('Error fetching comments:', error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// };


module.exports = {
    createComment
}