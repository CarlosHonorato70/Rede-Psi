const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();

// Middleware para verificar token
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Get all posts
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username profilePicture isTherapist specialization')
            .populate('comments.user', 'username')
            .sort({ createdAt: -1 })
            .limit(50);

        res.json(posts);
    } catch (error) {
        console.error('Get posts error:', error);
        res.status(500).json({ message: 'Server error fetching posts' });
    }
});

// Get posts by user
router.get('/user/:username', auth, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const posts = await Post.find({ author: user._id })
            .populate('author', 'username profilePicture isTherapist specialization')
            .populate('comments.user', 'username')
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        console.error('Get user posts error:', error);
        res.status(500).json({ message: 'Server error fetching user posts' });
    }
});

// Create a new post
router.post('/', auth, async (req, res) => {
    try {
        const { content, image, moodTag, tags } = req.body;

        if (!content || content.trim().length === 0) {
            return res.status(400).json({ message: 'Post content is required' });
        }

        const post = new Post({
            author: req.user._id,
            content: content.trim(),
            image,
            moodTag,
            tags
        });

        await post.save();
        
        // Populate author info for response
        await post.populate('author', 'username profilePicture isTherapist specialization');

        res.status(201).json(post);
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({ message: 'Server error creating post' });
    }
});

// Like/Unlike a post
router.post('/:id/like', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const isLiked = post.likes.includes(req.user._id);
        
        if (isLiked) {
            // Unlike
            post.likes = post.likes.filter(like => !like.equals(req.user._id));
        } else {
            // Like
            post.likes.push(req.user._id);
        }

        await post.save();
        res.json({ liked: !isLiked, likesCount: post.likes.length });
    } catch (error) {
        console.error('Like post error:', error);
        res.status(500).json({ message: 'Server error liking post' });
    }
});

// Add comment to post
router.post('/:id/comment', auth, async (req, res) => {
    try {
        const { content } = req.body;
        
        if (!content || content.trim().length === 0) {
            return res.status(400).json({ message: 'Comment content is required' });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = {
            user: req.user._id,
            content: content.trim(),
            createdAt: new Date()
        };

        post.comments.push(comment);
        await post.save();
        
        // Populate the new comment with user info
        await post.populate('comments.user', 'username');

        const newComment = post.comments[post.comments.length - 1];
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Add comment error:', error);
        res.status(500).json({ message: 'Server error adding comment' });
    }
});

// Delete a post
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user owns the post
        if (!post.author.equals(req.user._id)) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Delete post error:', error);
        res.status(500).json({ message: 'Server error deleting post' });
    }
});

module.exports = router;