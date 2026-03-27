import { defineOperationApi } from '@directus/extensions-sdk';

export default defineOperationApi({
  id: 'my-operation',
  handler: async (_options) => {
    return { success: true };
  },
});
