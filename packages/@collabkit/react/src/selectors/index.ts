import { InjectedScript } from './injectedScript';
import * as selecterGenerator from './selectorGenerator';

export function generateSelector(targetElement: Element): {
  selector: string;
  elements: Element[];
} {
  const injectedScript = new InjectedScript(false, 0, 'CollabKit', []);
  return selecterGenerator.generateSelector(injectedScript, targetElement, true);
}
