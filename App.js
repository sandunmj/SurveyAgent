/**
 * @format
 * @flow
 */

import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import InitLoading from './app/view/initLoading';
import SignIn from './app/view/signIn';
import VerifyEmail from './app/view/verifyEmail';
import VerifyPhone from './app/view/verifyPhone';
import SignUp from './app/view/signUp';
import MainScreen from './app/view/mainScreen';

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
    signUp: {
      screen: SignUp,
    },
    main: {
      screen: MainScreen,
    },
  },
  {
    initialRouteName: 'initLoading',
  },
);

export default createAppContainer(AppNavigator);
