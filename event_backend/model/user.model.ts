import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: Schema.Types.ObjectId; 
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  eventsCreated?: mongoose.Types.ObjectId[];
  eventsRegistered?: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  eventsCreated: [{ type: mongoose.Types.ObjectId, ref: 'Event' }],
  eventsRegistered: [{ type: mongoose.Types.ObjectId, ref: 'Event' }],
});

export const User = mongoose.model<IUser>('User', UserSchema);
