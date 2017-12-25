export default class Errors {
  /**
   * Class constructor assign errors property and bind methods.
   */
  constructor() {
    this.errors = {};
    this.record = this.record.bind(this);
    this.clear = this.clear.bind(this);
  }

  /**
   * This method will be called to get field error.
   *
   * @param {String} field  The field get error from.
   */
  get(field) {
    if (field === 'error' && this.errors[field]) {
      return this.errors[field].message;
    }

    if (this.errors[field]) {
      return this.errors[field][0];
    }

    return null;
  }

  /**
   * This method will be called to record the errors.
   *
   * @param {Object} errors  The errors object.
   */
  record(errors) {
    this.errors = errors;
    Object.keys(this.errors).map((key) => {
      if (this.errors[key] === undefined && key !== 'error') {
        delete this.errors[key];
      }
      return null;
    });
  }

  /**
   * This method will be called to clear a field error.
   *
   * @param {String} field  The field to be cleared.
   */
  clear(field) {
    if (field.endsWith('Confirmation')) {
      // eslint-disable-next-line
      field = field.slice(0, field.length - 'Confirmation'.length);
    }
    delete this.errors[field];
    delete this.errors.error;
  }

  /**
   * This method will be called to check if field has error.
   *
   * @param {String} field  The field to be checked.
   */
  has(field) {
    return Object.prototype.hasOwnProperty.call(this.errors, field);
  }

  /**
   * This method will be called to check if the form has any error.
   */
  any() {
    return Object.keys(this.errors).length > 0;
  }
}
