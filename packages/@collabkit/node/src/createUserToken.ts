import * as jwt from 'jsonwebtoken';

export function createUserToken(props: {apiKey: string, userId: string, workspaceId: string}) {
  return jwt.sign({ userId: props.userId, workspaceId: props.workspaceId }, props.apiKey, { expiresIn : "1h" });
}
