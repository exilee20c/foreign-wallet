import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneArrival } from "@fortawesome/free-solid-svg-icons";

import common_actions from "../redux/actions/common";
import jpy_trip_actions from "../redux/actions/jpy_trip";
import Button from "../component/Button";

const ChooseRoot = styled.div`
  color: #ffffff;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;

  > div.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 32px;
    background-color: #81d4fa;

    button.logo-icon {
      margin: 0;
      padding: 4px;
      border: 0;
      outline: 0;
      color: #03a9f4;
      background-color: transparent;

      font-size: 24px;
      line-height: 24px;
      font-family: sans-serif;
      font-weight: bold;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
  > div.flex-root {
    flex: 1;
  }
`;

library.add(faPlaneArrival);

function withReturnToHome(ChildComponent) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class extends Component {
      constructor(props) {
        super(props);

        this.handleReturnToHome = this.handleReturnToHome.bind(this);
      }

      handleReturnToHome() {
        this.props.setCurrency(undefined);
        this.props.setTripId(undefined);
        this.props.setPhase(0);
      }

      render() {
        return (
          <ChooseRoot>
            <div className="fixed-header">
              <button onClick={this.handleReturnToHome} className="logo-icon">
                <FontAwesomeIcon icon="plane-departure" /> 여행자의 지갑
              </button>
            </div>
            <div className="flex-root">{ChildComponent}</div>
          </ChooseRoot>
        );
      }
    }
  );
}

const mapStateToProps = state => ({
  common: state.common
});

const mapDispatchToProps = dispatch => ({
  setCurrency: currency =>
    dispatch({ type: common_actions.SET_CURRENCY, payload: currency }),
  setPhase: phase =>
    dispatch({ type: common_actions.SET_PHASE, payload: phase }),
  setTripId: tripId =>
    dispatch({ type: common_actions.SET_TRIP_ID, payload: tripId })
});

export { withReturnToHome as default };
