import axios from 'axios';
import Config from '../config/config.json';
import { FileWithPath } from '@mantine/dropzone';

type ResponseData = {
  images: string[];
};

export const makeAPIRequest = async (url: string, imageFile: FileWithPath | null, k: number) => {
  if (url != '') {
    return axios.post<ResponseData>(Config.apiEndpoint + '/postImage', { url, k });
  }

  if (imageFile) {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    const imgBase64 = await new Promise<string>((resolve) => {
      reader.onload = () => {
        resolve(reader.result?.toString().replace(/^data:image\/[a-z]+;base64,/, '')!);
      };
    });

    return axios.post<ResponseData>(Config.apiEndpoint + '/postImage', { base64img: imgBase64, k });
  }

  return null;
};
