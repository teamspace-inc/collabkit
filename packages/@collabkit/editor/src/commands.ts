import type { LexicalCommand} from 'lexical';
import { createCommand } from 'lexical';

export const CLOSE_MENTIONS_COMMAND: LexicalCommand<undefined> = createCommand();
export const OPEN_MENTIONS_COMMAND: LexicalCommand<undefined> = createCommand();
