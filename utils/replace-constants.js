import CONSTANTS from '@/enums/CONSTANTS.json';
import HEROS from '@/enums/HEROS.json';
import MECHANICS from '@/enums/MECHANICS.json';
import exists from '@/utils/element.exists';

/**
 * Parses string and replaces the symbol with the relative constant.
 * @param {String} string HTML string to parse
 * @param {String} symbol Symbol to target and replace
 */
export default function replaceConstant(string) {
  if (!exists(string)) return;

  const json = {
    ...CONSTANTS,
    ...HEROS,
    ...MECHANICS
  };

  return string.replace(/%(.*?)%/g, m => json[m] && json[m].name);
}
