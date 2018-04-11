'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    View
} from "react-native";
import {ConvertRatio} from "../../config/settings";

export default class ProgressButton extends Component {
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        icon: PropTypes.string,
        progressColor: PropTypes.string
    };

    render() {
        let icons = {
            moon: require('../../../assets/dashboard/moon.png'),
            feedingBottle: require('../../../assets/dashboard/feedingBottle.png'),
            diaper: require('../../../assets/dashboard/diaper.png'),
            baby: require('../../../assets/dashboard/baby.png')
        };
        let icon = icons[this.props.icon];
        let iconStyle = styles[this.props.icon+'Icon'];

        return (
            <View>
                <TouchableOpacity style={styles.button}>
                    <Image source={icon} style={iconStyle}/>
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.description}>{this.props.description}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 32 * ConvertRatio,
        height: 32 * ConvertRatio,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16 * ConvertRatio,
        borderStyle: "solid",
        borderWidth: 2 * ConvertRatio,
        borderColor: "#e0e3e6"
    },
    title: {
        width: 32 * ConvertRatio,
        height: 8 * ConvertRatio,
        fontFamily: "Muller",
        fontSize: 6.5 * ConvertRatio,
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#000000"
    },
    description: {
        width: 32 * ConvertRatio,
        height: 8 * ConvertRatio,
        fontFamily: "Circe",
        fontSize: 5 * ConvertRatio,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.17 * ConvertRatio,
        textAlign: "center",
        color: "#6a7178"
    },
    moonIcon: {
        width: 15.4 * ConvertRatio,
        height: 16 * ConvertRatio
    },
    feedingBottleIcon: {
        width: 8 * ConvertRatio,
        height: 17.5 * ConvertRatio
    },
    diaperIcon: {
        width: 15 * ConvertRatio,
        height: 12.5 * ConvertRatio
    },
    babyIcon: {
        width: 18.5 * ConvertRatio,
        height: 16 * ConvertRatio
    }
});

AppRegistry.registerComponent('ProgressButton', () => ProgressButton);