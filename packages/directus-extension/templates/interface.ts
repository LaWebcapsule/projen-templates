import { defineInterface } from '@directus/extensions-sdk';

export default defineInterface({
  id: 'my-interface',
  name: 'My Interface',
  icon: 'box',
  description: 'A custom interface',
  component: null,
  options: null,
  types: ['string'],
});
