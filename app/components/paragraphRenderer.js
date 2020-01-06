import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import Mcq from './mcqParagraph';
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
          <View style={styles.body}>
            <View style>
              <Text style={styles.questionText}>{this.props.paragraph}</Text>
            </View>

            <View style={styles.questionView}>
              <FlatList
                style={styles.flatList}
                data={this.props.questions}
                renderItem={({item, index}) => (
                  <View>
                    <Mcq
                      q={item.question}
                      update={this.updateAnswers}
                      ind={index}
                    />
                  </View>
                )}
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
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 5,
    width: '100%',
  },
  body: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  paragraph: {
    flex: 2,
  },
  questionView: {
    flex: 3,
  },
  questionText: {
    textAlign: 'center',
    fontSize: resize(22),
    marginVertical: 10,
    color: '#00008b',
    fontWeight: 'bold',
  },
  normalText: {
    width: '100%',
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
