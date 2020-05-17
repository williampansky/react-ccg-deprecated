import replaceConstant from './replace-constants';
import exists from './element.exists';

export default function formatHeroAbility(string, key) {
  if (!exists(string)) return;

  const costMATCH = string.match(/cost\((.*?)\)/g)[0],
    cooldownMATCH = string.match(/cooldown\((.*?)\)/g)[0],
    nameMATCH = string.match(/name\((.*?)\)/g)[0],
    descriptionMATCH = string.match(/description\((.*?)\)/g)[0],
    typeMATCH = string.match(/type\((.*?)\)/g)[0];

  if (!exists(costMATCH)) return;
  if (!exists(cooldownMATCH)) return;
  if (!exists(nameMATCH)) return;
  if (!exists(descriptionMATCH)) return;
  if (!exists(typeMATCH)) return;

  const cost = costMATCH.replace('cost(', '').replace(')', ''),
    cooldown = cooldownMATCH.replace('cooldown(', '').replace(')', ''),
    name = nameMATCH.replace('name(', '').replace(')', ''),
    description = descriptionMATCH.replace('description(', '').replace(')', ''),
    type = typeMATCH.replace('type(', '').replace(')', '');

  switch (key) {
    case 'cost':
      return `${cost}`;
    case 'cooldown':
      return `${cooldown === '-1' ? 'Ult' : cooldown}`;
    case 'name':
      return `${replaceConstant(name)}`;
    case 'description':
      return `${replaceConstant(description)}`;
    case 'type':
      return `${replaceConstant(type)}`;
    default:
      return `${replaceConstant(
        name
      )} (${cost} / ${cooldown}): ${replaceConstant(description)} `;
  }
}
