import React, { Component } from "react";
import {CategoryModal} from "../index";

export class Categories extends Component {
  handleClick(e) {
    e.preventDefault();
    this.CategoriesModal.openModal();
  }
  render() {
    return (
      <React.Fragment>
        <CategoryModal ref={instance => this.CategoriesModal = instance}/>
        <button onClick={e => this.handleClick(e)} type="submit" className="btn btn-secondary btn-lg float-right">Kateogrie</button>
      </React.Fragment>
    )
  }
}