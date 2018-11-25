import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYenSign,
  faTimes,
  faPlus,
  faMinus
} from "@fortawesome/free-solid-svg-icons";

const DashBoard = styled.div`
  h5.welcome-text {
    font-size: 20px;
    margin-bottom: 24px;
    font-family: monospace;
    font-weight: bold;
    text-align: center;
  }

  div.unit-info {
    h6 {
      font-weight: bold;

      svg.float-right {
        float: right;
      }
    }

    cursor: pointer;
    background: #03a9f4;
    width: calc(100% - 40px);
    margin: 0 auto;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 8px;

    ul {
      overflow: hidden;
      transition: max-height 0.3s, margin-top 0.3s;

      &.hide {
        max-height: 0px;
        margin-top: 0;
      }

      &.show {
        max-height: 120px;
        margin-top: 1em;
      }

      li {
        line-height: 1.5;
        display: inline-block;
        width: 50%;
      }
    }
  }
`;

library.add(faYenSign, faTimes, faPlus, faMinus);

class PhaseTwoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show_init_total_detail: false
    };

    this.toggleInitTotalDetail = this.toggleInitTotalDetail.bind(this);
  }

  toggleInitTotalDetail() {
    this.setState(state => ({
      show_init_total_detail: !state.show_init_total_detail
    }));
  }

  render() {
    const { jpy_trip, common } = this.props;
    const { trip_id } = common;
    const my_trip = jpy_trip[trip_id];
    const {
      jpy_title,
      jpy_1,
      jpy_5,
      jpy_10,
      jpy_50,
      jpy_100,
      jpy_500,
      jpy_1000,
      jpy_2000,
      jpy_5000,
      jpy_10000
    } = my_trip;
    const total =
      jpy_1 * 1 +
      jpy_5 * 5 +
      jpy_10 * 10 +
      jpy_50 * 50 +
      jpy_100 * 100 +
      jpy_500 * 500 +
      jpy_1000 * 1000 +
      jpy_2000 * 2000 +
      jpy_5000 * 5000 +
      jpy_10000 * 10000;

    // jpy_confirmed: true,
    // jpy_history: []

    return (
      <DashBoard>
        <h5 className="welcome-text">{jpy_title}, 즐겁게 만끽중이신가요?</h5>

        <div className="unit-info" onClick={this.toggleInitTotalDetail}>
          <h6>
            총 {total}
            <FontAwesomeIcon icon="yen-sign" />을 환전해오셨네요.
            {this.state.show_init_total_detail ? (
              <FontAwesomeIcon icon="minus" className="float-right" />
            ) : (
              <FontAwesomeIcon icon="plus" className="float-right" />
            )}
          </h6>

          <ul className={this.state.show_init_total_detail ? "show" : "hide"}>
            {jpy_10000 > 0 && (
              <li>
                10000 <FontAwesomeIcon icon="yen-sign" />{" "}
                <FontAwesomeIcon icon="times" /> {jpy_10000}
              </li>
            )}
            {jpy_5000 > 0 && (
              <li>
                5000 <FontAwesomeIcon icon="yen-sign" />{" "}
                <FontAwesomeIcon icon="times" /> {jpy_5000}
              </li>
            )}
            {jpy_2000 > 0 && (
              <li>
                2000 <FontAwesomeIcon icon="yen-sign" />{" "}
                <FontAwesomeIcon icon="times" /> {jpy_2000}
              </li>
            )}
            {jpy_1000 > 0 && (
              <li>
                1000 <FontAwesomeIcon icon="yen-sign" />{" "}
                <FontAwesomeIcon icon="times" /> {jpy_1000}
              </li>
            )}
            {jpy_500 > 0 && (
              <li>
                500 <FontAwesomeIcon icon="yen-sign" />{" "}
                <FontAwesomeIcon icon="times" /> {jpy_500}
              </li>
            )}
            {jpy_100 > 0 && (
              <li>
                100 <FontAwesomeIcon icon="yen-sign" />{" "}
                <FontAwesomeIcon icon="times" /> {jpy_100}
              </li>
            )}
            {jpy_50 > 0 && (
              <li>
                50 <FontAwesomeIcon icon="yen-sign" />{" "}
                <FontAwesomeIcon icon="times" /> {jpy_50}
              </li>
            )}
            {jpy_10 > 0 && (
              <li>
                10 <FontAwesomeIcon icon="yen-sign" />{" "}
                <FontAwesomeIcon icon="times" /> {jpy_10}
              </li>
            )}
            {jpy_5 > 0 && (
              <li>
                5 <FontAwesomeIcon icon="yen-sign" />{" "}
                <FontAwesomeIcon icon="times" /> {jpy_5}
              </li>
            )}
            {jpy_1 > 0 && (
              <li>
                1 <FontAwesomeIcon icon="yen-sign" />{" "}
                <FontAwesomeIcon icon="times" /> {jpy_1}
              </li>
            )}
          </ul>
        </div>
      </DashBoard>
    );
  }
}

const mapStateToProps = ({ jpy_trip, common }) => ({
  jpy_trip,
  common
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhaseTwoApp);
