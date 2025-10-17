import { FlowNode, NodeTypeInfo } from "@/types/flow";

// Step nodes
export const stepNodeTypes: NodeTypeInfo[] = [
  {
    type: "email",
    label: "Email",
    icon: "📧",
    category: "step",
    description: "Send an email to your lead",
  },
  {
    type: "voiceMessage",
    label: "Voice Message",
    icon: "🎤",
    category: "step",
    description: "Send a voice message to your lead",
  },
  {
    type: "aiVoiceMessage",
    label: "AI Voice Message",
    icon: "🤖",
    category: "step",
    description: "Send an AI generated voice message",
  },
  {
    type: "linkedInChat",
    label: "LinkedIn Chat",
    icon: "💬",
    category: "step",
    description: "Send a LinkedIn chat message",
  },
  {
    type: "linkedInInvitation",
    label: "LinkedIn Invitation",
    icon: "🙋‍♂️",
    category: "step",
    description: "Send a LinkedIn connection request",
  },
  {
    type: "visitProfile",
    label: "Visit Profile",
    icon: "👁️",
    category: "step",
    description: "Visit lead LinkedIn profile",
  },
  {
    type: "call",
    label: "Call",
    icon: "📞",
    category: "step",
    description: "Create a task to call your lead",
  },
  {
    type: "manualTask",
    label: "Manual Task",
    icon: "📋",
    category: "step",
    description: "Create a manual task to complete",
  },
];

// Condition nodes
export const conditionNodeTypes: NodeTypeInfo[] = [
  // Lead Information conditions
  {
    type: "hasEmail",
    label: "Has Email Address",
    icon: "📇",
    category: "condition",
    description: "Check if lead has email address",
  },
  {
    type: "hasLinkedIn",
    label: "Has LinkedIn URL",
    icon: "📇",
    category: "condition",
    description: "Check if lead has LinkedIn URL",
  },
  {
    type: "hasPhone",
    label: "Has Phone Number",
    icon: "📇",
    category: "condition",
    description: "Check if lead has phone number",
  },
  {
    type: "customCondition",
    label: "Custom Condition",
    icon: "📇",
    category: "condition",
    description: "Create a custom condition",
  },

  // Lead Actions conditions
  {
    type: "openedEmail",
    label: "Opened Email",
    icon: "📈",
    category: "condition",
    description: "Check if lead opened an email",
  },
  {
    type: "clickedLink",
    label: "Clicked Link",
    icon: "📈",
    category: "condition",
    description: "Check if lead clicked a link",
  },
  {
    type: "unsubscribed",
    label: "Unsubscribed",
    icon: "📈",
    category: "condition",
    description: "Check if lead unsubscribed",
  },
  {
    type: "bookedMeeting",
    label: "Booked Meeting",
    icon: "📈",
    category: "condition",
    description: "Check if lead booked a meeting",
  },
  {
    type: "acceptedLinkedIn",
    label: "Accepted LinkedIn",
    icon: "📈",
    category: "condition",
    description: "Check if lead accepted LinkedIn invitation",
  },
  {
    type: "openedLinkedIn",
    label: "Opened LinkedIn Message",
    icon: "📈",
    category: "condition",
    description: "Check if lead opened a LinkedIn message",
  },
];

export const starterNodeType: NodeTypeInfo = {
  type: "sequenceStart",
  label: "Sequence start",
  icon: "🚀",
  category: "starter",
  description: "Starting point of your sequence",
};

export const getAllNodeTypes = (): NodeTypeInfo[] => {
  return [...stepNodeTypes, ...conditionNodeTypes];
};

export const getNodeTypeInfo = (type: string): NodeTypeInfo | undefined => {
  return getAllNodeTypes().find((nodeType) => nodeType.type === type);
};

// Default starter node
export const createDefaultStarterNode = (): FlowNode => ({
  id: `${starterNodeType.type}-${Date.now()}`,
  type: "starter",
  position: { x: 100, y: 100 },
  data: {
    id: `${starterNodeType.type}-${Date.now()}`,
    label: starterNodeType.label,
    category: starterNodeType.category as "starter",
    type: starterNodeType.type as "sequenceStart",
    icon: starterNodeType.icon,
    isDeleteable: false,
    isValid: true,
  },
});
