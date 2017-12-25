export default {
  props: {
    /**
     * The input name.
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * The file object.
     */
    value: {
      type: Object,
      required: false,
    },

    /**
     * The base key to translate the form.
     */
    translation: {
      type: String,
      required: false,
    },
  },

  methods: {
    /**
     * This method will be called whenever a the file input changes.
     *
     * @param  {Object} e    The event fired.
     */
    onFileChange(e) {
      const files = e;
      if (!files) {
        return;
      }
      this.$set(this.value, 'file', files);

      this.createImage(files);
    },

    /**
     * This method will be called to make the input file readable for the img tag.
     *
     * @param  {Object} file    The file object.
     */
    createImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.$set(this.value, 'url', e.target.result);
      };

      reader.readAsDataURL(file);
      this.$emit('images-created', this.name, this.value);
    },

    /**
     * This method will be called to remove the image thumbnail and place the input back.
     *
     * @param  {Object} e    The event fired.
     */
    removeImage(e) {
      e.preventDefault();
      this.value.url = '';
      delete this.value.file;
      this.$emit('image-removed', this.name, this.value);
    },
  },


  /**
   * This function will be called to render the HTML.
   *
   * @param  {Function} h    Mandatory for vue to render JSX.
   */
  // eslint-disable-next-line
  render (h) {
    if (!this.value.url) {
      return (
          <div class='el-form-item'>
            <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                before-upload = {this.onFileChange}
                multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">{this.translation ? this.$t(`${this.translation}.placeholder`) : this.name}<em>{this.translation ? this.$t(`${this.translation}.placeholder2`) : this.name}</em></div>
              <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
          </div>
      );
    }
    return (
      <div class="imageEditForm">
        <div class="imageWrapper" style="width:200px;height:150px;"><img src={this.value.url || this.value.file}/></div>
        <el-button onClick={this.removeImage}>
          {this.translation ? this.$t(`${this.translation}.changeImage`) : this.name}
        </el-button><br /><br />
      </div>
    );
  },
};
