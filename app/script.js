import React from "react";
import { render } from "react-dom";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      status: "off",
      time: 0,
      timer: null,
    };
  }

  formatTime = (time) => {
    const newTime = new Date(time * 1000).toISOString().substr(14, 5);
    return newTime;
  };

  step = () => {
    this.setState({
      time: this.state.time - 1,
    });
    if (this.state.time === 0) {
      this.playBell();
      this.setState({
        time: this.state.status === "work" ? 20 : 1200,
        status: this.state.status === "work" ? "rest" : "work",
      });
    }
  };

  startTimer = () => {
    this.setState({
      status: "work",
      time: 1200,
      timer: setInterval(this.step, 1000),
    });
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      time: 0,
      status: "off",
    });
  };

  playBell = () => {
    const audioElement = new Audio("./sounds/bell.wav");
    audioElement.play();
  };

  render() {
    const { status, time, timer } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === "off" && (
          <React.Fragment>
            <p>
              According to optometrists in order to save your eyes, you should
              follow the 20/20/20. It means you should to rest your eyes every
              20 minutes for 20 seconds by looking more than 20 feet away.
            </p>
            <p>
              This app will help you track your time and inform you when it's
              time to rest.
            </p>
          </React.Fragment>
        )}

        {status === "work" && <img src="./images/work.png" />}
        {status === "rest" && <img src="./images/rest.png" />}
        {status !== "off" && (
          <div className="timer">{this.formatTime(time)}</div>
        )}
        {status === "off" ? (
          <button className="btn" onClick={this.startTimer}>
            Start
          </button>
        ) : (
          <button className="btn" onClick={this.stopTimer}>
            Stop
          </button>
        )}

        <button className="btn btn-close" onClick={() => window.close()}>
          X
        </button>
      </div>
    );
  }
}

render(<App />, document.querySelector("#app"));
