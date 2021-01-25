import React, { Component } from "react";
import "./ModalPicture.css";

class ModalPicture extends Component {
  render() {
    return (
      <div className="overlay-modal">
        <div className="overlay-modal-bg">
          <img src={this.props.path} />
          <h2>{this.props.author}</h2>
        </div>
      </div>
    );
  }
}

export { ModalPicture };
