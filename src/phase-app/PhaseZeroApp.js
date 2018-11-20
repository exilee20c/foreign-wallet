import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYenSign } from "@fortawesome/free-solid-svg-icons";

import actions from "../redux/actions/common";
import Button from "../component/Button";

const ChooseRoot = styled.div`
  color: #ffffff;
`;

library.add(faYenSign);

class PhaseZeroApp extends Component {
  render() {
    return (
      <ChooseRoot>
        <Button theme="dark" fluid>
          <FontAwesomeIcon icon="yen-sign" /> dark fluid
        </Button>
        <Button>
          <FontAwesomeIcon icon="yen-sign" /> inline
        </Button>
        <Button>
          <FontAwesomeIcon icon="yen-sign" /> inline
        </Button>
      </ChooseRoot>
    );
  }
}

const mapStateToProps = state => ({
  phase: state.phase
});

const mapDispatchToProps = dispatch => ({
  setCurrency: currency =>
    dispatch({ type: actions.SET_CURRENCY, payload: currency }),
  setPhase: phase => dispatch({ type: actions.SET_PHASE, payload: phase })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhaseZeroApp);
