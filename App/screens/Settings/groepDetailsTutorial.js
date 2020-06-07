import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import 'firebase/firestore';

const GroepDetailsTutorial = ({ route, navigation }) => {
  window.addEventListener = x => x;
  const { groupDetails } = route.params;
  console.log(groupDetails);
  const [groupName, setGroupName] = useState(groupDetails.name);
  const [modalVisible, setModalVisible] = useState(true);
  const db = firebase.firestore();

  const updateGroup = () => {
    db.collection('groups')
      .doc(groupDetails._id)
      .update({ name: groupName })
      .then(() => navigation.navigate('SelecteerGroep'));
  };

  const endTutorial = async () => {
    setModalVisible(!modalVisible);

    try {
      await AsyncStorage.setItem('TUTORIAL', 'true').then(() =>
        navigation.navigate('Loading')
      );
    } catch (e) {
      alert('Failed to save the data to the storage');
    }
  };

  return (
    <View style={styles.viewContainer}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.viewContainerModal}>
          <View style={styles.modalView}>
            <Text style={styles.titleModal}>Hesjes</Text>
            {groupDetails.names.length > 0 ? (
              <View style={styles.bodyModal}>
                {groupDetails.names.map(name => (
                  <Text key={name}>{name}</Text>
                ))}
              </View>
            ) : (
              <Text style={styles.bodyModal}>
                Er zijn nog geen namen ingegeven, voeg deze toe.
              </Text>
            )}

            <View>
              <TouchableHighlight onPress={() => endTutorial()}>
                <Text style={styles.backModal}>Klaar</Text>
              </TouchableHighlight>
              <TouchableOpacity style={styles.groepIconRight}>
                <Icon name="person-add" size={20} style={styles.groepIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Image style={styles.logo} source={require('../../../assets/logo.png')} />
      <View style={styles.error}>
        <View style={styles.inputView}>
          <Icon name="group" size={20} style={styles.groepIcon} />
          <TextInput
            style={styles.inputText}
            placeholder={groupDetails.name}
            placeholderTextColor="#9F9F9F"
            autoCapitalize="none"
            value={groupName}
            onChangeText={setGroupName}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.hesjesView}
      >
        <Icon name="face" size={30} style={styles.faceIcon} />

        <Text style={styles.loginText}>Hesjes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => updateGroup()}>
        <Text style={styles.loginText}>Groep opslaan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  viewContainerModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  inputView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    height: 50,
  },
  inputText: {
    height: 50,
    color: 'black',
    width: '100%',
  },
  groepIcon: {
    padding: 20,
    color: '#9F9F9F',
  },
  hesjesView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '72%',
    height: 50,
    marginBottom: 20,
  },
  faceIcon: {
    color: '#9F9F9F',
    marginRight: 15,
  },
  forgot: {
    color: '#F6C004',
    fontSize: 12,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalBtns: {
    flexDirection: 'row',
  },
  titleModal: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  bodyModal: {
    marginLeft: 10,
    marginBottom: 10,
  },
  backModal: {
    color: '#F6C004',
    marginLeft: 150,
    marginTop: 20,
  },
  groepIconRight: {
    marginLeft: 200,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 2,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: '#F6C004',
  },
  register: {
    color: '#9F9F9F',
    fontSize: 12,
  },
  logo: {
    width: 60,
    height: 130,
    resizeMode: 'stretch',
    marginBottom: 40,
    marginTop: 40,
  },
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 40,
  },
  errorMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
  },
});

export default GroepDetailsTutorial;