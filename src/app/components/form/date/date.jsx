import moment from 'moment';

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
      type: [String, Date],
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
        this.$emit('change', name, value);
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
    const value = moment(this.value).isValid() ? moment(this.value).format('YYYY-MM-DD HH:mm:ss') : '';
    const input = <el-date-picker
      value={value}
      onInput={this.onInput(this.name)}
      type="date"
      disabled={this.disabled}
      placeholder={this.translation ? this.$t(`${this.translation}.placeholder`) : this.name}
      name={this.name}
      format="dd/MM/yyyy"
    />;

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
