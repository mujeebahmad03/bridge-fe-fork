"use client";

import { useState } from "react";
import { ContactHeader } from "./contact/contact-header";
import { AboutSection } from "./contact/about-section";
import { TasksSection } from "./contact/tasks-section";
import { ContactsSection } from "./contact/contacts-section";
import { ActionModals } from "./contact/action-modals";
import { Contact } from "../types";

export function ContactPanel() {
  const [contact, setContact] = useState<Contact>({
    id: "1",
    name: "Nadia Carta",
    role: "CEO",
    email: "nadia.carta@company.com",
    phone: "+1 234 567 890",
    avatar: "/professional-woman-headshot.png",
    company: {
      name: "Google",
      industry: "Software and Technology",
      size: "100-500",
      location: "New York, US",
      website: "https://about.google/",
      description:
        "Leading technology company focused on organizing the world's information and making it universally accessible and useful.",
    },
    address: "1600 Amphitheatre Parkway, Mountain View, CA 94043",
    websiteUrl: "https://about.google/",
    linkedinUrl: "linkedin.com/in/nadiacarta",
    status: "Pending",
    owner: null,
    value: 0,
    isCompany: true,
    leadStatus: "qualified",
    campaignStatus: {
      name: "Enterprise Outreach Campaign",
      step: 3,
      totalSteps: 5,
      nextAction: "Send follow-up email with proposal",
    },
  });

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Sync with Dwight regarding intro call",
      assignee: { name: "Sam", avatar: "SQ" },
      dueDate: "2025-01-17",
      dueTime: "10:00",
      completed: false,
      createdAt: "2025-01-16",
    },
    {
      id: "2",
      title: "Follow up with Micheal re: contract",
      assignee: { name: "Sam", avatar: "SQ" },
      dueDate: "2025-01-09",
      dueTime: "14:00",
      completed: false,
      createdAt: "2025-01-08",
    },
  ]);

  const [companyContacts, setCompanyContacts] = useState<Partial<Contact>[]>([
    {
      id: "1",
      name: "Michael Scott",
      role: "Regional Manager",
      email: "michael.scott@dundermifflin.com",
      phone: "+1 248-434-5508",
      socials: "https://www.linkedin.com/in/michael-scott",
    },
    {
      id: "2",
      name: "Dwight Schrute",
      role: "Assistant to the Regional Manager",
      email: "dwight.schrute@dundermifflin.com",
      phone: "+1 248-434-5509",
      socials: "https://www.linkedin.com/in/dwight-schrute",
    },
    {
      id: "3",
      name: "Jim Halpert",
      role: "Sales Rep",
      email: "jim.halpert@dundermifflin.com",
      phone: "+1 248-434-5510",
      socials: "https://www.linkedin.com/in/jim-halpert",
    },
  ]);

  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="animate-fade-in space-y-6 p-4 pb-8 lg:p-6">
      <ContactHeader contact={contact} setContact={setContact} />

      {/* <QuickActions onActionClick={setActiveModal} /> */}

      <div className="space-y-4">
        <AboutSection contact={contact} setContact={setContact} />
        <TasksSection
          tasks={tasks}
          setTasks={setTasks}
          onCreateTask={() => setActiveModal("task")}
        />
        {contact.isCompany && (
          <ContactsSection
            contacts={companyContacts}
            setContacts={setCompanyContacts}
          />
        )}
      </div>

      <ActionModals
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        contact={contact}
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
}
