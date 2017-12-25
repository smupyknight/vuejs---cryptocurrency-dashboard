export default {
  props: {
    /**
     * The field name.
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * The field value.
     */
    value: {
      required: false,
      default: '',
    },

    /**
     * The base key to translate the form.
     */
    translation: {
      type: String,
      required: false,
    },

    /**
     * If the input has label.
     */
    hasLabel: {
      type: Boolean,
      required: false,
    },

    /**
     * If the input has error.
     */
    error: {
      type: String,
      required: false,
    },

    /**
     * If the input has error.
     */
    insideForm: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * If the controls are enabled.
     */
    controls: {
      type: Boolean,
      required: false,
      default: true,
    },

    /**
     * Max value to input.
     */
    max: {
      type: Number,
      required: false,
      default: undefined,
    },

    /**
     * Min value to input.
     */
    min: {
      type: String,
      required: false,
      default: undefined,
    },

    /**
     * If the input is disabled.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    /**
     * This method will be called when input event is fired.
     *
     * @param  {String} name    The field name.
     */
    onInput(name) {
      return (value) => {
        this.$emit('keydown', name, value);
      };
    },
  },

  /**
   * This function will be called to render the HTML.
   *
   * @param  {Function} h    Mandatory for vue to render JSX.
   */
  // eslint-disable-next-line
  render (h) {
    const input = (
      <el-input-number
        value={this.value}
        controls={this.controls}
        disabled={this.disabled}
        onInput={this.onInput(this.name)}
        placeholder={this.translation ? this.$t(`${this.translation}.placeholder`) : this.name}
        name={this.name}
        max={this.max}
      />
    );

    if (!this.insideForm) {
      return input;
    }

    let label = null;
    if (this.hasLabel) {
      label = this.translation ? this.$t(`${this.translation}.label`) : this.name;
    }

    return (
      <el-form-item
        error={this.error}
        label={label}
      >
        {input}
      </el-form-item>
    );
  },
};
