import { defineDisplay } from '@directus/extensions-sdk';

export default defineDisplay({
  id: 'my-display',
  name: 'My Display',
  icon: 'box',
  description: 'A custom display',
  component: null,
  options: null,
  types: ['string'],
});
