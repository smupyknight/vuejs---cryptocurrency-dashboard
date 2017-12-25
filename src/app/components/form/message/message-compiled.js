'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* ============
 * Message Component
 * ============
 *
 * Component for general form messages.
 */

exports.default = {
  props: {
    /**
     * The success message.
     */
    success: {
      type: String,
      required: false
    },

    /**
     * The error message.
     */
    error: {
      type: String,
      required: false
    },

    /**
     * The warning message.
     */
    warning: {
      type: String,
      required: false
    }
  },

  computed: {
    type: function type() {
      if (this.success) {
        return 'success';
      } else if (this.error) {
        return 'error';
      }

      return 'warning';
    }
  }
};

//# sourceMappingURL=message-compiled.js.map