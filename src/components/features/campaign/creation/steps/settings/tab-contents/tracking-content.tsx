"use client";

import { Mail, Link, Reply } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const TrackingTabContent = () => {
  // Tracking tab state
  const [trackEmail, setTrackEmail] = useState(true);
  const [trackLinks, setTrackLinks] = useState(true);
  const [trackReplies, setTrackReplies] = useState(false);

  // Event handlers for tracking toggles
  const handleTrackEmailChange = () => {
    setTrackEmail(!trackEmail);
    toast.info(
      !trackEmail
        ? "You will now receive notifications when recipients open your emails"
        : "You will no longer be notified when recipients open your emails",
    );
  };

  const handleTrackLinksChange = () => {
    setTrackLinks(!trackLinks);
    toast.info(
      !trackLinks
        ? "You will now be able to see when recipients click links in your emails"
        : "You will no longer track when recipients click links in your emails",
    );
  };

  const handleTrackRepliesChange = () => {
    setTrackReplies(!trackReplies);
    toast.info(
      !trackReplies
        ? "You will now receive notifications when recipients reply to your emails"
        : "You will no longer be notified when recipients reply to your emails",
    );
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-slate-100 bg-white/50 transition-all duration-300 dark:border-slate-700/50 dark:bg-slate-800/50">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-medium text-blue-600 transition-colors dark:text-blue-400">
            Email Tracking
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    Track Email Opens
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Get notified when recipients open your emails
                  </p>
                </div>
              </div>
              <Switch
                checked={trackEmail}
                onCheckedChange={handleTrackEmailChange}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                  <Link className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    Track Link Clicks
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    See which links recipients click in your emails
                  </p>
                </div>
              </div>
              <Switch
                checked={trackLinks}
                onCheckedChange={handleTrackLinksChange}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                  <Reply className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    Track Replies
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Get notified when recipients reply to your emails
                  </p>
                </div>
              </div>
              <Switch
                checked={trackReplies}
                onCheckedChange={handleTrackRepliesChange}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TrackingTabContent;
