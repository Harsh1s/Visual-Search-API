import { FileWithPath } from '@mantine/dropzone';
import VideoDropzone from './Dropzones/VideoDropzone';
import VideoPlayer from './Dropzones/VideoPlayer';
import { useState } from 'react';
import { Flex } from '@mantine/core';

export default function VideoSearch() {
  const [currentFile, setCurrentFile] = useState<FileWithPath | null>(null);

  return (
    <Flex direction="row" justify="space-around" align="center">
      {currentFile ? (
        <VideoPlayer />
      ) : (
        <VideoDropzone currentFile={currentFile} setFile={setCurrentFile} />
      )}
    </Flex>
  );
}
