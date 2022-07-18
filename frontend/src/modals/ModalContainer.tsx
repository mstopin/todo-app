import React, { useContext, useState } from 'react';

import ModalContext, { Modal } from './ModalContext';

import UserLoginModal from './user/UserLoginModal';
import UserRegisterModal from './user/UserRegisterModal';

import TaskAddModal from './task/TaskAddModal';

export default function ModalContainer() {
  const { modal, hideModal } = useContext(ModalContext);

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
