/**
 * @format
 * @flow
 */

import React from 'react';
import {firebase} from '@react-native-firebase/auth';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const themeColor = '#4b0082';
const themeColor2 = '#ffffff';

type Props = {};
export default class VerifyEmail extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerTextBox}>
          <Text style={styles.headerText}>Enter your enterprise email</Text>
        </View>
        <View style={styles.textInputBox}>
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            placeholder={'Email'}
            placeholderTextColor={themeColor}
            style={styles.textInput}
          />
        </View>
        <View style={styles.buttonBox}>
          <Text />
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              this.props.navigation.navigate('verifyPhone');
            }}
            underlayColor={themeColor}>
            <Text style={styles.touchText}>Enter</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                this.props.navigation.navigate('signIn');
              }}
              underlayColor={themeColor}>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColor2,
  },
  headerTextBox: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: themeColor2,
    justifyContent: 'flex-end',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'left',
    color: themeColor,
    fontSize: 20,
  },
  textInputBox: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: themeColor2,
  },
  textInput: {
    alignSelf: 'center',
    textAlign: 'center',
    width: 340,
    height: 50,
    padding: 0,
    borderRadius: 25,
    borderColor: themeColor,
    borderWidth: 3,
    marginBottom: 10,
    backgroundColor: themeColor2,
  },
  buttonBox: {
    flex: 2,
    justifyContent: 'flex-start',
    backgroundColor: themeColor2,
    padding: 10,
  },
  touchable: {
    alignSelf: 'center',
    height: 40,
    width: 120,
    padding: 0,
    borderRadius: 25,
    backgroundColor: themeColor,
    borderColor: themeColor,
  },
  touchText: {
    padding: 10,
    textAlign: 'center',
    color: themeColor2,
  },
  text: {
    color: themeColor,
    fontSize: 20,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: themeColor2,
    padding: 10,
  },
  backButton: {
    alignSelf: 'center',
    height: 40,
    width: 120,
    padding: 0,
    borderRadius: 25,
    backgroundColor: themeColor,
    borderColor: themeColor,
  },
  backText: {
    padding: 10,
    textAlign: 'center',
    color: themeColor2,
  },
});
