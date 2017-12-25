import Input from './text/text';
import NumberInput from './number/number';
import SelectInput from './select/select';
import CheckboxInput from './checkbox/checkbox';
import ImageInput from './image/image';
import FormMessage from './message/message.vue';
import DateInput from './date/date';
import DateRangeInput from './dateRange/dateRange';
import TimeInput from './time/time';
import Autocomplete from './autocomplete/autocomplete';
import PlainText from './plaintext/plaintext';

const inputs = [
  'text',
  'textarea',
  'email',
  'password',
];

export default {
  props: {
    /**
     * The form object with fields to use.
     */
    form: {
      type: Object,
      required: true,
    },

    /**
     * Method for saving the form.
     */
    save: {
      type: Function,
      required: false,
    },

    /**
     * The translation path for the button text.
     */
    btnText: {
      type: String,
      required: false,
      default: 'button.save',
    },

    /**
     * The base key to translate the form.
     */
    translation: {
      type: String,
      required: false,
    },

    /**
     * If the form has labels.
     */
    hasLabel: {
      type: Boolean,
      required: false,
    },

    /**
     * If the form has labels.
     */
    labelPosition: {
      type: String,
      required: false,
      default: 'left',
    },

    /**
     * The label width.
     */
    labelWidth: {
      type: String,
      required: false,
      default: '180px',
    },

    /**
     * If the form is inline.
     */
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    /**
     * This will be called when the form emit a change event.
     *
     * @param  {String} name    The input name.
     * @param  {String} value    The input value.
     */
    onFormChange(name, value) {
      this.form.clearSuccess(name, value);
      this.form.clearErrors(name);
      this.form[name] = value;
      this.$emit('form-change', name);
      this.$forceUpdate();
    },

    /**
     * This will be called when the form emit a keydown event.
     *
     * @param  {String} name    The input name.
     * @param  {String} value    The input value.
     */
    onFormKeydown(name, value) {
      this.form.clearSuccess(name, value);
      this.form.clearErrors(name);
      this.form[name] = value;
      this.$emit('form-keydown', name);
      this.$forceUpdate();
    },

    /**
     * This method will be called when the form is submited.
     *
     * @param  {Object} e    The event fired.
     */
    submit(e) {
      e.preventDefault();
      this.save();
    },
  },

  /**
   * This function will be called to render the HTML.
   *
   * @param  {Function} h    Mandatory for vue to render JSX.
   */
  // eslint-disable-next-line
  render (h) {
    let fields = Object.keys(this.form.fields).map((field) => {
      let formInput = null;
      let props = {
        error: this.form.errors.get(field),
        hasLabel: this.hasLabel,
        value: this.form[field],
        insideForm: true,
        name: field,
        disabled: this.form.isDisabled(field),
        translation: this.translation ? `${this.translation}.${field}` : null,
      };
      props = Object.assign(props, this.form.getExtraAttr(field));

      if (this.form.isHidden(field)) {
        return null;
      }

      if (inputs.indexOf(this.form.fields[field]) >= 0) {
        formInput = (
          <Input
            onKeydown={this.onFormKeydown}
            type={this.form.fields[field]}
            {...{ props }}
          />
        );
      } else if (this.form.fields[field] === 'number') {
        formInput = (
          <NumberInput
            onKeydown={this.onFormKeydown}
            type={this.form.fields[field]}
            {...{ props }}
          />
        );
      } else if (this.form.fields[field] === 'select') {
        formInput = (
          <SelectInput
            quickForm={this.form.quickForms[field]}
            onChange={this.onFormChange}
            options={this.form.options[field]}
            {...{ props }}
          />
        );
      } else if (this.form.fields[field] === 'checkbox' || this.form.fields[field] === 'term') {
        formInput = (
          <CheckboxInput
            onChange={this.onFormChange}
            type={this.form.fields[field]}
            {...{ props }}
          />
        );
      } else if (this.form.fields[field] === 'file') {
        formInput = (
          <ImageInput
            onImageCreated={this.onFormChange}
            onImageRemoved={this.onFormChange}
            {...{ props }}
          />
        );
      } else if (this.form.fields[field] === 'date') {
        formInput = (
          <DateInput
            onChange={this.onFormKeydown}
            {...{ props }}
          />
        );
      } else if (this.form.fields[field] === 'dateRange') {
        formInput = (
          <DateRangeInput
            onChange={this.onFormKeydown}
            {...{ props }}
          />
        );
      } else if (this.form.fields[field] === 'time') {
        formInput = (
          <TimeInput
            onKeydown={this.onFormKeydown}
            {...{ props }}
          />
        );
      } else if (this.form.fields[field] === 'autocomplete') {
        formInput = (
          <Autocomplete
            onKeydown={this.onFormKeydown}
            options={this.form.options[field]}
            {...{ props }}
          />
        );
      } else if (this.form.fields[field] === 'plaintext') {
        formInput = (
          <PlainText
            name={field}
            value={this.form[field]}
          />
        );
      }
      if (this.form.tooltips[field]) {
        const tooltipTextLines = this.form.tooltips[field].text.split('<br/>');
        const tooltipText = [];
        tooltipTextLines.map((l) => {
          tooltipText.push(l);
          tooltipText.push(<br/>);
          return l;
        });
        formInput = <el-tooltip placement={this.form.tooltips[field].placement}>
          <div slot="content">{tooltipText}</div>
          {formInput}
        </el-tooltip>;
      }
      return formInput;
    });
    fields = fields.filter(f => f);
    let labelWidth = null;
    if (this.hasLabel && (this.labelPosition === 'right' || this.labelPosition === 'left')) {
      labelWidth = this.labelWidth;
    }

    const btn = this.save ? <button
          type="primary"
          class="el-button el-button--primary"
          onClick={this.submit}
          disabled={this.form.errors.any()}
          loading={this.form.loading}
        >
          {this.btnText}
        </button> : null;

    return (
      <el-form
        labelPosition={this.labelPosition}
        labelWidth={labelWidth}
        inline={this.inline}
      >
        {fields}

        {btn}

        <FormMessage
          success={this.form.successMessage}
          error={this.form.errors.get('error')}
        />
      </el-form>
    );
  },
};
