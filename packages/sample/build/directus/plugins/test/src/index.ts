import { defineHook } from '@wbce-d9/extensions-sdk';
import {Hello} from "shared"

export default defineHook(({ action }) => {
  action('items.create', (input) => {
    console.log('Item created:', input);
    new Hello();
  });
});
