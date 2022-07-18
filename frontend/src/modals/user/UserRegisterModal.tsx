import React, { useState, useEffect } from 'react';
import {
  Text,
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import BaseModal, { BaseModalHeader, BaseModalBody, BaseModalFooter } from '../BaseModal';

import { registerUser } from '../../api/user';

interface UserRegisterModalProps {
  onClose: () => void;
}

interface RegisterState {
  successful?: boolean;
  error?: string;
}

export default function UserRegisterModal({ onClose }: UserRegisterModalProps) {
  const [registerState, setRegisterState] = useState<RegisterState | null>();
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('Email must be valid'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long'),
    }),
    validate: (values) => {
      const errors: { repeatPassword?: string } = {};
      if (values.repeatPassword !== values.password) {
        errors.repeatPassword = 'Passwords are different'
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await registerUser({
          email: values.email,
          password: values.password,
        });
        setRegisterState({ successful: true });
      } catch (e: any) {
        setRegisterState({ error: e.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (registerState && registerState.successful) {
      onClose();
    }
  }, [registerState, onClose]);

  return (
    <BaseModal onClose={onClose}>
      <BaseModalHeader title="Register" />

      <BaseModalBody>
        <FormControl mb={4} isInvalid={form.touched.email && !!form.errors.email}>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            id="email"
            type="email"
            {...form.getFieldProps('email')}
          />
          <FormErrorMessage>{form.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl mb={4} isInvalid={form.touched.password && !!form.errors.password}>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <Input
            id="password"
            type="password"
            {...form.getFieldProps('password')}
          />
          <FormErrorMessage>{form.errors.password}</FormErrorMessage>
        </FormControl>
        <FormControl mb={4} isInvalid={form.touched.repeatPassword && !!form.errors.repeatPassword}>
          <FormLabel htmlFor="repeatPassword">Repeat password:</FormLabel>
          <Input
            id="repeatPassword"
            type="password"
            {...form.getFieldProps('repeatPassword')}
          />
          <FormErrorMessage>{form.errors.repeatPassword}</FormErrorMessage>
        </FormControl>
        {registerState && registerState.error && (
          <Text mt={4} color="red.500">
            {registerState.error}
          </Text>
        )}
      </BaseModalBody>

      <BaseModalFooter>
        <Flex justify="end">
          <Button flex="0 1 100px" mr={4} onClick={onClose}>
            Cancel
          </Button>
          <Button flex="0 1 100px" bg="task.bg" onClick={form.submitForm}>
            Register
          </Button>
        </Flex>
      </BaseModalFooter>
    </BaseModal>
  );
}
