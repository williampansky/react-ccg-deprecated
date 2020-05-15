import CARD_DATABASE from '@/lib/utils/card-databse';

export default (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  return response
    .status(200)
    .json(Object.keys(CARD_DATABASE).map(i => CARD_DATABASE[i]));
};
