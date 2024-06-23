import axios from 'axios';
import { FileWithPath } from '@mantine/dropzone';

type ResponseData = {
  images: string[];
};

export const makeAPIRequest = async (
  url: string,
  imageFile: FileWithPath | null,
  k: number,
  fileContent: string | null = null
) => {
  if (url != '') {
    return axios.post<ResponseData>(import.meta.env.VITE_BACKEND_API_URL + '/postURL', {
      url,
      k
    });
  }

  if (fileContent) {
    const imgBase64 = fileContent.replace(/^data:image\/[a-z]+;base64,/, '');
    return axios.post<ResponseData>(import.meta.env.VITE_BACKEND_API_URL + '/postImage', {
      base64img: imgBase64,
      k
    });
  }

  if (imageFile) {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    const imgBase64 = await new Promise<string>((resolve) => {
      reader.onload = () => {
        resolve(reader.result?.toString().replace(/^data:image\/[a-z]+;base64,/, '')!);
      };
    });

    return axios.post<ResponseData>(import.meta.env.VITE_BACKEND_API_URL + '/postImage', {
      base64img: imgBase64,
      k
    });
  }

  return null;
};
