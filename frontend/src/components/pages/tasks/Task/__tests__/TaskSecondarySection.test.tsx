import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TaskStatus } from '../../../../../types/Task';

import TaskSecondarySection from '../TaskSecondarySection';

const onUpdate = jest.fn();

const renderTaskSecondarySection = (status: TaskStatus, description?: string) => render(
  <TaskSecondarySection
    task={{
      _id: '_id',
      description,
      status: status,
      onUpdate,
    }}
  />
);

describe('TaskSecondarySection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('shows task description if provided', () => {
    renderTaskSecondarySection('NEW', 'task-description');

    expect(screen.getByText('task-description')).toBeInTheDocument();
  });

  test('shows fallback task description if not provided', () => {
    renderTaskSecondarySection('NEW');

    expect(screen.getByText('No description')).toBeInTheDocument();
  });

  test('has disabled correct status button', () => {
    renderTaskSecondarySection('NEW');

    expect(screen.getByRole('button', { name: 'New' })).toBeDisabled();
  });

  test('calls onUpdate on task status button click', async () => {
    renderTaskSecondarySection('NEW');

    await userEvent.click(screen.getByRole('button', { name: 'In progress' }));
    await userEvent.click(screen.getByRole('button', { name: 'Completed' }));

    expect(onUpdate).toHaveBeenNthCalledWith(1, 'IN_PROGRESS');
    expect(onUpdate).toHaveBeenNthCalledWith(2, 'COMPLETED');
  });
});
