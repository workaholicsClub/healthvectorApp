'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback
} from "react-native";
import {ConvertRatio} from "../../config/settings";

export default class NextButton extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        skip: PropTypes.bool,
        text: PropTypes.string,
        to: PropTypes.string,
        style: PropTypes.object
    };

    navigateTo() {
        this.context.router.history.push(this.props.to);
    }

    render() {
        let isSkipButton = this.props.skip === true;
        let buttonStyle = isSkipButton
            ? styles.skipButton
            : styles.actionButton;
        let textStyle = isSkipButton
            ? styles.skipButtonText
            : styles.actionButtonText;

        return (
            <TouchableWithoutFeedback style={this.props.style} onPress={this.navigateTo.bind(this)}>
                <View style={buttonStyle}>
                    <Text style={textStyle}>{this.props.text}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    skipButton: {
        width: 90 * ConvertRatio,
        height: 25 * ConvertRatio,
        borderRadius: 12.5 * ConvertRatio,
        backgroundColor: "#ffffff",
        alignItems: 'center',
        justifyContent: 'center',

        borderStyle: "solid",
        borderWidth: 0.5 * ConvertRatio,
        borderColor: "#e0e3e6"
    },
    actionButton: {
        width: 90 * ConvertRatio,
        height: 25 * ConvertRatio,
        borderRadius: 12.5 * ConvertRatio,
        backgroundColor: "#44c0ec",
        alignItems: 'center',
        justifyContent: 'center'
    },
    skipButtonText: {
        width: 89.5 * ConvertRatio,
        height: 15 * ConvertRatio,
        fontFamily: "Roboto-Black",
        fontSize: 7.5 * ConvertRatio,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 15 * ConvertRatio,
        letterSpacing: 0,
        textAlign: "center",
        color: "#44c0ec"
    },
    actionButtonText: {
        width: 89.5 * ConvertRatio,
        height: 15 * ConvertRatio,
        fontFamily: "Roboto-Black",
        fontSize: 7.5 * ConvertRatio,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 15 * ConvertRatio,
        letterSpacing: 0,
        textAlign: "center",
        color: "#ffffff"
    }
});

AppRegistry.registerComponent('NextButton', () => NextButton);