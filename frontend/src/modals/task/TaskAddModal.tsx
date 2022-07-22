import React, { useState, useEffect } from 'react';
import {
  Text,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import BaseModal, { BaseModalHeader, BaseModalBody, BaseModalFooter } from '../BaseModal';

import useTasks from '../../hooks/useTasks';

interface TaskAddModalProps {
  onClose: () => void;
}

interface ModalState {
  successful?: boolean;
  error?: boolean;
}

export default function TaskAddModal({ onClose }: TaskAddModalProps) {
  const { createTask } = useTasks();

  const [modalState, setModalState] = useState<ModalState | null>(null);
  const form = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required'),
      description: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await createTask({
          content: values.name,
          description: values.description.length ? values.description : undefined,
        });
        setModalState({ successful: true });
      } catch (e: any) {
        setModalState({ error: e.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (modalState && modalState.successful) {
      onClose();
    }
  }, [modalState, onClose]);

  return (
    <BaseModal onClose={onClose}>
      <BaseModalHeader title="Add new task" />
      <BaseModalBody>
        <FormControl mb={4} isInvalid={form.touched.name && !!form.errors.name}>
          <FormLabel htmlFor="name">Task name:</FormLabel>
          <Input
            id="name"
            type="text"
            {...form.getFieldProps('name')}
          />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl mb={4} isInvalid={form.touched.description && !!form.errors.description}>
          <FormLabel htmlFor="name">Description:</FormLabel>
          <Input
            id="description"
            type="text"
            {...form.getFieldProps('description')}
          />
          <FormErrorMessage>{form.errors.description}</FormErrorMessage>
        </FormControl>
        {modalState && modalState.error && (
          <Text mt={4} color="red.500">
            {modalState.error}
          </Text>
        )}
      </BaseModalBody>
      <BaseModalFooter>
        <Flex justify="end">
          <Button flex="0 1 100px" mr={4} onClick={onClose}>
            Cancel
          </Button>
          <Button flex="0 1 100px" bg="task.bg" onClick={form.submitForm}>
            Add task
          </Button>
        </Flex>
      </BaseModalFooter>
    </BaseModal>
  );
}
