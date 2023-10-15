import React, { Component } from "react";
import axios from "axios";
import Modal from "./Modal.jsx";

class ContactTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      modal: false,
      operation: 0,
      contact: {},
      edit: false,
      person: null,
      id: -1,
    };
    this.getUsers = this.getUsers.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  getUsers() {
    axios
      .get("http://localhost/ReactContactList/ContactListBackendPHP/read.php")
      .then((response) => {
        this.setState({
          data: Object.values(response.data.data),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteContact(id) {
    console.log(id);
    const formData = new FormData();
    formData.append("id", id);

    axios
      .post(
        "http://localhost/ReactContactList/ContactListBackendPHP/delete.php",
        formData
      )
      .then(() => {
        this.getUsers();
      });
  }

  componentDidMount() {
    this.getUsers();
  }

  showModal(id, edit, person) {
    this.setState({
      modal: !this.state.modal,
      id: id,
      edit: edit,
      person: person,
    });
  }

  render() {
    return (
      <>
        <div id="contactList">
          <div className="header-container">
            <div className="contact-h1-container">
              <h1>Contacts</h1>
            </div>
            <div className="button-container">
              <button onClick={() => this.showModal(-1, false, null)}>
                Add Contact
              </button>
            </div>
          </div>
          <table id="contactTable" border="1">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Contact Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item, index) => (
                <tr key={index}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.number}</td>
                  <td>
                    <button
                      style={{ backgroundColor: "green" }}
                      className="actionButtons"
                      onClick={() => {
                        this.showModal(item.id, true, item);
                        this.ref.getCurrUser(item);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{ backgroundColor: "red", marginLeft: "5px" }}
                      className="actionButtons"
                      onClick={() => this.deleteContact(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <Modal
            onClose={this.showModal}
            modal={this.state.modal}
            edit={this.state.edit}
            id={this.state.id}
            person={this.state.person}
            getUsers={this.getUsers}
            ref={(ref) => (this.ref = ref)}
            runFunction={true}
          ></Modal>
        </div>
      </>
    );
  }
}

export default ContactTable;
