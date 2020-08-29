import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getAllScores } from '../../actions/highscoreActions';
import Score from './Score';

import { Provider } from "react-redux";
import store from "../../store";

import PrivateRoute from "../../components/private-route/PrivateRoute";

const URL = 'ws://localhost:3030'

class Scorelist extends Component {
  state = {
    players: [ 
      {
        name: 'Simon',
        points: 300,
        date: new Date()
      },
      {
        name: 'Jan',
        points: 35,
        date: new Date()
      },
      {
        name: 'Jeppe',
        points: 420,
        date: new Date()
      },
      {
        name: 'Alexander',
        points: 69,
        date: new Date()
      },
      {
        name: 'Tri',
        points: 420,
        date: new Date()
      },
      {
        name: 'Macradon',
        points: 350,
        date: new Date()
      },
      {
        name: 'Macradon',
        points: 250,
        date: new Date()
      },
      {
        name: 'Aram',
        points: 78,
        date: new Date()
      },
    ]
  };

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      console.log("new message", evt);
      const newScore = JSON.parse(evt.data);
      console.log(newScore);
      this.addScore(newScore);
    };

    this.ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL)
      });
    };
  }

  addScore = newScore => {
    console.log(
      "adding score for user ",
      newScore.name,
      " with score ",
      newScore.score,
      "object is ",
      newScore
    );

    const clientScore = {
      id: this.state.players.length+1,
      name: newScore.name,
      points: newScore.points,
      date: new Date()
    };

    this.setState({
      players: [clientScore, ...this.state.players]
    });

    console.log("Adding Score");
  };

  getScores(){
    return getAllScores();
  };

  updateState(){
    let map = new Map().set(this.getAllScores);
    let keys = [...map.keys()];
    console.log(keys);

    // map.forEach(elemen =>{
    //   const eachScore = {
    //     id: this.state.players.length+1,
    //     name: elemen.User,
    //     points: elemen.points,
    //     date: new Date()
    //   }
    //   this.setState({
    //     players: [eachScore, ...this.state.players]
    //   });
    // })
  };

  render() {
    this.updateState();

    return (
      <div className="col">
        <ul>
          <h2>List of People</h2>
          {this.state.players.map(item => (
            <li key={item.id}>
              <Score name={item.name} points={item.points} date={item.date.toString()} />
              <div>_____________________</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Scorelist;                                                
                                                

                                              