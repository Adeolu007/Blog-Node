const express = require('express')
const Post = require('../models/Post')


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

module.exports = {
    createPost
}