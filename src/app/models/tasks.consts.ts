import { Task } from './task.model';
export const tasksData: Task[] = [
  {
    id: 1,
    title: 'Create Login Page',
    description: 'Design and implement a login page for the application.',
    dueDate: '2024-03-03',
    isCompleted: false,
  },
  {
    id: 2,
    title: 'Implement User Authentication',
    description: 'Develop the backend functionality using JWT.',
    dueDate: '2024-03-04',
    isCompleted: true,
  },
  {
    id: 3,
    title: 'Design Dashboard UI',
    description:
      'Create the user interface for the dashboard page with widgets.',
    dueDate: '2024-03-05',
    isCompleted: false,
  },
  {
    id: 4,
    title: 'Integrate API Services',
    description: 'Connect the frontend application to backend APIs.',
    dueDate: '2024-03-06',
    isCompleted: true,
  },
  {
    id: 5,
    title: 'Implement Task Management',
    description: 'Develop the functionality to manage tasks.',
    dueDate: '2024-03-07',
    isCompleted: false,
  },
];
