import Errors from './errors';

export default class Forms {
  /**
   * Class constructor receives the initial fields and default values of the form and assign
   * to class atributes. Also assign the fields object that is used to render proper
   * inputs, the options object for selectboxes and the error class. Bind methods.
   *
   * @param {Object} data  The initial data fields.
   */
  constructor(data) {
    this.successMessage = '';
    this.fields = {};
    this.labels = {};
    this.options = {};
    this.hidden = [];
    this.disabled = [];
    this.tooltips = {};
    this.extraAttr = {};
    this.loading = false;
    this.quickForms = {};
    this.initialAssign(data);

    this.errors = new Errors();
    this.assignData = this.assignData.bind(this);
    this.recordErrors = this.recordErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  /**
   * Set quick form component for a field.
   *
   * @param {String} field The field name.
   * @param {Object} component The component to be inserted into the modal.
   */
  setQuickForm(field, component) {
    this.quickForms[field] = component;
  }


  /**
   * This method will be called to set selectbox or autocomplete options.
   *
   * @param {String} field  The field to be assigned the options.
   * @param {Object} options  The options object.
   */
  setOptions(field, options = []) {
    this.options[field] = options;
  }

  /**
   * This method will be called to assign specific field data.
   *
   * @param {String} field  The field to be assigned the data.
   * @param {String} value  The value to be assigned.
   */
  setFieldData(field, value = '') {
    if (this.fields[field] === 'file') {
      if (!value) {
        this[field] = {};
      } else {
        this[field] = Object.assign({}, value);
      }
    } else {
      this[field] = value;
    }
  }

  /**
   * This method will be called to set the field type.
   *
   * @param {String} field  The field to be assigned the type.
   * @param {String} type  The type to be assigned.
   */
  setField(field, type = 'text') {
    this.fields[field] = type;
  }

  /**
   * This method will be called to set the labels.
   *
   * @param {String} field  The field to be assigned the label.
   * @param {String} label  The label to be assigned.
   */
  setLabels(field, label) {
    this.labels[field] = label;
  }

  /**
   * This method will be called to initially assign data and field types.
   *
   * @param {Object} data  The data object with fields and types.
   */
  initialAssign(data) {
    Object.keys(data).map((key) => {
      if (typeof data[key] === 'string') {
        this.setField(key);
        this.setFieldData(key, data[key]);
        return null;
      }
      this.setField(key, data[key].type);
      this.setFieldData(key, data[key].value);
      if (data[key].type === 'select' || data[key].type === 'autocomplete') {
        this.setOptions(key);
      }
      this.setLabels(key, data[key].label);
      return null;
    });
  }

  /**
   * This method will be called when data is fetched for editing.
   *
   * @param {Object} data  The data object with fields.
   */
  assignData(data) {
    Object.keys(data).map((key) => {
      if (this[key] !== undefined) {
        this.setFieldData(key, data[key]);
      }
      return null;
    });
  }

  /**
   * This method will be called to retrieves the form data.
   */
  data() {
    const data = Object.assign({}, this);
    delete data.errors;
    delete data.fields;
    delete data.successMessage;
    delete data.options;
    delete data.labels;
    delete data.hidden;
    delete data.disabled;
    delete data.extraAttr;
    delete data.tooltips;
    delete data.loading;
    return data;
  }

  /**
   * This method will be called to record the errors from validation.
   *
   * @param {Object} errors  The errors object.
   */
  recordErrors(errors) {
    const validKeys = Object.keys(errors).filter(key => Object.keys(this.fields).indexOf(key) >= 0);
    const validErrors = {};
    validKeys.forEach((key) => {
      validErrors[key] = errors[key];
    });
    this.errors.record(validErrors);
  }

  /**
   * This method will be called to record the errors from validation.
   *
   * @param {String} field  The field to clear.
   */
  clearErrors(field) {
    this.errors.clear(field);
  }

  /**
   * This method will clear the success message.
   *
   * @param {String} field  The input field name.
   * @param {String} value  The changing input value.
   */
  clearSuccess(field, value) {
    let oldValue = this[field];
    if (typeof oldValue === 'number') {
      oldValue = oldValue.toString();
    }

    if (typeof value === 'number') {
      // eslint-disable-next-line
      value = value.toString();
    }

    if (oldValue !== value) {
      this.successMessage = '';
    }
  }

  /**
   * Enables field of the form.
   *
   * @param {String} field Field name.
   */
  enableField(field) {
    if (this.disabled.indexOf(field) >= 0) {
      this.disabled.splice(this.disabled.indexOf(field), 1);
    }
  }

  /**
   * Disables field of the form.
   *
   * @param {String} field Field name.
   */
  disableField(field) {
    if (this.disabled.indexOf(field) < 0) {
      this.disabled.push(field);
    }
  }

  /**
   * Return bool indicating field state.
   *
   * @param {String} field
   */
  isDisabled(field) {
    return this.disabled.indexOf(field) >= 0;
  }

  /**
   * Removes field from the form.
   *
   * @param {String} field Field name.
   */
  hideField(field) {
    if (this.hidden.indexOf(field) < 0) {
      this.hidden.push(field);
      this[field] = '';
    }
  }

  /**
   * Shows hided field.
   *
   * @param {String} field The field name.
   */
  showField(field) {
    this.hidden.splice(this.hidden.indexOf(field), 1);
  }

  /**
   * Return bool indicating field state.
   *
   * @param {String} field
   */
  isHidden(field) {
    return this.hidden.indexOf(field) >= 0;
  }

  /**
   * Set a tooltip for a given field.
   *
   * @param {String} field The field name.
   * @param {String} text The tooltip text.
   */
  setTooltip(field, text, placement = 'top-end') {
    this.tooltips[field] = {
      text,
      placement,
    };
  }

  /**
   * Set extra attributes to a input.
   *
   * @param {String} field The field name.
   * @param {Object} attrs The object with the attributes.
   */
  setExtraAttr(field, attrs = {}) {
    this.extraAttr[field] = attrs;
  }

  /**
   * Get extra attributes to a input.
   *
   * @param {String} field The field name.
   */
  getExtraAttr(field) {
    return this.extraAttr[field] ? this.extraAttr[field] : {};
  }
}
