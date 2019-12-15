/**
 * @format
 * @flow
 */

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const themeColor = '#4b0082';
const themeColor2 = '#ffffff';

export default class textQuestion extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.headerTextBox}>
          <Text style={styles.headerText}>{this.props.question}</Text>
        </View>
        <TextInput
          value={this.state.answer}
          onChangeText={password => this.setState({answer})}
          placeholder={'Answer'}
          placeholderTextColor={themeColor}
          style={styles.textInput}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
  headerTextBox: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: themeColor2,
    justifyContent: 'center',
  },
  headerText: {
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    color: themeColor,
    fontSize: 20,
  },
  textInputBox: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: themeColor2,
  },
  textInput: {
    alignSelf: 'center',
    textAlign: 'center',
    width: 340,
    height: 50,
    padding: 0,
    borderRadius: 25,
    borderColor: themeColor,
    borderWidth: 3,
    marginBottom: 10,
    backgroundColor: themeColor2,
  },
});
