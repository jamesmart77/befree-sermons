import React, { Component } from 'react';
import { Row } from "../../components/Grid";
import HeaderSection from "../../components/HeaderSection";
import SermonCard from "../../components/SermonCard";
import Button from '../../components/Button';
import API from '../../utils/API'
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import {Collapsible} from 'react-materialize';

class Sermons extends Component {

    state = {
        title: "",
        link: "",
        date: "",
        description: "",
        searchResults: [],
        savedSermons: []
    };

    componentDidMount = update => {
        //get previously saved articles
        API.getSavedSermons()
        .then((res) => {
            this.setState({savedSermons: res.data});
            console.log(this.state.savedSermons);
        })
        .catch((err) => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();

        if(this.state.title === '' || this.state.link === '' || this.state.date === '' || this.state.description === ''){
            toast.error("All form fields are required...");
            return
        }

        const params = {
            title: this.state.title,
            link: this.state.link,
            date: this.state.date,
            description: this.state.description
        }

        API.saveSermon(params)
        .then(res => {
            console.log("DATA: ", res.data)

            //add saved article to existing state array (push)
            this.setState({ savedSermons: [...this.state.savedSermons, res.data] })

            toast("Upload Successful!", {
                className: css({
                background: "#388e3c",
                color: "white"
                })
            });
            
        })
        .catch(err => {
            toast.error("Whoops, something went wrong. Please log back in.", {
                onClose: () => window.location = '/'
            });
        })
    };


  render() {
    return (
        <main className="main-body">
            <div className='container padding-1'>
               <div className="col s12 m12 l12 xl12">
                    <Row>
                        <h5>Upload New Sermon</h5>
                        <form className="col s12">
                            <Row>
                                <div className="input-field col s12 m6">
                                    <input 
                                        id="title" 
                                        name="title"
                                        value={this.state.title}
                                        type="text" 
                                        className="validate" 
                                        required="required"
                                        onChange={this.handleInputChange} 
                                    />
                                    <label htmlFor="title">Sermon Title</label>
                                </div>
                                <div className="input-field col s12 m6">
                                    <input 
                                        id="date"
                                        name="date"
                                        type="date" 
                                        className="validate" 
                                        required="required"
                                        value={this.state.date}
                                        onChange={this.handleInputChange}
                                    />
                                    {/* <label htmlFor="date">Sermon Date</label> */}
                                </div>
                                <div className="input-field col s12">
                                    <input 
                                        id="link"
                                        name="link" 
                                        type="url" 
                                        className="validate" 
                                        required="required"
                                        value={this.state.link}
                                        onChange={this.handleInputChange} 
                                    />
                                    <label htmlFor="link">Google Drive Link</label>
                                </div>
                            </Row>
                            <Row>
                                <div className="input-field col s12">
                                    <input 
                                        id="description"
                                        name="description" 
                                        type="text" 
                                        className="materialize-textarea" 
                                        required="required"
                                        value={this.state.description}
                                        onChange={this.handleInputChange}
                                    />
                                    <label htmlFor="description">Sermon Description</label>
                                </div>
                            </Row>
                            <Row>
                            <a className="waves-effect waves-light btn right" onClick={this.handleFormSubmit}>Upload</a>
                            <ToastContainer/>
                            </Row>
                        </form>
                    </Row>
                </div>
        
               {this.state.savedSermons.length ? (
                
                    <div className="row">
                        <Collapsible accordion popout>
                            {this.state.savedSermons.map((sermon) => (
                             
                                <SermonCard
                                    key = {sermon._id}
                                    title={sermon.title}
                                    url = {sermon.link}
                                    date =  {sermon.date}
                                    description = {sermon.description}
                                />
                            ))}
                        </Collapsible>
                    </div>
                ) : ""}
            </div>
        </main>);
    };
};

export default Sermons;
