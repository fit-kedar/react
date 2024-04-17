import React, { Component } from "react";
import {QUESTIONS} from "./questions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: '',
      score: 0,
      scoresHistory: JSON.parse(localStorage.getItem('scoresHistory')) || [],
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const score = this.calculateScore();
    this.setState(
        (prevState) => ({
          scoresHistory: [...prevState.scoresHistory, score],
        }),
        () => {
          localStorage.setItem('scoresHistory', JSON.stringify(this.state.scoresHistory));
        }
    );
  };
  handleOptionChange = (event, questionIndex) => {
    const { value } = event.target;
    this.setState({ [questionIndex]: value });
  };

  calculateScore = () => {
    let score = 0;
    const numberOfQuestions = Object.keys(QUESTIONS).length;
    Object.keys(this.state).forEach((key) => {
      if (this.state[key] === 'yes') {
        score += 100;
      } else if (this.state[key] === 'no') {
        score += 0;
      }
    });
    score = score/numberOfQuestions
    return score;
  };

  calculateAverageRating = () => {
    const { scoresHistory } = this.state;
    if (scoresHistory.length === 0) return 0;
    const totalScore = scoresHistory.reduce((acc, cur) => acc + cur, 0);
    return totalScore / scoresHistory.length;
  };

  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <div>
            <form onSubmit={this.handleSubmit}>
              { Object.values(QUESTIONS).map((question, index) =>(
                  <div key={index}>
                    <p>{question}</p>
                    <div>
                      <input
                          type="radio"
                          id={`yes-${index}`}
                          name={`option-${index}`}
                          value="yes"
                          checked={this.state[index] === 'yes'}
                          onChange={(e) => this.handleOptionChange(e, index)}
                      />
                      <label htmlFor={`yes-${index}`}>Yes</label>
                    </div>
                    <div>
                      <input
                          type="radio"
                          id={`no-${index}`}
                          name={`option-${index}`}
                          value="no"
                          checked={this.state[index] === 'no'}
                          onChange={(e) => this.handleOptionChange(e, index)}
                      />
                      <label htmlFor={`no-${index}`}>No</label>
                    </div>
                  </div>
                ))
              }
              <button type="submit">Submit</button>
            </form>
            <h2>Your Score: {this.calculateScore()}</h2>
            <p>Average Rating: {this.calculateAverageRating()}</p>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
