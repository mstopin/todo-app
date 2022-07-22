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

import useUser from '../../hooks/useUser';

interface UserLoginModalProps {
  onClose: () => void;
}

interface LoginState {
  successful?: boolean;
  error?: string;
}

export default function UserLoginModal({ onClose }: UserLoginModalProps) {
  const user = useUser();

  const [loginState, setLoginState] = useState<LoginState | null>(null);

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('Email must be valid'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await user.logIn(values.email, values.password);
        setLoginState({ successful: true });
      } catch (e: any) {
        setLoginState({ error: e.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (loginState && loginState.successful) {
      onClose();
    }
  }, [loginState, onClose]);

  return (
    <BaseModal onClose={onClose}>
      <BaseModalHeader title="Login" />

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
        {loginState && loginState.error && (
          <Text mt={4} color="red.500">
            {loginState.error}
          </Text>
        )}
      </BaseModalBody>

      <BaseModalFooter>
        <Flex justify="end">
          <Button flex="0 1 100px" mr={4} onClick={onClose}>
            Cancel
          </Button>
          <Button flex="0 1 100px" bg="task.bg" onClick={form.submitForm}>
            Login
          </Button>
        </Flex>
      </BaseModalFooter>
    </BaseModal>
  )
}
