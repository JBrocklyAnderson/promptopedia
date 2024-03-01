import React from 'react'; // No longer necessary for Next.js

import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

// Export metadata from `layout.jsx` as a template for all other pages
export const metadata = {
    title: 'Promptopedia',
    description: "Become a better AI prompt engineer with the help of a thriving, cutting-edge community."
}

// 

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <main className='app'>
                    <Nav />
                    {children}
                </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout;