import React, { Component } from 'react';
import { Row } from "../../components/Grid";
import HeaderSection from "../../components/HeaderSection";
import SermonCard from "../../components/SermonCard";
import API from '../../utils/API';
import {Collapsible, Input, Button} from 'react-materialize';
import { ToastContainer, toast } from 'react-toastify';

class Sermons extends Component {
    
    constructor() {
        super();
        this.state = {
            savedSermons: [],
            bibleBooks: [],
            bookChapters: [],
            book: '',
            chapter: '',
            admin: false
        }
    }

    componentDidMount = update => {
        //get previously saved articles
        API.getSavedSermons()
        .then((res) => {
            this.setState({savedSermons: res.data})
        })
        .catch((err) => console.log(err));

        //get bible books and set state
        let data = API.getScriptureBooks();
        this.setState({ bibleBooks: data})
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleBookChange = event => {
        this.handleInputChange(event);

        let bookName = event.target.value;

        //get bible books and set state
        let bookChapters = API.getBookChapters(bookName);
        let chapters = [];

        for(let i = 0; i < bookChapters; i++){
            chapters.push(i + 1);
        };
        this.setState({ bookChapters: chapters})
    }

    onSearch = event => {
        event.preventDefault();
        let book = this.state.book;
        let chapter =this.state.chapter;
        if( book === '' && chapter === ''){
            toast.error("No search criteria provided...");
            return
        }

        const params = {
            book: book,
            chapter: chapter
        }

        API.searchSermons(params)
        .then( data => {
            console.log("RESULTS: ", data.data)
            this.setState({ savedSermons: data.data})
        })
        .catch( err => {
            console.log("ERROR: ", err)
        })
    }


  render() {
    return (
        <main className="main-body">
            <div className='container padding-1'>
               <HeaderSection/>
               
               <div className="col s12 m12 l12 xl12">
                    <hr className="sermon-hr"/>
                    <Row>
                        <Input 
                            s={8}
                            m={3} 
                            type='select' 
                            label='Sermon Search'
                            id="book"
                            name="book"
                            validate={true}
                            value={this.state.book}
                            onChange={this.handleBookChange}
                        >
                            <option value="" disabled selected>Book</option>
                            {this.state.bibleBooks.map(book => (
                                <option key={book} value={book}>{book}</option>

                            ))}
                        </Input>
                        <Input 
                            s={8}
                            m={3}  
                            type='select' 
                            id="chapter"
                            name="chapter"
                            validate={true}
                            value={this.state.chapter}
                            onChange={this.handleInputChange}
                        >
                            <option value="" disabled selected>Chapter</option>
                            {this.state.bookChapters.map(chapter => (
                                <option key={chapter} value={chapter}>{chapter}</option>
                            ))}
                        </Input>
                        <Button floating className='teal search-btn' waves='light' icon='search' onClick={this.onSearch}>Search</Button>
                        <ToastContainer/>
                    </Row>
                </div>

               {this.state.savedSermons.length ? (
                
                    <div className="row">
                        <Collapsible accordion popout>
                            {this.state.savedSermons.map(sermon => (
                                
                                <SermonCard
                                    key = {sermon._id}
                                    title={sermon.title}
                                    url = {sermon.link}
                                    date =  {sermon.date}
                                    description = {sermon.description}
                                    book = {sermon.book}
                                    chapter = {sermon.chapter}
                                    startingVerse = {sermon.startingVerse}
                                    endingVerse = {sermon.endingVerse}
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
