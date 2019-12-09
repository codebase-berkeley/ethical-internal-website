import "./Login.css";
import React, { Component } from "react";
import ethicalLogo from "./ethical.png";
import ethicalLogoPic from "./ethicalPic.png";
import styled, { keyframes } from 'styled-components'
const bcryptjs = require("bcryptjs");
const fetch = require("node-fetch");
const localStorage = require("local-storage");

const Button = styled.button`
background: ${props => props.primary ? "rgba(141, 195, 77)" : "white"};
color: ${props => props.primary ? "white" : "rgba(141, 195, 77)"};
font-size: 90%;
margin: 1em;
left: 0.0001vw;
bottom: 0.11rem;
position: relative;
padding: 0.2em 0.7rem;
border: .105rem solid rgba(141, 195, 77);
border-radius: 5px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 7s linear infinite;
  top: 3em;
  position: relative;
  padding: 1.5rem 1em;
`;

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
    const response = await fetch("http://localhost:3001/login", {
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
        <div className="block">
          <Rotate><img className="pic" src={ethicalLogoPic} alt="profile" /></Rotate>
          <div className="logo">
            <img className="pic2" src={ethicalLogo} alt="profile" />
          </div>
          <div className="welcome">
            <div> Welcome home, please log in below!</div>
          </div>
          <div className="login">
            <label
              className="passwordLabel">
              Password:
              </label>
            <input
              className="passwordBox"
              type="password"
              name="input"
              value={this.state.input}
              onChange={this.handleChange}
            />
            <Button primary
              className='button'
              onClick={() => this.buttonClick()}
              id="button"
              type="submit"
              value="Login"
            >
              {" "}
              Login{" "}
            </Button>
          </div>
        </div>
      </body>
    );
  }
}

export default Login;
