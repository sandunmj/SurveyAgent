import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

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
      answer: -1,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.qtext}>{this.props.q}</Text>
        </View>
        <View style={styles.answer}>
          <RadioForm formHorizontal={false} animation={true}>
            {/* To create radio buttons, loop through your array of options */}
            {answers.map((obj, i) => (
              <RadioButton formVertical={true} key={i}>
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={i === this.state.answer}
                  onPress={() => {
                    this.setState({answer: i});
                    this.props.update(this.props.ind, i + 1);
                  }}
                  borderWidth={1}
                  buttonInnerColor={'#00008b'}
                  buttonOuterColor={'#2196f3'}
                  buttonSize={resize(17)}
                  buttonOuterSize={resize(30)}
                  buttonStyle={{}}
                  buttonWrapStyle={{marginLeft: resize(10)}}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  onPress={() => null}
                  labelHorizontal={true}
                  labelStyle={{fontSize: resize(20), color: '#20b2aa'}}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>
      </View>
    );
  }
}

function resize(inpSize) {
  let outSize = (wp('100%') * inpSize) / 411;
  console.log(outSize);
  return outSize;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: resize(15),
    marginBottom: resize(5),
    // height: '25%',
  },
  answer: {
    padding: resize(20),
    alignSelf: 'center',
    paddingLeft: resize(15),
    flexWrap: 'wrap',
    color: '#00008b',
  },
  question: {
    height: 'auto',
  },
  qtext: {
    padding: resize(20),
    fontWeight: 'bold',
    fontSize: resize(20),
    marginVertical: resize(10),
    color: '#006400',
  },
});
