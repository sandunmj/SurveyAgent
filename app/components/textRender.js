import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const themeColor = '#4b0082';
const themeColor2 = '#ffffff';

export default class TextView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.ind !== prevProps.ind) {
      this.setState({answer: ''});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.qtext}>{this.props.q}</Text>
        </View>
        <View style={styles.answer}>
          <TextInput
            value={this.state.answer}
            onChangeText={answer => {
              this.setState({answer});
              this.props.update(this.props.ind, answer);
            }}
            placeholder={'Answer'}
            placeholderTextColor={themeColor}
            style={styles.textInput}
          />
        </View>
      </View>
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
  textInput: {
    alignSelf: 'center',
    textAlign: 'center',
    width: 340,
    height: 50,
    padding: 0,
    borderRadius: 25,
    borderColor: themeColor2,
    borderWidth: 3,
    marginBottom: 10,
    backgroundColor: themeColor2,
  },
});
