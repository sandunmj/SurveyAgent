/**
 * @format
 * @flow
 */

import React from 'react';
import ActivityIndicatorCircle from './../components/activityIndicator';
import {firebase} from '@react-native-firebase/auth';

type Props = {};
export default class InitLoading extends React.Component<Props> {
  componentDidMount() {
    // firebase.auth().signOut();
    firebase.auth().onAuthStateChanged(user => {
      console.log(user ? 'Signed In' : 'Signed Out');
      this.props.navigation.navigate(user ? 'main' : 'signIn');
    });
  }
  render() {
    return <ActivityIndicatorCircle text="Survey Agent" />;
  }
}
