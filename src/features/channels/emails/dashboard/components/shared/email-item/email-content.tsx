import { EmailHeader } from "./email-header";
import { EmailSubject } from "./email-subject";
import { EmailPreview } from "./email-preview";
import { EmailTags } from "./email-tags";
import { Email } from "@/emails/dashboard/types";
import { TEXT_SIZES } from "@/emails/dashboard/constants";

export interface EmailContentProps {
  email: Email;
  textSizes: typeof TEXT_SIZES.comfortable;
}

export function EmailListContent({ email, textSizes }: EmailContentProps) {
  return (
    <div className="min-w-0 flex-1">
      <EmailHeader
        sender={email.sender}
        time={email.time}
        isRead={email.isRead}
        isOnline={email.isOnline}
        textSizes={textSizes}
      />
      <EmailSubject
        subject={email.subject}
        isRead={email.isRead}
        textSizes={textSizes}
      />
      <EmailPreview preview={email.preview} textSizes={textSizes} />
      <EmailTags tags={email.tags} />
    </div>
  );
}
