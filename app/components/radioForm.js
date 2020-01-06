import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

const themeColor = '#4b0082';

export default class Radioform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: -1,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.index !== prevProps.index) {
      this.setState({answer: -1});
    }
  }

  render() {
    return (
      <RadioForm formHorizontal={false} animation={true}>
        {/* To create radio buttons, loop through your array of options */}
        {this.props.answers.map((obj, i) => (
          <RadioButton formVertical={true} key={i}>
            {/*  You can set RadioButtonLabel before RadioButtonInput */}
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={i === this.state.answer}
              onPress={() => {
                this.setState({answer: i});
                this.props.update(this.props.index, i + 1);
              }}
              borderWidth={1}
              buttonInnerColor={'#00008b'}
              buttonOuterColor={'#2196f3'}
              buttonSize={resize(13)}
              buttonOuterSize={resize(25)}
              buttonStyle={{}}
              buttonWrapStyle={{marginLeft: 10}}
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
    );
  }
}

function resize(inpSize) {
  let outSize = (wp('100%') * inpSize) / 411;
  return outSize;
}
