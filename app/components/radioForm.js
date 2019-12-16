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
      // <RadioForm
      //   radio_props={this.props.answers}
      //   onPress={value => {
      //     this.props.update(this.props.index, value);
      //   }}
      //   selectedButtonColor={'purple'}
      //   selectedLabelColor={'puple'}
      //   labelStyle={{fontSize: 20, color: '#00008b'}}
      //   initial={-1}
      //   isSelected={this.state.isSelected}
      //   buttonSize={20}
      // />
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
              buttonSize={17}
              buttonOuterSize={30}
              buttonStyle={{}}
              buttonWrapStyle={{marginLeft: 10}}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              onPress={() => null}
              labelHorizontal={true}
              labelStyle={{fontSize: 20, color: '#00008b'}}
              labelWrapStyle={{}}
            />
          </RadioButton>
        ))}
      </RadioForm>
    );
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
