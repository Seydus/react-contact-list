import React, { Component } from "react";
import ContactTable from "./ContactTable";
import ContactModal from "./ContactModal";

class ParentComponent extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
    };
  }

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    return (
      <div>
        <ContactTable openModal={this.openModal} />
        {this.state.isModalOpen && (
          <ContactModal closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

export default ParentComponent;
