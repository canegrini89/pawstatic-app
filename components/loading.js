import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import firebase from 'react-native-firebase';

const Loading = props => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        props.navigation.navigate('TabBar');
      } else {
        props.navigation.navigate('Login');
      }
    });
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <Text>Loading</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
