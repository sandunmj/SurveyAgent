/**
 * @format
 * @flow
 */

import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import InitLoading from './app/view/initLoading';
import SignIn from './app/view/signIn';
import TestFlex from './app/view/testFlex';
import VerifyEmail from './app/view/verifyEmail';
import VerifyPhone from './app/view/verifyPhone';

const AppNavigator = createSwitchNavigator(
  {
    initLoading: {
      screen: InitLoading,
    },
    signIn: {
      screen: SignIn,
    },
    verifyEmail: {
      screen: VerifyEmail,
    },
    verifyPhone: {
      screen: VerifyPhone,
    },
  },
  {
    initialRouteName: 'initLoading',
  },
);

export default createAppContainer(AppNavigator);
