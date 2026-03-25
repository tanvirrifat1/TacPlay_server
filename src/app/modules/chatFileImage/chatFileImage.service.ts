import { IChatFileImage } from './chatFileImage.interface';
import { ChatFileImage } from './chatFileImage.model';

const uploadChatFile = async (payload: IChatFileImage) => {
  const uploadFile = await ChatFileImage.create(payload);
  return uploadFile;
};

export const ChatFileImageService = {
  uploadChatFile,
};
