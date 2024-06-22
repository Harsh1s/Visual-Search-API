import { useState } from 'react';

import { Flex, Loader } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';

import VideoPlayer from './Dropzones/VideoPlayer';
import VideoDropzone from './Dropzones/VideoDropzone';
import { useQuery } from '@tanstack/react-query';
import { makeAPIRequest } from '../services/makeRequest';
import ImageSearchResults from './SearchResults';

export default function VideoSearch() {
  const [currentFile, setCurrentFile] = useState<FileWithPath | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const { isLoading, data: responseData } = useQuery({
    queryKey: ['videoSearch', imageData],
    queryFn: () => makeAPIRequest('', null, 6, imageData)
  });

  console.log(isLoading, responseData?.data);
  return (
    <Flex direction="column">
      <Flex direction="row" justify="space-around" align="center">
        {currentFile ? (
          <VideoPlayer file={currentFile} setFile={setCurrentFile} setImageData={setImageData} />
        ) : (
          <VideoDropzone currentFile={currentFile} setFile={setCurrentFile} />
        )}
      </Flex>
      <Flex justify="space-around" align="center">
        {isLoading && <Loader size={24} />}
        <ImageSearchResults data={responseData?.data} />
      </Flex>
    </Flex>
  );
}
