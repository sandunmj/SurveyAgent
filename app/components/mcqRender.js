import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
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
  }

  render() {
    console.log(this.props.index);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.answer}>
            <Text style={styles.question}>{this.props.q}</Text>

            <Radioform
              answers={answers}
              index={this.props.index}
              update={this.props.update}
            />
          </View>
        </ScrollView>
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  question: {
    alignSelf: 'center',
    padding: resize(20),
    fontWeight: 'bold',
    fontSize: resize(25),
    marginVertical: resize(10),
    color: '#00008b',
  },
  answer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: resize(20),
    alignSelf: 'center',
    paddingLeft: resize(15),
    flexWrap: 'wrap',
    color: '#00008b',
  },
});
