import {
  createContext,
  PropsWithChildren,
  useState,
  useCallback,
  useMemo,
} from 'react';

export enum Modal {
  USER_LOGIN,
  USER_REGISTER,
  TASK_ADD,
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

  const showModal = useCallback((modal: Modal) => setModal(modal), []);
  const hideModal = useCallback(() => setModal(null), []);

  const providerValue = useMemo(() => ({
    modal,
    showModal,
    hideModal,
  }), [modal, showModal, hideModal]);

  return (
    <Provider value={providerValue}>
      {children}
    </Provider>
  );
}

export default ModalContext;
