export interface User {
  id: string;
  avatar?: string;
  external_id: string;
  owner: string;
  email_address: "user@example.com";
  first_name: string;
  last_name: string;
  user_type: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  last_modified_at: Date;
}

export interface Profile {
  business_name: string;
  business_industry: string;
  acquisition_source: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: TokenPair;
}
