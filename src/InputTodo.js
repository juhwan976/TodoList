import { useState, useEffect } from "react";
import * as React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import PropTypes from 'prop-types';

const InputTodo = ({ setTodos, visible }) => {
    const [input, setInput] = useState('');

    const onSubmit = (event) => {
        setTodos(prev => ([...prev, input]));
        setInput('');
    }

    return (
        <View style={styles.textInputView} >
            <Spinner
                visible={visible}
                textContent="Saving..."
            />
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
    setTodos: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
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