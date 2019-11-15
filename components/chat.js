import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import firebase from 'react-native-firebase';
import toArray from 'lodash/toArray';
import orderBy from 'lodash/orderBy';

const {width, height} = Dimensions.get('window');

const Chat = props => {
  const [msg, setMsg] = useState('');
  const [params, setParams] = useState({});
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref('users/' + user._user.uid + '/profile')
          .on('value', snap => {
            setCurrentUser(snap.val());
          });
        user.updateProfile({
          photoURL: currentUser.picture,
        });
        setParams(props.navigation.getParam('item'));
        firebase
          .database()
          .ref('users/' + user._user.uid + '/chats/' + params.id)
          .on('value', snap => {
            let newMessage = toArray(snap.val());
            setMessages(orderBy(newMessage, ['date'], ['desc', 'asc']));
          });
      }
    });
  }, [currentUser.picture, params.id, props.navigation]);

  const send = () => {
    if (msg.length > 0) {
      var messagesSend = messages;
      let idKey = Math.floor(Math.random() * 99999999999999999 + 1).toString();
      var day = new Date();
      var time = day.toLocaleDateString() + ' ' + day.toLocaleTimeString();
      messagesSend.push({
        id: idKey,
        sent: currentUser.id,
        msg: msg,
        image: currentUser.picture,
        date: time,
      });
      setMsg('');
      firebase
        .database()
        .ref('users/' + currentUser.id + '/chats/' + params.id)
        .push({
          id: idKey,
          text: msg,
          sent: currentUser.id,
          date: time,
        });
      firebase
        .database()
        .ref('users/' + params.id + '/chats/' + currentUser.id)
        .push({
          id: idKey,
          text: msg,
          sent: currentUser.id,
          date: time,
        });
    }
  };

  const renderItem = ({item}) => {
    if (item.sent !== currentUser.id) {
      return (
        <View style={styles.eachMsg}>
          <Image source={{uri: params.picture}} style={styles.userPic} />
          <View style={styles.msgBlock}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.msgTxt}>{item.text}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.rightMsg}>
          <View style={styles.rightBlock}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.rightTxt}>{item.text}</Text>
          </View>
          <Image source={{uri: currentUser.picture}} style={styles.userPic} />
        </View>
      );
    }
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <KeyboardAvoidingView style={styles.keyboard}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('TabBar')}
            activeOpacity={0.7}
            style={styles.TouchableOpacityStyle}>
            <Image
              //We are making FAB using TouchableOpacity with an image
              //We are using online image here
              source={{
                uri: 'http://clipart-library.com/images/8TA6aoepc.png',
              }}
              //You can use you project image Example below
              //source={require('./images/float-add-icon.png')}
              style={styles.FloatingButtonStyle}
            />
            <Text>Back</Text>
          </TouchableOpacity>
          <View style={styles.contView}>
            <Text style={styles.title}>{params.name}</Text>
            <Image
              source={{
                uri: params.picture,
              }}
              style={styles.userPic}
            />
          </View>
        </View>
        <FlatList
          style={styles.list}
          data={messages}
          inverted
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={renderItem}
        />
        <View style={styles.input}>
          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{flex: 1}}
            value={msg}
            placeholderTextColor="#696969"
            onChangeText={msgText => setMsg(msgText)}
            blurOnSubmit={false}
            onSubmitEditing={() => send()}
            placeholder="Type a message"
            returnKeyType="send"
          />
          <Button title="Send" style={styles.button} onPress={() => send()} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default withNavigation(Chat);

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width,
    height,
  },
  contView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 12,
  },
  date: {
    color: 'grey',
    fontSize: 10,
  },
  titleContainer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
    borderBottomWidth: 0.3,
  },
  title: {
    fontSize: 23,
    color: '#000000',
  },
  TouchableOpacityStyle: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 5,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
    //backgroundColor:'black'
  },
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#075e54',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    height: 40,
    width: width - 20,
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor: '#696969',
    borderWidth: 1,
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  msgBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
  rightBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#C3FFE5',
    padding: 10,
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
  msgTxt: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '600',
  },
});
