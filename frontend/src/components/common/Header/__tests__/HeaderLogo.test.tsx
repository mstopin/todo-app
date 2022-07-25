import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import HeaderLogo from '../HeaderLogo';

describe('HeaderLogo', () => {
  test('shows logo', () => {
    render(<HeaderLogo />);

    expect(screen.getByText('To Do')).toBeInTheDocument();
  });
});
