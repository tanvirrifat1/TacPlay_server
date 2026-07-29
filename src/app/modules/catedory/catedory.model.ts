import { model, Schema } from 'mongoose';

const CatedoryModel = new Schema<ICatedory>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

export const Catedory = model<ICatedory>('Catedory', CatedoryModel);
