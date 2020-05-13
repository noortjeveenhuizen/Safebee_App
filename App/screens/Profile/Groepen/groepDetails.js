import React, { useState, useEffect } from 'react';
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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const GroepDetails = ({ route, navigation }) => {
  window.addEventListener = x => x;
  const { groupDetails } = route.params;
  const [groupName, setGroupName] = useState(groupDetails.name);
  const [modalVisible, setModalVisible] = useState(false);
  const db = firebase.firestore();

  const updateGroup = () => {
    db.collection('groups')
      .doc(groupDetails._id)
      .update({ name: groupName })
      .then(() => navigation.navigate('SelecteerGroep'));
  };

  const addHesjes = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('QRScanner');
  };

  return (
    <View style={styles.viewContainer}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.viewContainerModal}>
          <View style={styles.modalView}>
            <Text>Hesjes</Text>
            <Text>Er zijn nog geen hesjes toegevoegd, voeg deze toe.</Text>
            <View>
              <TouchableHighlight
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{ color: '#F6C004' }}>Terug</Text>
              </TouchableHighlight>
              <TouchableOpacity onPress={() => addHesjes()}>
                <Icon name="person-add" size={20} style={styles.groepIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Image
        style={styles.logo}
        source={require('../../../../assets/logo.png')}
      />
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
      >
        <Icon name="group" size={20} style={styles.groepIcon} />

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
    width: '80%',
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  forgot: {
    color: '#F6C004',
    fontSize: 12,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 10,
    alignItems: 'center',
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

export default GroepDetails;