import React, { Component } from "react";
import Modal from "react-modal";
import {CategoryForm} from "../index";
import {CategoryList} from "../Lists/CategoryList";

export class CategoryModal extends Component {
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
        className={'mmodal'}
      >
        <div className='row'>
          <div className='col-12 mclose'>
            <button onClick={this.closeModal}>✘</button>
          </div>
            <div className='col-6 mleft'>
              <CategoryList />
            </div>
            <div className='col-6 mright'>
              <CategoryForm closeModal={this.closeModal} />
            </div>
        </div>
      </Modal>
    );
  }
}
