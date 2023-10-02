import React, { Component } from "react";

class ContactTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      hidePopUp: true,
    };

    this.popUpActs = this.popUpActs.bind(this);
  }

  popUpActs(action) {
    if (action === "add") {
      this.setState({
        hidePopUp: false,
      });
    } else {
      this.setState({
        hidePopUp: true,
      });
    }
  }

  componentDidMount() {
    var self = this;
    var contactsData;
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "https://doited-error.000webhostapp.com/read.php", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        contactsData = JSON.parse(this.responseText);
        var arr = [];

        for (var x = 0; x < contactsData.count; x++) {
          arr.push(contactsData.data[x]);
        }

        self.setState({
          data: arr,
        });
      }
    };
  }

  render() {
    return (
      <>
        <div className="header-container">
          <div className="contact-h1-container">
            <h1>Contacts</h1>
          </div>
          <div className="button-container">
            <button id="add-contact-button" onClick={this.props.openModal}>
              Add Contact
            </button>
          </div>
        </div>
        <table id="contact-table">
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
            {this.state.contacts.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.contactNumber}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default ContactTable;
