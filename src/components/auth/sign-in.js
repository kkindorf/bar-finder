import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
    handleFormSubmit({email, password}) {
        console.log(email, password);
        this.props.signinUser({ email, password });
    }
    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }
    render() {
        //handleSubmit is a helper from redux-form and the fields email and password are also from redux-form
        const { handleSubmit, fields: { email, password }} = this.props;

       return (
        <div className="row">
            <div className="col-sm-12 auth-container">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset className="form-group">
                        <label>Email:</label>
                        <input {...email} className="form-control"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Password:</label>
                        <input {...password} type="password" className="form-control"/>
                    </fieldset>
                    {this.renderAlert()}
                    <button action="submit" className="btn btn-primary">Sign In</button>
                </form>
                <p>Don't have an account yet? <a href="/signup">Sign up here.</a></p>
            </div>
        </div>

        
       );
    }
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}
export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);