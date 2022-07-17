import React, { useContext, useState } from 'react';

import ModalContext, { Modal } from './ModalContext';

import UserLoginModal from './user/UserLoginModal';
import UserRegisterModal from './user/UserRegisterModal';

const getModalComponentFromKey: (modalKey: Modal | null) => React.ReactElement | null = (modalKey) => {
  if (modalKey === Modal.USER_LOGIN) return (<UserLoginModal />);
  if (modalKey === Modal.USER_REGISTER) return (<UserRegisterModal />);
  return null;
}

export default function ModalContainer() {
  const { modal } = useContext(ModalContext);

  return getModalComponentFromKey(modal);
}
