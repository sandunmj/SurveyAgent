import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
// import RadioForm from 'react-native-simple-radio-button';
import Radioform from './radioForm';

const themeColor = '#4b0082';

var answers = [
  {label: 'Strongly Disagree', value: 1},
  {label: 'Disagree', value: 2},
  {label: 'Neutral view', value: 3},
  {label: 'Agree', value: 4},
  {label: 'Strongly Agree', value: 5},
];

export default class Mcq extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionType: 'MCQ',
      qNumber: this.props.index,
    };
  }

  componentDidMount() {
    this.setState({qNumber: this.props.index});
  }

  render() {
    // console.log(this.props.ind);
    if (this.state.questionType == 'MCQ') {
      return (
        <View style={styles.container}>
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.qtext}>{this.props.q}</Text>
          </View>
          <View style={styles.answer}>
            {/* {this.radioForm(answers, this.props.index, this.props.update)} */}
            <Radioform
              answers={answers}
              index={this.props.ind}
              update={this.props.update}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View>
            <Text style={styles.text}>1. Is your work meaningful ?</Text>
          </View>
          <View>
            <TextInput
              style={{
                height: 40,
                marginTop: 15,
                borderColor: 'gray',
                borderWidth: 1,
              }}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 5,
    height: '100%',
  },
  question: {
    height: 'auto',
  },
  qtext: {
    padding: 20,
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 10,
    color: '#00008b',
  },
  answer: {
    padding: 20,
    alignSelf: 'center',
    paddingLeft: 15,
    flexWrap: 'wrap',
    color: '#00008b',
  },
});
