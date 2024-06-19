import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';

type PropType = {
  setFile: (file: FileWithPath) => void;
  loading: boolean;
};

export default function Drop(props: PropType) {
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
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
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
