import ReactPlayer from 'react-player';
import { Flex, rem, Text, Image } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconVideo } from '@tabler/icons-react';

type propTypes = {
  file: null | FileWithPath;
};

const DefaultContent = () => {
  return (
    <Dropzone.Idle>
      <Flex direction="row" align="center" justify="space-around">
        <IconVideo
          style={{
            width: rem(65),
            height: rem(65),
            color: 'var(--mantine-color-dimmed)',
            margin: '10px'
          }}
          stroke={1.5}
        />
        <IconPhoto
          style={{
            width: rem(65),
            height: rem(65),
            color: 'var(--mantine-color-dimmed)',
            margin: '10px'
          }}
          stroke={1.5}
        />
        <Text size="md" inline p="sm">
          Drag or upload any video or image file here that you want to search from!
        </Text>
      </Flex>
    </Dropzone.Idle>
  );
};

const IdleManager = (props: propTypes) => {
  // If no file is uploaded, show the default content
  if (!props.file) return <DefaultContent />;

  // If image is uploaded, show the image
  if (props.file.type.includes('image')) {
    return (
      <Dropzone.Idle>
        <Flex direction="column" align="center" justify="space-evenly">
          <Image
            src={URL.createObjectURL(props.file)}
            alt="Uploaded file"
            style={{
              objectFit: 'cover',
              width: 'auto',
              height: '100%',
              borderRadius: '10px'
            }}
          />
          <Text size="xs">Click here again to upload another image...</Text>
        </Flex>
      </Dropzone.Idle>
    );
  }

  // If video is uploaded, show the video player
  if (props.file.type.includes('video')) {
    return (
      <Dropzone.Idle>
        <Flex direction="column" align="center" justify="space-evenly">
          <ReactPlayer
            url={URL.createObjectURL(props.file)}
            width="auto"
            height="100%"
            playing
            loop
          />
          <Text size="xs">Click here again to upload another video...</Text>
        </Flex>
      </Dropzone.Idle>
    );
  }

  return (
    <Dropzone.Idle>
      <Text size="md" inline p="sm">
        The uploaded file type is not supported! Please upload another.
      </Text>
    </Dropzone.Idle>
  );
};

export default IdleManager;
