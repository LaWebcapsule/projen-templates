import { defineModule } from '@directus/extensions-sdk';

export default defineModule({
  id: 'my-module',
  name: 'My Module',
  icon: 'box',
  routes: [
    {
      path: '/',
      component: null,
    },
  ],
});
