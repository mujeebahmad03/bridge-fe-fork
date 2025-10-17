/**
 * Shared team member data
 */

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
}

export const teamMembers: TeamMember[] = [
  { id: "1", name: "Sam Queen", avatar: "SQ" },
  { id: "2", name: "Alex Johnson", avatar: "AJ" },
  { id: "3", name: "Maria Garcia", avatar: "MG" },
  { id: "4", name: "David Chen", avatar: "DC" },
  { id: "5", name: "John Doe", avatar: "JD" },
  { id: "6", name: "Jane Smith", avatar: "JS" },
];

export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamMembers.find((member) => member.id === id);
}

export function getTeamMemberByName(name: string): TeamMember | undefined {
  return teamMembers.find((member) => member.name === name);
}
