'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from "react-native";
import {ConvertRatio} from "../../config/settings";

export default class EventsFeed extends Component {
    static propTypes = {
        title: PropTypes.string,
        events: PropTypes.array
    };

    render() {
        return (
            <View style={styles.cardsContainer}>
                <Text style={styles.scheduleHeading}>{this.props.title}</Text>
                {this.props.events.map(function (event, index) {
                    return (
                        <View style={styles.eventCard} key={index}>
                            <Text>{event.name}</Text>
                        </View>
                    )
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardsContainer: {},
    scheduleHeading: {
        fontFamily: "Muller",
        fontSize: 6.5*ConvertRatio,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff",
        marginLeft: 17*ConvertRatio,
        marginRight: 17*ConvertRatio,
        marginBottom: 8*ConvertRatio,
        marginTop: 16*ConvertRatio
    },
    eventCard: {
        height: 30*ConvertRatio,
        backgroundColor: 'white',
        borderRadius: 5*ConvertRatio,
        marginLeft: 17*ConvertRatio,
        marginRight: 17*ConvertRatio,
        marginBottom: 5*ConvertRatio,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('EventsFeed', () => EventsFeed);