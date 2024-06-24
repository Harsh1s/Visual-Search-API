import { useState } from 'react';

import { Button, Flex, TextInput, Loader, Select, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import ImageSearchResults from './SearchResults';

import { makeTextRequest } from '../services/makeTextRequest';

const TextSearch = () => {
  const [kValue, setKValue] = useState<number>(5);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [queryText, setQueryText] = useState<string>('');
  const [responseData, setResponseData] = useState<{
    images: string[];
  } | null>(null);

  const handleButtonClick = async () => {
    if (queryText === '') {
      notifications.show({
        title: 'No input provided',
        message: 'Please provide some text to query!',
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

    const response = await makeTextRequest(queryText, kValue);
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
        <Flex align="center" justify="center" gap="sm" direction="column">
          <Text size="sm">Query Text</Text>
          <TextInput
            placeholder="Enter the text you want to search by"
            disabled={isLoading}
            value={queryText}
            onChange={(event) => setQueryText(event.currentTarget.value)}
            w={450}
          />
        </Flex>

        {/* Submit Button */}
        <Button onClick={handleButtonClick}>Get Results</Button>
      </Flex>

      {/* Results */}
      <ImageSearchResults data={responseData} />
    </Flex>
  );
};

export default TextSearch;
