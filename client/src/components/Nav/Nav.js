import React from "react";
import {Modal, Button} from "react-materialize";
import API from '../../utils/API'

// materialize navbar
class Nav extends React.Component {

    state = {
        username:'',
        password:'',
        admin: false
    }

    componentWillMount(){
        window.location.pathname === '/admin' ? this.setState({ admin: true}) : this.setState({ admin: false});
    }

    handleChange = event => {
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleLogOut = event => {
        event.preventDefault();

        //delete the admin cookie
        document.cookie = "befree-id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        const domainURL = window.location.origin;
        window.location = domainURL;
    }

    handleSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        
        API.login(this.state)
        .then(data => {
            //successful authentication --> redirect to /admin
            // current base url address
            const domainURL = window.location.origin;
            window.location = domainURL + "/admin";
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
                            {this.state.admin ? (
                                <Button className="nav-btn" onClick={this.handleLogOut}>Logout</Button>
                            ) : (
                                <Modal
                                    header='Login Credentials...'
                                    trigger={<Button className="nav-btn">Admin Login</Button>}
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
                            )
                            }
                        </ul>
                    </div>
                </nav>
            </header>
    )}
}


export default Nav;
