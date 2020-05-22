import MECHANICS from '@/enums/MECHANICS.json';
import exists from './element.exists';

/**
 * Returns the shortDescription of the provided parsed constant.
 * @param {String} symbol Symbol to match
 * @param {String} json MECHANICS.json
 */
export default function getMechanicShortDescription(symbol) {
  if (!exists(symbol)) return;
  if (!exists(MECHANICS[symbol])) return;
  if (!exists(MECHANICS[symbol].shortDescription)) return;
  return MECHANICS[symbol].shortDescription;
}
