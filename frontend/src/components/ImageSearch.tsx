import { useState } from 'react';

import { makeAPIRequest } from '../services/makeRequest';

import Drop from './Dropzones/Drop';
import { FileWithPath } from '@mantine/dropzone';
import { Button, Flex, TextInput, Loader, Select, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import ImageSearchResults from './SearchResults';

const ImageSearch = () => {
  const [kValue, setKValue] = useState<number>(5);
  const [url, setUrl] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<FileWithPath | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<{
    images: string[];
  } | null>(null);

  const handleButtonClick = async () => {
    if (url === '' && !selectedFile) {
      notifications.show({
        title: 'No input provided',
        message: 'Please upload an image or provide a URL!',
        color: 'red'
      });
      return;
    }

    notifications.show({
      title: 'Fetching results..',
      message: 'Please wait while we fetch the results!',
      color: 'yellow'
    });

    setLoading(true);

    const response = await makeAPIRequest(url, selectedFile, kValue);
    if (!response) {
      notifications.show({
        title: 'Error fetching results!',
        message: 'An error occured while fetching the results!',
        color: 'red'
      });
      setLoading(false);
      return;
    }

    setResponseData(response.data);
    notifications.show({
      title: 'Results fetched!',
      message: 'The results have been fetched successfully!',
      color: 'green'
    });
    setLoading(false);
  };

  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ height: '100vh' }}>
        <Loader size={48} />
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      justify="space-between"
      align="center"
      style={{
        width: '100%'
      }}>
      {/* Data Input */}
      <Flex
        gap="sm"
        direction="column"
        maw={800}
        align="center"
        justify="space-around"
        className="mx-auto pt-5">
        {/* K Input */}
        <Flex direction="column" gap={0} align="center" justify="space-around">
          <Text size="sm">Select the number of products you want to fetch</Text>
          <Select
            placeholder="Pick a value"
            data={['3', '4', '5', '6', '7', '8']}
            value={kValue.toString()}
            onChange={(k) => setKValue(k ? +k : 5)}
            disabled={isLoading}
            maw={200}
          />
        </Flex>

        {/* File and URL Input */}
        <Flex align="center" justify="center" gap="sm" direction="row">
          <Drop setFile={setSelectedFile} loading={isLoading} currentFile={selectedFile} />
          <Text size="lg">OR</Text>
          <Flex align="center" justify="center" gap="sm" direction="column">
            <Text size="sm">Enter the URL of the image!</Text>
            <TextInput
              placeholder="URL"
              disabled={isLoading}
              value={url}
              onChange={(event) => setUrl(event.currentTarget.value)}
            />
          </Flex>
        </Flex>

        {/* Submit Button */}
        <Button onClick={handleButtonClick}>Get Results</Button>
      </Flex>

      {/* Results */}
      <ImageSearchResults data={responseData} />
    </Flex>
  );
};

export default ImageSearch;
