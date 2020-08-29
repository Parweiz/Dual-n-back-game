import axios from "axios";

import { GET_ERRORS } from "./types";

export const createNewScore = (userName: string, scoreData: number, history: any) => {
  return (dispatch: any) => {
    axios
      .post("api/highscores/postScore", {userName, scoreData})
      .then(res => history.push("/scoreboard"))
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const getAllScores = () => {
  return (dispatch: any) => {
    axios
      .get("api/highscores/getScores")
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};
