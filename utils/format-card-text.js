import replaceDynamicText from '@/utils/replace-dynamic-text';
import replaceConstant from '@/utils/replace-constants';

export default function formatCardText(string, spellDmg) {
  const replacedDynamicDmg = replaceDynamicText(string, spellDmg);
  const replacedSymbols = replaceConstant(replacedDynamicDmg);
  return replacedSymbols;
}
