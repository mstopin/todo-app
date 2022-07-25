import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Task from '../Task';

const mockUpdateTask = jest.fn();
const mockDeleteTask = jest.fn();

const renderTask = () => {
  return render(
    <Task task={{
      _id: '_id',
      content: 'task-content',
      description: 'task-description',
      status: 'NEW',
    }} />
  );
};

jest.mock('../../../../../hooks/useTasks', () => () => ({
  tasks: [],
  createTask: jest.fn(),
  updateTask: mockUpdateTask,
  deleteTask: mockDeleteTask,
}));

global.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: true,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

global.scrollTo = jest.fn();

describe("Task", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('updates task on status button click', async () => {
    renderTask();

    await userEvent.click(screen.getByRole('button', { name: 'Completed' }));

    expect(mockUpdateTask).toHaveBeenCalledTimes(1);
    expect(mockUpdateTask).toHaveBeenCalledWith({
      _id: '_id',
      status: 'COMPLETED',
    });
  });

  test('deletes task on delete button click', async () => {
    renderTask();

    await userEvent.click(screen.getByRole('button', { name: 'Delete task' }));

    expect(mockDeleteTask).toHaveBeenCalledTimes(1);
    expect(mockDeleteTask).toHaveBeenCalledWith({
      _id: '_id',
    });
  });
});
