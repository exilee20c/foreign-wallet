import React, { Component } from "react";

import styled from "styled-components";
import { connect } from "react-redux";

import PhaseZeroApp from "./phase-app/PhaseZeroApp";

const AppRoot = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #81d4fa;
`;

class App extends Component {
  render() {
    const { common } = this.props;
    const { phase } = common;
    return <AppRoot>{phase === 0 && <PhaseZeroApp />}</AppRoot>;
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
