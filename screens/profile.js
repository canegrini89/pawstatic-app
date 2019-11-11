import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';

const Profile = () => {
  const [user, setUser] = useState({});
  const [picture, setPicture] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged(currentUser => {
      console.log(currentUser);
      if (currentUser) {
        setUser(currentUser._user);
      }
      // if (picture) {
      //   currentUser.user.updateProfile({
      //     photoURL: picture,
      //   });
      // }
    });
  }, [picture]);

  const uploadImage = (uri, imageName, mime = 'image/jpg') => {
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = null;
      const imageRef = firebase
        .storage()
        .ref('profile')
        .child(user.uid)
        .child(imageName);
      fs.readFile(uploadUri, 'base64')
        .then(data => {
          return Blob.build(data, {type: `${mime};BASE64`});
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, {contentType: mime});
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
          firebase
            .database()
            .ref('users/' + user.uid + '/profile')
            .update({
              picture: url,
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  const onUploadPicture = () => {
    ImagePicker.showImagePicker(response => {
      uploadImage(response.uri, response.fileName);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerContent}
          onPress={onUploadPicture}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                user.photoURL ||
                'https://bootdey.com/img/Content/avatar/avatar2.png',
            }}
          />
          <Text style={styles.name}>John Doe</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileDetail}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Following</Text>
          <Text style={styles.count}>200</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Followers</Text>
          <Text style={styles.count}>200</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Photos</Text>
          <Text style={styles.count}>200</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00CED1',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 200,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    borderWidth: 0.2,
    borderColor: 'black',
  },
  detailContent: {
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#00CED1',
  },
  count: {
    fontSize: 18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    marginTop: 40,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: '#696969',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00CED1',
  },
  description: {
    fontSize: 20,
    color: '#00CED1',
    marginTop: 10,
    textAlign: 'center',
  },
});
