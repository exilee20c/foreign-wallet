import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLevelDownAlt } from "@fortawesome/free-solid-svg-icons";

import common_actions from "../redux/actions/common";
import jpy_trip_actions from "../redux/actions/jpy_trip";
import Button from "../component/Button";

const ChooseRoot = styled.div`
  h6.trip-scale {
    font-size: 1.6em;
    font-family: sans-serif;
    font-weight: bold;
    margin-bottom: 1em;
    text-align: center;
  }
`;

library.add(faLevelDownAlt);

class PhaseOneApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number_input: 0
    };

    this.handleNumberInput = this.handleNumberInput.bind(this);
    this.handleTitleInput = this.handleTitleInput.bind(this);

    this.handleSetUnit1 = this.makeHandleSetUnit(1).bind(this);
    this.handleSetUnit5 = this.makeHandleSetUnit(5).bind(this);
    this.handleSetUnit10 = this.makeHandleSetUnit(10).bind(this);
    this.handleSetUnit50 = this.makeHandleSetUnit(50).bind(this);
    this.handleSetUnit100 = this.makeHandleSetUnit(100).bind(this);
    this.handleSetUnit500 = this.makeHandleSetUnit(500).bind(this);
    this.handleSetUnit1000 = this.makeHandleSetUnit(1000).bind(this);
    this.handleSetUnit2000 = this.makeHandleSetUnit(2000).bind(this);
    this.handleSetUnit5000 = this.makeHandleSetUnit(5000).bind(this);
    this.handleSetUnit10000 = this.makeHandleSetUnit(10000).bind(this);
  }

  handleNumberInput(e) {
    if (isNaN(e.target.value)) {
      return;
    }

    this.setState({ number_input: +e.target.value });
  }

  handleTitleInput(e) {
    const { common, setTitle } = this.props;
    const { trip_id } = common;

    setTitle({ trip_id, title: e.target.value });
  }

  makeHandleSetUnit(unit) {
    return function(e) {
      const { common, jpy_trip, setUnit } = this.props;
      const { trip_id } = common;

      setUnit({ trip_id, key: unit, value: +e.target.value });
    };
  }

  render() {
    const { common, jpy_trip } = this.props;
    const { trip_id } = common;
    const { [trip_id]: my_jpy_trip } = jpy_trip;
    const {
      jpy_1,
      jpy_5,
      jpy_10,
      jpy_50,
      jpy_100,
      jpy_500,
      jpy_1000,
      jpy_2000,
      jpy_5000,
      jpy_10000,
      jpy_title,
      jpy_confirmed
    } = my_jpy_trip;

    return (
      <ChooseRoot>
        <div className="flex-root">
          <h6 className="trip-scale">여행의 예산을 입력해주세요.</h6>

          <input
            type="text"
            value={jpy_title}
            onChange={this.handleTitleInput}
          />
          <input
            type="text"
            value={this.state.number_input}
            onChange={this.handleNumberInput}
          />
          <button>
            <FontAwesomeIcon icon="level-down-alt" />
          </button>

          <input type="range" onChange={this.handleSetUnit1} value={jpy_1} />
          <input type="range" onChange={this.handleSetUnit5} value={jpy_5} />
          <input type="range" onChange={this.handleSetUnit10} value={jpy_10} />
          <input type="range" onChange={this.handleSetUnit50} value={jpy_50} />
          <input
            type="range"
            onChange={this.handleSetUnit100}
            value={jpy_100}
          />
          <input
            type="range"
            onChange={this.handleSetUnit500}
            value={jpy_500}
          />
          <input
            type="range"
            onChange={this.handleSetUnit1000}
            value={jpy_1000}
          />
          <input
            type="range"
            onChange={this.handleSetUnit2000}
            value={jpy_2000}
          />
          <input
            type="range"
            onChange={this.handleSetUnit5000}
            value={jpy_5000}
          />
          <input
            type="range"
            onChange={this.handleSetUnit10000}
            value={jpy_10000}
          />
        </div>
      </ChooseRoot>
    );
  }
}

const mapStateToProps = state => ({
  common: state.common,
  jpy_trip: state.jpy_trip
});

const mapDispatchToProps = dispatch => ({
  setTitle: payload => dispatch({ type: jpy_trip_actions.SET_TITLE, payload }),
  setUnit: payload => dispatch({ type: jpy_trip_actions.SET_UNIT, payload }),
  setPhase: phase =>
    dispatch({ type: common_actions.SET_PHASE, payload: phase })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhaseOneApp);
