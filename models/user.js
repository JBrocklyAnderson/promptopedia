import { Schema, model, models } from 'mongoose';

// Define a user schema to store within MongoDB Atlas 
const UserSchema = new Schema({ 
    email: {
        type: String,
        unique: [true, 'Email already exists!'], // Require unique emails
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'], // Require usernames
        unique: [true, "Username already exists!"],
        match: [/^(?=.{8,35}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._\\-]+(?<![_.])$/, "Username invalid, it should 1) contain 8-35 alphanumeric letters, 2) be unique, 3) not begin or end with `.` or `_`!, and 4) not contain consecutive `.` or `_`"] // Original regex: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, Test the regex: ** /^[a-zA-Z0-9\-]{8,20}$/ ** , Allow special characters: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9~!@#$%^&*()_+=\-<>,./?{}\[\]\\|]+(?<![_.])$/
    },
    image: {
        type: String,
    }
}); 

// Create the user based on the predfined schema unless a user already exists 
const User = models.User || model('User', UserSchema);

/* With a typical Express.js backend, we could use the userSchema in the following object:

```
const User = model('User', UserSchema)
```

The `models` object is provided by the Mongoose library and stores all registered models.
If a model named `User` already exists in the `models` object, it assigns that existing model to the `User` variable.
This prevents redefining the model and ensures that the existing model is reused. 

If a model named `User` does not exist in the `models` object, the `model` function from Mongoose is called to create a new model.
The newly created model is then assigned to the `User` variable. 
*/

export default User;