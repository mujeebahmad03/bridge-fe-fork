"use client";

import { TaskModal } from "./modals/task-modal";
import { EmailModal } from "./modals/email-modal";
import { LinkedInModal } from "./modals/linkedin-modal";
import { NoteModal } from "./modals/note-modal";
import { CallModal } from "./modals/call-modal";
import { Contact } from "@/crmContacts/types";

interface Task {
  id: string;
  title: string;
  assignee: { name: string; avatar: string };
  dueDate: string;
  dueTime: string;
  completed: boolean;
  createdAt: string;
}

interface ActionModalsProps {
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  contact: Contact;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export function ActionModals({
  activeModal,
  setActiveModal,
  contact,
  tasks,
  setTasks,
}: ActionModalsProps) {
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <TaskModal
        isOpen={activeModal === "task"}
        onClose={closeModal}
        tasks={tasks}
        setTasks={setTasks}
      />

      <EmailModal
        isOpen={activeModal === "email"}
        onClose={closeModal}
        contact={contact}
      />

      <LinkedInModal
        isOpen={activeModal === "linkedin"}
        onClose={closeModal}
        contact={contact}
      />

      <NoteModal
        isOpen={activeModal === "note"}
        onClose={closeModal}
        contact={contact}
      />

      <CallModal
        isOpen={activeModal === "call"}
        onClose={closeModal}
        contact={contact}
      />
    </>
  );
}
