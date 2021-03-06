import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';

const Profile = () => {
  const [user, setUser] = useState({});
  const [picture, setPicture] = useState('');
  const [background, setBackground] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser._user);
        firebase
          .database()
          .ref('users/' + currentUser._user.uid)
          .child('profile')
          .on('value', snap => {
            if (snap.val().picture) {
              setPicture(snap.val().picture);
            } else {
              setPicture(
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRlW3r9_qcfU-6M9Qf9witE-skyTNjkbHqCfgWscQC6H96Vv-IX',
              );
            }
            if (snap.val().backPicture) {
              setBackground(snap.val().backPicture);
            } else {
              setBackground(
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQSyo2oLyCh1yIvBqi-_tMhd6GgyAv_eAoCoZ-AvlJcK76s1u-',
              );
            }
          });
      }
    });
  }, [picture, background]);

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        () => {
          console.log('not lgued');
        };
      })
      .catch(error => error);
  };

  const openPicker = value => {
    const options = {
      title: 'Fotoğraf Seç',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        allowsEditing: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('response:', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        var path = '';
        // eslint-disable-next-line curly
        if (Platform.OS === 'ios') path = response.uri.toString();
        else {
          path = response.path.toString();
        }

        const image = {
          image: response.uri.toString(),
          name: response.fileName,
          path: path,
        };
        uploadImage(image, value);
      }
    });
  };

  const uploadImage = (image, value) => {
    firebase
      .storage()
      .ref('profile/' + user.uid + '/' + image.name)
      .putFile(image.path)
      .then(file => {
        if (value !== 'back') {
          firebase
            .database()
            .ref('users/' + user.uid)
            .child('profile')
            .update({
              picture: file.downloadURL,
            });
          setPicture(file.downloadURL);
        } else {
          firebase
            .database()
            .ref('users/' + user.uid)
            .child('profile')
            .update({
              backPicture: file.downloadURL,
            });
          setBackground(file.downloadURL);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => openPicker('back')}>
        <ImageBackground
          source={{uri: background}}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: '100%', height: '100%'}}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.avatar} onPress={openPicker}>
        <Image style={styles.avatarImg} source={{uri: picture}} />
      </TouchableOpacity>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{user.displayName}</Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.profileDetail}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Followers</Text>
          <Text style={styles.count}>0</Text>
        </View>
      </View>

      <View style={styles.profileDetailRigth}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Following</Text>
          <Text style={styles.count}>0</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.imageCont} onPress={logOut}>
        <Image
          style={styles.img}
          source={{
            uri:
              'https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_settings-128.png',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 150,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 90,
  },
  profileDetailRigth: {
    alignSelf: 'flex-end',
    marginTop: 110,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: 90,
  },
  imageCont: {
    alignSelf: 'flex-end',
    marginTop: 15,
    flexDirection: 'row',
    position: 'absolute',
    width: 90,
    height: 90,
  },
  img: {
    marginLeft: 40,
    width: 30,
    height: 30,
  },
  profileDetail: {
    alignSelf: 'flex-start',
    marginTop: 110,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: 90,
  },
  detailContent: {
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#00CED1',
  },
  count: {
    fontSize: 18,
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  body: {
    marginTop: 20,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 18,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 14,
    color: '#00BFFF',
    marginTop: 5,
  },
});
