import { getTaskColorClassName, getTaskStatusDescription } from '../utils';

describe('utils', () => {
  test('provides correct class names for status', () => {
    expect(getTaskColorClassName('NEW')).toBe('task.new');
    expect(getTaskColorClassName('IN_PROGRESS')).toBe('task.in_progress');
    expect(getTaskColorClassName('COMPLETED')).toBe('task.completed');
  });
  
  test('provided correct description for status', () => {
    expect(getTaskStatusDescription('NEW')).toBe('NEW');
    expect(getTaskStatusDescription('IN_PROGRESS')).toBe('IN PROGRESS');
    expect(getTaskStatusDescription('COMPLETED')).toBe('COMPLETED');
  });
});
