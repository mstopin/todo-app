import React, { useContext, PropsWithChildren } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

import ModalContext from './ModalContext';

interface BaseModalProps {
  title: string;
  renderBody: () => React.ReactElement;
  renderFooter: (hideModal: () => void) => React.ReactElement;
}

export default function BaseModal({ title, renderBody, renderFooter }: BaseModalProps) {
  const { modal, hideModal } = useContext(ModalContext);
  
  return (
    <Modal isOpen={modal !== null} onClose={hideModal} isCentered>
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader color="text">
          {title}
        </ModalHeader>
        <ModalBody>
          {renderBody()}
        </ModalBody>
        <ModalFooter display="block">
          {renderFooter(hideModal)}
        </ModalFooter>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
}
