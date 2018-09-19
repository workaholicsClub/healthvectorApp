'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from "react-native";
import {NextButton} from '../NextButton';
import ProfileQuestion from "./ProfileQuestion";
import {ConvertRatio} from "../../config/settings";

export default class NameInput extends Component {
    static propTypes = {
        sex: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            sex: this.props.sex,
            name: this.props.name
        };
    }

    handleNameChange(text) {
        let newName = text;

        if (this.props.onChange) {
            this.props.onChange(newName);
        }
    }

    render() {
        let isMale = this.state.sex === 'male';

        let questionText = isMale
            ? `Как зовут\nмальчика?`
            : `Как зовут\nдевочку?`;

        return (
            <View style={styles.pageContainer}>
                <View style={styles.whiteBackground}>
                    <ProfileQuestion showIcon={true} sex={this.state.sex} question={questionText} />
                    <TextInput style={styles.nameInput} placeholder="Имя" placeholderColor="rgb(219, 219, 219)" onChangeText={this.handleNameChange.bind(this)}/>
                </View>
                <View style={styles.nextButtonContainer}>
                    <NextButton text="Далее" to="/profile/birthday" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: "#ffffff",
        width: "100%",
        height: 272 * ConvertRatio,
        marginTop: 5 * ConvertRatio
    },
    whiteBackground: {
        height: 166 * ConvertRatio,
        alignItems: 'center'
    },
    nameInput: {
        width: 149.5 * ConvertRatio,
        height: 32 * ConvertRatio,
        fontFamily: "Roboto-Black",
        fontSize: 22.5 * ConvertRatio,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#000000",
        marginTop: 51 * ConvertRatio
    },
    nextButtonContainer: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginBottom: 12.5 * ConvertRatio
    }
});

AppRegistry.registerComponent('NameInput', () => NameInput);