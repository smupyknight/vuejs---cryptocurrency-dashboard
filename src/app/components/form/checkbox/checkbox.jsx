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
     * The field type.
     */
    type: {
      type: String,
      required: false,
    },

    /**
     * The field value.
     */
    value: {
      required: false,
      default: false,
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
    onChange(name) {
      return (e) => {
        this.$emit('change', name, e.target.checked);
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
    let label = this.translation ? this.$t(`${this.translation}.placeholder`) : this.name;
    if (label !== this.name && this.type === 'term') {
      const openAnchorStart = label.search('<a');
      const openAnchorEnd = label.search('>');
      const closingAnchor = label.search('</a>');
      const hrefStart = label.indexOf('href="');
      const hrefEnd = label.indexOf('"', hrefStart + 6);
      label = [
        label.slice(0, openAnchorStart),
        <a target="_blank" href={label.slice(hrefStart + 6, hrefEnd)}>
             {label.slice(openAnchorEnd + 1, closingAnchor)}
          </a>,
        label.slice(closingAnchor + 4),
      ];
    }
    const input = [
      <el-checkbox
          checked={!!this.value}
          onChange={this.onChange(this.name)}
          name={this.name}
        />,
      <span>&nbsp;{label}</span>,
    ];

    if (!this.insideForm) {
      return input;
    }

    let groupLabel = null;
    if (this.hasLabel) {
      groupLabel = this.translation ? this.$t(`${this.translation}.label`) : this.name;
    }

    return (
      <el-form-item
        error={this.error}
        label={groupLabel}
      >
        {input}
      </el-form-item>
    );
  },
};
