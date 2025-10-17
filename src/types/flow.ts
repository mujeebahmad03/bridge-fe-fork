import { Node, Edge } from "@xyflow/react";

export type NodeCategory = "step" | "condition" | "starter";
export type StepType =
  | "email"
  | "voiceMessage"
  | "aiVoiceMessage"
  | "linkedInChat"
  | "linkedInInvitation"
  | "visitProfile"
  | "call"
  | "manualTask";
export type ConditionType =
  | "hasEmail"
  | "hasLinkedIn"
  | "hasPhone"
  | "customCondition"
  | "openedEmail"
  | "clickedLink"
  | "unsubscribed"
  | "bookedMeeting"
  | "acceptedLinkedIn"
  | "openedLinkedIn";
export type StarterType = "sequenceStart";

// Base node data interface that extends Record<string, unknown>
export interface BaseNodeData extends Record<string, unknown> {
  id: string;
  label: string;
  category: NodeCategory;
  icon?: string;
  isDeleteable?: boolean;
}

export interface StepNodeData extends BaseNodeData {
  category: "step";
  type: StepType;
  content?: string;
  waitDays?: number;
  waitEnabled?: boolean;
  isValid?: boolean;
  validationMessage?: string;
  actionNeeded?: boolean;
}

export interface ConditionNodeData extends BaseNodeData {
  category: "condition";
  type: ConditionType;
  condition?: string;
  isValid?: boolean;
  validationMessage?: string;
}

export interface StarterNodeData extends BaseNodeData {
  category: "starter";
  type: StarterType;
  isValid?: boolean;
  validationMessage?: string;
}

export type FlowNodeData = StepNodeData | ConditionNodeData | StarterNodeData;

// Use the built-in types from React Flow
export type FlowNode = Node<FlowNodeData>;
export type FlowEdge = Edge;

export interface FlowState {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface NodeTypeInfo {
  type: StepType | ConditionType | StarterType;
  label: string;
  icon: string;
  category: NodeCategory;
  description: string;
}
