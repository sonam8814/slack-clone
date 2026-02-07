import "express";

/* --------------------------------------------------
   Express Request Augmentation (CORRECT WAY)
-------------------------------------------------- */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}

/* --------------------------------------------------
   User Types
-------------------------------------------------- */
export interface UserPayload {
  id: string;
  email: string;
  name: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

/* --------------------------------------------------
   Workspace Types
-------------------------------------------------- */
export interface CreateWorkspaceInput {
  name: string;
  description?: string;
}

export interface UpdateWorkspaceInput {
  name?: string;
  description?: string;
  icon?: string;
}

/* --------------------------------------------------
   Channel Types
-------------------------------------------------- */
export interface CreateChannelInput {
  name: string;
  description?: string;
  isPrivate?: boolean;
  workspaceId: string;
}

/* --------------------------------------------------
   Message Types
-------------------------------------------------- */
export interface CreateMessageInput {
  content: string;
  channelId: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  parentId?: string;
}

/* --------------------------------------------------
   Socket Event Types
-------------------------------------------------- */
export interface SocketUser {
  userId: string;
  socketId: string;
  workspaceId: string;
}

export interface TypingEvent {
  userId: string;
  channelId: string;
  userName: string;
  isTyping: boolean;
}

export interface MessageEvent {
  id: string;
  content: string;
  channelId: string;
  userId: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  createdAt: Date;
}

export interface PresenceEvent {
  userId: string;
  status: "ONLINE" | "OFFLINE" | "AWAY";
  workspaceId: string;
}

/* --------------------------------------------------
   API Response Types
-------------------------------------------------- */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/* --------------------------------------------------
   Cloudinary Upload Result
-------------------------------------------------- */
export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  format: string;
  resourceType: string;
}
