import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Mcq from '../components/mcqRender';
import TextView from './../components/textRender';
import ParagraphView from './../components/paragraphRenderer';
import ProgressBar from './../components/progressBar';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/auth';
import ActivityIndicatorCircle from './../components/activityIndicator';

const themeColor = '#4b0082';
const themeColor2 = '#ffffff';

export default class QuestionScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      surveyId: this.props.navigation.state.params.ID,
      questions: [],
      curQuIndex: 0,
      answers: [],
      stage: 'description',
      description: '',
      categories: '',
      profiling: '',
      profileAnswers: [],
      currentProfilingIndex: 0,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    var surveyID = this.state.surveyId;
    firebase
      .database()
      .ref(`surveyList/${surveyID}/`)
      .once('value', snapshot => {
        if (this._isMounted) {
          var snapshot = JSON.parse(JSON.stringify(snapshot));
          var array = [];
          for (var item of snapshot.questions) {
            array.push(item);
          }
          this.setState({description: snapshot.description});
          this.setState({questions: array});
          const arr = new Array(array.length).fill(null);
          this.setState({answers: arr});
          this.setState({categories: snapshot.categories});
          this.setState({profiling: snapshot.profiling});
          const arr1 = new Array(snapshot.profiling.length).fill(null);
          this.setState({profileAnswers: arr1});
        }
      });
  }

  Item = item => {
    var profileAnswers = this.state.profileAnswers;

    return (
      <View style={profiling.flatList}>
        <TouchableOpacity
          style={profiling.touchable}
          onPress={() => {
            profileAnswers[this.state.currentProfilingIndex] = item;
            this.setState({profileAnswers: profileAnswers});
            if (
              this.state.currentProfilingIndex ===
              this.state.profiling.length - 1
            ) {
              this.setState({stage: 'default'});
              this.setState({
                currentProfilingIndex: 0,
              });
            } else {
              this.setState({
                currentProfilingIndex: this.state.currentProfilingIndex + 1,
              });
            }
          }}
          underlayColor={themeColor}>
          <Text style={containers.touchText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
    // Alert.alert('Submitted Successfully. Thank you!');
  }

  QuestionView = () => {
    const question = this.state.questions[this.state.curQuIndex];
    console.log(question);
    switch (question.type) {
      case 'MCQ':
        return (
          <Mcq
            q={question.question}
            update={this.updateAnswers}
            index={this.state.curQuIndex}
          />
        );
      case 'Text':
        return (
          <TextView
            q={question.question}
            update={this.updateAnswers}
            index={this.state.curQuIndex}
          />
        );
      case 'Paragraph':
        return (
          <ParagraphView
            paragraph={question.question}
            questions={question.subQuestions}
            index={this.state.curQuIndex}
            update={this.updateAnswers}
          />
        );
    }
  };
  render() {
    if (this.state.questions === '') {
      return <ActivityIndicatorCircle />;
    } else {
      switch (this.state.stage) {
        case 'default':
          var quizzes = this.state.questions;

          var index = this.state.curQuIndex;
          var progress = (index / quizzes.length) * 100 + '%';
          switch (index) {
            case 0:
              return (
                <View style={containers.container}>
                  <View style={containers.headerTextBox}>
                    <Text style={containers.headerText}>
                      Question {index + 1}
                    </Text>
                  </View>
                  <View style={containers.progressBar}>
                    <ProgressBar prog={progress} />
                  </View>
                  <View style={containers.body}>
                    <this.QuestionView />
                  </View>
                  <View style={containers.footer}>
                    <TouchableOpacity
                      style={containers.touchable}
                      onPress={() => {
                        this.setState({stage: 'profiling'});
                      }}>
                      <Text style={containers.touchText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={containers.touchable}
                      onPress={() => {
                        this.props.navigation.navigate('main');
                      }}>
                      <Text style={containers.touchText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={containers.touchable}
                      onPress={() => {
                        this.setState({curQuIndex: index + 1});
                      }}>
                      <Text style={containers.touchText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            case quizzes.length - 1:
              return (
                <View style={containers.container}>
                  <View style={containers.headerTextBox}>
                    <Text style={containers.headerText}>
                      Question {index + 1}
                    </Text>
                  </View>
                  <View style={containers.progressBar}>
                    <ProgressBar prog={progress} />
                  </View>
                  <View style={containers.body}>
                    <this.QuestionView />
                  </View>
                  <View style={containers.footer}>
                    <TouchableOpacity
                      style={containers.touchable}
                      onPress={() => {
                        this.setState({curQuIndex: index - 1});
                      }}>
                      <Text style={containers.touchText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={containers.touchable}
                      onPress={() => {
                        this.props.navigation.navigate('main');
                      }}>
                      <Text style={containers.touchText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={containers.touchable}
                      onPress={() => {
                        this.submitAnswers();
                        this.setState({stage: 'thank'});
                      }}>
                      <Text style={containers.touchText}>Finish</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            default:
              return (
                <View style={containers.container}>
                  <View style={containers.headerTextBox}>
                    <Text style={containers.headerText}>
                      Question {index + 1}
                    </Text>
                  </View>
                  <View style={containers.progressBar}>
                    <ProgressBar prog={progress} />
                  </View>
                  <View style={containers.body}>
                    <this.QuestionView />
                  </View>
                  <View style={containers.footer}>
                    <TouchableOpacity
                      style={containers.touchable}
                      onPress={() => {
                        this.setState({curQuIndex: index - 1});
                      }}>
                      <Text style={containers.touchText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={containers.touchable}
                      onPress={() => {
                        this.props.navigation.navigate('main');
                      }}>
                      <Text style={containers.touchText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={containers.touchable}
                      onPress={() => {
                        this.setState({curQuIndex: index + 1});
                      }}>
                      <Text style={containers.touchText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
          }

        case 'profiling':
          const categoryData = this.state.profiling[
            this.state.currentProfilingIndex
          ];
          console.log(this.state.profiling);
          return (
            <View style={containers.container}>
              <View style={containers.headerTextBox}>
                <Text style={containers.headerText}>Pre Survey Profiling</Text>
              </View>
              <View style={containers.body}>
                <Text style={profiling.headerTitle}>{categoryData.name}</Text>
                <ScrollView style={profiling.scrollView}>
                  <FlatList
                    data={categoryData.items}
                    renderItem={({item}) => this.Item(item)}
                    keyExtractor={item => item}
                  />
                </ScrollView>
              </View>
              <View style={containers.footer}>
                <TouchableOpacity
                  style={containers.nextButton}
                  onPress={() => {}}>
                  <Text style={containers.nextButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
              <View style={containers.footer}>
                <TouchableOpacity
                  style={containers.touchable}
                  onPress={() => {
                    this.setState({stage: 'categories'});
                  }}>
                  <Text style={containers.touchText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={containers.touchable}
                  onPress={() => {
                    this.props.navigation.navigate('main');
                  }}>
                  <Text style={containers.touchText}>Home</Text>
                </TouchableOpacity>
              </View>
            </View>
          );

        case 'categories':
          return (
            <View style={containers.container}>
              <View style={containers.headerTextBox}>
                <Text style={containers.headerText}>Survey Description</Text>
              </View>
              <View style={containers.body}>
                <Text style={categories.headerTitle}>
                  This survey includes questions based on the following
                  categories
                </Text>
                <ScrollView>
                  <FlatList
                    data={this.state.categories}
                    renderItem={({item}) => (
                      <View style={categories.catView}>
                        <Text style={categories.catHead}>{item.category}</Text>
                        <Text style={categories.catDescription}>
                          {item.description}
                        </Text>
                      </View>
                    )}
                  />
                </ScrollView>
              </View>
              <View style={containers.footer}>
                <TouchableOpacity
                  style={containers.nextButton}
                  onPress={() => {
                    this.setState({stage: 'profiling'});
                  }}>
                  <Text style={containers.nextButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
              <View style={containers.footer}>
                <TouchableOpacity
                  style={containers.touchable}
                  onPress={() => {
                    this.setState({stage: 'description'});
                  }}>
                  <Text style={containers.touchText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={containers.touchable}
                  onPress={() => {
                    this.props.navigation.navigate('main');
                  }}>
                  <Text style={containers.touchText}>Home</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'description':
          return (
            <View style={containers.container}>
              <View style={containers.headerTextBox}>
                <Text style={containers.headerText}>Survey Description</Text>
              </View>
              <View style={containers.body}>
                <Text style={description.text}>{this.state.description}</Text>
              </View>
              <View style={containers.footer}>
                <TouchableOpacity
                  style={containers.nextButton}
                  onPress={() => {
                    this.setState({stage: 'categories'});
                  }}>
                  <Text style={containers.nextButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
              <View style={containers.footer}>
                <TouchableOpacity
                  style={containers.touchable}
                  onPress={() => {
                    this.props.navigation.navigate('main');
                  }}>
                  <Text style={containers.touchText}>Home</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'thank':
          return (
            <View style={containers.container}>
              <View style={containers.headerTextBox}>
                <Text style={containers.headerText}>Finish</Text>
              </View>
              <View style={containers.body}>
                <Text style={description.text}>
                  You have successfully submitted the answers for the survey.
                  Thank you!
                </Text>
              </View>
              <View style={containers.footer}>
                <TouchableOpacity
                  style={containers.touchable}
                  onPress={() => {
                    this.props.navigation.navigate('main');
                  }}>
                  <Text style={containers.touchText}>Home</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
      }
    }
  }
}

function resize(inpSize) {
  let outSize = (wp('100%') * inpSize) / 411;
  return outSize;
}

const description = StyleSheet.create({
  text: {
    padding: resize(3),
    textAlign: 'left',
    color: '#00008b',
    fontSize: resize(20),
  },
});
const containers = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColor,
  },
  headerTextBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColor,
    width: '100%',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: themeColor2,
    fontSize: resize(25),
  },
  body: {
    flex: 5,
    borderRadius: resize(15),
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: themeColor2,
    width: '90%',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: themeColor,
    width: '100%',
  },
  nextButton: {
    width: '30%',
    aspectRatio: 3.5,
    borderRadius: resize(25),
    backgroundColor: themeColor2,
    borderColor: themeColor2,
  },
  nextButtonText: {
    padding: resize(10),
    textAlign: 'center',
    color: themeColor,
  },
  touchable: {
    width: '30%',
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
  progressBar: {
    flex: 1,
    width: '100%',
  },
});
const profiling = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
  },
  flatList: {
    alignItems: 'center',
    padding: resize(10),
  },
  touchable: {
    width: '40%',
    aspectRatio: 3.5,
    borderRadius: resize(25),
    backgroundColor: '#00008b',
    borderColor: '#00008b',
  },
  headerTitle: {
    padding: resize(10),
    textAlign: 'left',
    color: '#20b2aa',
    fontSize: resize(20),
  },
});
const categories = StyleSheet.create({
  headerTitle: {
    padding: resize(10),
    textAlign: 'left',
    color: '#20b2aa',
    fontSize: resize(20),
  },
  catView: {
    padding: resize(5),
    width: '100%',
  },
  catHead: {
    fontSize: resize(20),
    marginVertical: resize(20),
    color: '#191970',
  },
  catDescription: {
    fontSize: resize(16),
    color: '#00008b',
  },
});
