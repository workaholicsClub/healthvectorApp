'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from "react-native";
import {ConvertRatio} from "../../config/settings";
import {Colors} from "../../config/colors";

export default class ProfileQuestion extends Component {
    static propTypes = {
        showIcon: PropTypes.bool,
        sex: PropTypes.string,
        imageSrc: PropTypes.object,
        question: PropTypes.string
    };

    render() {
        let isMale = this.props.sex === 'male';
        let iconSize = isMale
            ? styles.maleIcon
            : styles.femaleIcon;
        let iconStyle = [iconSize];

        let iconElement = <View style={iconSize}/>;

        if (this.props.showIcon) {
            let icon = isMale
                ? require('../../../assets/newProfile/dataScreens/male.png')
                : require('../../../assets/newProfile/dataScreens/female.png');

            if (this.props.imageSrc) {
                icon = this.props.imageSrc;
                iconStyle.push(styles.blueBorder);
            }

            iconElement = <Image source={icon} style={iconStyle}/>;
        }

        let icon = isMale
            ? require('../../../assets/newProfile/dataScreens/male.png')
            : require('../../../assets/newProfile/dataScreens/female.png');

        return (
            <View style={styles.container}>
                {iconElement}
                <Text style={styles.headingText}>{this.props.question}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    femaleIcon: {
        width: 25.2 * ConvertRatio,
        height: 22 * ConvertRatio
    },
    maleIcon: {
        width: 25.2 * ConvertRatio,
        height: 20.8 * ConvertRatio
    },
    headingText: {
        width: 149.5 * ConvertRatio,
        height: 24 * ConvertRatio,
        fontFamily: "Roboto-Black",
        fontSize: 10 * ConvertRatio,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#000000",
        marginTop: 10 * ConvertRatio
    },
    blueBorder: {
        width: 25.2 * ConvertRatio,
        height: 25.2 * ConvertRatio,
        borderRadius: 12.6 * ConvertRatio,
        borderWidth: 1 * ConvertRatio,
        borderColor: Colors.darkSkyBlue
    }
});

AppRegistry.registerComponent('ProfileQuestion', () => ProfileQuestion);