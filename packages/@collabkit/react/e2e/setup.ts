// need .ts at the end of the file to make playwright happy
// but that means we need to ts-ignore the imports
// @ts-expect-error
import { setupApp } from '../../test-utils/src/setupApp.ts';
// @ts-expect-error
import { setupFirebase } from '../../test-utils/src/setupFirebase.ts';

export { setupApp, setupFirebase };
