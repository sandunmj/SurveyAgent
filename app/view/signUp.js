/**
 * @format
 * @flow
 */
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React from 'react';
import {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  FlatList,
} from 'react-native';
import ActivityIndicatorCircle from './../components/activityIndicator';

const themeColor = '#4b0082';
const themeColor2 = '#ffffff';

const loadProfilingCategories = async function() {
  var profileCategories = [];
  await firebase
    .database()
    .ref('profiling/')
    .once('value', snapshot => {
      var snapshot = JSON.parse(JSON.stringify(snapshot));
      profileCategories = snapshot;
    });
  var categories = [];
  for (var cat of Object.keys(profileCategories)) {
    categories.push(profileCategories[cat]);
  }
  return categories;
};

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.navigation.state.params.email,
      password: '',
      profileAnswers: [],
      currentIndex: 0,
      profileQuestions: null,
    };
    loadProfilingCategories().then(x => {
      this.setState({profileQuestions: x});
    });
  }

  handleSignup = () => {
    console.log('handling sign up');
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        console.log(res.user.uid);
        firebase
          .database()
          .ref('users/' + res.user.uid)
          .set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            // profileAnswers: this.state.profileAnswers,
          });
        console.log('Logged in');
        Alert.alert('logged in');
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert('Email already in use !');
            break;
          case 'auth/weak-password':
            Alert.alert('Password should be at least 6 characters!');
            break;
          case 'auth/invalid-email':
            Alert.alert('Please enter a valid email!');
        }
        console.log(error);
        this.setState({errorMessage: error.message});
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerTextBox}>
          <Text style={styles.headerText}>Enter details</Text>
        </View>
        <View style={styles.textInputBox}>
          <TextInput
            value={this.state.firstName}
            onChangeText={firstName => this.setState({firstName})}
            placeholder={'First Name'}
            placeholderTextColor={themeColor}
            style={styles.textInput}
          />
          <TextInput
            value={this.state.lastName}
            onChangeText={lastName => this.setState({lastName})}
            placeholder={'Last Name'}
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
          <View style={styles.buttonBox}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                if (!this.state.email || !this.state.password) {
                  Alert.alert('Empty inputs found!');
                } else {
                  console.log('inputs ok');
                  this.handleSignup();
                }
              }}
              underlayColor={themeColor}>
              <Text style={styles.touchText}>SIGN UP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                this.props.navigation.navigate('signIn');
              }}
              underlayColor={themeColor}>
              <Text style={styles.touchText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: resize(25),
  },
  textInputBox: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: themeColor2,
    width: '100%',
  },
  textInput: {
    textAlign: 'center',
    borderRadius: resize(25),
    borderColor: themeColor,
    borderWidth: resize(3),
    marginBottom: resize(10),
    backgroundColor: themeColor2,
    width: '80%',
    aspectRatio: 6,
  },
  buttonBox: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: themeColor2,
    padding: resize(12),
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
    color: themeColor,
    fontSize: resize(20),
  },
});
