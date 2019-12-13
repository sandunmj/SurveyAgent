import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Animated,
} from 'react-native';

const themeColor = '#4b0082';

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: '10%', //(num of ques)/100 * question_id
    };
  }

  render() {
    return (
      <View>
        <View style={styles.progressBar}>
          <Animated.View
            style={
              ([StyleSheet.absoluteFill],
              {
                backgroundColor: '#00008b',
                width: this.props.prog,
                borderRadius: 15,
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  progressBar: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 4,
  },
});
