'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession(); // Grab session data
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState('');

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push('/profile'); // Send the user to their own profile if they are the posts' author
    
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`); // 
  }

  const handleCopy = () => {
    setCopied(post.prompt); // Update the state of what's been copied
    navigator.clipboard.writeText(post.prompt); // Pass the prompt to the clipboard
    setTimeout(() => setCopied(''), 3000); // Set what's been "copied" back to an empty string so that other prompts are accessible
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' onClick={handleProfileClick}>
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-navy'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image 
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt='copied_check'
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-navy'>
        {post.prompt}
      </p>
      <p className='font-inter text-sm text-plasma cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>

      {/* Check to see whether the currently logged in user is the creator of the post and if they are on the profile page */}
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className='font-inter text-sm text-swamp green_gradient cursor-pointer' onClick={handleEdit}>Edit</p>
          <p className='font-inter text-sm text-garnet cursor-pointer' onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  )
}

export default PromptCard;