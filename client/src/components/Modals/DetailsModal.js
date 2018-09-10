import React, { Component } from "react";
import Modal from "react-modal";

export class DetailsModal extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      name: "",
      description: "",
      user: "",
      category: "",
      quantity: ""
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(info) {
    const {name, description, user, category, quantity} = info;
    this.setState({modalIsOpen: true, name, description, user, category, quantity});
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      name: "",
      description: "",
      user: "",
      category: "",
      quantity: ""
    });
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel="PD details"
        className={'msmodal'}
      >
        <div className={'row'}>
          <div className='col-12 mclose'>
            <button onClick={this.closeModal}>✘</button>
          </div>
          <div className='col-12 mmiddle'>
            <h2 ref={subtitle => (this.subtitle = subtitle)}>{this.state.name}</h2>
            <p>Użytkownika: <br/> {this.state.user}</p>
            <p>Kategoria: <br/> {this.state.category}</p>
            <p>Opis: <br/> {this.state.description}</p>
            <p>Ilość: <br/> {this.state.quantity}</p>
          </div>
        </div>
      </Modal>
    );
  }
}
