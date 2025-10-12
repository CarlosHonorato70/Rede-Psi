import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';
import { useAuth } from '../context/AuthContext';

function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        fetchUserProfile();
        fetchUserPosts();
    }, [username]);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/profile/${username}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                setError('User not found');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('Failed to load profile');
        }
    };

    const fetchUserPosts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/posts/user/${username}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.ok) {
                const userPosts = await response.json();
                setPosts(userPosts);
            }
        } catch (error) {
            console.error('Error fetching user posts:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading profile...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!user) {
        return <div className="error">User not found</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img 
                    src={user.profilePicture || '/default-avatar.png'} 
                    alt={user.username}
                    className="profile-avatar"
                />
                <div className="profile-info">
                    <h1 className="profile-username">{user.username}</h1>
                    {user.isTherapist && (
                        <span className="therapist-badge">Verified Therapist</span>
                    )}
                    {user.specialization && (
                        <p className="specialization">{user.specialization}</p>
                    )}
                    {user.bio && <p className="profile-bio">{user.bio}</p>}
                    <div className="profile-stats">
                        <span>{user.followers?.length || 0} followers</span>
                        <span>{user.following?.length || 0} following</span>
                        <span>{posts.length} posts</span>
                    </div>
                </div>
            </div>

            <div className="profile-posts">
                <h3>Posts</h3>
                {posts.length === 0 ? (
                    <p>No posts yet.</p>
                ) : (
                    posts.map(post => (
                        <Post key={post._id} post={post} currentUser={currentUser} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Profile;

const API_BASE_URL = process.env.REACT_APP_API_URL || '';