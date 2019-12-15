import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

const themeColor = '#4b0082';

export default class Radioform extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RadioForm
        radio_props={this.props.answers}
        onPress={value => {
          this.props.update(this.props.index, value);
        }}
        selectedButtonColor={'purple'}
        selectedLabelColor={'puple'}
        labelStyle={{fontSize: 20, color: '#00008b'}}
        initial={-1}
        buttonSize={20}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 5,
    height: '100%',
  },
  question: {
    height: 'auto',
  },
  qtext: {
    padding: 20,
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 10,
    color: '#00008b',
  },
  answer: {
    padding: 20,
    alignSelf: 'center',
    paddingLeft: 15,
    flexWrap: 'wrap',
    color: '#00008b',
  },
});
