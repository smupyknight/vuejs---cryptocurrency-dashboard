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
      type: [String, Object],
      required: false,
      default: '',
    },

    /**
     * The options for the select field. Should be a array of objects with id and name attributes.
     */
    options: {
      type: Array,
      required: false,
      default: () => [],
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
  },

  methods: {
    /**
     * This method will be called when input event is fired.
     *
     * @param  {String} name    The field name.
     */
    onInput(name) {
      return (value) => {
        const filteredOptions = this.options.filter(o => (
          o.name.toLowerCase() === value.toLowerCase()
        ));

        if (filteredOptions.length > 0) {
          value = filteredOptions[0];
        }
        this.$emit('keydown', name, value);
      };
    },

    getValue() {
      if (typeof this.value === 'object') {
        return this.value.name.toLowerCase();
      }
      return this.value;
    },

    fetchSuggestions(queryString, cb) {
      const options = this.options.map((o) => {
        o.value = o.name.toLowerCase();
        return o;
      });
      const createFilter = option => (option.value.indexOf(queryString.toLowerCase()) === 0);
      const results = queryString ? options.filter(createFilter) : options;
      // call callback function to return suggestions
      cb(results);
    },
  },

  /**
   * This function will be called to render the HTML.
   *
   * @param  {Function} h    Mandatory for vue to render JSX.
   */
  // eslint-disable-next-line
  render (h) {
    const input = <el-autocomplete
      value={this.getValue()}
      onInput={this.onInput(this.name)}
      placeholder={this.translation ? this.$t(`${this.translation}.placeholder`) : this.name}
      name={this.name}
      fetchSuggestions={this.fetchSuggestions}
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
