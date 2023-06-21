import { IndustryListItem as ListItemMapping } from '../mapping.js';

const createListItems = async (jsonListItems, parent) => {
  const listItems = JSON.parse(jsonListItems);
  for (let item of listItems) {
    await ListItemMapping.create({
      value: item.value,
      indInfoId: parent,
    });
  }
};

export default createListItems;
