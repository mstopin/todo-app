import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserContext } from '../../../../../hooks/useUser';
import { ModalContext, Modal } from '../../../../../hooks/useModals';

import CreateTaskButton from '../CreateTaskButton';

let token: string | null = null;
let modal: Modal | null = null;

const renderCreateTaskButton = () => {
  const mockUserContextProviderValue = {
    token,
    logIn: jest.fn(),
    logOut: jest.fn(),
  };
  
  const mockModalContextProviderValue = {
    modal,
    showModal: jest.fn((newModal: Modal) => modal = newModal),
    hideModal: jest.fn(() => modal = null),
  };

  return render(
    <UserContext.Provider value={mockUserContextProviderValue}>
      <ModalContext.Provider value={mockModalContextProviderValue}>
        <CreateTaskButton />
      </ModalContext.Provider>
    </UserContext.Provider>
  );
};

describe('CreateTaskButton', () => {
  afterEach(() => {
    token = null;
    modal = null;
  });
  
  test('sets log in modal if user is not logged in', async () => {
    renderCreateTaskButton();

    await userEvent.click(screen.getByRole('button', { name: 'Add task' }));
    
    expect(modal).toBe(Modal.USER_LOGIN);
  });

  test('sets task add modal if user is logged in', async () => {
    token = 'token';
    renderCreateTaskButton();

    await userEvent.click(screen.getByRole('button', { name: 'Add task' }));

    expect(modal).toBe(Modal.TASK_ADD);
  });
});
