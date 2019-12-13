/**
 * @format
 * @flow
 */

import React from 'react';
import {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
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
import * as profileCategories from './../sampleDatabase/profiling.json';
import ActivityIndicatorCircle from './../components/activityIndicator';

const themeColor = '#4b0082';
const themeColor2 = '#ffffff';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.navigation.state.params.email,
      password: '',
      profileAnswers: [],
      currentIndex: 0,
    };
  }

  loadProfilingCategories() {
    var categories = [];
    for (var key in profileCategories) {
      categories.push(profileCategories[key]);
    }
    return categories;
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
            profileAnswers: this.state.profileAnswers,
          });
        console.log('Logged in');
        // this.props.navigation.navigate('Main');
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

  Item = (item, quiz) => {
    var profileAnswers = this.state.profileAnswers;
    return (
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            profileAnswers.push({
              quiz: quiz,
              level: item.level,
            });
            this.setState({profileAnswers: profileAnswers});
            this.setState({currentIndex: this.state.currentIndex + 1});
          }}
          underlayColor={themeColor}>
          <Text style={styles.touchText}>{item.level}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const profileQuestions = this.loadProfilingCategories();
    if (profileQuestions) {
      switch (this.state.currentIndex) {
        case profileQuestions.length - 1:
          return (
            <View style={styles.container}>
              <View style={styles.headerTextBox}>
                <Text style={styles.headerText}>Enter details.</Text>
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
                        Alert.alert('logged in');
                      }
                    }}
                    underlayColor={themeColor}>
                    <Text style={styles.touchText}>SIGN UP</Text>
                  </TouchableOpacity>
                  <View style={styles.buttonBox}>
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
            </View>
          );
        default:
          const categoryData = profileQuestions[this.state.currentIndex];
          return (
            <View style={styles.container}>
              <View style={styles.headerTextBox}>
                <Text style={styles.headerText}>{categoryData.name}</Text>
              </View>
              <SafeAreaView style={styles.container}>
                <FlatList
                  data={categoryData.levels}
                  renderItem={({item}) => this.Item(item, categoryData.name)}
                  keyExtractor={item => item.id}
                />
              </SafeAreaView>
            </View>
          );
      }
    } else {
      return <ActivityIndicatorCircle text="Loading" />;
    }
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
  buttonBox: {
    flex: 5,
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
