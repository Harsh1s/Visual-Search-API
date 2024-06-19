import { Group, Text, rem, Image, Flex } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';

type PropType = {
  setFile: (file: FileWithPath) => void;
  currentFile: FileWithPath | null;
  loading: boolean;
};

export default function Drop(props: PropType) {
  const imageURL = props.currentFile ? URL.createObjectURL(props.currentFile) : '';

  return (
    <Dropzone
      loading={props.loading}
      onDrop={(files) => {
        if (files.length === 0) {
          notifications.show({
            title: 'No file uploaded',
            message: 'Please upload a file to continue!',
            color: 'red'
          });
        }

        if (files.length > 0) props.setFile(files[0]);
        if (files.length > 1) {
          notifications.show({
            title: 'Multiple files uploaded',
            message: 'Only the first one would be processed!',
            color: 'yellow'
          });
        }
      }}
      onReject={() => {
        notifications.show({
          title: 'Invalid file type',
          message: 'Please upload an image file!',
          color: 'red'
        });
      }}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      maxFiles={1}>
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Idle>
          {props.currentFile ? (
            <Flex direction="column" justify="space-around" align="center">
              <Image
                src={imageURL}
                alt="Uploaded file"
                style={{ objectFit: 'cover', maxWidth: '10rem', maxHeight: '10rem' }}
              />
              <Text size="sm" mb={2}>
                Uploaded File
              </Text>
            </Flex>
          ) : (
            <IconPhoto
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
              stroke={1.5}
            />
          )}
        </Dropzone.Idle>

        <div>
          <Text size="lg" inline>
            Drag the image file here that you want to search for!
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Please upload only one image at a time.
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
