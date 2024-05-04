'use client'
import { useState, useEffect } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
};

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<Post>({ id: 0, title: '', body: '' });
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const addPost = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      });
      if (!response.ok) throw new Error('Failed to add post');
      const data = await response.json();
      setPosts([...posts, data]);
      setNewPost({ id: 0, title: '', body: '' });
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const deletePost = async (id: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete post');
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const updatePost = async (id: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editPost)
      });
      if (!response.ok) throw new Error('Failed to update post');
      const updatedPost = await response.json();
      setPosts(posts.map(post => (post.id === id ? updatedPost : post)));
      setEditPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleEdit = (post: Post) => {
    setEditPost(post);
  };

  const handleSaveEdit = () => {
    if (editPost) {
      updatePost(editPost.id);
    }
  };

  const handleCancelEdit = () => {
    setEditPost(null);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
      <div className="mb-4">
        <input type="text" className="border p-2 mr-2 rounded" placeholder="Title" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} />
        <input type="text" className="border p-2 mr-2 rounded" placeholder="Body" value={newPost.body} onChange={e => setNewPost({ ...newPost, body: e.target.value })} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300" onClick={addPost}>Add Post</button>
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="bg-gray-100 p-4 rounded shadow-md mb-4">
            {editPost && editPost.id === post.id ? (
              <div>
                <input type="text" className="border p-2 mb-2 rounded" value={editPost.title} onChange={e => setEditPost({ ...editPost, title: e.target.value })} />
                <textarea className="border p-2 mb-2 rounded" value={editPost.body} onChange={e => setEditPost({ ...editPost, body: e.target.value })}></textarea>
                <button className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600 transition duration-300" onClick={handleSaveEdit}>Save</button>
                <button className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition duration-300" onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-800">{post.body}</p>
                <button className="bg-yellow-500 text-white px-2 py-1 rounded mt-2 mr-2 hover:bg-yellow-600 transition duration-300" onClick={() => handleEdit(post)}>Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded mt-2 hover:bg-red-600 transition duration-300" onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Posts;
