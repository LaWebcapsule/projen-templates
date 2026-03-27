import { defineHook } from '@directus/extensions-sdk';

export default defineHook(({ action }) => {
  action('items.create', (input) => {
    console.log('Item created:', input);
  });
});
