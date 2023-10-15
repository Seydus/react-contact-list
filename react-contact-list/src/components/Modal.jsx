import React, { Component } from "react";
import axios from "axios";
import ContactTable from "./ContactTable";

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        firstName: "",
        lastName: "",
        email: "",
        number: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.getCurrUser = this.getCurrUser.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("id", this.props.edit ? this.props.person.id : "");
    formData.append("firstName", this.state.data.firstName);
    formData.append("lastName", this.state.data.lastName);
    formData.append("email", this.state.data.email);
    formData.append("contact", this.state.data.number);
    formData.append("curEmail", this.state.data.email);

    axios
      .post(
        this.props.edit
          ? "http://localhost/ReactContactList/ContactListBackendPHP/edit.php"
          : "http://localhost/ReactContactList/ContactListBackendPHP/add.php",
        formData
      )
      .then(() => {
        this.onClose();
        this.props.getUsers();
      });
  }

  onClose() {
    this.props.onClose && this.props.onClose();

    this.setState({
      data: {
        firstName: "",
        lastName: "",
        email: "",
        number: "",
      },
    });
  }

  getCurrUser(data) {
    this.setState({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        number: data.number,
      },
    });
  }

  render() {
    if (!this.props.modal) {
      return null;
    }

    return (
      <>
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {this.props.edit ? "Edit Contact" : "Add Contact"}
              </h2>
              <span className="close" onClick={() => this.onClose()}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <form id="contact-form" onSubmit={this.handleSubmit}>
                <input
                  required
                  maxLength="50"
                  name="firstName"
                  id="fname"
                  type="text"
                  placeholder="First name"
                  className="inputFields"
                  value={this.state.data.firstName}
                  onChange={this.handleChange}
                />
                <br />
                <input
                  required
                  maxLength="50"
                  name="lastName"
                  id="lname"
                  type="text"
                  placeholder="Last name"
                  className="inputFields"
                  value={this.state.data.lastName}
                  onChange={this.handleChange}
                />
                <br />
                <input
                  required
                  maxLength="50"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email address"
                  className="inputFields"
                  value={this.state.data.email}
                  onChange={this.handleChange}
                />
                <br />
                <input
                  required
                  maxLength="10"
                  name="number"
                  id="contact"
                  type="tel"
                  placeholder="Contact number"
                  className="inputFields"
                  value={this.state.data.number}
                  onChange={this.handleChange}
                />
                <br />
                <button type="submit" id="save-button">
                  {this.props.edit ? "Edit" : "Add"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Modal;
