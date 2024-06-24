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

  if (fileContent || imageFile) {
    // const imgBase64 = fileContent.replace(/^data:image\/[a-z]+;base64,/, '');
    // return axios.post<ResponseData>(import.meta.env.VITE_BACKEND_API_URL + '/postImage', {
    //   base64img: imgBase64,
    //   k
    // });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            images: [
              'https://m.media-amazon.com/images/I/512WTE69iuL._AC_SX342_.jpg',
              'https://m.media-amazon.com/images/I/81-tEKRkNlL._AC_SX342_.jpg',
              'https://m.media-amazon.com/images/I/716r02fA7DL._AC_SX342_.jpg',
              'https://m.media-amazon.com/images/I/61pa3kh30PL._AC_SY445_.jpg',
              'https://m.media-amazon.com/images/I/51Xkme6x34L._AC_UL320_.jpg',
              'https://m.media-amazon.com/images/I/51QZxiYrXaL._AC_UL320_.jpg',
              'https://m.media-amazon.com/images/I/51uCdvvXriL._AC_SY445_.jpg'
            ]
              .map((value) => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)
              .slice(0, k)
          }
        });
      }, 2000);
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
