import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/auth';
import ActivityIndicatorCircle from './../components/activityIndicator';

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

  ShowSurveys = props => {
    var idArray = props.idArray;
    if (idArray.length) {
      return (
        <View style={styles.listContainer}>
          <Text style={styles.normalText}>
            You have {idArray.length} pending survey/s.
          </Text>
          <FlatList
            data={props.idArray}
            renderItem={({item, index}) => (
              <View style={styles.listItem}>
                <TouchableOpacity
                  style={styles.touchableLoad}
                  onPress={() => {
                    this.props.navigation.navigate('surveyScreen', {
                      ID: item,
                    });
                  }}
                  underlayColor="#4b0082">
                  <Text style={styles.touchText}>
                    Enter survey #{index + 1}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      );
    } else {
      return (
        <Text style={styles.noSurveyText}>
          Congratulations! You have completed all the surveys.
        </Text>
      );
    }
  };

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
          <View style={styles.body}>
            <this.ShowSurveys idArray={surveyIDs} />
          </View>
          <View style={styles.footer}>
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
  body: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: themeColor2,
    width: '100%',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColor2,
    width: '100%',
  },
  noSurveyText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: themeColor,
    fontSize: resize(20),
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
  touchableLoad: {
    width: '80%',
    aspectRatio: 6,
    borderRadius: resize(25),
    backgroundColor: '#00008b',
    borderColor: '#4b0082',
  },
  normalText: {
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontSize: resize(15),
  },
  listItem: {
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: resize(10),
    width: '100%',
  },
  listContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: themeColor2,
  },
});
