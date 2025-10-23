/**
 * MOCK SERVER - DEVELOPMENT ONLY
 * 
 * ⚠️ WARNING: This server is for development and testing purposes only.
 * DO NOT use this in production environments.
 * 
 * Security Considerations:
 * - No rate limiting implemented
 * - Uses in-memory storage (data not persisted)
 * - Simplified authentication
 * - No input validation beyond basic checks
 * 
 * For production, use server.js with a proper MongoDB instance and
 * implement proper security measures including:
 * - Rate limiting (express-rate-limit)
 * - Input validation and sanitization
 * - Request size limits
 * - HTTPS/TLS
 * - Production-grade authentication
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// In-memory mock database
const mockDB = {
  users: [],
  posts: [],
  nextUserId: 1,
  nextPostId: 1
};

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = mockDB.users.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Mock server is running',
    note: 'Using in-memory database - data will not persist'
  });
});

// User routes
app.post('/api/users/register', async (req, res) => {
  try {
    const { username, email, password, bio, isTherapist, specialization } = req.body;

    // Check if user exists
    const existingUser = mockDB.users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or username already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = {
      id: mockDB.nextUserId++,
      username,
      email,
      password: hashedPassword,
      bio,
      isTherapist: isTherapist || false,
      specialization: isTherapist ? specialization : undefined,
      profilePicture: '',
      followers: [],
      following: [],
      createdAt: new Date()
    };

    mockDB.users.push(user);

    const token = generateToken(user.id);
    const { password: _, ...userResponse } = user;

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = mockDB.users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    const { password: _, ...userResponse } = user;

    res.json({
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.get('/api/users/me', auth, (req, res) => {
  res.json(req.user);
});

app.get('/api/users/profile/:username', auth, (req, res) => {
  const user = mockDB.users.find(u => u.username === req.params.username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { password: _, ...userResponse } = user;
  res.json(userResponse);
});

// Post routes
app.get('/api/posts', auth, (req, res) => {
  const postsWithAuthors = mockDB.posts.map(post => {
    const author = mockDB.users.find(u => u.id === post.authorId);
    const { password: _, ...authorData } = author || {};
    return {
      ...post,
      author: authorData,
      comments: post.comments.map(comment => {
        const commentUser = mockDB.users.find(u => u.id === comment.userId);
        const { password: __, ...userData } = commentUser || {};
        return {
          ...comment,
          user: userData
        };
      })
    };
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(postsWithAuthors);
});

app.post('/api/posts', auth, (req, res) => {
  try {
    const { content, image, moodTag, tags } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Post content is required' });
    }

    const post = {
      id: mockDB.nextPostId++,
      authorId: req.user.id,
      content: content.trim(),
      image,
      moodTag,
      tags: tags || [],
      likes: [],
      comments: [],
      createdAt: new Date()
    };

    mockDB.posts.push(post);

    const author = mockDB.users.find(u => u.id === req.user.id);
    const { password: _, ...authorData } = author || {};

    res.status(201).json({
      ...post,
      author: authorData
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error creating post' });
  }
});

app.post('/api/posts/:id/like', auth, (req, res) => {
  const post = mockDB.posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const isLiked = post.likes.includes(req.user.id);
  
  if (isLiked) {
    post.likes = post.likes.filter(id => id !== req.user.id);
  } else {
    post.likes.push(req.user.id);
  }

  res.json({ liked: !isLiked, likesCount: post.likes.length });
});

app.post('/api/posts/:id/comment', auth, (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    const post = mockDB.posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = {
      id: Date.now(),
      userId: req.user.id,
      content: content.trim(),
      createdAt: new Date()
    };

    post.comments.push(comment);

    const commentUser = mockDB.users.find(u => u.id === req.user.id);
    const { password: _, ...userData } = commentUser || {};

    res.status(201).json({
      ...comment,
      user: userData
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error adding comment' });
  }
});

app.delete('/api/posts/:id', auth, (req, res) => {
  const postIndex = mockDB.posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const post = mockDB.posts[postIndex];
  if (post.authorId !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized to delete this post' });
  }

  mockDB.posts.splice(postIndex, 1);
  res.json({ message: 'Post deleted successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 Mock Server Started Successfully!');
  console.log('='.repeat(60));
  console.log(`📍 Server running on: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log('');
  console.log('⚠️  Note: Using in-memory database');
  console.log('   Data will not persist after server restart');
  console.log('');
  console.log('📚 API Endpoints:');
  console.log(`   POST http://localhost:${PORT}/api/users/register`);
  console.log(`   POST http://localhost:${PORT}/api/users/login`);
  console.log(`   GET  http://localhost:${PORT}/api/posts`);
  console.log(`   POST http://localhost:${PORT}/api/posts`);
  console.log('='.repeat(60));
});
