import React from "react";
import "./Modal.css";

const Modal = () => {
  return (
    <div className="modal-wrapper">
      <div className="modal-block">
        <h3>Are you sure you want to delete this item?</h3>
        <h1>text</h1>
        <div className="modal-btns">
          <button className="modal-btn-confirm">yes</button>
          <button className="modal-btn-reject">no</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
