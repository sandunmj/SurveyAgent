/**
 * @format
 * @flow
 */

import React from 'react';
import {firebase} from '@react-native-firebase/app';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const themeColor = '#4b0082';
const themeColor2 = '#ffffff';

type Props = {};
export default class VerifyPhone extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.navigation.state.params.email,
    };
    this.signUpUser();
  }

  getPhoneNumber(){
    return '+94713522613'
  }

  signUpUser(){
    firebase.auth().createUserWithEmailAndPhone(
      this.state.email,
      this.getPhoneNumber(),
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerTextBox}>
          <Text style={styles.headerText}>
            We have sent an OTP to your mobile ********##. Please enter it
            below.
          </Text>
        </View>
        <View style={styles.textInputBox}>
          <TextInput
            value={this.state.OTP}
            onChangeText={OTP => this.setState({OTP})}
            placeholder={'OTP'}
            placeholderTextColor={themeColor}
            style={styles.textInput}
          />
        </View>
        <View style={styles.buttonBox}>
          <Text />
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              this.props.navigation.navigate('verifyEmail');
            }}
            underlayColor={themeColor}>
            <Text style={styles.touchText}>Enter</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                this.props.navigation.navigate('signIn');
              }}
              underlayColor={themeColor}>
              <Text style={styles.backText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColor2,
  },
  headerTextBox: {
    flex: 2,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: themeColor2,
    justifyContent: 'flex-end',
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
  buttonBox: {
    flex: 2,
    justifyContent: 'flex-start',
    backgroundColor: themeColor2,
    padding: 10,
  },
  touchable: {
    alignSelf: 'center',
    height: 40,
    width: 120,
    padding: 0,
    borderRadius: 25,
    backgroundColor: themeColor,
    borderColor: themeColor,
  },
  touchText: {
    padding: 10,
    textAlign: 'center',
    color: themeColor2,
  },
  text: {
    color: themeColor,
    fontSize: 20,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: themeColor2,
    padding: 10,
  },
  backButton: {
    alignSelf: 'center',
    height: 40,
    width: 120,
    padding: 0,
    borderRadius: 25,
    backgroundColor: themeColor,
    borderColor: themeColor,
  },
  backText: {
    padding: 10,
    textAlign: 'center',
    color: themeColor2,
  },
});
