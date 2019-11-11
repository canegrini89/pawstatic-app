import React, {useState, useEffect} from 'react';
import {Text, StatusBar, Button} from 'react-native';
import firebase from 'react-native-firebase';
import {TabBar, Icon} from '@ant-design/react-native';
import Profile from '../screens/profile';

const TabBarNavigation = props => {
  const [selectedTab, setSelectedTab] = useState('Home');

  const handleChangePage = text => {
    setSelectedTab(text);
  };
  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        () => {
          console.log('not lgued');
        };
      })
      .catch(error => error);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#000000">
        <TabBar.Item
          title="Home"
          key="Home"
          icon={<Icon name="home" />}
          selected={selectedTab === 'Home'}
          data-seed="logId"
          onPress={() => handleChangePage('Home')}>
          <Button title="Log Out" onPress={() => logOut()} />
        </TabBar.Item>
        <TabBar.Item
          title="Chat"
          key="chat"
          icon={<Icon name="smile" />}
          selected={selectedTab === 'Pets'}
          data-seed="logId1"
          onPress={() => handleChangePage('Pets')}>
          <Text>hello</Text>
        </TabBar.Item>
        <TabBar.Item
          title="Plus"
          key="Plus"
          icon={<Icon name="plus-circle" />}
          selected={selectedTab === 'Plus'}
          data-seed="logId1"
          onPress={() => handleChangePage('Plus')}>
          <Text>Koubei</Text>
        </TabBar.Item>
        <TabBar.Item
          title="Friend"
          key="Friend"
          icon={<Icon name="heart" />}
          dot
          selected={selectedTab === 'Friend'}
          onPress={() => handleChangePage('Friend')}>
          <Text>Hello</Text>
        </TabBar.Item>
        <TabBar.Item
          title="Profile"
          key="Profile"
          dot
          icon={<Icon name="user" />}
          selected={selectedTab === 'Profile'}
          onPress={() => handleChangePage('Profile')}>
          <Profile />
        </TabBar.Item>
      </TabBar>
    </>
  );
};

export default TabBarNavigation;
