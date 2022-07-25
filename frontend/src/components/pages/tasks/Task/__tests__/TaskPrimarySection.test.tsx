import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TaskPrimarySection from '../TaskPrimarySection';

const onDelete = jest.fn();
const toggleExpanded = jest.fn();

const renderTaskPrimarySection = (expandable: boolean) => render(
  <TaskPrimarySection
    task={{
      _id: '_id',
      content: 'task-content',
      status: 'NEW',
      onDelete,
    }}
    expandable={expandable}
    isExpanded={false}
    toggleExpanded={toggleExpanded}
  />
);

describe('TaskPrimarySection', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('shows task content', () => {
    renderTaskPrimarySection(true);

    expect(screen.getByText('task-content')).toBeInTheDocument();
  });

  test('calls onDelete on delete button click', async () => {
    renderTaskPrimarySection(true);

    await userEvent.click(screen.getByRole('button', { name: 'Delete task' }));

    expect(onDelete).toBeCalledTimes(1);
  });

  test('renders expand button if expandable', async () => {
    renderTaskPrimarySection(true);
    const expandButton = screen.getByRole('button', { name: 'Expand' })

    await userEvent.click(expandButton);

    expect(expandButton).toBeInTheDocument();
    expect(toggleExpanded).toBeCalledTimes(1);
  });

  test('does not render expand button if not expandable', () => {
    renderTaskPrimarySection(false);
    const expandButton = screen.queryByRole('button', { name: 'Expand' });

    expect(expandButton).not.toBeInTheDocument();
    expect(toggleExpanded).not.toBeCalled();
  });
});
