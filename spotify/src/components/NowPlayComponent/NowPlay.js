import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownToggle,
} from "reactstrap";
import "./NowPlay.css";

import { NavLink } from "react-router-dom";
class NowPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,

      disabled: false,
      tempId: this.props.id.id,
    };
    this.state.toggleNav = this.toggleNav.bind(this);
  }
  changeBack(e) {
    e.target.style.background = "red";
  }
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    let playlistsActive = "";
    let albumsActive = "";
    let artistsActive = "";
    let currentURL = window.location.href;
    if (
      currentURL === "http://localhost:3000/webplayer/librarypage/playlists"
    ) {
      playlistsActive = " activeButton";
      albumsActive = "";
      artistsActive = "";
    } else if (
      currentURL === "http://localhost:3000/webplayer/librarypage/albums"
    ) {
      playlistsActive = "";
      artistsActive = "";
      albumsActive = " activeButton";
    } else if (
      currentURL === "http://localhost:3000/webplayer/librarypage/artists"
    ) {
      playlistsActive = "";
      albumsActive = "";
      artistsActive = " activeButton";
    }
    //////////////////////////////////////////////////////Functions here//////////////////////////////////////////////////////////
    /////////////////////////////////////////////////No-1 For Songs Rendering////////////////////////////////
    const RenderPlaylisttracks = this.props.playLists.playLists.map(
      (PlayLists) => {
        if (PlayLists.name === "Best of 2015") {
          if (PlayLists.tracks.length === 0) {
            return (
              <div className="NolikedLevelZero">
                <div className="NolikedLevelOne">
                  <div className="NolikedLevelTwo">
                    <div className="row TakeitDown">
                      <div className="col-xs-12 NolikedLevelThree">
                        <div className="SomeheighPlease">
                          <svg
                            width="80"
                            height="79"
                            viewBox="0 0 80 79"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>Album</title>
                            <path
                              d="M76.8 3.138v72.126H3.2V3.138h73.6zM80 0H0v78.398h80V0zM40 20.8c-9.72 0-17.6 7.88-17.6 17.6C22.4 48.12 30.28 56 40 56c9.72 0 17.6-7.88 17.6-17.6 0-9.72-7.88-17.6-17.6-17.6zm0 3.2c7.94 0 14.4 6.46 14.4 14.4S47.94 52.8 40 52.8s-14.4-6.46-14.4-14.4S32.06 24 40 24z"
                              fill="currentColor"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <Row>
                          <Col md={12}>
                            <h1 class="YourFirstInAll">
                              Songs you’ve liked live here{" "}
                            </h1>
                            <h4 class="_1bfd68987bbac2dd824e5db895bd3c57-scss">
                              Find more of the songs you love in Browse and save
                              to your Liked Songs.
                            </h4>
                            <button
                              class="_2221af4e93029bedeab751d04fab4b8b-scss _1edf52628d509e6baded2387f6267588-scss _4a19a959428c34075eef50bd44ab468f-scss"
                              type="button"
                            >
                              DISCOVER
                            </button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return PlayLists.tracks.map((Song) => {
              return (
                <section className="TrackListContainer">
                  <ol className="olstyle TrackListContainer Orderedlist">
                    <div className="Div textMenuWrapper">
                      <div draggable="true">
                        <li
                          tabindex="0"
                          role="button"
                          aria-pressed="false"
                          className="listyle TrackListRow"
                        >
                          <div className="DivStyle TrackListCol PositionOuter">
                            <div
                              role="button"
                              className="DivStyle TrackListCol PositionOuter TopAlign PlayPause"
                            >
                              <svg class="icon-play" viewBox="0 0 85 100">
                                <path
                                  fill="currentColor"
                                  d="M81 44.6c5 3 5 7.8 0 10.8L9 98.7c-5 3-9 .7-9-5V6.3c0-5.7 4-8 9-5l72 43.3z"
                                >
                                  <title>PLAY</title>
                                </path>
                              </svg>
                            </div>
                            <div
                              role="button"
                              className="DivStyle TrackListCol PositionOuter  Position"
                            >
                              <i className="fa fa-music"></i>
                            </div>
                          </div>
                          <div className="DivStyle TrackListCol name">
                            <div className="DivStyle TrackListCol TopAlign ">
                              <div className="DivStyle InOneLine TrackListName">
                                {Song.name}{" "}
                              </div>
                              <div className="DivStyle TrackListName SecondLine">
                                By {Song.artist}
                              </div>
                            </div>
                          </div>
                          <div className="DivStyle TrackListCol more">
                            <div className="DivStyle TrackListCol TopAlign">
                              <div className="DivStyle TrackListRow more textMenuWrapper">
                                <button className="buttonstyle MultiButton">
                                  <i class="fa fa-ellipsis-h"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="DivStyle TrackLisCol Duration">
                            <div className="DivStyle TrackListHeader Body by">
                              <span>3:21</span>
                            </div>
                          </div>
                        </li>
                      </div>
                    </div>
                  </ol>
                </section>
              );
            });
          }
        }
      }
    );
    /////////////////////////////////////////////////////////RenderSongsDone//////////////////////////////////////////////////

    return (
      <div className=" DivStyle LibraryPageBody">
        <Navbar expand="md" className="customizedNavbar Ezzat ">
          <div className=" DivStyle container customizedContainer">
            <Row className="flexRowOfLibraryPage">
              <Col>
                <Nav navbar className="flexRowOfLibraryPage">
                  <NavItem className="customizedNavitems">
                    <Button className="customizedButton">
                      <NavLink className="nav-link customizedArrows" to="/">
                        <svg className="customizedSvg" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M15.54 21.15L5.095 12.23 15.54 3.31l.65.76-9.555 8.16 9.555 8.16"
                          ></path>{" "}
                        </svg>
                      </NavLink>
                    </Button>
                  </NavItem>
                  <NavItem className="customizedNavitems">
                    <Button className="buttonstyle customizedButton">
                      <NavLink className="nav-link customizedArrows" to="/">
                        <svg className="customizedSvg" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M7.96 21.15l-.65-.76 9.555-8.16L7.31 4.07l.65-.76 10.445 8.92"
                          ></path>
                        </svg>
                      </NavLink>
                    </Button>
                  </NavItem>

                  <Nav className="ml-auto" navbar>
                    <NavItem className=" customizedNavLink ">
                      <UncontrolledDropdown nav inNavbar>
                        <Button className="buttonstyle AccountItself">
                          <DropdownToggle nav caret className="profileNavItem">
                            <i class="fa fa-user-secret"></i>
                            Profile
                          </DropdownToggle>
                        </Button>
                        <DropdownMenu className="StaticNav" right>
                          <DropdownItem className="StaticNavChildContainer DisappearFromDropDowm">
                            <NavLink
                              className="StaticNavChild"
                              to="accountoverview"
                            >
                              Account
                            </NavLink>{" "}
                          </DropdownItem>
                          <DropdownItem className="StaticNavChildContainer DisappearFromDropDowm">
                            <NavLink className="StaticNavChild " to="">
                              Log out
                            </NavLink>{" "}
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </NavItem>
                  </Nav>
                </Nav>
              </Col>
            </Row>
          </div>
        </Navbar>
        <section className="Jumbostyle">
          <div className="DivStyle MainViewContainer">
            <section className="contentSection">
              <div className=" DivStyle container fluid">
                <div className=" DivStyle row general">
                  <div className="col-xs-12 col-lg-3 col-xl-4">
                    <div>
                      <header className="TrackListHeader">
                        <div>
                          <div draggable="true">
                            <div className="TrackListHeader media object">
                              <div
                                class=" TrackListHeader media object hoverable "
                                aria-hidden="true"
                              >
                                <div
                                  className="cover art shadow"
                                  aria-hidden="true"
                                >
                                  <div class=" cover art icon">
                                    <svg
                                      width="80"
                                      height="81"
                                      viewBox="0 0 80 81"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <title>Playlist Icon</title>
                                      <path
                                        d="M25.6 11.565v45.38c-2.643-3.27-6.68-5.37-11.2-5.37-7.94 0-14.4 6.46-14.4 14.4s6.46 14.4 14.4 14.4 14.4-6.46 14.4-14.4v-51.82l48-10.205V47.2c-2.642-3.27-6.678-5.37-11.2-5.37-7.94 0-14.4 6.46-14.4 14.4s6.46 14.4 14.4 14.4S80 64.17 80 56.23V0L25.6 11.565zm-11.2 65.61c-6.176 0-11.2-5.025-11.2-11.2 0-6.177 5.024-11.2 11.2-11.2 6.176 0 11.2 5.023 11.2 11.2 0 6.174-5.026 11.2-11.2 11.2zm51.2-9.745c-6.176 0-11.2-5.024-11.2-11.2 0-6.174 5.024-11.2 11.2-11.2 6.176 0 11.2 5.026 11.2 11.2 0 6.178-5.026 11.2-11.2 11.2z"
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                      ></path>
                                    </svg>
                                  </div>
                                  <div className="OneOpacity">
                                    <img
                                      alt=""
                                      className="cover art image"
                                      src="https://i.scdn.co/image/ab67706f000000021b75b1478680dcb9448d3395"
                                    />
                                    <div className="overlay"></div>
                                    <button class="cover art playback ButtonHover">
                                      <svg
                                        class="cover art playback icon play"
                                        viewBox="0 0 85 100"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M81 44.6c5 3 5 7.8 0 10.8L9 98.7c-5 3-9 .7-9-5V6.3c0-5.7 4-8 9-5l72 43.3z"
                                        >
                                          <title>PLAY</title>
                                        </path>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="TrackListHeader mo info">
                              <div clasName="textMenuWrapper">
                                <div className="TrackListHeader mo info Name">
                                  <span dir="auto">
                                    Today's Top Hits(المفروض يجيلي في Props)
                                  </span>
                                </div>
                                <div className="mo meta ellipsis-one-line">
                                  <span>
                                    <a dir="auto" href="/user/spotify">
                                      Spotify
                                    </a>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>{" "}
                        <div className=" TrackListHeader Body">
                          <div className="TrackListHeader Body entity Name">
                            <h2>Today's Top Hits</h2>
                            <span className="TrackListHeader Body by">
                              <a
                                data-owner-uri="spotify:user:spotify"
                                href="/user/spotify"
                              >
                                By Spotify
                              </a>
                            </span>
                          </div>
                          <div className="TrackListHeader Body Inverter">
                            <div className="TrackListHeader Body Inverter Actions">
                              <button className="signupbtn" type="submit">
                                PLAY
                              </button>
                              <div className="TrackListHeader ExtraButtons">
                                <Button className="Jumbostyle">
                                  <i class="fa fa-heart"></i>
                                </Button>
                                <Button className="Jumbostyle">
                                  <i class="fa fa-ellipsis-h"></i>
                                </Button>
                              </div>
                              <p>50 songs</p>
                            </div>
                          </div>
                        </div>
                      </header>
                    </div>
                  </div>{" "}
                  <div class="DivStyle col-xs-12 col-lg-10 col-xl-8">
                    {RenderPlaylisttracks}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}
export default NowPlay;
