'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession(); // Grab session data
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`); // Fetch data from a dynamic URL
            const data = await response.json(); // Render the response in JSON format
    
            setPosts(data);
        }
    
        if (session?.user.id) fetchPosts();
    }, [])

    const handleEdit = (post) => {
        router.push(`update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt? This will remove it from your profile and the feed forever.');

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log('Deletion successful:', post);

                    const filteredPosts = posts.filter((p) => p._id !== post._id);
                    setPosts(filteredPosts);
                }
                

                
            } catch (error) {
                console.log('Error during deletion:', error)
            }
        }
    }

    return (
        <Profile 
            name='My'
            desc='Welcome to your personalized profile page'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile;