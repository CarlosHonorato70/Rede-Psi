import React, { useState } from 'react';

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      if (response.ok) {
        setContent('');
        onPostCreated();
      }
    } catch (error) {
      console.error('Erro ao criar post:', error);
    }
  };

  return (
    <div style={{margin: '20px', padding: '20px', border: '1px solid #ccc'}}>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="O que voc� est� pensando?"
          style={{width: '100%', height: '100px', marginBottom: '10px'}}
        />
        <button type="submit" style={{padding: '10px 20px', backgroundColor: '#6a4c93', color: 'white', border: 'none'}}>
          Publicar
        </button>
      </form>
    </div>
  );
}

export default CreatePost;

const API_BASE_URL = process.env.REACT_APP_API_URL || '';
