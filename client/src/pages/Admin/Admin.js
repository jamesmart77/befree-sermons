import React, { Component } from 'react';
import { Row } from "../../components/Grid";
import HeaderSection from "../../components/HeaderSection";
import SermonCard from "../../components/SermonCard";
import Button from '../../components/Button';
import API from '../../utils/API'
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import {Collapsible, Input} from 'react-materialize';

class Sermons extends Component {

    state = {
        title: "",
        link: "",
        date: "",
        description: "",
        book: '',
        chapter: '',
        startingVerse: '',
        endingVerse: '',
        savedSermons: [],
        bibleBooks: [],
        bookChapters: [],
        verses: []
    };

    componentDidMount = update => {
        //get previously saved articles
        API.getSavedSermons()
        .then((res) => {
            this.setState({savedSermons: res.data});
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

    handleChapterChange = event => {
        this.handleInputChange(event);

        let selectedChapter = event.target.value;

        //get bible books and set state
        let chapterVerses = API.getChapterVerse(this.state.book, selectedChapter);
        let verses = [];

        for(let i = 0; i < chapterVerses; i++){
            verses.push(i + 1);
        };
        this.setState({ verses: verses})
    }

    handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();

        if(this.state.title === '' || this.state.link === '' || this.state.date === '' 
            || this.state.description === '' || this.state.book === '' || this.state.chapter === ''
            || this.state.startingVerse === '' || this.state.endingVerse === ''){
            toast.error("All form fields are required...");
            return
        }

        if(parseInt(this.state.startingVerse) > parseInt(this.state.endingVerse)){
            toast.error("Starting verse cannot be greater than ending verse");
            return
        }

        const params = {
            title: this.state.title,
            link: this.state.link,
            date: this.state.date,
            description: this.state.description,
            book: this.state.book,
            chapter: this.state.chapter,
            startingVerse: this.state.startingVerse,
            endingVerse: this.state.endingVerse
        }

        API.saveSermon(params)
        .then(res => {

            //add saved sermon to existing state array (push)
            this.setState({ savedSermons: [...this.state.savedSermons, res.data] })
            // reset state
            this.setState({
                title: '',
                link: '',
                date: '',
                description: '',
                book: '',
                chapter: '',
                startingVerse: '',
                endingVerse: ''
            });

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
                                <Input 
                                    s={3} 
                                    type='select' 
                                    label='Scripture Preached On'
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
                                    s={3} 
                                    type='select' 
                                    id="chapter"
                                    name="chapter"
                                    validate={true}
                                    value={this.state.chapter}
                                    onChange={this.handleChapterChange}
                                >
                                    <option value="" disabled selected>Chapter</option>
                                    {this.state.bookChapters.map(verse => (
                                        <option key={verse} value={verse}>{verse}</option>
                                    ))}
                                </Input>
                                <Input 
                                    s={3} 
                                    type='select' 
                                    id="startingVerse"
                                    name="startingVerse"
                                    validate={true}
                                    value={this.state.startingVerse}
                                    onChange={this.handleInputChange}
                                >
                                    <option value="" disabled selected>Starting Verse</option>
                                    {this.state.verses.map(verse => (
                                        <option key={verse} value={verse}>{verse}</option>
                                    ))}
                                </Input>
                                <Input 
                                    s={3} 
                                    type='select' 
                                    id="endingVerse"
                                    name="endingVerse"
                                    validate={true}
                                    value={this.state.endingVerse}
                                    onChange={this.handleInputChange}
                                >
                                    <option value="" disabled selected>Ending Verse</option>
                                    {this.state.verses.map(verse => (
                                        <option key={verse} value={verse}>{verse}</option>
                                    ))}
                                </Input>
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
