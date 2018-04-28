import React from "react";
import {CollapsibleItem, Row} from 'react-materialize';

const SermonCard = (props) =>

  <CollapsibleItem 
    header={
      <Row className='row-width' key={props.key}>
        <div className='col s12 sermon-header grey-text text-darken-4'>
          <div className='col s9'>
            <h5>{props.title}</h5>
          </div>
          <div className='col s3'>
            <i className='material-icons expand-icon right'>expand_more</i>
          </div>
          <div className='col s12'>
            <div className='col s3 sermon-date'>
              <h6><b>Sermon Date</b></h6>
              <div>{props.date}</div>
            </div>
            <div className='col s3 sermon-date'>
              <h6><b>Scripture</b></h6>
              <div>{props.book} {props.chapter} : {props.startingVerse} - {props.endingVerse}</div>
            </div>
            <div className='col s6'>
              <a className="download-btn btn-floating waves-effect waves-light orange right save-article" href={props.url}>
                <i className="material-icons small download-icon">file_download</i>
              </a>
            </div>
          </div>
        </div>
      </Row>
    }
    onSelect={()=>{}}
  >
    <div>
      <b>Description</b>
      <p>{props.description}</p>
    </div>
  </CollapsibleItem>

export default SermonCard;