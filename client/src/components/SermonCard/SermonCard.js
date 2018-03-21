import React from "react";

const SermonCard = (props) =>

  <div className="col s12 m6 l6 xl6">
    <div className="card small hoverable blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">{props.title}</span>
        <p>{props.description}</p>
      </div>
      <div className="card-action blue-grey lighten-5">
        <p>{props.date}</p>
        <a className="btn-floating btn-medium waves-effect waves-light orange right save-article" onClick={() => props.saveclick(props)}>
          <i className="material-icons">file_download</i>
        </a>
      </div>
    </div>
  </div>

export default SermonCard;