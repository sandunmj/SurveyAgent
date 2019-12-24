/**
 * @format
 * @flow
 */
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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

  handleVerifyEmail() {
    const email = this.state.email;
    // if (email === 'sandunmenaka@gmail.com'){
    //   this.props.navigation.navigate('verifyPhone', {
    //     email: email
    //   });
    // }
    if (true) {
      this.props.navigation.navigate('verifyPhone', {
        email: email,
      });
    } else {
      Alert.alert('Please enter a valid email!');
    }
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
              this.handleVerifyEmail();
            }}
            underlayColor={themeColor}>
            <Text style={styles.touchText}>Enter</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                this.props.navigation.navigate('signIn');
              }}
              underlayColor={themeColor}>
              <Text style={styles.touchText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColor2,
  },
  headerTextBox: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: themeColor2,
    width: '100%',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: themeColor,
    fontSize: resize(25),
  },
  textInputBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: themeColor2,
    width: '100%',
  },
  textInput: {
    textAlign: 'center',
    borderRadius: resize(25),
    borderColor: themeColor,
    borderWidth: resize(3),
    marginBottom: resize(10),
    backgroundColor: themeColor2,
    width: '80%',
    aspectRatio: 6,
  },
  buttonBox: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: themeColor2,
    padding: resize(10),
    width: '100%',
  },
  touchable: {
    width: '38%',
    aspectRatio: 3.5,
    borderRadius: resize(25),
    backgroundColor: themeColor,
    borderColor: themeColor,
  },
  touchText: {
    fontSize: resize(15),
    padding: resize(10),
    textAlign: 'center',
    color: themeColor2,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColor2,
    width: '100%',
  },
});
