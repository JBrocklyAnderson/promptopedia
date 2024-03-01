import React from 'react'; // No longer necessary for Next.js
import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden'/>
        <span className='blue_green_gradient text-center'> AI-Powered Prompts</span>
        
      </h1>
      <p className='desc text-center'>Promptopedia is an open-source AI prompting social platform for the modern professional to discover, create, and share creative prompts.</p>

    <Feed />
    </section>
  )
}

export default Home;