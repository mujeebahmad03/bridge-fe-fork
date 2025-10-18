import React from "react";

const ContactViewPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 lg:flex-row">
      {/* LEFT SECTION */}
      <div className="flex-1 p-4 lg:p-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            obafemijoshu2020@gmail.com
          </h2>
          <div className="text-sm text-gray-500">
            Imported from Google Calendar
          </div>
        </div>

        {/* Activity Tabs */}
        <div className="mb-4 flex flex-wrap gap-2 border-b border-gray-200 pb-2 text-sm text-gray-700">
          <span className="border-b-2 border-blue-600 pb-1 font-medium text-blue-600">
            Activities
          </span>
          <span>Emails</span>
          <span>Events</span>
          <span>Notes</span>
          <span>Media</span>
          <span>Meetings</span>
          <span>Tasks</span>
          <span>Other</span>
        </div>

        {/* Suggestion Box */}
        <div className="mb-4 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-gray-700">
          <strong>Follow up after Meeting with contacts on Oct 6, 2025</strong>{" "}
          (past due)
          <p className="mt-1 text-gray-600">
            You had a meeting scheduled with Joshua Obafemi and others on
            October 6, 2025, but there has been no email activity since then. To
            keep the deal progressing, you should send a follow-up email today
            to recap the meeting, address any open points, and discuss next
            steps.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white">
              Generate email
            </button>
            <button className="rounded-md border px-3 py-1 text-sm">
              Remind me later
            </button>
            <button className="rounded-md border px-3 py-1 text-sm">
              Mark as done
            </button>
            <button className="rounded-md border px-3 py-1 text-sm">
              Dismiss
            </button>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mb-4">
          <h3 className="mb-1 font-medium text-gray-700">No new tasks</h3>
          <p className="text-sm text-gray-500">
            It’s all done — you’ve earned a break!
          </p>
        </div>

        {/* Activity Card */}
        <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-2 font-medium text-gray-800">
            New email: Accepted Meeting with contacts — Mon Oct 6, 2025
          </h3>
          <div className="mb-2 text-sm text-gray-600">
            <p>
              <strong>When:</strong> Monday Oct 6, 2025 • 8am–9am (Eastern Time
              - New York)
            </p>
            <p>
              <strong>Guests:</strong> emjay.prodev@gmail.com (organizer),
              Joshua Obafemi, abulumijehannah03@gmail.com
            </p>
          </div>
          <p className="text-sm font-medium text-green-600">
            Joshua Obafemi has accepted this invitation.
          </p>
        </div>

        {/* Scheduled Meeting */}
        <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-2 font-medium text-gray-800">
            New meeting: Meeting with contacts
          </h3>
          <p className="mb-1 text-sm text-gray-600">
            October 6, 2025 • 1:00 PM – 2:00 PM
          </p>
          <p className="text-sm text-gray-500">
            This event was created by Oskar AI.
          </p>
        </div>

        {/* Another Email Activity */}
        <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-2 font-medium text-gray-800">
            New email invitation: OnchainSuite Dev Meetup — Tue May 6, 2025
          </h3>
          <p className="mb-1 text-sm text-gray-600">
            <strong>When:</strong> May 6, 2025 • 12pm–1pm (Eastern Time - New
            York)
          </p>
          <p className="mb-2 text-sm text-gray-600">
            <strong>Meeting link:</strong>{" "}
            <a href="#" className="text-blue-600 underline">
              meet.google.com/xyz-xmb-bfe
            </a>
          </p>
          <button className="rounded-md bg-green-600 px-3 py-1 text-sm text-white">
            Join with Google Meet
          </button>
        </div>

        {/* New Contact Info */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-2 font-medium text-gray-800">New contact added</h3>
          <p className="text-sm text-gray-600">13 days ago</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full border-t border-gray-200 bg-white p-4 lg:w-80 lg:border-l lg:border-t-0">
        {/* Profile */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-gray-700">
            J
          </div>
          <h2 className="mb-1 text-sm font-semibold text-gray-800">
            obafemijoshu2020@gmail.com
          </h2>
          <p className="text-xs text-gray-500">Imported from Google Calendar</p>
        </div>

        {/* Buttons */}
        <div className="mb-6 mt-4 flex justify-center">
          <button className="rounded-md bg-purple-600 px-4 py-1.5 text-sm text-white hover:bg-purple-700">
            Request Insights
          </button>
        </div>

        {/* Info */}
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium text-gray-600">Status</p>
            <p className="text-gray-700">New</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Tags</p>
            <p className="text-gray-700">None</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Email</p>
            <p className="break-all text-gray-700">
              obafemijoshu2020@gmail.com
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Job Title</p>
            <p className="text-gray-700">Not set</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Phone Numbers</p>
            <p className="text-gray-700">No associated phone numbers</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Contact Owner</p>
            <p className="text-gray-700">Moyosore Aina</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Last Activity</p>
            <p className="text-gray-700">Oct 6, 2025, 9:52 AM</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Date Created</p>
            <p className="text-gray-700">Oct 5, 2025, 9:29 PM</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Companies</p>
            <p className="text-gray-700">No associated companies</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Deals</p>
            <p className="text-gray-700">No associated deals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactViewPage;
