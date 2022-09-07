import * as React from 'react';
import { useState, useRef } from 'react';
import { ActivityIndicator, Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Dialog from 'react-native-dialog';
import PropTypes from 'prop-types';

const ContentTodo = ({ todos, setTodos, loaded }) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editString, setEditString] = useState('');
  const indexRef = useRef(0);


  const onEdit = () => {
    let arr = todos;
    setDialogVisible(false);
    arr.splice(indexRef.current, 1);
    arr.splice(indexRef.current, 0, editString);
    setTodos([...arr]);
  }

  const onLongPress = (index) => {
    Alert.alert(
      '수행할 작업을 선택해주세요.',
      '',
      [
        {
          text: '삭제하기',
          onPress: () => {
            Alert.alert(
              '정말로 삭제 하시겠습니까?',
              '삭제한 항목은 복구가 불가능합니다.',
              [
                {
                  text: '예',
                  onPress: () => {
                    let arr = todos;
                    arr.splice(index, 1);
                    setTodos([...arr]);
                  },
                },
                {
                  text: '아니요',
                  onPress: () => { },
                },
              ],
            );
          }
        },
        {
          text: '수정하기',
          onPress: () => {
            indexRef.current = index;
            setEditString(todos[indexRef.current]);
            setDialogVisible(true);
          },
        },
        {
          text: '취소',
          onPress: () => { },
        },
      ],
    );
  }

  return (
    loaded ? (
      <ScrollView
        pagingEnabled
      >
        <View style={{ height: 10 }}></View>
        {
          todos.map((todo, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  style={styles.todoListElement}
                  activeOpacity={0.8}
                  onLongPress={() => onLongPress(index)}
                >
                  <Text style={styles.todoListelementTxt}>
                    {todo}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        }
        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>내용을 수정해주세요.</Dialog.Title>
          <Dialog.Input
            value={editString}
            onChangeText={setEditString}
          />
          <Dialog.Button
            label='수정하기'
            onPress={onEdit}
          />
          <Dialog.Button
            label='취소'
            onPress={() => { setDialogVisible(false); }}
          />
        </Dialog.Container>
      </ScrollView >) : (
      <View style={{ justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  );
}

ContentTodo.propTypes = {
  todos: PropTypes.array.isRequired,
  setTodos: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  todoListElement: {
    height: Dimensions.get('window').height * 0.08,

    backgroundColor: 'pink',

    margin: 10,
    marginTop: 0,

    justifyContent: 'center',

    borderRadius: 20,
    paddingLeft: 20,

    elevation: 10,
    shadowOpacity: 0.5,
    shadowColor: 'grey',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0, },
  },
  todoListelementTxt: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default ContentTodo;