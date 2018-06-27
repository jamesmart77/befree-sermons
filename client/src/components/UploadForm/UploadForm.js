import React from "react";
import PropTypes from 'prop-types';
import { Input, Row} from 'react-materialize';

// materialize footer
const UploadForm = (props) => {
    const { title, date, link, description, book, chapter, startingVerse,
        endingVerse, bibleBooks, bookChapters, verses } = props;

    return(
        <div className="col s12 m12 l12 xl12">
            <Row>
                <h5>Upload New Sermon</h5>
                <form className="col s12">
                    <Row>
                        <div className="input-field col s12 m6">
                            <input
                                id="title"
                                name="title"
                                value={title}
                                type="text"
                                className="validate"
                                required="required"
                                onChange={props.handleInputChange}
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
                                value={date}
                                onChange={props.handleInputChange}
                            />
                        </div>
                        <div className="input-field col s12">
                            <input
                                id="link"
                                name="link"
                                type="url"
                                className="validate"
                                required="required"
                                value={link}
                                onChange={props.handleInputChange}
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
                                value={description}
                                onChange={props.handleInputChange}
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
                            value={book}
                            onChange={props.handleBookChange}
                        >
                            <option value="" disabled selected>Book</option>
                            {bibleBooks.map(book => (
                                <option key={book} value={book}>{book}</option>

                            ))}
                        </Input>
                        <Input
                            s={3}
                            type='select'
                            id="chapter"
                            name="chapter"
                            validate={true}
                            value={chapter}
                            onChange={props.handleChapterChange}
                        >
                            <option value="" disabled selected>Chapter</option>
                            {bookChapters.map(chapter => (
                                <option key={chapter} value={chapter}>{chapter}</option>
                            ))}
                        </Input>
                        <Input
                            s={3}
                            type='select'
                            id="startingVerse"
                            name="startingVerse"
                            validate={true}
                            value={startingVerse}
                            onChange={props.handleInputChange}
                        >
                            <option value="" disabled selected>Starting Verse</option>
                            {verses.map(verse => (
                                <option key={verse} value={verse}>{verse}</option>
                            ))}
                        </Input>
                        <Input
                            s={3}
                            type='select'
                            id="endingVerse"
                            name="endingVerse"
                            validate={true}
                            value={endingVerse}
                            onChange={props.handleInputChange}
                        >
                            <option value="" disabled selected>Ending Verse</option>
                            {verses.map(verse => (
                                <option key={verse} value={verse}>{verse}</option>
                            ))}
                        </Input>
                    </Row>
                    <Row>
                        <a className="waves-effect waves-light btn right" onClick={props.handleFormSubmit}>Upload</a>
                        {/*<ToastContainer/>*/}
                    </Row>
                </form>
            </Row>
        </div>
    )
};

UploadForm.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
    book: PropTypes.string,
    chapter: PropTypes.number,
    startingVerse: PropTypes.number,
    endingVerse: PropTypes.number,
    handleInputChange: PropTypes.func,
    handleBookChange: PropTypes.func,
    handleChapterChange: PropTypes.func,
    handleFormSubmit: PropTypes.func,
    bibleBooks: PropTypes.array,
    bookChapters: PropTypes.array,
    verses: PropTypes.array
};

export default UploadForm;
