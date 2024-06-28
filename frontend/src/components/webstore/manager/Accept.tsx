import { rem, Text } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';

const AcceptManager = () => {
  return (
    <Dropzone.Accept>
      <IconUpload
        style={{
          width: rem(65),
          height: rem(65),
          color: 'var(--mantine-color-red-6)',
          margin: '10px'
        }}
        stroke={1.5}
      />
      <Text>Complete the drop to add the file!</Text>
    </Dropzone.Accept>
  );
};

export default AcceptManager;
