import { definePanel } from '@directus/extensions-sdk';

export default definePanel({
  id: 'my-panel',
  name: 'My Panel',
  icon: 'box',
  description: 'A custom panel',
  component: null,
  options: null,
  minWidth: 12,
  minHeight: 8,
});
