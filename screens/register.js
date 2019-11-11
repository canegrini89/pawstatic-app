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

const Register = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  // const [currentUser, setCurrentUser] = useState({});
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

  const onRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.toLowerCase(), password)
      .then(result => {
        return result.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            firebase
              .database()
              .ref('users/' + result.user.uid + '/profile')
              .set({
                name,
                password,
                email,
                id: result.user.uid,
              });
          });
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.bgImage} source={{uri: Images[currentImageIndex]}} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Full name"
          underlineColorAndroid="transparent"
          onChangeText={nameText => setName(nameText)}
        />
        <Image
          style={styles.inputIcon}
          source={{
            uri:
              'https://img.icons8.com/color/40/000000/circled-user-male-skin-type-3.png',
          }}
        />
      </View>

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
          source={{
            uri:
              'https://img.icons8.com/flat_round/40/000000/secured-letter.png',
          }}
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
          source={{
            uri: 'https://img.icons8.com/color/40/000000/password.png',
          }}
        />
      </View>

      <TouchableOpacity style={styles.btnByRegister}>
        {/* <Text style={styles.textByRegister}>Social Auth</Text> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() => onRegister()}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.btnText}>Have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

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
  btnByRegister: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
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
  registerText: {
    color: 'white',
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  textByRegister: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',

    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});
