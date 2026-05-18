import { defineHook } from '@wbce-d9/extensions-sdk';

export default defineHook(({ action }) => {
  action('items.create', (input) => {
    console.log('Item created:', input);
  });
});
