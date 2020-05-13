import CONSTANTS from '@/enums/CONSTANTS.json';
import MECHANICS from '@/enums/MECHANICS.json';
import exists from './element.exists';

/**
 * Returns the description of the provided parsed constant.
 * @param {String} symbol Symbol to match
 * @param {String} json CONSTANTS.json
 */
export default function getConstantDescription(symbol) {
  if (!exists(symbol)) return;

  const json = {
    ...CONSTANTS,
    ...MECHANICS
  };

  if (!exists(json[symbol])) return;

  return json[symbol].description;
}
