import { mapMutations } from 'vuex';

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

    /**
     * If the input accepts many options.
     */
    multiple: {
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

    /**
     * If user can filter options.
     */
    filterable: {
      type: Boolean,
      default: true,
    },

    /**
     * If options come from server.
     */
    remote: {
      type: Boolean,
      default: false,
    },

    /**
     * Method to fetch options from server.
     */
    remoteMethod: {
      type: Function,
      required: false,
    },

    /**
     * If it is loading options from server.
     */
    loading: {
      type: Boolean,
      default: false,
    },

    /**
     * The component to add another option.
     */
    quickForm: {
      type: Object,
      required: false,
    },

  },

  methods: {
    ...mapMutations({
      toggleModal: 'TOGGLE_MODAL',
      setModalContent: 'SET_MODAL_CONTENT',
      unsetModalContent: 'UNSET_MODAL_CONTENT',
    }),

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

    onQuickFormClick() {
      this.setModalContent(this.quickForm);
      this.toggleModal(true);
    },
  },

  /**
   * This function will be called to render the HTML.
   *
   * @param  {Function} h    Mandatory for vue to render JSX.
   */
  // eslint-disable-next-line
  render (h) {
    let value = this.value;
    if (typeof this.value !== 'object') {
      value = value.toString();
    }
    const options = Object.keys(this.options).map(k => (
      <el-option
        value={this.options[k].id.toString()}
        label={this.options[k].name.toString()}
      />
    ));
    const select = (
      <el-select
        value={value}
        loading={this.loading}
        filterable={this.filterable}
        disabled={this.disabled}
        onInput={this.onInput(this.name)}
        name={this.name}
        multiple={this.multiple}
        placeholder={this.translation ? this.$t(`${this.translation}.placeholder`) : this.name}
      >
        {
          options
        }
      </el-select>
    );

    if (!this.insideForm) {
      return select;
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
          {select}
          {
            this.quickForm ?
                <el-button
                    onClick={this.onQuickFormClick}
                    icon="plus"
                    class="small"
                    style="margin-left:5px;"
                >
                </el-button> :
                null
          }
        </el-form-item>
    );

  },
};
