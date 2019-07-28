import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    session: service(),
    toastr: service('toast'),
    
    actions: {
        authenticate() {
            try {
                let { username, password } = this.getProperties('username', 'password');
                this.get('session').authenticate('authenticator:oauth2', username, password).catch((reason) => {
                    this.set('errorMessage', reason.error || reason);
                });
            } catch (error) {
                if (error) {
                    this.toastr.error('Password or username is wrong', 'Error')
                }
            }
        }
    }
});
