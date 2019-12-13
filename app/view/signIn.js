/**
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';

const themeColor = '#4b0082';
const themeColor2 = '#ffffff';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleLogin = () => {
    const {email, password} = this.state;
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then()
        .catch(error => {
          console.log(error.code);
          if (
            error.code === 'auth/wrong-password' ||
            error.code === 'auth/unknown'
          ) {
            Alert.alert('Wrong password!');
          }
          if (error.code === 'auth/invalid-email') {
            Alert.alert('Wrong email!');
          }
          this.setState({errorMessage: error.message});
        });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Image source={require('./../images/appIcon.png')} /> */}
        <View style={styles.headerTextBox}>
          <Text style={styles.headerText}>sign in to continue</Text>
        </View>
        <View style={styles.textInputBox}>
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            placeholder={'Email'}
            placeholderTextColor={themeColor}
            style={styles.textInput}
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            placeholder={'Password'}
            secureTextEntry={true}
            placeholderTextColor={themeColor}
            style={styles.textInput}
          />
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              if (!this.state.email || !this.state.password) {
                Alert.alert('Empty inputs found!');
              } else {
                console.log('inputs ok');
                this.handleLogin();
              }
            }}
            underlayColor={themeColor}>
            <Text style={styles.touchText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBox}>
          <Text style={styles.text}>Don't have an account?</Text>
          <Text />
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              this.props.navigation.navigate('verifyEmail');
            }}
            underlayColor={themeColor}>
            <Text style={styles.touchText}>SIGN UP</Text>
          </TouchableOpacity>
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
    flex: 1,
    justifyContent: 'center',
    backgroundColor: themeColor2,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'left',
    color: themeColor,
    fontSize: 30,
  },
  textInputBox: {
    flex: 3,
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
    justifyContent: 'center',
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
});
