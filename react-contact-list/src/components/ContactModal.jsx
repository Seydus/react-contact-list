import React, { Component } from "react";

class ContactModal extends Component {
  constructor() {
    super();

    this.formSubmitted = this.formSubmitted.bind(this);
  }

  formSubmitted(e) {
    e.preventDefault();
  }

  formClose = (e) => {
    e.preventDefault();
    this.props.closeModal(); // Call the closeModal function from props
  };

  render() {
    return (
      <div id="contact-modal" class="modal">
        <span className="close" onClick={this.formClose}>
          &times;
        </span>
        <h2 id="modal-title">Add Contact</h2>
        <form id="contact-form">
          <input
            required
            maxlength="50"
            name="lname"
            id="lname"
            placeholder="Last name"
            className="inputFields"
          />
          <br />
          <input
            required
            maxlength="50"
            name="fname"
            id="fname"
            placeholder="First name"
            className="inputFields"
          />
          <br />
          <input
            required
            maxlength="50"
            name="email"
            id="email"
            type="email"
            placeholder="Email address"
            className="inputFields"
          />
          <br />
          <input
            required
            maxlength="15"
            name="contact"
            id="contact"
            type="tel"
            placeholder="Contact number"
            className="inputFields"
          />
          <br />
          <button type="submit" id="save-button">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default ContactModal;
