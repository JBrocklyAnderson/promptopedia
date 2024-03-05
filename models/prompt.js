import { Schema, model, models } from "mongoose";

// Create a new prompt schema that includes the creator's user ID, the prompt text, the tag given to the prompt, the number of likes the prompt has, and the users who've liked the prompt
const PromptSchema = new Schema ({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    likers: [{
        type: Schema.Types.ObjectId, 
        ref: 'User',
    }], 
});

const Prompt = models.Prompt || model('Prompt', PromptSchema); // Store a prompt model in the models object if it doesn't already exist in the database

export default Prompt;