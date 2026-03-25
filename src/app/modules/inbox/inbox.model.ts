import { model, Schema } from 'mongoose';
import { IInbox } from './inbox.interface';

const inboxSchema = new Schema<IInbox>(
  {
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    unreadCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const Inbox = model<IInbox>('Inbox', inboxSchema);
