import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';

import InputTodo from './src/InputTodo';
import ContentTodo from './src/ContentTodo';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  const getData = async () => {
    try {
      setVisible(true);
      await AsyncStorage.getItem('todos')
        .then((data) => {
          setVisible(false);
          if (data == null) {
            console.log('Todo is Empty!');
          }
          else {
            setTodos(JSON.parse(data));
          }
          setLoaded(true);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const setData = async () => {
    try {
      setVisible(true);
      await AsyncStorage.setItem('todos', JSON.stringify(todos))
        .then((_) => {
          setVisible(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [todos]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <Spinner
        visible={visible}
        textContent='Doing Something...'
      />
      <InputTodo
        todos={todos}
        setTodos={setTodos}
      />
      <View style={styles.contentContainer}>
        <ContentTodo
          todos={todos}
          setTodos={setTodos}
          loaded={loaded}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'coral',
    flex: 1,
  },
  contentContainer: {
    flex: 5,
  },
});

export default App;
