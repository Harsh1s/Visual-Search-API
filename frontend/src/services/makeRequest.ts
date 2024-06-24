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
    // const reader = new FileReader();
    // reader.readAsDataURL(imageFile);
    // const imgBase64 = await new Promise<string>((resolve) => {
    //   reader.onload = () => {
    //     resolve(reader.result?.toString().replace(/^data:image\/[a-z]+;base64,/, '')!);
    //   };
    // });

    // return axios.post<ResponseData>(import.meta.env.VITE_BACKEND_API_URL + '/postImage', {
    //   base64img: imgBase64,
    //   k
    // });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            images: [
              'https://m.media-amazon.com/images/I/61WkoW-zDSL._SY550_.jpg',
              'https://m.media-amazon.com/images/I/61FEpKTUAIL._SY741_.jpg',
              'https://m.media-amazon.com/images/I/41f19rm8-LL._SX522_.jpg',
              'https://m.media-amazon.com/images/I/51rc1bXe6wL._SX679_.jpg',
              'https://m.media-amazon.com/images/I/61sx8iVBhCL._AC_UL320_.jpg'
            ].slice(0, k)
          }
        });
      }, 2000);
    });
  }

  return null;
};
