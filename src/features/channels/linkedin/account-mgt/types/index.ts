export interface Account {
  id: number;
  username: string;
  status: "syncing" | "failed" | "connected";
  lastSynced: string;
}
