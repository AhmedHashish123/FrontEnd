/* eslint-disable react/button-has-type */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import "./PlayFooterComponent.css";
import "./WebPlayerHomeComponent.css";
import React, { Component } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { Button, Modal, ModalBody } from "reactstrap";
import HomeNavAndContent from "./HomeNavAndContent";
import LibraryPage from "../Library/LibraryPage";
import NowPlay from "../NowPlayComponent/NowPlay";
import { baseUrl2 } from "../../shared/baseUrl";
import LikedPlay from "../PlayLikedSongs/PlayLikedSongs";
import Artist from "../ArtistInterface/ArtistComponent";
/**
 * Web Player page
 */
class WebPlayer extends Component {
  /**
   *
   * @param {Object} props
   * @param props.data Essentially contains the data of the users in the database
   * @param props.id Essentially contains the id of one of the users in the database
   * @param props.handleLogoutId Essentially taks an id (should be an empty string) and replaces the current user id with it
   * @param props.data_be Essentially contains the data of the users in the database after integrating with backend
   * @param props.handleLogout_BE Essentially used to remove user id along with his other data instead of handleLogoutId
   * @param props.isSignedIn Essentially used to check if a user is signed in or not
   * @param props.patchedfollow Essentially used to by the LikedPlay & NowPlay Components for following
   * @param props.patchedunfollow Essentially used to by the LikedPlay & NowPlay Components for unfollowing
   * @param props.artist Essentially contains artist data
   * @param props.album Essentially contains album data
   * @param props.playLists Essentially contains playlist data
   * @param props.handleCurrentArtists Essentially used to display artists' data after integrating with the backend
   * @param props.handleCurrentAlbums Essentially used to display albums' data after integrating with the backend
   * @param props.handleCurrentPlayList Essentially used to display playlists' data after integrating with the backend
   * @param props.categories Essentially contains an array of categories that contain playlists
   */
  constructor(props) {
    super(props);
    this.state = {
      tempId: this.props.id.id,
      isModalOpen: false,
      SignedIn: false,
      paused: true,
      shuffle: false,
      liked: false,
      muted: false,
      repeat: 0,
      volume: 100,
      seekMins: 0,
      seekSeconds: 0,
      lengthMins: 0,
      lengthSeconds: 0,
      seeking: false,
    };
    this.playlist = [
      "http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3",
      "http://www.hochmuth.com/mp3/Tchaikovsky_Rococo_Var_orch.mp3",
      "http://www.hochmuth.com/mp3/Vivaldi_Sonata_eminor_.mp3",
    ];
    this.playlistIndex = 0;
    this.volumeSlider = React.createRef();
    this.seekSlider = React.createRef();
    this.url = this.playlist[this.playlistIndex];
    this.audio = new Audio();
    this.audio.src = this.url;
    this.toggleModal = this.toggleModal.bind(this);
  }
  componentDidMount() {
    this.interval = setInterval(() => this.handleTime());
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  shuffle = (array) => {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  };
  nextSong = () => {
    if (
      this.playlistIndex == this.playlist.length - 1 &&
      this.state.shuffle == false
    ) {
      this.playlistIndex = 0;
    } else if (this.state.shuffle == true) {
      if (this.playlistIndex == this.playlist.length - 1)
        this.playlistIndex = 0;
      this.shuffle(this.playlist);
      this.playlistIndex++;
    } else this.playlistIndex++;
    this.audio.src = this.playlist[this.playlistIndex];
    if (this.state.paused == false) {
      this.audio.play();
    }
  };
  togglePlay = () => {
    this.setState(
      {
        paused: !this.state.paused,
      },
      () => {
        if (this.state.paused == false) {
          this.audio.play();
        } else this.audio.pause();
      }
    );
  };
  toggleShuffle = () => {
    this.setState({
      shuffle: !this.state.shuffle,
    });
  };
  handleTime = () => {
    this.setState({
      lengthMins: Math.floor(this.audio.duration / 60),
      lengthSeconds: Math.floor(
        this.audio.duration - Math.floor(this.audio.duration / 60) * 60
      ),
      seekMins: Math.floor(this.audio.currentTime / 60),
      seekSeconds: Math.floor(
        this.audio.currentTime - Math.floor(this.audio.currentTime / 60) * 60
      ),
    });
  };
  handleSeek = () => {
    if (this.state.seeking) {
      this.seekSlider.current.value =
        this.seekSlider.current.clientX - this.seekSlider.current.offsetLeft;
      console.log(this.seekSlider.current.offsetLeft);
      console.log(this.seekSlider.current.clientX);
      this.audio.currentTime =
        this.audio.duration * (this.seekSlider.current.value / 100);
    }
  };
  handleVolume = () => {
    this.setState(
      {
        volume: this.volumeSlider.current.value,
      },
      () => {
        this.audio.volume = this.volumeSlider.current.value / 100;
      }
    );
  };
  handleMouseDown = () => {
    this.setState({ seeking: !this.state.seeking }, () => {
      this.handleSeek();
    });
  };
  handleMouseUp = () => {
    this.state.seeking = false;
  };
  toggleLiked = () => {
    this.setState({
      liked: !this.state.liked,
    });
  };
  toggleMute = () => {
    if (this.state.muted == false) {
      this.setState(
        {
          muted: !this.state.muted,
        },
        () => {
          this.audio.muted = true;
        }
      );
    } else {
      this.setState(
        {
          muted: !this.state.muted,
        },
        () => {
          this.audio.muted = false;
        }
      );
    }
  };
  changeRepeat = () => {
    if (this.state.repeat < 2) {
      this.setState(
        {
          repeat: this.state.repeat + 1,
        },
        () => {
          this.audio.loop = true;
        }
      );
    } else {
      this.setState({ repeat: 0 }, () => {
        this.audio.loop = false;
      });
    }
  };

  /**
   * Toggles the Modal in the library by switching isModalOpen from true to false and vice versa
   */
  toggleModal() {
    if (this.props.isSignedIn.isSignedIn === true) {
      this.setState({
        SignedIn: true,
      });
    } else {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
      });
    }
  }

  /**
   * Responsible for showing everything on the Webplayer
   * @returns Components that will be displayed on the page
   */
  render() {
    let homeActive = "";
    let searchActive = "";
    let libraryActive = "";
    let createPlaylistsActive = "";
    let likedSongsActive = "";
    let currentURL = window.location.href;
    if (currentURL === baseUrl2 + "webplayer/home") {
      homeActive = "active";
      searchActive = "";
      libraryActive = "";
      createPlaylistsActive = "";
      likedSongsActive = "";
    } else if (currentURL === baseUrl2 + "webplayer/librarypage/playlists") {
      homeActive = "";
      searchActive = "";
      libraryActive = " active";
      createPlaylistsActive = "";
      likedSongsActive = "";
    } else if (currentURL === baseUrl2 + "webplayer/likedplay") {
      homeActive = "";
      searchActive = "";
      libraryActive = "";
      createPlaylistsActive = "";
      likedSongsActive = "BottomTwoActive";
    }
    let redirected = null;
    if (this.state.SignedIn) {
      redirected = <Redirect to="/webplayer/librarypage/playlists"></Redirect>;
    }
    // const showLikeAndCreate = this.props.data.data.map((data) => {
    //   if (data.id === this.state.tempId) {
    //     return(
    //       <div>
    //           <h3 className="sidebarHeaderBetween">PLAYLISTS</h3>
    //           <Link to="/"  className={createPlaylistsActive}>
    //               <i className="fa fa-plus-square"></i>
    //               Create Playlist
    //           </Link>
    //           <Link to="/webplayer/nowplay"  className={likedSongsActive}>
    //               <i className="fa fa-heart"></i>
    //               Liked Songs
    //           </Link>
    //       </div>
    //     )
    //   }
    // });

    let showLikeAndCreate = (
      <div>
        <h3 className="sidebarHeaderBetween">PLAYLISTS</h3>
        <Link to="/" className={createPlaylistsActive}>
          <i className="fa fa-plus-square"></i>
          Create Playlist
        </Link>
        <Link to="/webplayer/likedplay" className={likedSongsActive}>
          <i className="fa fa-heart"></i>
          Liked Songs
        </Link>
      </div>
    );

    return (
      <div>
        {redirected}
        <div className="WebPlayerHomeBody">
          <div className="container InfoContainer">
            <div className="row InfoContainerRow">
              <div className="col-md-3 col-lg-2 Linkers">
                <div className="sidebar">
                  <Link to="/home" className="AppearBigImage">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSBmnPgQKW4JLrNcSFhPFCLHz3t8kT1pZl0PVkLYsa8FoScWYda"
                      height="50px"
                      width="145px"
                      alt=""
                    />
                  </Link>
                  <Link to="/webplayer/home" className={homeActive}>
                    <i className="fa fa-home" />
                    Home
                  </Link>
                  <Link to="/webplayer/search" className={searchActive}>
                    <i className="fa fa-search"></i>
                    Search
                  </Link>
                  <Button
                    className={"SidebarLibraryButton" + libraryActive}
                    onClick={this.toggleModal}>
                    <i className="fa fa-bomb"></i>
                    Your Library
                  </Button>
                  {showLikeAndCreate}
                </div>
              </div>
              <div className="col-md-9 col-lg-10 webPlayerHomeNavAndContent">
                <Switch>
                  <Route
                    path="/webplayer/home"
                    component={() => (
                      <HomeNavAndContent
                        data={this.props.data}
                        id={this.props.id}
                        playLists={this.props.playLists}
                        artist={this.props.artist}
                        album={this.props.album}
                        handleLogoutId={this.props.handleLogoutId}
                        ///////////////
                        data_be={this.props.data_be}
                        handleLogout_BE={this.props.handleLogout_BE}
                        isSignedIn={this.props.isSignedIn}
                        handleCurrentPlayList={this.props.handleCurrentPlayList}
                        categories={this.props.categories}
                        handleCurrentAlbums={this.props.handleCurrentAlbums}
                        handleCurrentArtists={this.props.handleCurrentArtists}
                      />
                    )}
                  />
                  <Route
                    path="/webplayer/librarypage"
                    component={() => (
                      <LibraryPage
                        data={this.props.data}
                        id={this.props.id}
                        playLists={this.props.playLists}
                        artist={this.props.artist}
                        album={this.props.album}
                        handleLogoutId={this.props.handleLogoutId}
                        data_be={this.props.data_be}
                        handleCurrentPlayList={this.props.handleCurrentPlayList}
                        isSignedIn={this.props.isSignedIn}
                        handleLogout_BE={this.props.handleLogout_BE}
                        currentPlaylist={this.props.currentPlaylist}
                        handleCurrentAlbums={this.props.handleCurrentAlbums}
                        handleCurrentArtists={this.props.handleCurrentArtists}
                        // fetchPlaylistById_be={this.props.fetchPlaylistById_be}
                        // playlist_BE={this.props.playlist_BE}
                      />
                    )}
                  />
                  />
                  <Route
                    exact
                    path="/webplayer/likedplay"
                    component={() => (
                      <LikedPlay
                        id={this.props.id}
                        data={this.props.data}
                        playLists={this.props.playLists}
                        data_be={this.props.data_be}
                        ///////fetching the playlist of the user
                        currentPlaylist={this.props.currentPlaylist}
                        isSignedIn={this.props.isSignedIn}
                        /// for logging out
                        handleLogout_BE={this.props.handleLogout_BE}
                        patchedfollow={this.props.patchedfollow}
                        patchedunfollow={this.props.patchedunfollow}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/webplayer/nowplay"
                    component={() => (
                      <NowPlay
                        id={this.props.id}
                        data={this.props.data}
                        playLists={this.props.playLists}
                        data_be={this.props.data_be}
                        ///////fetching the playlist of the user logged in
                        currentPlaylist={this.props.currentPlaylist}
                        isSignedIn={this.props.isSignedIn}
                        handleLogout_BE={this.props.handleLogout_BE}
                        ///////Handling the follow and unfollow of the users
                        patchedfollow={this.props.patchedfollow}
                        patchedunfollow={this.props.patchedunfollow}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/webplayer/artist"
                    component={() => (
                      <Artist
                        id={this.props.id}
                        data={this.props.data}
                        playLists={this.props.playLists}
                        data_be={this.props.data_be}
                        currentPlaylist={this.props.currentPlaylist}
                        isSignedIn={this.props.isSignedIn}
                        handleLogout_BE={this.props.handleLogout_BE}
                      />
                    )}
                  />
                  <Redirect to="/webplayer/home" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="footer-main row">
            <div className="col-sm-3 left-side">
              <div className="song-details">
                <p className="song-name">Song</p>
                <p className="artist-name">Artist</p>
              </div>
              <div className="like">
                <button className="like-button" onClick={this.toggleLiked}>
                  {this.state.liked == false ? (
                    <img src="../assets/images/unliked.png" alt="" />
                  ) : (
                    <img src="../assets/images/liked.png" alt="" />
                  )}
                </button>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="buttons-area">
                <ul className="buttons-list">
                  <li className="shuffle">
                    <button
                      className="shuffle-button"
                      onClick={this.toggleShuffle}>
                      {this.state.shuffle == true ? (
                        <img src="../assets/images/shuffle.png" alt="shuffle" />
                      ) : (
                        <img
                          src="../assets/images/shuffle-disabled.png"
                          alt="shuffle"
                        />
                      )}
                    </button>
                  </li>
                  <li className="previous">
                    <button className="previous-button" onClick={this.nextSong}>
                      <img src="../assets/images/previous.png" alt="previous" />
                    </button>
                  </li>
                  <li className="play">
                    <button className="play-button" onClick={this.togglePlay}>
                      {this.state.paused == true ? (
                        <img src="../assets/images/play.png" alt="play" />
                      ) : (
                        <img src="../assets/images/pause.png" alt="play" />
                      )}
                    </button>
                  </li>
                  <li className="next">
                    <button className="next-button" onClick={this.nextSong}>
                      <img src="../assets/images/next.png" alt="next" />
                    </button>
                  </li>
                  <li className="repeat">
                    <button
                      className="repeat-button"
                      onClick={this.changeRepeat}>
                      {this.state.repeat == 0 ? (
                        <img src="../assets/images/repeat.png" alt="repeat" />
                      ) : this.state.repeat == 1 ? (
                        <img
                          src="../assets/images/repeat-once.png"
                          alt="repeat"
                        />
                      ) : (
                        <img
                          src="../assets/images/repeat-off.png"
                          alt="repeat"
                        />
                      )}
                    </button>
                  </li>
                </ul>
              </div>
              <div className="control-area">
                <div className="time-before">
                  <p className="time-before-text">
                    {this.state.seekMins}:
                    {this.state.seekSeconds < 10 ? (
                      <span>0</span>
                    ) : (
                      <span></span>
                    )}
                    {this.state.seekSeconds}
                  </p>
                </div>
                <input
                  id="seek-slider"
                  name="seek-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={(this.audio.currentTime / this.audio.duration) * 100}
                  step="1"
                  onMouseDown={this.handleMouseDown}
                  onMouseUp={this.handleMouseUp}
                  onMouseMove={this.handleSeek}
                  ref={this.seekSlider}
                />
                <div className="time-after">
                  <p className="time-after-text">
                    {Number.isNaN(this.state.lengthMins) ? (
                      <span>0</span>
                    ) : (
                      this.state.lengthMins
                    )}
                    :
                    {this.state.lengthSeconds < 10 ? (
                      <span>0</span>
                    ) : (
                      <span></span>
                    )}
                    {Number.isNaN(this.state.lengthSeconds) ? (
                      <span>00</span>
                    ) : (
                      this.state.lengthSeconds
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-3 right-side">
              <button className="queue-button">
                <img src="../assets/images/queue.png" alt="queue" />
              </button>
              <button className="volume-button" onClick={this.toggleMute}>
                {this.state.muted == false ? (
                  <img src="../assets/images/volume-high.png" alt="volume" />
                ) : (
                  <img src="../assets/images/volume-mute.png" alt="volume" />
                )}
              </button>
              <input
                id="volume-slider"
                name="volume-slider"
                type="range"
                min="0"
                max="100"
                defaultValue={this.state.volume}
                step="1"
                onMouseMove={this.handleVolume}
                ref={this.volumeSlider}
              />
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          toggle={this.toggleModal}
          className="ModalBackGround row"
          size="lg">
          <div className="modal-content modalcontent">
            <ModalBody className="p-0 modalbody">
              <div className="row flexer">
                <div className="col-sm-6 col-md-6 col-lg-6 leftPart ">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 ">
                      <h2 className="theHeader">
                        Get the most out of Spotify with a free account
                      </h2>
                    </div>
                  </div>
                  <div className="row flexer">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <ol className="libraryol">
                        <li className="libraryli flexer">
                          <svg
                            className="librarysvg flexer"
                            xmlns="http://www.w3.org/1999/xlink"
                            viewBox="0 0 16 18"
                            width="16"
                            height="16">
                            <polygon points="13.985,2.383 5.127,12.754 1.388,8.375 0.73,9.145 5.127,14.294 14.745,3.032"></polygon>
                          </svg>
                          No credit card, ever
                        </li>
                        <li className="libraryli flexer">
                          <svg
                            className="librarysvg flexer"
                            xmlns="http://www.w3.org/1999/xlink"
                            viewBox="0 0 16 18"
                            width="16"
                            height="16">
                            <polygon points="13.985,2.383 5.127,12.754 1.388,8.375 0.73,9.145 5.127,14.294 14.745,3.032"></polygon>
                          </svg>
                          Get unlimited podcasts
                        </li>
                        <li className="libraryli flexer">
                          <svg
                            className="flexer librarysvg"
                            xmlns="http://www.w3.org/1999/xlink"
                            viewBox="0 0 16 18"
                            width="16"
                            height="16">
                            <polygon points="13.985,2.383 5.127,12.754 1.388,8.375 0.73,9.145 5.127,14.294 14.745,3.032"></polygon>
                          </svg>
                          Play your favorite music, with ads
                        </li>
                      </ol>
                      <div className="row LibraryModalClose">
                        <Button
                          className="LibraryModalCloseButton"
                          color="success"
                          onClick={this.toggleModal}>
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6">
                  <div className="righPart">
                    <div className="innerRight">
                      <Button className="signupfree">
                        <Link to="/signup" className="linksignup">
                          Sign up free
                        </Link>
                      </Button>
                      <div className="seperator_LibraryModal"></div>
                      <div className="alreadyhaveanaccount">
                        Already have an account?
                      </div>
                      <Button className="libraryloginbut">
                        <Link to="/signin" className="linkLogin">
                          Log in
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
          </div>
        </Modal>
      </div>
    );
  }
}

export default WebPlayer;
