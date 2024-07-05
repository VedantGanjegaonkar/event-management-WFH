import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  createdBy: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

export const Event = mongoose.model<IEvent>('Event', EventSchema);
