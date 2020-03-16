import React, { Component } from "react";

import {
  Navbar,
  NavbarBrand,
  Jumbotron,
  Media,
  Nav,
  NavItem,
  NavbarToggler,
  Collapse,
  Row,
  Form,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  Label,
  Input,
  DropdownToggle
} from "reactstrap";
import { Divider } from "@material-ui/core";

import { NavLink } from "react-router-dom";
import "../App.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
      collapsed: true
    };
    this.state.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div className="container ">
        <Navbar className="NavBar" sticky={"top"} expand="md">
          <NavbarBrand className="mr-auto" href="/signup">
            <img
              src="assets/Images/SpotMini.png"
              height="100px"
              width="200px"
              alt=""
            />
          </NavbarBrand>
          <NavbarToggler
            className="NavBarToggle"
            onClick={this.state.toggleNav}
          >
            |||
          </NavbarToggler>

          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar className="ml-auto">
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  Premium
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/menu">
                  Help
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/aboutus">
                  Download
                </NavLink>
              </NavItem>

              <NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <Divider
                    className="dividerstyle"
                    orientation="vertical"
                    flexItem
                  />
                  <DropdownToggle nav caret className="seperator">
                    <img className="Profile" src="assets/Images/Person.jpg" />
                    Profile
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Account </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>LogOut</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron className="JumboHeaderImg">
          <div className="App Headers">
            <div>
              <header className="Header1">Get Premium free for 1 month.</header>
            </div>
            <div>
              <h2 className="Header2">
                Just EGP&nbsp;49.99/month after. Cancel anytime.
              </h2>
            </div>
          </div>
          <Button model="submit" className="signupbtn">
            Get Premium
          </Button>
        </Jumbotron>
        <article>
          <h1>Why Premium?</h1>
          <br />
          <br />
          <br />
          <Row xs="2">
            <Col>
              <img
                src="assets/images/MusicDownload.png"
                height="142"
                width="142"
                alt=""
              />
              <h5 class="mt-0">Download Music.</h5>
              <p>Listen AnyWhere.</p>
            </Col>
            <Col>
              {" "}
              <img
                src="assets/images/SecondIcon.png"
                height="142"
                width="142"
                alt=""
              />{" "}
              <h5 class="mt-0">No Ad Interruptions.</h5>
              <p>Enjoy NonStop Music.</p>
            </Col>
            <Col>
              {" "}
              <img
                src="assets/images/ThirdIcon.png"
                height="142"
                width="142"
                alt=""
              />
              <h5 class="mt-0">Play any Song.</h5>
              <p>Even on mobile.</p>
            </Col>
            <Col>
              {" "}
              <img
                src="assets/images/fourthIcon.png"
                height="142"
                width="142"
                alt=""
              />{" "}
              <h5 class="mt-0">Unlimited Skips.</h5>
              <p>Just hit next.</p>
            </Col>
          </Row>
        </article>
        <Jumbotron className="JmbStyle">
          <h3>Spotify Premium</h3>
          <h2>EGP349.99/Month</h2>
          <hr className="my-2" />
          <h5 style={{ padding: "20px", textAlign: "left" }}>
            <li>Play Any Song.</li>
            <li>Listen Offline.</li>
            <li>No ad interruptions.</li>
            <li>Unlimited Skips.</li>
            <li>High Audio Quality.</li>
          </h5>
          <hr className="my-2" />
          <p className="lead">
            <Button model="submit" className="signupbtn">
              Get Premium
            </Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Header;