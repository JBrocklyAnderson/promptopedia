import { connectToDatabase } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();

        const prompts = await Prompt.find({
            createor: params.id // Grab posts from specific creator
        }).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch prompts', { status: 500 });
    }
}