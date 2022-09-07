import { useState, useEffect } from "react";
import * as React from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import PropTypes from 'prop-types';

const InputTodo = ({ todos, setTodos }) => {
    const [input, setInput] = useState('');

    const onSubmit = (event) => {
        if (input.length === 0) {
            Alert.alert(
                '한 단어 이상 입력해주세요.',
                '',
                [
                    {
                        text: '확인',
                        onPress: () => { },
                    },
                ],
            );
        }
        else if (todos.includes(input)) {
            Alert.alert(
                '이미 있는 항목입니다.\n그래도 추가하시겠습니까?',
                '',
                [
                    {
                        text: '예',
                        onPress: () => {
                            setTodos(prev => ([...prev, input]));
                            setInput('');
                        },
                    }, {
                        text: '아니오',
                        onPress: () => {
                            setInput('');
                        },
                    },
                ],
            );
        }
        else {
            setTodos(prev => ([...prev, input]));
            setInput('');
        }
    }

    return (
        <View style={styles.textInputView} >
            <TextInput
                style={[styles.textInput, styles.textInputHeight]}
                returnKeyType='done'
                value={input}
                onChangeText={setInput}
                onSubmitEditing={onSubmit}
            />
            <TouchableOpacity
                style={[styles.textInputBtn, styles.textInputHeight]}
                activeOpacity={1}
                color='black'
                onPress={onSubmit}
            >
                <Text style={styles.textInputBtnTxt}>Add Todo</Text>
            </TouchableOpacity>
        </View>
    );
}

InputTodo.propTypes = {
    todos: PropTypes.array.isRequired,
    setTodos: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    textInputView: {
        flex: 0.7,
        flexDirection: 'row',

        justifyContent: 'center',
        alignContent: 'center',

        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
    },
    textInputHeight: {
        height: 50,
    },
    textInput: {
        flexDirection: 'row',
        flex: 3,
        fontSize: 20,

        backgroundColor: 'white',

        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,

        paddingLeft: 20,
    },
    textInputBtn: {
        flex: 1,
        flexDirection: 'row',

        color: 'black',
        backgroundColor: 'orange',

        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputBtnTxt: {
        fontSize: 17.5,
        fontWeight: 'bold',
        fontStyle: 'normal',
    }
});

export default InputTodo;