import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';

const themeColor = '#4b0082';
const themeColor2 = '#ffffff';

export default class TextView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.index !== prevProps.index) {
      this.setState({answer: ''});
    }
  }

  render() {
    return (
      <View style={styles.body}>
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.questionText}>{this.props.q}</Text>
            </View>
            <View style={styles.answer}>
              <TextInput
                value={this.state.answer}
                onChangeText={answer => {
                  this.setState({answer});
                  this.props.update(this.props.index, answer);
                }}
                placeholder={'Answer'}
                placeholderTextColor={themeColor}
                style={styles.textInput}
              />
            </View>
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
  body: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '90%',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    aspectRatio: 1,
  },
  questionText: {
    // padding: resize(20),
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: resize(20),
    marginVertical: resize(10),
    color: '#00008b',
  },
  answer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    color: '#00008b',
  },
  textInput: {
    textAlign: 'center',
    borderRadius: resize(20),
    borderColor: 'aqua',
    borderWidth: 3,
    marginBottom: 10,
    backgroundColor: 'aqua',
    width: '100%',
    aspectRatio: 7,
  },
});
