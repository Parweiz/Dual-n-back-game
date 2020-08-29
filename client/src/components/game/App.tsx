import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { logoutUser } from '../../actions/authActions';
import { createNewScore } from '../../actions/highscoreActions';
import './App.css';
import Game from './Game';
import store from '../../store';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";

//import logo from './logo.svg';

export interface IState {
  gameRunning: boolean;
  gridSize: number;
  score: number;
}

const mapDispatchToProps = {
  createNewScore,
};

const mapStateToProps = (state: { auth: any; errors: any; }) => ({
  auth: state.auth,
  errors: state.errors
});

type Props = typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps> & 
  RouteComponentProps;

const URL = 'ws://localhost:3030'

class App extends React.Component<Props, IState> {

  ws = new WebSocket(URL)

  constructor(props: any) {
    super(props);

    

    this.state = {
      gameRunning: false,
      gridSize: 3,
      score: 0
    };

    this.setGridSize = this.setGridSize.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
  }

  componentDidMount() {
    this.ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected')
    }

    this.ws.onclose = () => {
        console.log('disconnected')
        // automatically try to reconnect on connection loss
        setTimeout(function() {
          connect();
        }, 1000);
    }   
  }   

  public render() {

    return (
      <div className="App">
        <h1 className="App-title">You are logged in to increase your {" "}
                <span style={{ fontFamily: "monospace" }}>GAMER</span> brain 🧐</h1>
        <Container>
          <Row>
            <Col xs="3">
              <input type="range" min="3" max="5" className="slider" value={this.state.gridSize} onInput={this.setGridSize} onChange={this.setGridSize} />
            </Col>
            <Col xs="6">
              <Game rows={this.state.gridSize} columns={this.state.gridSize} running={this.state.gameRunning} onScoreChange={this.onScoreChange} />
            </Col>
            <Col xs="3">
              <Row>
                <Col xs="12">
                  <Button color="primary" className={this.state.gameRunning ? 'hidden' : ''} onClick={this.onPlay}>Play</Button>
                  <Button color="primary" className={!this.state.gameRunning ? 'hidden' : ''} onClick={this.onPause}>Pause</Button>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <Button color="primary" className='loggingOut' onClick={this.onClickLogout}>Logout</Button>
                </Col>
              </Row>
                  <Button color="primary" className='postScore' onClick={this.onPostScore}>Post Score</Button>
              <Row>
                <p>{this.state.score}</p>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  

  private onClickLogout(e: any) {
    e.preventDefault();
    store.dispatch(logoutUser());
  }

  private setGridSize(e: any) {
    this.setState({ gridSize: e.target.value });
  }

  private onPlay(e: any) {
    this.setState({ gameRunning: true });
  }

  private onPause(e: any) {
    this.setState({ gameRunning: false });
  }

  private onPostScore = (e: any) => {
    e.preventDefault();

    const user = this.props.auth.user.name;

    const newScore: number = this.state.score;

    const score =  {
      name: user,
      points: newScore
    }

    this.ws.send(JSON.stringify(score));
    
    this.props.createNewScore(user, newScore, this.props.history);
  };

  private onScoreChange(prevScore: number, nextScore: number) {
    this.setState({ score: nextScore });
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));