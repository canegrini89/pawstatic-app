import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import firebase from 'react-native-firebase';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState('');
  const Images = [
    'http://www.securelifeinsuranceplan.com/wp-content/uploads/2018/05/Low-Cost-Coverage-For-Your-Pet-Rabbit.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRzxpIHWDkK5LG_DfZIcumEYIRGJnUnA4Go3XYGXDk7KVAkPRNs',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQK6hfR0ROykjZdJ94lC1cp-yCKNIgUJx3zeDhhnwlSIYLDCM3k',
    'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/03/28/13/kitten.jpg?w968h681',
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F835558537093793317%2F&psig=AOvVaw1j9Tu-crPZRnkq6JF3Kxzq&ust=1573568694870000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNChjauu4uUCFQAAAAAdAAAAABAJ',
  ];

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * Images.length);
    setCurrentImageIndex(randomNumber);
  }, [Images.length]);

  const onClickLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.bgImage}
        source={{
          uri: Images[currentImageIndex],
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={emailText => setEmail(emailText)}
        />
        <Image
          style={styles.inputIcon}
          source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={passwordText => setPassword(passwordText)}
        />
        <Image
          style={styles.inputIcon}
          source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}
        />
      </View>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() => onClickLogin()}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.navigation.navigate('Register')}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: 300,
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#00b5ec',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    opacity: 0.7,
    backgroundColor: 'black',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
