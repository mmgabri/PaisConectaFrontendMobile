import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { useAuth } from '../contexts/auth';

const SignIn = ({ navigation }) => {
  const { signIn } = useAuth();
  const [showMessageErrorEmail, setShowMessageErrorEmail] = useState(false);
  const [showMessageErrorPassword, setShowMessageErrorPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const { colors } = useTheme();

  const validateEmail = (email) => {
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(String(email).toLowerCase())
  }

  const handleEmailChange = (val) => {
    setShowMessageErrorEmail(false);
    const emailIsValid = validateEmail(val);
    if (emailIsValid) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  }

  const handlePasswordChange = (val) => {
    setShowMessageErrorPassword(false);
    setData({
      ...data,
      password: val,
      isValidPassword: true
    });
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const handleValidEmail = (val) => {
    const emailIsValid = validateEmail(val);
    if (emailIsValid) {
      setData({
        ...data,
        isValidEmail: true
      });
    } else {
      setData({
        ...data,
        isValidEmail: false
      });
    }
  }

  const signInHandle = () => {

    console.log("signInHandle", true)

    const emailIsValid = validateEmail(data.email);

    if (!emailIsValid) {
      setShowMessageErrorEmail(true);
    }

    if (data.password.length == 0) {
      setShowMessageErrorPassword(true);
    }

    if (emailIsValid && data.password) {
      signIn(data.email, data.password)
    }
  }


  return (

    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle="light-content" />
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: colors.background
        }]}
      >
        <Text style={[styles.text_footer, {
          color: colors.text
        }]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color={colors.text}
            size={20}
          />
          <TextInput
            keyboardType="email-address"
            placeholder="seu email"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={(val) => handleEmailChange(val)}
            onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
          />
          {data.check_textInputChange ?
            <Animatable.View
              animation="bounceIn"
            >
              <Feather
                name="check-circle"
                color="green"
                size={20}
              />
            </Animatable.View>
            : null}
        </View>
        {showMessageErrorEmail &&
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email invalido.</Text>
          </Animatable.View>
        }




        <Text style={[styles.text_footer, {
          color: colors.text,
          marginTop: 35
        }]}>Senha</Text>
        <View style={styles.action}>
          <Feather
            name="lock"
            color={colors.text}
            size={20}
          />
          <TextInput
            placeholder="sua senha"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity
            onPress={updateSecureTextEntry}
          >
            {data.secureTextEntry ?
              <Feather
                name="eye-off"
                color="grey"
                size={20}
              />
              :
              <Feather
                name="eye"
                color="grey"
                size={20}
              />
            }
          </TouchableOpacity>
        </View>
        {showMessageErrorPassword &&
          <Animatable.View animation="fadeInLeft" duration={5}>
            <Text style={styles.errorMsg}>Informe sua senha.</Text>
          </Animatable.View>
        }

        <TouchableOpacity>
          <Text style={{ color: '#009387', marginTop: 15 }}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => { signInHandle() }}
          >
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, {
                color: '#fff'
              }]}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={[styles.signIn, {
              borderColor: '#009387',
              borderWidth: 1,
              marginTop: 15
            }]}
          >
            <Text style={[styles.textSign, {
              color: '#009387'
            }]}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
