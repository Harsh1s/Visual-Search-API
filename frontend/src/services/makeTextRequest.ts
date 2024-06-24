import axios from 'axios';

type ResponseData = {
  images: string[];
};

export const makeTextRequest = async (queryText: string, k: number) => {
  return axios.post<ResponseData>(import.meta.env.VITE_TEXT_BACKEND_API_URL + '/postText', {
    searchString: queryText,
    k
  });
};
