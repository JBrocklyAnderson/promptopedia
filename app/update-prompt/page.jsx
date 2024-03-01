'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if (promptId) getPromptDetails();
    }, [promptId]) // Use effect every time the prompt ID changes
    

    const updatePrompt = async (e) => {
        e.preventDefault(); // Prevent browser reloading on submit
        setSubmitting(true); // Set up a loading state

        if (!promptId) return alert('Prompt ID not found')

        try {
            const response = await fetch(`/api/prompt/${promptId}`, 
            {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
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
            name='Update'
            type='Update'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt;
