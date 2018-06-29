import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from './redux/actions/jpy';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unit_price: 0,
    };

    this.setUnitPrice = this.setUnitPrice.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
  }

  setUnitPrice = e => {
    if ( !isNaN(+e.target.value) ) {
      this.setState({[e.target.name]: +e.target.value})
    }
  }

  enterPressed = e => {
    // 엔터키를 눌렀을 때 제출함수    
    if ( e.key === 'Enter' ) {

      // 단위 추가를 위한 화폐 단위 인풋
      if ( e.target.name === 'unit_price' ) {
        // 중복 무시 로직 && 0엔 무시 로직
        if ( +e.target.value && this.props.jpy[`jpy${e.target.value}`] === undefined ) {
          // 스토어 저장
          this.props.jpyAddUnit(e);
          this.setState({unit_price: 0});
        }
      }
    }
  }

  render() {
    console.log(this.props);

    const jpy_unit_list_items = []
    
    for (let key in this.props.jpy) {
      jpy_unit_list_items.push(<li key={`jpy_unit_list_items_${key}`}>{key}: {this.props.jpy[key]}</li>);
    }

    return (
      <div className="App">
        <input type="text" name="unit_price" value={this.state.unit_price} onChange={this.setUnitPrice} onKeyDown={this.enterPressed}/>

        <ul>
          {jpy_unit_list_items}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  jpy: state.jpy,
});

const matDispatchToProps = dispatch => ({
  jpyAddUnit: e => dispatch({type: actions.ADD_UNIT, payload: e.target.value}),
});

export default connect(mapStateToProps, matDispatchToProps)(App);