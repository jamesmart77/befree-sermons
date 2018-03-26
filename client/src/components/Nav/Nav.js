import React from "react";
import {Modal, Button} from "react-materialize";
import API from '../../utils/API'

// materialize navbar
class Nav extends React.Component {

    state = {
        username:'',
        password:''
    }

    handleChange = event => {
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        
        API.login(this.state)
        .then(data => {
            // current base url address
            const currentURL = window.location.origin;
            window.location = currentURL + "/admin";
            console.log("SUCCESS", data)
        })
        .catch(err => console.log("ERROR", err))
      }

    render(){
        return(
            <header>
                <nav className="white">
                    {/* <!-- Navigation Bar --> */}
                    <div className="nav-wrapper">
                        <a className="logo-wrapper" href="/"><img className="header-logo" src="assets/img/logo.png"  alt="logo"/></a>
                        <ul id="nav-mobile" className="right">
                            <Modal
                                header='Login Credentials...'
                                trigger={<Button>Admin Login</Button>}
                                actions={<Button onClick={this.handleSubmit}>Submit</Button>}>
                                <div className='col input-field s12'>
                                    <input value={this.state.username} onChange={this.handleChange} type='text' name='username' id='username-input' />
                                    <label className='active' htmlFor='username-input'>username</label>
                                </div>
                                <div className='col input-field s12'>
                                    <input value={this.state.password} onChange={this.handleChange} type='text' name='password' id='password-input' />
                                    <label htmlFor='password-input'>password</label>
                                </div>
                            </Modal>
                        </ul>
                    </div>
                </nav>
            </header>
    )}
}


export default Nav;
