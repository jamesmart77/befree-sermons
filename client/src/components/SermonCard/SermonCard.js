import React from "react";
import {CollapsibleItem, Row} from 'react-materialize';
import PropTypes from 'prop-types';

const SermonCard = (props) => {
  
  const {title, url, date, description, book, chapter, startingVerse, endingVerse, isAdmin} = props;

  return(
    <CollapsibleItem 
      header={
        <Row className='row-width' key={props.key}>
          <div className='col s12 sermon-header grey-text text-darken-4'>
            <div className='col s9'>
              <h5>{title}</h5>
            </div>
            <div className='col s3'>
              <i className='material-icons expand-icon right'>expand_more</i>
            </div>
            <div className='col s12'>
              <div className='col s6 m4 sermon-date'>
                <h6><b>Sermon Date</b></h6>
                <div>{date}</div>
              </div>
              <div className='col s6 m4 sermon-date'>
                <h6><b>Scripture</b></h6>
                <div className='col s12 l5 sermon-scripture'>{book}</div>
                <div className='col s12 l6 sermon-scripture'>{chapter} : {startingVerse} - {endingVerse}</div>
              </div>
              <div className='col s3 m4 right'>
                <a className="download-btn btn-floating waves-effect waves-light orange right save-article" href={url}>
                  <i className="material-icons small download-icon">file_download</i>
                </a>
                {isAdmin === true ? (
                  <div>
                    <a className="download-btn btn-floating waves-effect waves-light blue right save-article" href={url}>
                      <i className="material-icons small download-icon">edit</i>
                    </a>
                    <a className="download-btn btn-floating waves-effect waves-light red right save-article" href={url}>
                      <i className="material-icons small download-icon">delete</i>
                    </a>
                  </div>
                ) : ''} 
              </div>
            </div>
          </div>
        </Row>
      }
      onSelect={()=>{}}
    >
      <div>
        <b>Description</b>
        <p>{description}</p>
      </div>
    </CollapsibleItem>
  )
}

SermonCard.propTypes = {
  title: PropTypes.string, 
  url: PropTypes.string, 
  date: PropTypes.string, 
  description: PropTypes.string, 
  book: PropTypes.string, 
  chapter: PropTypes.number, 
  startingVerse: PropTypes.number, 
  endingVerse: PropTypes.number, 
  isAdmin : PropTypes.bool
}

export default SermonCard;