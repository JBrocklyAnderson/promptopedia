import { connectToDatabase } from "@utils/database";
import Prompt from '@models/prompt';

// GET (read) 
export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response('Prompt not found', { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch prompts', { status: 500 });
    }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
    try {
        await connectToDatabase();

        // Destructure the request
        const { prompt, tag, userId, action } = await request.json();

        // Find the prompt
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response('Prompt not found', { status: 400 });

        // Update the prompt and tag
        if (prompt) existingPrompt.prompt = prompt;
        if (tag) existingPrompt.tag = tag;

        if (action && userId) {
            const isLiker = existingPrompt.likers.includes(userId);
            if (action === 'like' && !isLiker) {
                // Add the user to the `likers` array and increment the like count
                existingPrompt.likers.push(userId);
                existingPrompt.likeCount += 1;
            } else if (action === 'unlike' && isLiker) {
                // Remove the user from the likers array and decrement the count
                existingPrompt.likers = existingPrompt.likers.pull(userId);
                existingPrompt.likeCount -= 1;
            }
        }

        // Save the prompt
        await existingPrompt.save();

        // Construct a response object with the updated fields
        const responsePayload = {
            prompt: existingPrompt.prompt,
            tag: existingPrompt.tag,
            likeCount: existingPrompt.likeCount,
            liked: action ? action === 'like' : null,
        }

        return new Response(JSON.stringify(responsePayload), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response('Failed to update prompt', { status: 500});
    }
};

// DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDatabase;

        await Prompt.findByIdAndDelete(params.id);
        console.log(params.id);

        return new Response('Prompt deleted successfully', { status: 200 });
    } catch (error) {
        return new Response('Failed to delete prompt', { status: 500 })
    }
};