import { defineOperationApi } from '@wbce-d9/extensions-sdk';

export default defineOperationApi({
  id: 'my-operation',
  handler: async (_options) => {
    return { success: true };
  },
});
