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
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.answer}>
            <Text style={styles.question}>{this.props.q}</Text>
            <Text> </Text>
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
    justifyContent: 'space-around',
    width: '100%',
  },
  question: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: resize(22),
    marginVertical: resize(10),
    color: '#006400',
  },
  answer: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    // flexWrap: 'wrap',
    // color: '#00008b',
  },
});
