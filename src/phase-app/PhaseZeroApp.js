import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYenSign, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";

import common_actions from "../redux/actions/common";
import jpy_trip_actions from "../redux/actions/jpy_trip";
import Button from "../component/Button";

const ChooseRoot = styled.div`
  color: #ffffff;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;

  > div.flex-root {
    flex: 1;

    div.buttons-overflow {
      max-height: calc(100vh - 66px - 32vmin);
      overflow: auto;
    }
  }

  div.logo-icon {
    height: 16vmin;
    text-align: center;
    color: #03a9f4;
    font-size: 24px;
    line-height: 24px;
    font-family: sans-serif;
    font-weight: bold;
    vertical-align: middle;

    svg {
      width: 16vmin;
      height: 16vmin;
      vertical-align: middle;
    }
  }
`;

library.add(faYenSign, faPlaneDeparture);

class PhaseZeroApp extends Component {
  constructor(props) {
    super(props);

    this.handleGoToTripClick = this.handleGoToTripClick.bind(this);
    this.handleNewYenTripClick = this.handleNewYenTripClick.bind(this);
  }

  handleGoToTripClick({ currency, trip_id, phase }) {
    this.props.setCurrency(currency);
    this.props.setTripId(trip_id);
    this.props.setPhase(phase);
  }

  handleNewYenTripClick() {
    const new_trip_id = "trp" + new Date().getTime() + "" + Math.random();

    this.props.setCurrency("jpy");
    this.props.setTripId(new_trip_id);
    this.props.initTrip(new_trip_id);
    this.props.setPhase(1);
  }

  render() {
    const { jpy_trip } = this.props;
    const trips_arr = [];

    for (let key in jpy_trip) {
      const { jpy_title, jpy_confirmed } = jpy_trip[key];

      trips_arr.push(
        <Button
          key={key}
          onClick={() =>
            this.handleGoToTripClick({
              currency: "jpy",
              trip_id: key,
              phase: jpy_confirmed ? 2 : 1
            })
          }
          fluid
          style={{ fontWeight: "bold" }}
        >
          <FontAwesomeIcon icon="yen-sign" /> {jpy_title || "제목없는 여행"}
        </Button>
      );
    }

    return (
      <ChooseRoot>
        <div className="flex-root">
          <div className="logo-icon">
            <FontAwesomeIcon icon="plane-departure" /> 여행자의 지갑
          </div>

          <Button
            onClick={this.handleNewYenTripClick}
            theme="sky"
            fluid
            style={{ fontWeight: "bold" }}
          >
            <FontAwesomeIcon icon="yen-sign" /> 새 여행 만들기
          </Button>

          <div className="buttons-overflow">{trips_arr.reverse()}</div>
        </div>
      </ChooseRoot>
    );
  }
}

const mapStateToProps = state => ({
  jpy_trip: state.jpy_trip
});

const mapDispatchToProps = dispatch => ({
  setCurrency: currency =>
    dispatch({ type: common_actions.SET_CURRENCY, payload: currency }),
  setPhase: phase =>
    dispatch({ type: common_actions.SET_PHASE, payload: phase }),
  setTripId: tripId =>
    dispatch({ type: common_actions.SET_TRIP_ID, payload: tripId }),
  initTrip: tripId =>
    dispatch({ type: jpy_trip_actions.INIT_TRIP, payload: tripId })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhaseZeroApp);
