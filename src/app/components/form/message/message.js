/* ============
 * Message Component
 * ============
 *
 * Component for general form messages.
 */

export default {
  props: {
    /**
     * The success message.
     */
    success: {
      type: String,
      required: false,
    },

    /**
     * The error message.
     */
    error: {
      type: String,
      required: false,
    },

    /**
     * The warning message.
     */
    warning: {
      type: String,
      required: false,
    },
  },

  computed: {
    type() {
      if (this.success) {
        return 'success';
      } else if (this.error) {
        return 'error';
      }

      return 'warning';
    },
  },
};
