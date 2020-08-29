import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import { Provider } from "react-redux";
import store from "../../store";
//import App from "../game/App";

import PrivateRoute from "../../components/private-route/PrivateRoute";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="col center-align">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged in to increase your{" "}
                <span style={{ fontFamily: "monospace" }}>GAMER</span> brain 🧐
              </p>
            </h4>
            <p className="grey-text text-darken-1">
              Ready to play? <Link to="/game">Play the game</Link>
            </p>
            <p className="grey-text text-darken-1">
              Check the highscores on the <Link to="/scoreboard">Leaderboards</Link>
            </p>
            <p className="grey-text text-darken-1">
              Want to logout? <button
              style={{
                width: "100px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
            </p>
            
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
