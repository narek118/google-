import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: Schema.Types.String
});

mongoose.model("User", userSchema);