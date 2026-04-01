import { defineDisplay } from '@wbce-d9/extensions-sdk';

export default defineDisplay({
  id: 'my-display',
  name: 'My Display',
  icon: 'box',
  description: 'A custom display',
  component: null,
  options: null,
  types: ['string'],
});
