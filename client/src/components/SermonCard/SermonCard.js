import React from "react";

const SermonCard = (props) =>

  // <div className="col s12 m6 l6 xl6">
  //   <div className="card small hoverable blue-grey darken-1">
  //     <div className="card-content white-text">
  //       <span className="card-title">{props.title}</span>
  //       {/* <p>{props.description}</p> */}
  //       <p>{props.date}</p>
  //     </div>
  //     <div className="card-reveal">
  //       <div>
  //         <span className="card-title grey-text text-darken-4"><i className="material-icons right">close</i>Card Title</span>
  //         <p>
  //           {props.description}
  //         </p>
  //       </div>
  //       <a className="btn-floating btn-medium waves-effect waves-light orange right save-article" href={props.url}>
  //         <i className="material-icons">file_download</i>
  //       </a>
  //     </div>
  //   </div>
  // </div>

<div className="card">
  <div className="card-content">
    <span className="card-title activator grey-text text-darken-4">{props.title}<i className="material-icons right">more_vert</i></span>
    <p>
    {props.date}
    <a className="download-btn btn-floating waves-effect waves-light orange right save-article" href={props.url}>
        <i className="material-icons small download-icon">file_download</i>
    </a>
    </p>
  </div>
  <div className="card-reveal">
    <span className="card-title grey-text text-darken-4"><i className="material-icons right">close</i>Description</span>
    <p>{props.description}</p>
  </div>
</div>

export default SermonCard;