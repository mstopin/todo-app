import {
  createContext,
  PropsWithChildren,
  useState,
} from 'react';

export enum Modal {
  USER_LOGIN,
  USER_REGISTER,
};

interface ModalContextProps {
  modal: Modal | null;
  showModal: (modal: Modal) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextProps>({
  modal: null,
  showModal: () => undefined,
  hideModal: () => undefined,
});

const Provider = ModalContext.Provider;

export function ModalContextProvider({ children }: PropsWithChildren) {
  const [modal, setModal] = useState<Modal | null>(null);
  return (
    <Provider value={{
      modal,
      showModal: (modal: Modal) => setModal(modal),
      hideModal: () => setModal(null),
    }}>
      {children}
    </Provider>
  );
}

export default ModalContext;
