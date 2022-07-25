import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  PropsWithChildren,
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

export const ModalContext = createContext<ModalContextProps>({
  modal: null,
  showModal: () => undefined,
  hideModal: () => undefined,
});

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
    <ModalContext.Provider value={providerValue}>
      {children}
    </ModalContext.Provider>
  );
}

export default function useModals() {
  return useContext(ModalContext);
}
