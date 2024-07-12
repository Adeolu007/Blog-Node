const express = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')


const createPost = async (req, res)=>{
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            tags: req.body.tags,
            comments: req.body.comments
        });

        const savedPost = await post.save();

        if (!savedPost) {
            return res.status(500).send('The post could not be created');
        }

        res.status(201).send(savedPost); // 201 status code for successful creation
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getAllPost = async (req, res) => {
    try {
        const postList = await Post.find();
        await (consle.log(postList))

        if (!postList) {
            return res.status(404).json({ success: false, message: 'No posts found' });
        }

        res.status(200).json({ success: true, posts: postList });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const getSinglePost =  async (req, res) =>{
    const post = await Post.findById(req.params.id)

    if(!post) {
        res.status(500).json({success: false})
    } 
    res.send(post);
}
//populate comments and the author that is nested in comments
// .populate({
//     path: 'comments',
//     populate: {
//         path: 'author',
//        // select: 'username', // Select specific fields from the author object
//     },
// })
const getAllCommentsInPost = async (req, res) => {
    try {
        // Find the post by ID and populate specific fields
        const post = await Post.findById(req.params.id)
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    // select: 'username', // Optionally select specific fields from the author object
                },
            })
            .select('content author date_created'); // Select specific fields from the post

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // If post is found, send it as response
        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error('Error fetching post and comments:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
// const getAllCommentsInPost = async (req, res) => {
//     try {
//         // Find the post by ID and populate its comments
//         const post = await Post.findById(req.params.id)
//             .populate('comments'); // Populate the 'comments' field of the post

//         if (!post) {
//             return res.status(404).json({ success: false, message: 'Post not found' });
//         }

//         // If post is found, send it as response
//         res.status(200).json({ success: true, post });
//     } catch (error) {
//         console.error('Error fetching post and comments:', error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// };


module.exports = {
    createPost,
    getAllPost,
    getSinglePost,
    getAllCommentsInPost
}