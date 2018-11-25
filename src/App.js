import React, { Component } from "react";

import styled from "styled-components";
import { connect } from "react-redux";

import withReturnToHome from "./phase-app/withReturnToHome";
import PhaseZeroApp from "./phase-app/PhaseZeroApp";
import PhaseOneApp from "./phase-app/PhaseOneApp";
import PhaseTwoApp from "./phase-app/PhaseTwoApp";

const AppRoot = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #81d4fa;
  overflow: hidden;
`;

const PhaseOneAppWithReturnToHome = withReturnToHome(<PhaseOneApp />);
const PhaseTwoAppWithReturnToHome = withReturnToHome(<PhaseTwoApp />);

class App extends Component {
  render() {
    const { common } = this.props;
    const { phase } = common;

    return (
      <AppRoot>
        {phase === 0 && <PhaseZeroApp />}
        {phase === 1 && <PhaseOneAppWithReturnToHome />}
        {phase === 2 && <PhaseTwoAppWithReturnToHome />}
      </AppRoot>
    );
  }
}

const mapStateToProps = state => ({
  common: state.common
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
