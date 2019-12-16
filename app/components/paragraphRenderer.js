import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Slider,
  ScrollView,
} from 'react-native';
// import Slider from '@react-native-community/slider';
const themeColor = '#4b0082';
const themeColor2 = '#ffffff';

export default class ParagraphView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: new Array(this.props.questions.length).fill(null),
    };
  }

  updateAnswers = (index, value) => {
    var ansArray = this.state.answers;
    ansArray[index] = value;
    this.setState({answers: ansArray});
    this.props.update(this.props.index, this.state.answers);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.paragraph}>
            <Text style={styles.qtext}>{this.props.paragraph}</Text>
          </View>

          <View style={styles.questionView}>
            <FlatList
              style={styles.flatList}
              data={this.props.questions}
              renderItem={({item, index}) => (
                <View>
                  <View style={styles.listItem}>
                    <Text style={styles.normalText}>{item}</Text>
                  </View>

                  <Slider
                    style={{}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={themeColor}
                    maximumTrackTintColor="#00008b"
                    onSlidingComplete={value => {
                      this.updateAnswers(index, value);
                    }}
                  />
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
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
  paragraph: {
    flex: 2,
  },
  questionView: {
    flex: 3,
  },
  qtext: {
    padding: 20,
    fontSize: 20,
    marginVertical: 10,
    color: '#00008b',
  },
  slider: {
    width: '90%',
    height: 40,
  },
  normalText: {
    width: '80%',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
  },
  listItem: {
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
