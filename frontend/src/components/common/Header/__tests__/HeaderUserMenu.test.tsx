import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HeaderUserMenu from '../HeaderUserMenu';

const onLogIn = jest.fn();
const onLogOut = jest.fn();
const onRegister = jest.fn();

const renderHeaderUserMenu = (userLoggedIn: boolean) => render(
  <HeaderUserMenu
    isLoggedIn={userLoggedIn}
    onLogIn={onLogIn}
    onLogOut={onLogOut}
    onRegister={onRegister}
  />
);

describe('HeaderUserMenu', () => {
  afterEach(() => jest.clearAllMocks());

  test('shows login button when user is not logged in', async () => {
    renderHeaderUserMenu(false);

    await userEvent.click(screen.getByRole('button', { name: 'User options' }));

    const loginButton = screen.getByRole('menuitem', { name: 'Log in' });
    await userEvent.click(loginButton);

    expect(loginButton).toBeInTheDocument();
    expect(onLogIn).toBeCalledTimes(1);
  });

  test('shows register button when user is not logged in', async () => {
    renderHeaderUserMenu(false);

    await userEvent.click(screen.getByRole('button', { name: 'User options' }));

    const registerButton = screen.getByRole('menuitem', { name: 'Register' });
    await userEvent.click(registerButton);

    expect(registerButton).toBeInTheDocument();
    expect(onRegister).toBeCalledTimes(1);
  });

  test('shows logout button when user is logged in', async () => {
    renderHeaderUserMenu(true);

    await userEvent.click(screen.getByRole('button', { name: 'User options' }));

    const logoutButton = screen.getByRole('menuitem', { name: 'Log out' });
    await userEvent.click(logoutButton);

    expect(logoutButton).toBeInTheDocument();
    expect(onLogOut).toBeCalledTimes(1);
  });
});
