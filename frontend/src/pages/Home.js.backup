import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import { useAuth } from '../context/AuthContext';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                setError('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading posts...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="home">
            <h1>Mental Health Social Network</h1>
            {currentUser ? (
                <div className="posts-container">
                    {posts.length === 0 ? (
                        <p>No posts yet. Be the first to share something!</p>
                    ) : (
                        posts.map(post => (
                            <Post key={post._id} post={post} currentUser={currentUser} />
                        ))
                    )}
                </div>
            ) : (
                <div className="welcome-message">
                    <h2>Welcome to Rede Psi</h2>
                    <p>Connect with others and share your mental health journey.</p>
                    <p>Please log in or register to see posts and interact with the community.</p>
                </div>
            )}
        </div>
    );
}

export default Home;