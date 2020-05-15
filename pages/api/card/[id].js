import CARD_DATABASE from '@/lib/utils/card-databse';

export default (request, response) => {
  const {
    query: { id, name }
  } = request;

  const card = Object.keys(CARD_DATABASE)
    .map(i => CARD_DATABASE[i])
    .filter(item => {
      if (item.id.toLowerCase().includes(id)) {
        return item.id.toLowerCase().includes(id);
      } else if (item.name.toLowerCase().includes(name)) {
        return item.name.toLowerCase().includes(name);
      } else {
        return null;
      }
    });

  if (!card) return response.status(405).end('Card not found');
  return response.status(200).json(card);
};
