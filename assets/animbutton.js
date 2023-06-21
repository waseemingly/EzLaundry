// animbutton.js

import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class Animbutton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countCheck: 0,
      onColor: 'green',
      effect: 'pulse',
    };
  }

  _onPressButton() {
    const count = this.state.countCheck;
    if (count === 0) {
      this.setState({
        countCheck: 1,
        onColor: 'red',
        effect: 'none',
      });
      this.props._onPress(true);
    } else {
      this.setState({
        countCheck: 0,
        onColor: 'green',
        effect: 'pulse',
      });
      this.props._onPress(false);
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          {
            backgroundColor: this.state.onColor,
          },
        ]}
        onPress={() => this._onPressButton()}
      >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});