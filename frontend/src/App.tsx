import { FileWithPath } from '@mantine/dropzone';
// @ts-expect-error - Ignore the type errors for JS file
import Config from './config';
import { Amplify, API } from 'aws-amplify';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'ImageSearch',
        endpoint: Config.apiEndpoint
      }
    ]
  }
});

const makeAPIRequest = async (
  url: string | undefined,
  imageFile: FileWithPath | undefined,
  k: number
) => {
  if (url) {
    return await API.post('ImageSearch', 'postURL', {
      body: { url, k }
    });
  }

  if (imageFile) {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async () => {
      const imgBase64 = reader.result?.toString().replace(/^data:image\/[a-z]+;base64,/, '');
      return await API.post('ImageSearch', 'postImage', {
        base64img: imgBase64,
        k
      });
    };
  }

  return null;
};

const App = () => {
  return (
    <div>
      <h1>Image Search</h1>
    </div>
  );
};

export default App;
