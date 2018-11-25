import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSyncAlt,
  faYenSign,
  faTimes,
  faThumbtack
} from "@fortawesome/free-solid-svg-icons";

import common_actions from "../redux/actions/common";
import jpy_trip_actions from "../redux/actions/jpy_trip";
import Button from "../component/Button";

const ChooseRoot = styled.div`
  h6.trip-scale {
    font-family: sans-serif;
    font-weight: bold;
    margin-bottom: 0.5em;
    text-align: center;
    font-size: 16px;
  }

  div.inputs-overflow {
    max-height: calc(100vh - 229px);
    overflow: auto;
  }

  div.input-btn-wrap {
    width: calc(100% - 4em);
    margin: 0 auto 3em;
  }

  input.smooth-input {
    width: calc(100% - 4em);
    display: block;
    margin: 0 auto 1em;
    font-size: 16px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 8px;
    border: 0;
    outline: none;
    font-weight: bold;

    &.with-confirm {
      width: calc(100% - 4em);
      display: inline-block;
      margin: 0;
      border-radius: 8px 0 0 8px;

      &.pinned {
        color: #ffffff;
        background-color: #03a9f4;
      }
    }
  }

  button.btn-confirm {
    width: 4em;
    font-size: 16px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 0 8px 8px 0;
    border: 0;
    outline: none;
    font-weight: bold;
    color: #ffffff;
    background-color: #03a9f4;
  }

  div.unit-wrap {
    width: calc(100% - 4em);
    margin: 0 auto 1em;

    span {
      display: inline-block;
      width: 120px;
      font-size: 16px;
      font-weight: bold;
      vertical-align: middle;
    }

    input.unit-input {
      width: calc(100% - 120px);
      margin: 0;
      padding: 6px 0;
      font-size: 16px;
      vertical-align: middle;
    }
  }
`;

library.add(faSyncAlt, faYenSign, faTimes, faThumbtack);

class PhaseOneApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number_input: 0,
      is_number_sync: false
    };

    this.handleNumberInput = this.handleNumberInput.bind(this);
    this.handleTitleInput = this.handleTitleInput.bind(this);
    this.handleSync = this.handleSync.bind(this);

    this.setUnit1 = this.makeSetUnit(1).bind(this);
    this.setUnit5 = this.makeSetUnit(5).bind(this);
    this.setUnit10 = this.makeSetUnit(10).bind(this);
    this.setUnit50 = this.makeSetUnit(50).bind(this);
    this.setUnit100 = this.makeSetUnit(100).bind(this);
    this.setUnit500 = this.makeSetUnit(500).bind(this);
    this.setUnit1000 = this.makeSetUnit(1000).bind(this);
    this.setUnit2000 = this.makeSetUnit(2000).bind(this);
    this.setUnit5000 = this.makeSetUnit(5000).bind(this);
    this.setUnit10000 = this.makeSetUnit(10000).bind(this);
  }

  handleNumberInput(e) {
    if (this.state.is_number_sync) {
      return;
    }

    let the_value = e.target.value.replace(/,/g, "");

    if (isNaN(the_value)) {
      return;
    } else if (+the_value > Math.pow(2, 32)) {
      return;
    }

    this.setState({ number_input: +the_value });
  }

  handleTitleInput(e) {
    const { common, setTitle } = this.props;
    const { trip_id } = common;

    setTitle({ trip_id, title: e.target.value });
  }

  fact(value, key, chain_to_lower) {
    const trip_id = this.props.common.trip_id;
    const jpy_wallet = this.props.jpy_trip[trip_id];
    const target_current = jpy_wallet[`jpy_${key}`];
    const lower_match = {
      m10000: [5000],
      m5000: [2000, 1000],
      m2000: [1000],
      m1000: [500],
      m500: [100],
      m100: [50],
      m50: [10],
      m10: [5],
      m5: [1],
      m1: []
    };

    const lower_unit0 = lower_match[`m${key}`][0];
    const lower_unit1 = lower_match[`m${key}`][1];
    const lower_scale0 = parseInt(key / lower_unit0, 0);
    const lower_scale_rest1 = parseInt(
      (key - lower_scale0 * lower_unit0) / lower_unit1,
      0
    );
    const lower_current0 = jpy_wallet[`jpy_${lower_unit0}`];
    const lower_current1 = jpy_wallet[`jpy_${lower_unit1}`];
    const gap = value - target_current;

    if (value < 0) {
      if (lower_current0 !== undefined && lower_current0 !== null) {
        this.fact(lower_current0 + gap * lower_scale0, lower_unit0, false);
      }
      if (lower_current1 !== undefined && lower_current1 !== null) {
        if (lower_current0 + gap * lower_scale0 < 0) {
          this.fact(
            lower_current1 +
              gap * lower_scale_rest1 +
              lower_current0 +
              (gap * lower_scale0 * lower_unit0) / lower_unit1,
            lower_unit1,
            false
          );
        } else {
          this.fact(
            lower_current1 + gap * lower_scale_rest1,
            lower_unit1,
            false
          );
        }
      }

      this.props.setUnit({ trip_id, key: key, value: 0 });
    } else {
      if (chain_to_lower) {
        if (lower_current0 !== undefined && lower_current0 !== null) {
          this.fact(lower_current0 - gap * lower_scale0, lower_unit0, false);
        }
        if (lower_current1 !== undefined && lower_current1 !== null) {
          if (lower_current0 - gap * lower_scale0 < 0) {
            this.fact(
              lower_current1 -
                gap * lower_scale_rest1 +
                lower_current0 -
                (gap * lower_scale0 * lower_unit0) / lower_unit1,
              lower_unit1,
              false
            );
          } else {
            this.fact(
              lower_current1 - gap * lower_scale_rest1,
              lower_unit1,
              false
            );
          }
        }
      }

      this.props.setUnit({ trip_id, key: key, value: value });
    }
  }

  makeSetUnit(unit) {
    return ({ target }) => {
      this.fact(+target.value, unit, true);
    };
  }

  handleSync() {
    if (!this.state.is_number_sync) {
      this.textRangeAlgorithm();
    }

    this.setState({ is_number_sync: !this.state.is_number_sync });
  }

  textRangeAlgorithm() {
    let remain_total = +this.state.number_input;

    this.setUnit10000({ target: { value: parseInt(remain_total / 10000, 0) } });
    remain_total %= 10000;

    this.setUnit5000({ target: { value: parseInt(remain_total / 5000, 0) } });
    remain_total %= 5000;

    this.setUnit2000({ target: { value: parseInt(remain_total / 2000, 0) } });
    remain_total %= 2000;

    this.setUnit1000({ target: { value: parseInt(remain_total / 1000, 0) } });
    remain_total %= 1000;

    this.setUnit500({ target: { value: parseInt(remain_total / 500, 0) } });
    remain_total %= 500;

    this.setUnit100({ target: { value: parseInt(remain_total / 100, 0) } });
    remain_total %= 100;

    this.setUnit50({ target: { value: parseInt(remain_total / 50, 0) } });
    remain_total %= 50;

    this.setUnit10({ target: { value: parseInt(remain_total / 10, 0) } });
    remain_total %= 10;

    this.setUnit5({ target: { value: parseInt(remain_total / 5, 0) } });
    remain_total %= 5;

    this.setUnit1({ target: { value: parseInt(remain_total / 1, 0) } });
    remain_total %= 1;
  }

  render() {
    const { common, jpy_trip } = this.props;
    const { trip_id } = common;
    const { [trip_id]: my_jpy_trip } = jpy_trip;
    const { jpy_title, jpy_confirmed } = my_jpy_trip;

    return (
      <ChooseRoot>
        <input
          className="smooth-input"
          type="text"
          value={jpy_title}
          placeholder="여행의 제목을 입력해주세요."
          onChange={this.handleTitleInput}
        />
        {/* <h6 className="trip-scale">여행의 예산을 입력해주세요.</h6> */}
        <div className="input-btn-wrap">
          <input
            className={`smooth-input with-confirm${
              this.state.is_number_sync ? " pinned" : ""
            }`}
            type="text"
            value={("" + this.state.number_input).replace(
              /(\d)(?=(\d\d\d)+(?!\d))/g,
              "$1,"
            )}
            onChange={this.handleNumberInput}
            onClick={this.state.is_number_sync ? this.handleSync : () => {}}
          />

          <button className="btn-confirm" onClick={this.handleSync}>
            {this.state.is_number_sync && <FontAwesomeIcon icon="thumbtack" />}
            {"  "}
            <FontAwesomeIcon icon="sync-alt" spin={this.state.is_number_sync} />
          </button>
        </div>

        <div className="inputs-overflow">
          {[1, 5, 10, 50, 100, 500, 1000, 2000, 5000, 10000]
            .reverse()
            .map(unit => {
              let upper_totals = 0;

              if (+unit < 10000) upper_totals += my_jpy_trip.jpy_10000 * 10000;
              if (+unit < 5000) upper_totals += my_jpy_trip.jpy_5000 * 5000;
              if (+unit < 2000) upper_totals += my_jpy_trip.jpy_2000 * 2000;
              if (+unit < 1000) upper_totals += my_jpy_trip.jpy_1000 * 1000;
              if (+unit < 500) upper_totals += my_jpy_trip.jpy_500 * 500;
              if (+unit < 100) upper_totals += my_jpy_trip.jpy_100 * 100;
              if (+unit < 50) upper_totals += my_jpy_trip.jpy_50 * 50;
              if (+unit < 10) upper_totals += my_jpy_trip.jpy_10 * 10;
              if (+unit < 5) upper_totals += my_jpy_trip.jpy_5 * 5;

              return (
                <div key={unit} className="unit-wrap">
                  <span>
                    ${unit}
                    <FontAwesomeIcon icon="yen-sign" />{" "}
                    <FontAwesomeIcon icon="times" />{" "}
                    {this.state.is_number_sync ? my_jpy_trip[`jpy_${unit}`] : 0}
                  </span>
                  <input
                    className="unit-input"
                    type="range"
                    onChange={this[`setUnit${unit}`]}
                    value={
                      this.state.is_number_sync ? my_jpy_trip[`jpy_${unit}`] : 0
                    }
                    max={
                      this.state.is_number_sync
                        ? parseInt(
                            (this.state.number_input - upper_totals) / unit,
                            0
                          )
                        : 0
                    }
                  />
                </div>
              );
            })}
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
