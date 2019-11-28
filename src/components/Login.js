import "./Login.css";
import React, { Component } from "react";
import ethicalLogo from "./ethical.png";
const bcryptjs = require("bcryptjs");
const fetch = require("node-fetch");
const localStorage = require("local-storage");

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
    const hash = await bcryptjs.hash(this.state.input, 0);
    this.setState({ hash: hash });
    return this.state.hash;
  }

  routeChange() {
    let path = "/announcements";
    this.props.history.push(path);
  }

  async buttonClick() {
    const response = await fetch("http://localhost:3001/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        hashedAttempt: await this.hashPassword()
      })
    });
    const json = await response.json();
    this.setState({ access_token: json.token, validity: json.correctPassword });
    if (!this.state.validity) {
      alert("Wrong password");
    } else {
      localStorage.set("token", this.state.access_token);
      this.routeChange();
    }
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
            onClick={() => this.buttonClick()}
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
