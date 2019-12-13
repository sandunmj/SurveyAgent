/**
 * @format
 * @flow
 */

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
});
