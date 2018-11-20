import React, { Component } from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: ${props => (props.fluid ? "" : "inline-block")};
  padding: ${props => (props.fluid ? "8px 0" : "8px")};

  button {
    background-color: ${props =>
      (props => {
        switch (props.theme) {
          case "dark":
            return "#333333";
          case "sky":
            return "#4dd0e1";
          default:
            return "#ffffff";
        }
      })(props)};

    color: ${props =>
      (props => {
        switch (props.theme) {
          case "dark":
            return "#ffffff";
          case "sky":
            return "#ffffff";
          default:
            return "#000000";
        }
      })(props)};

    display: ${props => (props.fluid ? "block" : "")};
    margin: 0 auto;
    padding: ${props => (props.fluid ? "16px 0" : "16px 32px")};
    border: 0;
    outline: none;
    width: ${props => (props.fluid ? "calc(100% - 16px)" : "")};
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
    position: relative;
    transition: box-shadow 0.2s ease;

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0);
      transition: background-color 0.2s ease;
    }

    &:hover {
      box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.3);

      &:before {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
`;

class Button extends Component {
  render() {
    const { children, theme, fluid, ...rest } = this.props;

    return (
      <ButtonWrapper theme={theme} fluid={fluid}>
        <button {...rest}>{children}</button>
      </ButtonWrapper>
    );
  }
}

export default Button;
