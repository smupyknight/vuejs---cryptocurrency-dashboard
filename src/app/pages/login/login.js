/* ============
 * Login User
 * ============
 *
 * This is the page for logging user in.
 */

// import auth from './../../services/auth';
import Forms from './../../utils/forms/forms';
import Formvue from './../../components/form/form.vue';

export default {
    data() {
        return {
            form: new Forms({
                email: {
                    value: '',
                    type: 'email',
                },
                password: {
                    value: '',
                    type: 'password',
                },
            }),
            form_register: new Forms({
                name: {
                    value: '',
                    type: 'text'
                },
                email: {
                    value: '',
                    type: 'email'
                },
                password: {
                    value: '',
                    type: 'password'
                },
                confirm_password: {
                    value: '',
                    type: 'password'
                },
            }),
        };
    },

    methods: {
        /**
         * Logs the user in
         */
        login() {
            // this.form.loading = true;
            // auth.login(this.form.data())
            //     .catch((errors) => {
            //         this.form.loading = false;
            //         this.form.recordErrors(errors);
            //     });
            console.log('login');
        },
        register() {
            // this.form.loading = true;
            // console.log(this.form.data());
            // Auth.register(this.form.data())
            //   .then(() => {
            //       Vue.router.push({
            //           name: 'home'
            //       });
            //   })
            //   .catch((errors) => {
            //       console.log(errors, ' errors register');
            //       this.form.loading = false;
            //       this.form.recordErrors(errors);
            //   })
            console.log('register');
        }
    },

    components: {
        formv: Formvue,
    },
};
