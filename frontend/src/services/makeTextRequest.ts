import axios from 'axios';

type ResponseData = {
  images: string[];
};

const images = [
  'https://m.media-amazon.com/images/I/71Fot8BNhUL._AC_SY445_.jpg',
  'https://m.media-amazon.com/images/I/71HJuntkSXL._AC_SY445_.jpg',
  'https://m.media-amazon.com/images/I/813qJVEH5mL._AC_SY445_.jpg',
  'https://m.media-amazon.com/images/I/81MIUIz6LiL._MCnd_AC_UL320_.jpg',
  'https://m.media-amazon.com/images/I/711meGLRdCL._MCnd_AC_UL320_.jpg',
  'https://m.media-amazon.com/images/I/61zle4VaOjL._AC_SX342_.jpg',
  'https://m.media-amazon.com/images/I/81gN0UpIXPL._AC_SY445_.jpg',
  'https://m.media-amazon.com/images/I/71S9W1b1ojL._AC_SY445_.jpg'
];

export const makeTextRequest = async (
  queryText: string,
  k: number
): Promise<{
  data: ResponseData;
}> => {
  // return axios.post<ResponseData>(import.meta.env.VITE_TEXT_BACKEND_API_URL + '/postText', {
  //   searchString: queryText,
  //   k
  // });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          images: images
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            .slice(0, k)
        }
      });
    }, 2000);
  });
};
