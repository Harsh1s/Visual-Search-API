import { FileWithPath } from '@mantine/dropzone';
import { post } from 'aws-amplify/api';

export const makeAPIRequest = (url: string, imageFile: FileWithPath | null, k: number) => {
  if (url != '') {
    return post({
      apiName: 'ImageSearch',
      path: '/postURL',
      options: {
        body: { url, k }
      }
    }).response.then((res) => res.body.json());
  }

  if (imageFile) {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async () => {
      const imgBase64 = reader.result?.toString().replace(/^data:image\/[a-z]+;base64,/, '')!;
      return post({
        apiName: 'ImageSearch',
        path: '/postImage',
        options: {
          body: { base64img: imgBase64, k }
        }
      }).response.then((res) => res.body.json());
    };
  }

  return null;
};
