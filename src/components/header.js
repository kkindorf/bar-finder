import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
class Header extends Component {
    renderLinks() {
        if(this.props.authenticated) {
            //show link to sign out
            return  <li className="nav-item">
                        <Link className="nav-link" to="/signout">Sign Out</Link>
                    </li>
        }
        else {
            //show link to sign in and sign up
            return [
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/signin">Sign In</Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
            ]; 
        }
        
    }
    render() {
        return (
            <div>
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand">Home</Link>
                <ul className="nav navbar-nav">
                   {this.renderLinks()} 
                </ul>
            </nav>
                <div className="welcome-message">
                    <h1>Bar Finder</h1>
                    <h2>
                        <i aria-hidden="true" className="far fa-clock" aria-hidden="true"></i>
                        <i aria-hidden="true" className="fas fa-user-friends"></i>
                        <i aria-hidden="true" className="fas fa-beer"></i>
                    </h2>
                    <p>Use Bar Finder to coordinate with friends and meet at the best spots in town!</p>

                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated}
}
export default connect(mapStateToProps)(Header);
