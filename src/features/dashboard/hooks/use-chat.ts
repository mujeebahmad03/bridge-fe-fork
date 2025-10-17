"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { ChatMessage, Lead, MessageTemplate } from "@/dashboard/types";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const processAICommand = useCallback((content: string): ChatMessage => {
    const lowerContent = content.toLowerCase();

    // Handle Lead Addition
    if (
      lowerContent.includes("add lead") ||
      lowerContent.includes("new lead")
    ) {
      const leadMatch = content.match(
        /add (?:new )?lead:?\s*([^,]+)(?:,?\s*(?:in|to|for)\s+([^,\n]+))?/i,
      );
      if (leadMatch) {
        const leadName = leadMatch[1].trim();
        const campaign = leadMatch[2]?.trim() || "General";

        const newLead: Lead = {
          id: Date.now(),
          name: leadName,
          email: `${leadName.toLowerCase().replace(/\s+/g, ".")}@company.com`,
          company: `${leadName.split(" ")[0]} Corp`,
          campaign,
          status: "new",
          addedDate: new Date(),
        };

        return {
          role: "assistant",
          content: `✅ **Lead Added Successfully!**\n\n**${newLead.name}** has been added to the **${campaign}** campaign.\n\n📧 Email: ${newLead.email}\n🏢 Company: ${newLead.company}\n📅 Added: ${new Date().toLocaleDateString()}\n\nWould you like me to draft an initial outreach message for this lead?`,
          timestamp: new Date(),
          type: "lead_added",
          data: newLead,
        };
      }
    }

    // Handle Message Drafting
    if (
      lowerContent.includes("draft") &&
      (lowerContent.includes("email") ||
        lowerContent.includes("message") ||
        lowerContent.includes("linkedin"))
    ) {
      const isLinkedIn = lowerContent.includes("linkedin");
      const isEmail = lowerContent.includes("email") || !isLinkedIn;

      // Extract lead and campaign info
      const leadMatch = content.match(
        /(?:to|for)\s+([^,\n]+?)(?:\s+(?:in|about|regarding)\s+([^,\n]+))?/i,
      );
      const lead = leadMatch?.[1]?.trim() || "the prospect";
      const campaign = leadMatch?.[2]?.trim() || "your campaign";

      const messageType = isLinkedIn
        ? "LinkedIn connection request"
        : "follow-up email";
      const subject = isEmail ? `Re: ${campaign} - Following up` : "";

      let messageContent = "";

      if (isLinkedIn) {
        messageContent = `Hi ${lead},\n\nI hope you're doing well! I came across your profile and was impressed by your work in ${campaign}. I'd love to connect and explore potential collaboration opportunities.\n\nLooking forward to connecting!\n\nBest regards`;
      } else {
        messageContent = `Hi ${lead},\n\nI hope this email finds you well. I wanted to follow up on our discussion about ${campaign}.\n\n[Your main message here - customize based on your specific needs]\n\nI'd love to schedule a brief call to discuss how we can move forward. Are you available for a 15-minute conversation this week?\n\nBest regards,\n[Your name]`;
      }

      const template: MessageTemplate = {
        id: Date.now(),
        type: isLinkedIn ? "linkedin" : "email",
        subject,
        content: messageContent,
        campaign,
        lead,
      };

      return {
        role: "assistant",
        content: `✍️ **${messageType.charAt(0).toUpperCase() + messageType.slice(1)} Drafted!**\n\n**To:** ${lead}\n**Campaign:** ${campaign}${subject ? `\n**Subject:** ${subject}` : ""}\n\n**Message:**\n\n${messageContent}\n\n---\n\n💡 **Tip:** You can customize this message before sending. Would you like me to adjust the tone or add specific details?`,
        timestamp: new Date(),
        type: "message_drafted",
        data: template,
      };
    }

    // Handle Task Summary
    if (
      lowerContent.includes("today") &&
      (lowerContent.includes("task") ||
        lowerContent.includes("schedule") ||
        lowerContent.includes("agenda"))
    ) {
      const taskSummary = {
        calls: 3,
        emails: 5,
        linkedin: 2,
        meetings: 1,
        total: 11,
      };

      return {
        role: "assistant",
        content: `📅 **Today's Task Summary**\n\n**Total Tasks:** ${taskSummary.total}\n\n📞 **Calls:** ${taskSummary.calls}\n• Follow up call with John Smith (2:00 PM)\n• Check-in with Sarah Johnson (4:30 PM)\n• Discovery call with ABC Corp (6:00 PM)\n\n📧 **Emails:** ${taskSummary.emails}\n• Send contract to Sarah Johnson\n• Follow up on Q4 proposal\n• Draft proposal for ABC Corp\n• Send meeting recap to team\n• Respond to client inquiries\n\n💼 **LinkedIn:** ${taskSummary.linkedin}\n• Connect with Mike Chen\n• Follow up with conference contacts\n\n🤝 **Meetings:** ${taskSummary.meetings}\n• Team standup (10:00 AM)\n\n**Priority Focus:** Complete high-priority calls first, then tackle email backlog.\n\nWould you like me to help you prioritize or draft any of these communications?`,
        timestamp: new Date(),
        type: "task_summary",
        data: taskSummary,
      };
    }

    // Default AI responses for other queries
    const responses = [
      "I can help you with:\n\n✍️ **Draft messages** - 'Draft email to John about blackberry campaign'\n➕ **Add leads** - 'Add new lead: Sarah Johnson in tech outreach'\n📆 **Task insights** - 'What are my tasks today?'\n\nWhat would you like to do?",
      "I'm here to help you manage your leads and campaigns! Try asking me to:\n\n• Add a new lead to a campaign\n• Draft an email or LinkedIn message\n• Get your daily task summary\n\nWhat can I help you with?",
      "Let me assist you with your sales workflow. I can help you add leads, draft personalized messages, and provide task insights. What would you like to work on?",
    ];

    return {
      role: "assistant",
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
      type: "text",
    };
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      const userMessage: ChatMessage = {
        role: "user",
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Simulate AI processing time
      setTimeout(
        () => {
          const aiResponse = processAICommand(content);
          setMessages((prev) => [...prev, aiResponse]);
          setIsLoading(false);
        },
        800 + Math.random() * 1200,
      );
    },
    [processAICommand],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    messagesEndRef,
    sendMessage,
    clearMessages,
  };
}
