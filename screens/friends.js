import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import firebase from 'react-native-firebase';
import {WhiteSpace} from '@ant-design/react-native';
import {SearchBar} from 'react-native-elements';
import {withNavigation} from 'react-navigation';

const Friends = props => {
  const [currentUser, setCurrentUser] = useState(null);
  const [text, setText] = useState('');
  const [filterData, setFilterData] = useState(null);
  const [newData, setData] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user._user);
      firebase
        .database()
        .ref('users')
        .on('value', snap => {
          if (snap.val()) {
            const toArray = [];

            Object.keys(snap.val()).forEach(item => {
              if (item !== user._user.uid) {
                toArray.push(snap.val()[item]);
              }
            });
            setData(toArray);
          }
        });
    });
  }, [newData]);

  const filterList = search => {
    setText(search);
    let items = newData;
    items = items.filter(item => {
      return (
        item.profile.name.toLowerCase().search(search.toLowerCase()) !== -1
      );
    });
    setFilterData(items);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={{uri: item.profile.picture}} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{item.profile.name}</Text>
            </View>
            <View style={styles.end}>
              <Image
                style={[
                  styles.icon,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {marginLeft: 15, marginRight: 5, width: 14, height: 14},
                ]}
                source={{
                  uri:
                    'https://cdn3.iconfinder.com/data/icons/basic-regular-2/64/120-128.png',
                }}
              />
              <Text style={styles.time}>{item.profile.email}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.contImg}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={styles.icon}
              source={{
                uri:
                  'https://cdn1.iconfinder.com/data/icons/twitter-ui-colored/48/JD-27-128.png',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Chat', {item: item.profile})
            }
            style={styles.contImg}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={styles.icon}
              source={{
                uri:
                  'https://cdn0.iconfinder.com/data/icons/pinterest-flat/48/Paul-13-128.png',
              }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <SearchBar
        onChangeText={filterList}
        value={text}
        onClear={text => filterList('')}
        placeholder="Type Name of Friends..."
      />
      <WhiteSpace />
      <FlatList
        data={filterData || newData}
        keyExtractor={item => {
          return item.profile.id;
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default withNavigation(Friends);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'center',
  },
  contImg: {
    width: 60,
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 180,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
    width: 140,
  },
  icon: {
    height: 70,
    width: 70,
  },
});
