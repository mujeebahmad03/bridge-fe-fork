import { useState } from "react";
import { EmailListItem } from "../email-meta/email-list-item";
import { EmailListHeader } from "../email-meta/email-list-header";

const emailData = [
  {
    id: 1,
    company: "West Africa Assoc.",
    subject:
      "Yo Reddit! What's a small thing that anyone can do at nearly anytime to improve their...",
    time: "2:35am",
    read: false,
  },
  {
    id: 2,
    company: "Abstergo Ltd.",
    subject: "How to design a product that can grow itself 10x in year.",
    time: "2:35am",
    read: false,
  },
  {
    id: 3,
    company: "Barone LLC.",
    subject: "Any mechanical keyboard enthusiasts in design?",
    time: "2:35am",
    read: false,
  },
  {
    id: 4,
    company: "Biffco Enterprises Ltd.",
    subject: "Any mechanical keyboard enthusiasts in design?",
    time: "2:35am",
    read: false,
  },
  {
    id: 5,
    company: "Acme Co.",
    subject: "The More Important the Work, the More Important the Rest",
    time: "2:35am",
    read: false,
  },
  {
    id: 6,
    company: "Biffco Enterprises Ltd.",
    subject:
      "Understanding color theory: the color wheel and finding complementary colors",
    time: "2:35am",
    read: false,
  },
  {
    id: 7,
    company: "Big Kahuna Burger Ltd.",
    subject: "How to design a product that can grow itself 10x in year.",
    time: "2:35am",
    read: false,
  },
];

export function EmailList() {
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);

  const handleSelectEmail = (emailId: number) => {
    setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId],
    );
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === emailData.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emailData.map((email) => email.id));
    }
  };

  return (
    <div className="space-y-1 overflow-hidden">
      <EmailListHeader
        selectedCount={selectedEmails.length}
        totalCount={emailData.length}
        onSelectAll={handleSelectAll}
      />

      <div className="space-y-1">
        {emailData.map((email) => (
          <EmailListItem
            key={email.id}
            email={email}
            isSelected={selectedEmails.includes(email.id)}
            onSelect={handleSelectEmail}
          />
        ))}
      </div>
    </div>
  );
}
