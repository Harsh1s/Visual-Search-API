import { Group, Text, rem } from '@mantine/core';
import { IconVideo } from '@tabler/icons-react';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';

type PropType = {
  setFile: (file: FileWithPath) => void;
  currentFile: FileWithPath | null;
};

export default function VedioDropzone(props: PropType) {
  return (
    <Dropzone
      style={{
        width: '80%',
        marginTop: '10px'
      }}
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
          message: 'Please upload a video file!',
          color: 'red'
        });
      }}
      maxSize={5 * 1024 ** 2}
      accept={[MIME_TYPES.mp4, MIME_TYPES.heic]}
      maxFiles={1}>
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Idle>
          <IconVideo
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="lg" inline>
            Drag the video file here that you want to search from!
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Please upload only one video at a time.
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
