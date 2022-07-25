import React from 'react';

import useModals, { Modal } from '../hooks/useModals';

import UserLoginModal from './user/UserLoginModal';
import UserRegisterModal from './user/UserRegisterModal';
import TaskAddModal from './task/TaskAddModal';

export default function ModalContainer() {
  const { modal, hideModal } = useModals();

  switch(modal) {
    case Modal.USER_LOGIN:
      return (<UserLoginModal onClose={hideModal} />);
    case Modal.USER_REGISTER:
      return (<UserRegisterModal onClose={hideModal} />);
    case Modal.TASK_ADD:
      return (<TaskAddModal onClose={hideModal} />);
  }

  return null;
}
