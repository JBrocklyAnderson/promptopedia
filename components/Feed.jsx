'use client';

import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

// Define a list of prompt cards here because such a function is unecessary elsewhere as it's own component 
const PromptCardList = ({ data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [ posts, setPosts ] = useState([]);

  // Create hooks for search states
  const [ searchText, setSearchText] = useState('');
  const [ searchTimeout, setSearchTimeout] = useState(null); // Use a timeout to prevent calling the API endpoint with every keystroke 
  const [ searchResults, setSearchResults ] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, []);

  const searchPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i') // Allow case insensitivity for search queries with 'i' flag
    return posts.filter((post) => 
      regex.test(post.creator.username) ||
      regex.test(post.tag) ||
      regex.test(post.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)

    setSearchText(e.target.value);

    // Create a debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = searchPrompts(e.target.value);
        setSearchResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = searchPrompts(tagName);
    setSearchResults(searchResult);
  };

  return (
    <section className='feed'>
      <form name='search_bar' className='relative w-full flex-center'>
        <input 
          type='text'
          name='search_bar'
          placeholder='Search for prompts, tags, or users'
          value={searchText} 
          onChange={handleSearchChange}
          required
          className='search_input peer' 
        />
      </form>
      

      {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList 
          data={posts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed;