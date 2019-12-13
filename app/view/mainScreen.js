import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/auth';
import ActivityIndicatorCircle from './../components/activityIndicator';
// import FirebaseComponents from './components/FireBase';

const themeColor = '#4b0082';
const themeColor2 = '#ffffff';

const loadSurveyList = async function(id) {
  var firstName = String;
  var totalSurveys = Array;
  var filledSurveys = Array;
  await Promise.all([
    firebase
      .database()
      .ref(`/users/${id}/firstName`)
      .once('value', snapshot => {
        firstName = snapshot.val();
      }),
    firebase
      .database()
      .ref('currentSurveyIDs/')
      .once('value', snapshot => {
        var snapshot = JSON.parse(JSON.stringify(snapshot));
        var array = [];
        for (var key in snapshot) {
          array.push(key);
        }
        totalSurveys = array;
      }),
    firebase
      .database()
      .ref(`users/${id}/answeredSurveys`)
      .once('value', snapshot => {
        var snapshot = JSON.parse(JSON.stringify(snapshot));
        var array = [];
        for (var key in snapshot) {
          array.push(key);
        }
        filledSurveys = array;
      }),
  ]);
  return {
    firstName: firstName,
    filledSurveys: filledSurveys,
    totalSurveys: totalSurveys,
  };
};

const getPendingSurveyList = async function(uId) {
  var array = [];
  var firstName = String;
  await loadSurveyList(uId).then(x => {
    firstName = x.firstName;
    x.totalSurveys.forEach(function(item, index) {
      if (!x.filledSurveys.includes(item)) {
        array.push(item);
      }
    });
  });
  return {
    firstName: firstName,
    pendingSurveys: array,
  };
};

const ShowSurveys = function(props) {
  var idArray = props.idArray;
  if (idArray.length) {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.normalText}>
          You have {idArray.length} pending survey/s.
        </Text>
        <FlatList
          style={styles.flatList}
          data={props.idArray}
          renderItem={({item, index}) => (
            <View style={styles.listItem}>
              <TouchableOpacity
                style={styles.touchableLoad}
                onPress={() => {
                  this.props.navigation.navigate('SurveyScreen', {
                    ID: item,
                  });
                }}
                underlayColor="#4b0082">
                <Text style={styles.touchText}>Enter survey #{index + 1}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  } else {
    return (
      <Text style={styles.headerText}>
        Congratulations! You have completed all the surveys.
      </Text>
    );
  }
};

export default class MainScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    var uId = firebase.auth().currentUser.uid;
    this.state = {
      firstName: '',
      pendingSurveys: [],
    };

    getPendingSurveyList(uId).then(x => {
      this.setState({firstName: x.firstName});
      this.setState({pendingSurveys: x.pendingSurveys});
    });
  }

  render() {
    if (!this.state.pendingSurveys) {
      return <ActivityIndicatorCircle text="loading surveys" />;
    } else {
      var surveyIDs = this.state.pendingSurveys;
      return (
        <View style={styles.container}>
          <View style={styles.headerTextBox}>
            <Text style={styles.headerText}>Hi, {this.state.firstName}</Text>
          </View>

          <ShowSurveys idArray={surveyIDs} />

          <View style={styles.buttonBox}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                firebase.auth().signOut();
              }}
              underlayColor={themeColor}>
              <Text style={styles.touchText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
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
    flex: 2,
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
  input: {
    alignSelf: 'center',
    textAlign: 'center',
    width: 380,
    height: 50,
    padding: 0,
    borderRadius: 25,
    borderColor: '#4b0082',
    borderWidth: 3,
    marginBottom: 10,
  },
  touchableLoad: {
    height: 40,
    width: 300,
    padding: 0,
    borderRadius: 25,
    backgroundColor: '#00008b',
    borderColor: '#4b0082',
  },
  touchText: {
    padding: 10,
    textAlign: 'center',
    color: themeColor2,
  },
  normalText: {
    width: '80%',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
  },
  text: {
    padding: 0,
    textAlign: 'left',
    color: themeColor,
    fontSize: 22,
  },
  listItem: {
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  listContainer: {
    flex: 16,
    width: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColor2,
  },
});
