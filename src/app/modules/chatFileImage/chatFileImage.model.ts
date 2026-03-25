import { model, Schema } from 'mongoose';
import { IChatFileImage } from './chatFileImage.interface';

const chatFileImageSchema = new Schema<IChatFileImage>(
  {
    image: {
      type: String,
      required: false,
    },
    video: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const ChatFileImage = model<IChatFileImage>(
  'ChatFileImage',
  chatFileImageSchema,
);
