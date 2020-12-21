import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialIcons'



import { useAuth } from '../contexts/auth';

const SignUp = ({ navigation }) => {
  console.log("--- Entrou no SignUp ----")
  const { signUp } = useAuth();
  const [showMessageErrorName, setShowMessageErrorName] = useState(false);
  const [showMessageErrorEmail, setShowMessageErrorEmail] = useState(false);
  const [showMessageErrorPassword1, setShowMessageErrorPassword1] = useState(false);
  const [showMessageErrorPassword2, setShowMessageErrorPassword2] = useState(false);
  const [showMessageErrorPasswordConfirm, setShowMessageErrorPasswordConfirm] = useState(false);
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    check_textInputNameChange: false,
    check_textInputEmailChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const textInputNameChange = (val) => {
    setShowMessageErrorName(false);
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputNameChange: true
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputNameChange: false
      });
    }
  }

  const textInputEmailChange = (val) => {
    setShowMessageErrorEmail(false);
    const emailIsValid = validateEmail(val);
    if (val.length !== 0 & emailIsValid) {
      setData({
        ...data,
        email: val,
        check_textInputEmailChange: true
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputEmailChange: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    setShowMessageErrorPassword1(false);
    setShowMessageErrorPassword2(false);
    setData({
      ...data,
      password: val
    });
  }

  const handleConfirmPasswordChange = (val) => {
    setShowMessageErrorPasswordConfirm(false);
    setData({
      ...data,
      confirm_password: val
    });
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry
    });
  }

  const validateEmail = (email) => {
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(String(email).toLowerCase())
  }

  const signUpHandle = () => {
    console.log("signUpHandle")
    
    const emailIsValid = validateEmail(data.email);

    if (!emailIsValid) {
      setShowMessageErrorEmail(true);
    }

    if (data.username.length == 0) {
      setShowMessageErrorName(true);
    }

    if (data.password.length == 0) {
      setShowMessageErrorPassword1(true);
    } else {
      if (data.password.length < 8) {
        setShowMessageErrorPassword2(true);
      }
    }


    if (data.confirm_password != data.password) {
      setShowMessageErrorPasswordConfirm(true);
    }

    if (data.username && emailIsValid && data.password && data.confirm_password && data.confirm_password == data.password) {
      signUp(data.email, data.password, data.username)
    }
  }


  return (

    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle="light-content" />

      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
      >
        <ScrollView>
          <Text style={styles.text_footer}>Nome</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="seu nome"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputNameChange(val)}
            />
            {data.check_textInputNameChange ?
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
          {showMessageErrorName &&
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Digite seu nome.</Text>
            </Animatable.View>
          }




          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>Email</Text>
          <View style={styles.action}>
            <Material
              name="alternate-email"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="seu email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputEmailChange(val)}
            />
            {data.check_textInputEmailChange ?
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
            marginTop: 35
          }]}>Senha</Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="sua senha"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
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
          {showMessageErrorPassword1 &&
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Digite uma senha.</Text>
            </Animatable.View>
          }
          {showMessageErrorPassword2 &&
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>A senha deve ter 8 digitos ou mais</Text>
            </Animatable.View>
          }




          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>Confirme sua senha</Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="sua senha"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity
              onPress={updateConfirmSecureTextEntry}
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
          {showMessageErrorPasswordConfirm &&
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Senhas não conferem.</Text>
            </Animatable.View>
          }



          <View style={styles.textPrivate}>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => { signUpHandle() }}
            >
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, {
                  color: '#fff'
                }]}>Criar conta</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUp;

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
    flex: Platform.OS === 'ios' ? 3 : 5,
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 35
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
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  },
  color_textPrivate: {
    color: 'grey'
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
});
