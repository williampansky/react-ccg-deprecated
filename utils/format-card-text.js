import replaceDynamicText from '@/utils/replace-dynamic-text';
import replaceConstant from '@/utils/replace-constants';

export default function formatCardText(
  string = '',
  numPrimary = 0,
  numSecondary = 0,
  spellDmgBoon = 0
) {
  const PRIMARY = parseInt(numPrimary + spellDmgBoon);
  const SECONDARY = parseInt(numSecondary + spellDmgBoon);

  const replacedDynamicDmg = replaceDynamicText(string, PRIMARY, SECONDARY);
  const replacedSymbols = replaceConstant(replacedDynamicDmg);
  return replacedSymbols;
}
