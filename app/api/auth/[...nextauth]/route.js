import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user';
import { connectToDatabase } from '@utils/database';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            });
    
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDatabase();
                console.log('DB connected');
    
                // Check if user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });
                console.log('User exists:', userExists);
    
                // If not, create new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture
                    });
                    console.log('New user created:', User)
                }
    
                // Once successful
                return true;
            } catch (error) {
                console.log('SignIn error:', error);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };