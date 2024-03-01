'use client'; // Use client component because session provider requires the browser's capabilities

import React from 'react';
import { SessionProvider } from 'next-auth/react';

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider;