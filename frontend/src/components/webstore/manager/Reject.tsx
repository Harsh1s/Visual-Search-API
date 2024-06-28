import { rem, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';

const RejectManager = () => {
  return (
    <Dropzone.Reject>
      <IconX
        style={{
          width: rem(65),
          height: rem(65),
          color: 'var(--mantine-color-red-6)',
          margin: '10px'
        }}
        stroke={1.5}
      />
      <Text>Please add a file of valid type.</Text>
    </Dropzone.Reject>
  );
};

export default RejectManager;
