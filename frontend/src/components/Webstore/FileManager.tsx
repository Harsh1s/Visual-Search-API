import clsx from 'clsx';
import { Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Dropzone, FileWithPath, MIME_TYPES, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import IdleManager from './manager/Idle';
import RejectManager from './manager/Reject';
import AcceptManager from './manager/Accept';

type PropType = {
  setFile: (file: FileWithPath) => void;
  currentFile: FileWithPath | null;
};

export default function FileManager(props: PropType) {
  return (
    <Dropzone
      className={clsx('my-4 max-w-sm', {
        'border-2 w-full mx-auto': !props.currentFile,
        'border-2 w-1/2': props.currentFile
      })}
      onDrop={(files) => {
        props.setFile(files[0]);
        notifications.show({
          title: 'File uploaded!',
          message: 'The file has been uploaded successfully!',
          color: 'green'
        });
      }}
      onReject={() => {
        notifications.show({
          title: 'Invalid file type',
          message: 'Please upload a video file!',
          color: 'red'
        });
      }}
      maxSize={5 * 1024 ** 2}
      accept={[MIME_TYPES.mp4, MIME_TYPES.heic, ...IMAGE_MIME_TYPE]}
      maxFiles={1}>
      <Flex align="center" justify="space-around" className="my-auto">
        <IdleManager file={props.currentFile} />
        <RejectManager />
        <AcceptManager />
      </Flex>
    </Dropzone>
  );
}
