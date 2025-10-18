import { MoreVertical, Reply, Star, ReplyIcon, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import { AiReplyModal } from "./ai-reply-modal";

interface Guest {
  email: string;
  name: string;
  role?: "organizer";
  avatar?: string;
}

interface EmailThreadProps {
  subject: string;
  date: string;
  guests: Guest[];
  when: string;
  location?: string;
  accepted?: boolean;
  onReply: () => void;
}

export const NewEmailThread = ({
  subject,
  date,
  guests,
  when,
  accepted = true,
  onReply,
}: EmailThreadProps) => {
  const [showAiModal, setShowAiModal] = useState(false);

  const organizer = guests.find((g) => g.role === "organizer");

  return (
    <>
      <div className="space-y-4">
        <Card className="w-full border-0 shadow-none">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex flex-1 items-start gap-3">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm">
                    <h3 className="mb-1 font-normal text-foreground">
                      New email <span className="font-medium">Accepted:</span>{" "}
                      <span className="font-medium">{subject}</span>
                    </h3>
                    <p className="text-xs text-muted-foreground">{date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="Reply With AI"
                      onClick={() => setShowAiModal(true)}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="Reply"
                      onClick={onReply}
                    >
                      <ReplyIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" />
                  Email content visible to workspace members.
                </div>

                <div className="mt-4">
                  <div className="space-y-3 rounded-lg bg-muted/30 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={organizer?.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback className="bg-primary/10 text-xs text-primary">
                          {organizer?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {organizer?.name || organizer?.email.split("@")[0]}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          To: {organizer?.email}
                        </div>
                      </div>
                      <div className="ml-auto text-xs text-muted-foreground">
                        Mon, Oct 6, 05:52 AM (12 days ago)
                      </div>
                    </div>

                    <hr className="pb-4 pt-1" />

                    {accepted && (
                      <div
                        className="mb-4 rounded px-4 py-3"
                        style={{ backgroundColor: "rgb(254, 247, 224)" }}
                      >
                        <p
                          className="text-sm font-medium"
                          style={{ color: "black" }}
                        >
                          {organizer?.name || organizer?.email.split("@")[0]}{" "}
                          has accepted this invitation.
                        </p>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="space-y-4 rounded-md border border-border px-4 py-3">
                        <p className="text-xs text-muted-foreground">
                          This event was created by{" "}
                          <span className="text-primary">Oskar AI</span>.
                        </p>

                        <div className="space-y-2">
                          <div>
                            <h4 className="mb-1 text-sm font-medium text-foreground">
                              When
                            </h4>
                            <p className="text-sm text-foreground">{when}</p>
                          </div>

                          <div>
                            <h4 className="mb-1 text-sm font-medium text-foreground">
                              Guests
                            </h4>
                            <div className="space-y-1">
                              {guests.map((guest, idx) => (
                                <div key={idx} className="text-sm">
                                  <span className="text-primary">
                                    {guest.email}
                                  </span>
                                  {guest.role === "organizer" && (
                                    <span className="text-muted-foreground">
                                      {" "}
                                      - organizer
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                            <Button
                              variant="link"
                              className="mt-1 h-auto p-0 text-xs"
                            >
                              View all guest info
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <p className="mb-2 text-xs text-muted-foreground">
                          Invitation from{" "}
                          <Button variant="link" className="h-auto p-0 text-xs">
                            Google Calendar
                          </Button>
                        </p>
                        <p className="mb-3 text-xs text-muted-foreground">
                          You are receiving this email because you are
                          subscribed to calendar notifications. To stop
                          receiving these emails, go to{" "}
                          <Button variant="link" className="h-auto p-0 text-xs">
                            Calendar settings
                          </Button>
                          , select the calendar, and change &quot;Other
                          notifications&quot;.
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Forwarding this invitation could allow any recipient
                          to send a response to the organizer, be added to the
                          guest list, invite others regardless of their own
                          invitation status , or modify your RSVP.{" "}
                          <Button variant="link" className="h-auto p-0 text-xs">
                            Learn more
                          </Button>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" onClick={onReply}>
                      <Reply className="mr-1 h-4 w-4" />
                      Reply
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setShowAiModal(true)}
                    >
                      <Star className="mr-1 h-4 w-4" />
                      Reply with AI
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <AiReplyModal
        open={showAiModal}
        onClose={() => setShowAiModal(false)}
        onSend={(msg) => console.log("AI reply sent:", msg)}
        aiSuggestion="<p>Hi there 👋<br/>Thanks for reaching out — here’s my response...</p>"
      />
    </>
  );
};
