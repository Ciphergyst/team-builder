import React, { Component } from "react";
import { render } from "react-dom";
import FormContainer from "./containers/FormContainer";
// import MemberList from "./components/MemberList";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends Component {
  render() {
    return (
      <div className="col-md-6">
        <h3> Team Member Submission Form </h3>
        <FormContainer />
        {/* <MemberList /> */}
      </div>
    );
  }
}

export default App;
