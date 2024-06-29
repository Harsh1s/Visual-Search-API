import { useState } from 'react';
import { Flex, Modal, TextInput } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { useDisclosure, useHotkeys } from '@mantine/hooks';

import FileManager from './FileManager';
import HardFilters from './HardFilters';
import { ProductType } from '../../services/combinedSearch';

type PropType = {
  setParallax: (show: boolean) => void;
  setProductsToShow: (products: ProductType[]) => void;
};

const SearchSpotlight = (props: PropType) => {
  const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);

  const [queryText, setQueryText] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<FileWithPath | null>(null);

  // Register hotkeys to open and close modal
  useHotkeys([
    ['ctrl+K', openModal],
    [
      'ctrl+L',
      () => {
        setQueryText('');
        setUploadedFile(null);
      }
    ],
    [
      'esc',
      () => {
        setQueryText('');
        setUploadedFile(null);
        closeModal();
      }
    ]
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

      <Flex align="center" justify="space-around" direction="row" p="sm">
        <FileManager currentFile={uploadedFile} setFile={setUploadedFile} />
        {(uploadedFile || queryText !== '') && (
          <HardFilters file={uploadedFile} query={queryText} {...props} closeModal={closeModal} />
        )}
      </Flex>
    </Modal>
  );
};

export default SearchSpotlight;
