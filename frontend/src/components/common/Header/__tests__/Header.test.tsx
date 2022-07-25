import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserContext } from '../../../../hooks/useUser';
import { ModalContext, Modal } from '../../../../hooks/useModals';

import Header from '../Header';

let token: string | null = null;
let modal: Modal | null = null;

const logIn = jest.fn();
const logOut = jest.fn();

const renderHeader = () => {
  const mockUserContextProviderValue = {
    token,
    logIn,
    logOut,
  };
  
  const mockModalContextProviderValue = {
    modal,
    showModal: jest.fn((newModal: Modal) => modal = newModal),
    hideModal: jest.fn(() => modal = null),
  };

  return render(
    <UserContext.Provider value={mockUserContextProviderValue}>
      <ModalContext.Provider value={mockModalContextProviderValue}>
        <Header />
      </ModalContext.Provider>
    </UserContext.Provider>
  );
}

describe('Header', () => {
  beforeEach(() => {
    modal = null;
    token = null;
    jest.clearAllMocks();
  });

  test('sets log in modal on button click', async () => {
    renderHeader();

    await userEvent.click(screen.getByRole('button', { name: 'User options' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Log in' }))

    expect(modal).toBe(Modal.USER_LOGIN);
  });

  test('sets register modal on button click', async () => {
    renderHeader();

    await userEvent.click(screen.getByRole('button', { name: 'User options' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Register' }));

    expect(modal).toBe(Modal.USER_REGISTER);
  });

  test('calls log out function on button click', async () => {
    token = 'token';
    renderHeader();

    await userEvent.click(screen.getByRole('button', { name: 'User options' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Log out' }));

    expect(logOut).toBeCalledTimes(1);
  });
});
