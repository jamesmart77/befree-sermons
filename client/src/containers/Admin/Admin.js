import React, { Component } from 'react';
import { Row } from "../../components/Grid";
import SermonCard from "../../components/SermonCard";
import API from '../../utils/API'
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import {Collapsible, Input} from 'react-materialize';
import UploadForm from '../../components/UploadForm';

class Sermons extends Component {

    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBookChange = this.handleBookChange.bind(this);
        this.handleChapterChange = this.handleChapterChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
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
            verses: [],
            isAdmin: true
        }
    }
    

    componentDidMount = () => {
        //get previously saved articles
        API.getSavedSermons()
        .then((res) => {
            this.setState({savedSermons: res.data});
        })
        .catch((err) => console.log(err));

        //get bible books and set state
        let data = API.getScriptureBooks();
        this.setState({ bibleBooks: data})        
    };

    
    handleInputChange = (event) => {
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleBookChange = (event) => {
        this.handleInputChange(event);

        let bookName = event.target.value;

        //get bible books and set state
        let bookChapters = API.getBookChapters(bookName);
        let chapters = [];

        for(let i = 0; i < bookChapters; i++){
            chapters.push(i + 1);
        }
        this.setState({ bookChapters: chapters})
    };

    handleChapterChange = (event) => {
        this.handleInputChange(event);

        let selectedChapter = event.target.value;

        //get bible books and set state
        let chapterVerses = API.getChapterVerse(this.state.book, selectedChapter);
        let verses = [];

        for(let i = 0; i < chapterVerses; i++){
            verses.push(i + 1);
        }
        this.setState({ verses: verses})
    };

    handleFormSubmit = (event) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();

        const { title, link, date, description, book, chapter, startingVerse, endingVerse } = this.state;

        if(title === '' || link === '' || date === '' || description === '' || book === '' || chapter === ''
            || startingVerse === '' || endingVerse === ''){
            toast.error("All form fields are required...");
            return
        }

        if(parseInt(this.state.startingVerse) > parseInt(this.state.endingVerse)){
            toast.error("Starting verse cannot be greater than ending verse");
            return
        }

        const params = {
            title: title,
            link: link,
            date: date,
            description: description,
            book: book,
            chapter: chapter,
            startingVerse: startingVerse,
            endingVerse: endingVerse
        };

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
        .catch(() => {
            toast.error("Whoops, something went wrong. Please log back in.", {
                onClose: () => window.location = '/'
            });
        })
    };


  render() {

    const {title, date, link, description, book, chapter, startingVerse,
        endingVerse, bibleBooks, bookChapters, verses} = this.state;

    return (
        <main className="main-body">
            <div className='container padding-1'>
               <UploadForm
                   title={title}
                   date={date}
                   link={link}
                   description={description}
                   book={book}
                   chapter={chapter}
                   startingVerse={startingVerse}
                   endingVerse={endingVerse}
                   bibleBooks={bibleBooks}
                   bookChapters={bookChapters}
                   verses={verses}
                   handleInputChange={this.handleInputChange}
                   handleBookChange={this.handleBookChange}
                   handleChapterChange={this.handleChapterChange}
                   handleFormSubmit={this.handleFormSubmit}
               />

                <ToastContainer/>
        
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
                                    isAdmin = {this.state.isAdmin}
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
