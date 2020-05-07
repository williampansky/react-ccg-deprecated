import GAME from '@/data/cards/cards-GAME.json';
import CORE from '@/data/cards/cards-CORE.json';
import PRIME from '@/data/cards/cards-PRIME.json';
import ENTOURAGE from '@/data/cards/cards-ENTOURAGE.json';

const CARD_DATABASE = {
  // ...GAME,
  ...CORE,
  ...PRIME,
  ...ENTOURAGE
};

export default CARD_DATABASE;
