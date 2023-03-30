// Define your context interface
export interface ContextData {
  userId: string;
}

// Extend the Express Request interface to include your context
declare module 'express' {
  export interface Request {
    ctx?: ContextData;
  }
}
