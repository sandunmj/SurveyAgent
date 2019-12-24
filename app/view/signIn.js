/**
 * @format
 * @flow
 */
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
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
        {/* <Image source="./../images/survey.png" /> */}
        {/* <Image
          style={{width: wp('70%'), height: hp('50%')}}
          source={require('./../images/survey.png')}
        /> */}
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

function resize(inpSize) {
  let outSize = (wp('100%') * inpSize) / 411;
  return outSize;
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColor2,
    width: '100%',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: themeColor,
    fontSize: resize(30),
    width: '80%',
  },
  textInputBox: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: themeColor2,
    width: '100%',
  },
  textInput: {
    textAlign: 'center',
    borderRadius: resize(25),
    borderColor: themeColor,
    borderWidth: 3,
    marginBottom: 10,
    backgroundColor: themeColor2,
    width: '80%',
    aspectRatio: 6,
  },
  buttonBox: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColor2,
    padding: resize(10),
    width: '100%',
  },
  touchable: {
    width: '38%',
    aspectRatio: 3.5,
    borderRadius: resize(25),
    backgroundColor: themeColor,
    borderColor: themeColor,
  },
  touchText: {
    fontSize: resize(15),
    padding: resize(10),
    textAlign: 'center',
    color: themeColor2,
  },
  text: {
    textAlign: 'center',
    color: themeColor,
    fontSize: resize(25),
  },
});
