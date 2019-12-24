/**
 * @format
 * @flow
 */
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React from 'react';
import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';

const themeColor = '#4b0082';

type Props = {
  text?: string,
};
export default class ActivityIndicatorCircle extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>

        <ActivityIndicator color="white" size="large" />
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
    flex: 1,
    backgroundColor: themeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: resize(30),
  },
});
