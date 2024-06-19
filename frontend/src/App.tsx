import { useState } from 'react';

import { makeAPIRequest } from './services/makeRequest';
import { useQuery } from '@tanstack/react-query';

import Drop from './components/Drop';
import { FileWithPath } from '@mantine/dropzone';
import { Button, Flex, Grid, Input, Loader, Select, Text, Image } from '@mantine/core';
import { notifications } from '@mantine/notifications';

const App = () => {
  const [kValue, setKValue] = useState<number>(5);
  const [url, setUrl] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<FileWithPath | null>(null);

  const {
    isError,
    data: responseData,
    isLoading,
    refetch: refetchData
  } = useQuery<string[]>({
    queryKey: ['imageSearch', url, selectedFile, kValue],
    queryFn: async () => {
      const request = await makeAPIRequest(url, selectedFile, kValue);
      if (!request) return null;
      return JSON.parse(request.toString()).images;
    },
    enabled: false
  });

  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ height: '100vh' }}>
        <Loader size={48} />
      </Flex>
    );
  }

  if (isError) {
    notifications.show({
      title: 'Error fetching results',
      message: 'Please try again later!',
      color: 'red'
    });
  }

  return (
    <Flex
      direction="row"
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
            <Input
              placeholder="URL"
              disabled={isLoading}
              value={url}
              onChange={(event) => setUrl(event.currentTarget.value)}
            />
          </Flex>
        </Flex>

        {/* Submit Button */}
        <Button
          onClick={() => {
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
            refetchData();
          }}>
          Get Results
        </Button>
      </Flex>

      <Grid columns={3}>
        {responseData?.map((imageURL, index) => (
          <Grid.Col span={1} key={index}>
            <Image
              src={imageURL}
              alt={`Result ${index + 1}`}
              style={{
                objectFit: 'cover',
                maxWidth: '20rem',
                maxHeight: '20rem'
              }}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Flex>
  );
};

export default App;
