import React from "react";
import ReactDOM from "react-dom";

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {}
    };
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }

    if (typeof fields["name"] !== "undefined") {
      if (
        !fields["name"].match(/^[a-zA-Z]+$/) &&
        fields["name"].length < 4 &&
        fields["name"].length > 12
      ) {
        formIsValid = false;
        errors["name"] = "Only letters";
      }
    }

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }
    if (!fields["age"]) {
      formIsValid = false;
      errors["age"] = "Cannot be empty";
    }

    if (typeof fields["age"] !== "undefined") {
      if (fields["age"] < 18) {
        formIsValid = false;
        errors["age"] = "Age should be greater than or equal to 18 ";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      alert("Form submitted");
    } else {
      alert("Form has errors.");
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <div>
        <form
          name="contactform"
          className="contactform"
          onSubmit={this.contactSubmit.bind(this)}
        >
          <div className="col-md-6">
            <fieldset>
              <input
                ref="name"
                type="text"
                size="30"
                placeholder="Name"
                onChange={this.handleChange.bind(this, "name")}
                value={this.state.fields["name"]}
              />
              <span className="error">{this.state.errors["name"]}</span>
              <br />
              <input
                refs="email"
                type="text"
                size="30"
                placeholder="Email"
                onChange={this.handleChange.bind(this, "email")}
                value={this.state.fields["email"]}
              />
              <span className="error">{this.state.errors["email"]}</span>
              <br />
              <input
                refs="age"
                type="number"
                size="30"
                placeholder="Age"
                onChange={this.handleChange.bind(this, "age")}
                value={this.state.fields["age"]}
              />

              <br />
            </fieldset>
          </div>

          <div className="col-md-12">
            <fieldset>
              <button className="btn btn-lg pro" id="submit" value="Submit">
                Submit
              </button>
            </fieldset>
          </div>
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Test />, rootElement);
