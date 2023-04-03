import { schema as basic } from './basicSchema';
// export * from './markdownRules';
import { schema as markdown } from './markdownSchema';
import { schema as plainText } from './plainTextSchema';

export const schemas = {
  plainText,
  basic,
  markdown,
};

export type SchemaOptions = keyof typeof schemas;
export type Schemas = typeof schemas;
