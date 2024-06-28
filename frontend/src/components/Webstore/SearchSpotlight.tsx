import { useState } from 'react';
import { Flex, Modal, TextInput } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { useDisclosure, useHotkeys } from '@mantine/hooks';

import FileManager from './FileManager';
import HardFilters from './HardFilters';

const SearchSpotlight = () => {
  const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);

  const [queryText, setQueryText] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<FileWithPath | null>(null);

  // Register hotkeys to open and close modal
  useHotkeys([
    ['ctrl+K', openModal],
    ['esc', closeModal]
  ]);

  return (
    <Modal
      opened={isModalOpen}
      onClose={closeModal}
      title="Amazon Search Redefined"
      centered
      size="auto"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3
      }}
      withCloseButton>
      <TextInput
        value={queryText}
        onChange={(event) => setQueryText(event.currentTarget.value)}
        placeholder="What are you looking for today?"
      />

      <Flex align="center" justify="space-around" direction="row" p="xs">
        <FileManager currentFile={uploadedFile} setFile={setUploadedFile} />
        {(uploadedFile || queryText !== '') && <HardFilters />}
      </Flex>
    </Modal>
  );
};

export default SearchSpotlight;
