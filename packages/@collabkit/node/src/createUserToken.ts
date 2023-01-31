import * as jwt from 'jsonwebtoken';

export function createUserToken(apiKey: string, userId: string, workspaceId: string) {
  return jwt.sign({ userId: userId, workspaceId: workspaceId }, apiKey, { expiresIn : "1h" });
}
