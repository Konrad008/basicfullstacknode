import React, { Component } from "react";
import Modal from "react-modal";
import {Form} from "../index";

export class FormModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  openModal() {
    this.setState({ modalIsOpen: true});
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel="PD details"
        className={'msmodal'}
      >
        <div className='row'>
          <div className='col-12 mclose'>
            <button onClick={this.closeModal}>✘</button>
          </div>
          <div className={'col-12 mmiddle'}>
            <Form closeModal={this.closeModal} />
          </div>
        </div>
      </Modal>
    );
  }
}
