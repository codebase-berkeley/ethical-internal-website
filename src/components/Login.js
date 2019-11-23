import "./Login.css";
import React, { Component } from "react";
import ethicalLogo from "./ethical.png";
import { jsxOpeningElement } from "@babel/types";
const bcryptjs = require("bcryptjs");

// import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      hash: "",
      access_token: "",
      validity: false
    };
  }

  handleChange = event => {
    this.setState({ input: event.target.value });
  };

  async hashPassword() {
    const hash = await bcryptjs.hash(this.state.input, 10);
    this.setState({ hash: hash });
    return this.state.hash;
  }

  routeChange() {
    let path = "/announcements";
    this.props.history.push(path);
  }

  async componentDidMount() {
    let hash = await this.hashPassword();
    console.log(hash);
    const response = await fetch("http://localhost:3001/login/" + hash);
    const json = await response.json();
    this.setState({ access_token: json.token });
    this.setState({ validity: json.correctPassword });
    console.log(hash);
    if (!this.state.validity) {
      alert("Wrong password");
    } else {
      // // store access_token in local storage
      this.routeChange();
    }
    // // proceed or error based on that response
    console.log(this.state.input);
  }

  render() {
    return (
      <body className="home">
        <div className="Block"></div>
        <div className="logo">
          <img className="pic" src={ethicalLogo} alt="profile" />
        </div>
        <div className="hi">
          <div>Welcome home EthiCal memebers, please log in below!</div>
        </div>
        <div className="login">
          <form>
            <label>
              Password:
              <input
                type="password"
                name="input"
                value={this.state.input}
                onChange={this.handleChange}
              />
            </label>
          </form>
          <button
            onClick={() => this.componentDidMount()}
            id="button"
            type="submit"
            value="Login"
          >
            {" "}
            Login{" "}
          </button>
        </div>
      </body>
    );
  }
}

export default Login;
