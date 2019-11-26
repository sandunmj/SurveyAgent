/**
 * @format
 * @flow
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';

export default class TestFlex extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flex1} />
        <View style={styles.flex2} />
        <View style={styles.flex3} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  flex1: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
  },
  flex2: {
    flex: 3,
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
  flex3: {
    flex: 4,
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
  },
});
