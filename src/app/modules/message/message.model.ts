import { model, Schema } from 'mongoose';
import { IMessage } from './message.interface';

const messageSchema = new Schema<IMessage>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    inboxId: { type: Schema.Types.ObjectId, ref: 'Inbox', required: true },
    image: { type: String, required: false },
    video: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

export const Message = model<IMessage>('Message', messageSchema);
