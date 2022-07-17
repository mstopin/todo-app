import React, { PropsWithChildren } from 'react';
import {
  Box,
  StyleProps,
} from '@chakra-ui/react';

export default function TaskBase( { children, ...props }: PropsWithChildren & StyleProps) {
  return (
    <Box py={[1.5, 3.5]} px={[3, 4]} borderRadius={8} bg="task.bg" {...props}>
      {children}
    </Box>
  )
}
