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
      <View>
        <ScrollView>
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.qtext}>{this.props.q}</Text>
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
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 5,
    height: '100%',
  },
  question: {
    height: 'auto',
  },
  qtext: {
    padding: resize(20),
    fontWeight: 'bold',
    fontSize: resize(25),
    marginVertical: resize(10),
    color: '#00008b',
  },
  answer: {
    padding: 20,
    alignSelf: 'center',
    paddingLeft: 15,
    flexWrap: 'wrap',
    color: '#00008b',
  },
  textInput: {
    textAlign: 'center',
    borderRadius: resize(25),
    borderColor: themeColor,
    borderWidth: 3,
    marginBottom: 10,
    backgroundColor: themeColor2,
    width: '80%',
    aspectRatio: 4,
  },
});
