import {
  ColumnType,
  TaskAssociatedWith,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "@/types/task";

export const taskColumns: ColumnType[] = [
  {
    id: "callsTodo",
    title: "Calls Tasks",
    tasks: [],
    wip: 4,
    color: "border-purple-500",
  },
  {
    id: "emailTodo",
    title: "Email Tasks",
    tasks: [
      {
        id: "1",
        title: "Research Project",
        description: "Gather information about new requirements",
        priority: TaskPriority.HIGH,
        associatedWith: TaskAssociatedWith.CONTACT,
        contact: "Janet Lawson",
        campaign: "Q1 Research",
        taskType: TaskType.EMAIL,
        assignedTo: "John Doe",
        dueDate: new Date(),
        dueTime: "12:00",
        status: TaskStatus.TODO,
        hasReplies: false,
        isOverdue: false,
      },
    ],
    wip: 4,
    color: "border-pink-500",
  },
  {
    id: "linkedInTodo",
    title: "LinkedIn Tasks",
    tasks: [],
    wip: 4,
    color: "border-indigo-500",
  },
  {
    id: "inProgress",
    title: "In Progress",
    tasks: [],
    wip: 3,
    color: "border-yellow-500",
  },
  {
    id: "done",
    title: "Done",
    tasks: [],
    wip: 10,
    color: "border-green-500",
  },
];
