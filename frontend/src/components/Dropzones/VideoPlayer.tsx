import { useRef } from 'react';
import ReactPlayer from 'react-player';
import { FileWithPath } from '@mantine/dropzone';
import { Button, Container, Flex } from '@mantine/core';

type PropType = {
  file: FileWithPath;
  setFile: (file: FileWithPath | null) => void;
  setImageData: (data: string | null) => void;
};

const VideoPlayer = ({ file, setFile, setImageData }: PropType) => {
  const fileURL = URL.createObjectURL(file);

  const playerRef = useRef<ReactPlayer | null>(null);

  const handleScreenshot = () => {
    if (playerRef.current) {
      const canvas = document.createElement('canvas');
      const video = playerRef.current.getInternalPlayer();
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Cannot get a 2D Context');

      // @ts-ignore
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL('image/png');
      setImageData(image);
    }
  };

  return (
    <Container p="sm" m="sm">
      <Flex direction="row">
        <ReactPlayer ref={playerRef} url={fileURL} controls width="80%" height="auto" />
        <Flex direction="column" w={300} justify="space-around" align="center" gap="md" p="lg">
          <Button onClick={handleScreenshot} w={200} color="teal">
            Search
          </Button>
          <Button onClick={() => setFile(null)} w={200}>
            Clear Video
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default VideoPlayer;
