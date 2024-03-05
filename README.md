# Promptopedia
Promptopedia is a social platform dedicate to sharing unique and powerful prompts designed engage with large language models in an effort to build robust creative professionals. Built with Next.js 14 and leveraging the new App Router, it provides a seamless experience for users to interact with a global community. The project is deployed live on [Vercel](https://vercel-link).

## Features

- **Google Authentication**: Securely sign in with your Google account.
- **Prompt Management**: Create, edit, and delete your prompts.
- **Tagging System**: Organize prompts with subject matter tags.
- **Community Interaction**: View, copy, and like prompts from other members.
- **Responsive Design**: Accessible across various devices and screen sizes.
- **Real-time Updates**: Immediate feedback on user interactions.

## Tech Stack

- **Next.js 14**: Utilizing the latest features of Next.js including the App Router for a file-system-based route mapping and server-side rendering.
- **MongoDB Atlas**: My database of choice, providing a scalable and reliable cloud-based solution.
- **Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment.
- **Google Authentication**: Implementing secure OAuth sign-in processes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:

- Node.js
- Next.js 14 or higher
- npm or Yarn
- A MongoDB Atlas account

### Installing

A step by step series of examples that tell you how to get a development environment running:

``` bash
# Clone the repository
git clone https://jbrocklyanderson.github.io/promptopedia

# Navigate to the project directory
cd promptopedia

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment
Before running the application, be sure to set up your environment variables

``` env
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGODB_URI=your-mongodb-atlas-uri
```

### License
This project is licensed under the MIT license — see the accompanying file for details.

### Acknowledgements
Extraordinary credit goes to JavaScript Mastery for offering the scaffolding of this project as a tutorial to help fresh web developers explore new technology and programming tools.

