import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Mcq from './../components/mcqRender';
import TextView from './../components/textRender';
import ParagraphView from './../components/paragraphRenderer';
import ProgressBar from './../components/progressBar';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/auth';
import ActivityIndicatorCircle from './../components/activityIndicator';

const themeColor = '#4b0082';

export default class QuestionScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      surveyId: this.props.navigation.state.params.ID,
      questions: [],
      curQuIndex: 0,
      answers: [],
      surveyDescribed: false,
      suveyDescription: '',
    };
  }

  componentDidMount() {
    this._isMounted = true;
    var surveyID = this.state.surveyId;
    firebase
      .database()
      .ref(`surveys/${surveyID}/`)
      .once('value', snapshot => {
        if (this._isMounted) {
          var snapshot = JSON.parse(JSON.stringify(snapshot));
          var array = [];
          for (var item of snapshot.questions) {
            array.push(item);
          }
          this.setState({suveyDescription: snapshot.description});
          this.setState({questions: array});
          const arr = new Array(array.length).fill(null);
          this.setState({answers: arr});
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateAnswers = (index, val) => {
    var array = this.state.answers;
    array[index] = val;
    this.setState({answers: array});
  };

  submitAnswers() {
    var sId = this.state.surveyId;
    var userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`users/${userId}/answeredSurveys/${sId}`)
      .set({
        answers: this.state.answers,
      });
    Alert.alert('Submitted Successfully. Thank you!');
  }

  QuestionView = () => {
    const question = this.state.questions[this.state.curQuIndex];
    switch (question.type) {
      case 'mcq':
        return (
          <Mcq
            q={question.content}
            update={this.updateAnswers}
            ind={this.state.curQuIndex}
          />
        );
      case 'text':
        return (
          <TextView
            q={question.content}
            update={this.updateAnswers}
            ind={this.state.curQuIndex}
          />
        );
      case 'paragraph':
        return (
          <ParagraphView
            paragraph={question.paragraph}
            questions={question.questions}
            index={this.state.curQuIndex}
            update={this.updateAnswers}
          />
        );
    }
  };
  render() {
    console.log(this.state.answers);
    if (this.state.questions === '') {
      return <ActivityIndicatorCircle />;
    } else {
      if (this.state.surveyDescribed) {
        var quizzes = this.state.questions;
        var index = this.state.curQuIndex;
        var progress = (index / quizzes.length) * 100 + '%';
        switch (index) {
          case 0:
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  backgroundColor: themeColor,
                }}>
                <View style={styles.headerContainer}>
                  <Text style={styles.headerTitle}>Question {index + 1}</Text>
                </View>
                <View style={[styles.progressBar, {flex: 1}]}>
                  <ProgressBar prog={progress} />
                </View>
                <View style={[styles.body, {flex: 7}]}>
                  <this.QuestionView />
                </View>
                <View style={styles.footerButton}>
                  <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                      this.setState({surveyDescribed: false});
                    }}>
                    <Text style={styles.touchtext}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                      this.props.navigation.navigate('main');
                    }}>
                    <Text style={styles.touchtext}>Home</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                      this.setState({curQuIndex: index + 1});
                    }}>
                    <Text style={styles.touchtext}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          case quizzes.length - 1:
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  backgroundColor: themeColor,
                }}>
                <View style={styles.headerContainer}>
                  <Text style={styles.headerTitle}>Question {index + 1}</Text>
                </View>
                <View style={[styles.progressBar, {flex: 1}]}>
                  <ProgressBar prog={progress} />
                </View>
                <View style={[styles.body, {flex: 7}]}>
                  <this.QuestionView />
                </View>
                <View style={styles.footerButton}>
                  <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                      this.setState({curQuIndex: index - 1});
                    }}>
                    <Text style={styles.touchtext}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                      this.submitAnswers();
                      this.props.navigation.navigate('main');
                    }}>
                    <Text style={styles.touchtext}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          default:
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  backgroundColor: themeColor,
                }}>
                <View style={styles.headerContainer}>
                  <Text style={styles.headerTitle}>Question {index + 1}</Text>
                </View>
                <View style={[styles.progressBar, {flex: 1}]}>
                  <ProgressBar prog={progress} />
                </View>
                <View style={[styles.body, {flex: 7}]}>
                  <this.QuestionView />
                </View>
                <View style={styles.footerButton}>
                  <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                      this.setState({curQuIndex: index - 1});
                    }}>
                    <Text style={styles.touchtext}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                      this.props.navigation.navigate('main');
                    }}>
                    <Text style={styles.touchtext}>Home</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                      this.setState({curQuIndex: index + 1});
                    }}>
                    <Text style={styles.touchtext}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
        }
      } else {
        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: themeColor,
            }}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Survey Descripton</Text>
            </View>
            <View style={[styles.descriptionview, {flex: 5}]}>
              <Text style={styles.qtext}>{this.state.suveyDescription}</Text>
            </View>
            <View style={styles.footerButton}>
              <TouchableOpacity
                style={styles.touchablefillsuvey}
                onPress={() => {
                  this.setState({surveyDescribed: true});
                }}>
                <Text style={styles.touchtextfillsurvey}>Fill Survey</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footerButton}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                  this.props.navigation.navigate('main');
                }}>
                <Text style={styles.touchtext}>Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    alignSelf: 'center',
    backgroundColor: themeColor,
    alignItems: 'center',
  },
  body: {
    backgroundColor: themeColor,
    margin: 2,
    borderColor: themeColor,
    borderWidth: 4,
  },
  question: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  headerTitle: {
    alignSelf: 'flex-start',
    fontSize: 36,
    margin: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  progressBar: {
    justifyContent: 'space-around',
  },
  footerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 10,
    width: 430,
  },
  title: {
    fontSize: 20,
  },
  touchable: {
    height: 40,
    width: 80,
    padding: 0,
    borderRadius: 25,
    backgroundColor: themeColor,
  },
  touchablefillsuvey: {
    height: 40,
    width: 200,
    padding: 0,
    borderRadius: 25,
    backgroundColor: '#ffffff',
  },
  touchtext: {
    padding: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
  touchtextfillsurvey: {
    padding: 10,
    textAlign: 'center',
    color: themeColor,
  },
  descriptionview: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 5,
    height: '100%',
    width: '90%',
  },
  qtext: {
    padding: 20,
    fontSize: 20,
    marginVertical: 10,
    color: '#00008b',
  },
});