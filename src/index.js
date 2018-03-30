import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";

class MessageLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t: 0,
      messages: []
    };
    this.chatRef = React.createRef();
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.addMessage(), 500);
  }

  addMessage() {
    let { messages, t } = this.state;
    if (messages.length < 1000) {
      const newMessage = `${new Date().toISOString()} message ${t}`;
      messages = [...messages, newMessage];
      t++;

      this.setState({ messages, t });
    }
  }

  // Take the `snapshot` of the DOM before update
  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { current } = this.chatRef;
    const isScrolledToBottom =
      current.scrollTop + current.offsetHeight >= current.scrollHeight;
    return { isScrolledToBottom };
  }

  // Recieve the snapshot and check if the user is scrolled to the bottom of the log
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isScrolledToBottom } = snapshot;
    if (snapshot.isScrolledToBottom) {
      this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight;
    }
  }

  renderMessage(msg, i) {
    return <li key={i}>{msg}</li>;
  }

  render() {
    return (
      <Fragment>
        <h1>Message Log</h1>
        <div ref={this.chatRef} className="log">
          <ul>
            {this.state.messages.map((msg, i) => {
              return this.renderMessage(msg, i);
            })}
          </ul>
        </div>
      </Fragment>
    );
  }
}

ReactDOM.render(<MessageLog />, document.getElementById("app"));
