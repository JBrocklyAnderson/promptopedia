'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    const createPrompt = async (e) => {
        e.preventDefault(); // Prevent browser reloading on submit
        setSubmitting(true); // Set up a loading state

        try {
            const response = await fetch('/api/prompt/new', 
            {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push('/');
            } 
        } catch (error) {
            console.log(error);

        } finally {
            setSubmitting(false); // Deactivate the loading state regardless of response viability
        }
    }
    
    
    return (
        <Form
            name='Prompt'
            type='Create'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt;
