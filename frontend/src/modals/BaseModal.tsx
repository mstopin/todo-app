import React, { PropsWithChildren } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

interface BaseModalHeaderProps {
  title: string;
}

interface BaseModalProps {
  onClose: () => void;
}

export function BaseModalHeader({ title }: BaseModalHeaderProps) {
  return (
    <ModalHeader color="text">
      {title}
    </ModalHeader>
  )
}

export function BaseModalBody({ children }: PropsWithChildren) {
  return (
    <ModalBody>
      {children}
    </ModalBody>
  );
}

export function BaseModalFooter({ children }: PropsWithChildren) {
  return (
    <ModalFooter display="block">
      {children}
    </ModalFooter>
  );
}

export default function BaseModal({ onClose, children }: PropsWithChildren<BaseModalProps>) {  
  return (
    <Modal onClose={onClose} isOpen isCentered>
      <ModalOverlay />
      <ModalContent mx={4}>
        {children}
      </ModalContent>
    </Modal>
  );
}
