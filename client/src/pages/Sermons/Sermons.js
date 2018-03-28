import React, { Component } from 'react';
import { Row } from "../../components/Grid";
import HeaderSection from "../../components/HeaderSection";
import SermonCard from "../../components/SermonCard";
import Button from '../../components/Button';
import API from '../../utils/API'

class Sermons extends Component {

    state = {
        searchCriteria: "",
        startYear: 2018,
        endYear:2018,
        searchResults: [],
        savedSermons: []
    };

    componentDidMount = update => {
        //get previously saved articles
        API.getSavedSermons()
        .then((res) => {
            this.setState({savedSermons: res.data})
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

        //if user performs empty search, find current top stories
        if(this.state.searchCriteria === ''){
            this.setState({
            searchCriteria: "top stories"
            })
        }

        const searchParams = {
            queryText: this.state.searchCriteria,
            startYear: this.state.startYear,
            endYear: this.state.endYear
        }
    };


  render() {
    return (
        <main className="main-body">
            <div className='container padding-1'>
               <HeaderSection/>
               
               <div className="col s12 m12 l12 xl12">
                    <hr className="sermon-hr"/>
                    <Row>
                        {/* <div className="input-field col s12 m4 l4 xl4 right">
                            <select>
                                <option value="" disabled defaultValue>Somersworth</option>
                                <option value="Somersworth">Somersworth</option>
                            </select>
                            <label>Campus</label>
                        </div> */}
                    </Row>
                </div>

               {this.state.savedSermons.length ? (
                
                    <div className="row sermon-collection">
                        {this.state.savedSermons.map(sermon => (
                            
                            <SermonCard
                                key = {sermon._id.toString()}
                                title={sermon.title}
                                url = {sermon.link}
                                date =  {sermon.date}
                                description = {sermon.description}
                            />
                        ))}
                    </div>
                ) : ""}
            </div>
        </main>);
    };
};

export default Sermons;
