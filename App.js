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

  async function getData() {
    setVisible(true);
    await AsyncStorage.getItem('todos')
      .then((data) => {
        setVisible(false);
        if (data == null) {
          console.log('Todo is Empty!');
        }
        else {
          setTodos(JSON.parse(data));
          console.log("get to : " + todos);
        }
        setLoaded(true);
      });
  }

  const setData = async () => {
    setVisible(true);
    setTodos(todos);
    console.log("set to : " + todos);
    await AsyncStorage.setItem('todos', JSON.stringify(todos))
      .then((_) => {
        setVisible(false);
      });
  }

  // setTodos 를 사용해도 즉시 업데이트가 반영되는게 아니므로 아래의 구문을 써줘야한다.
  useEffect(() => {
    setData();
  }, [todos]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <Spinner
        visible={visible}
        textContent='Loading...'
      />
      <InputTodo
        setTodos={setTodos}
        visible={visible}
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
