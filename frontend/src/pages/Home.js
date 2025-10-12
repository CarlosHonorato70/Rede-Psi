import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';

function Home() {

		const { currentUser } = useAuth();
		const [posts, setPosts] = useState([]);
		const [loading, setLoading] = useState(false);
		const [error, setError] = useState(null);

		const fetchPosts = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(`${API_BASE_URL}/api/posts`, {
					headers: {
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				});
				if (response.ok) {
					const data = await response.json();
					setPosts(Array.isArray(data) ? data : []);
				} else {
					setError('Erro ao carregar posts');
					setPosts([]);
				}
			} catch (err) {
				setError('Erro ao carregar posts');
				setPosts([]);
			} finally {
				setLoading(false);
			}
		};

		useEffect(() => {
			if (currentUser) {
				fetchPosts();
			} else {
				setPosts([]);
				setLoading(false);
				setError(null);
			}
		}, [currentUser]);

		return (
			<div className="home-page">
				<h1>Rede Psi</h1>
				{currentUser && <CreatePost onPostCreated={fetchPosts} />}
				{loading && <div>Carregando posts...</div>}
				{error && <div style={{color: 'red'}}>{error}</div>}
				{!loading && !error && posts.length === 0 && currentUser && (
					<div>Nenhum post encontrado.</div>
				)}
				<div>
					{!loading && !error && posts.map(post => (
						<Post key={post._id} post={post} currentUser={currentUser} />
					))}
				</div>
				{!currentUser && <div style={{marginTop: 40}}>Faça login para ver e criar posts.</div>}
			</div>
		);
	}

export default Home;

const API_BASE_URL = process.env.REACT_APP_API_URL || '';
