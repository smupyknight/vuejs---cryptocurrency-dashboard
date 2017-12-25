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
      type: String,
      required: false,
      default: '',
    },
  },

  /**
   * This function will be called to render the HTML.
   *
   * @param  {Function} h Mandatory for vue to render JSX.
   */
  // eslint-disable-next-line
  render (h) {
    return (<p>{this.value}</p>);
  },
};
