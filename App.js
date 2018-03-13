/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

const convertRatio = 2.2;

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topOval}>
                    <Image source={require('./assets/dashboard/shape.png')} style={{height: 10*convertRatio, width: 10*convertRatio}}/>
                    <Text style={styles.childText}>Петька, 7 мес</Text>
                    <Image source={require('./assets/dashboard/menu.png')} style={{height: 10*convertRatio, width: 10*convertRatio}}/>
                </View>
                <View style={styles.topButtons}>
                    <View style={styles.topButton}>
                        <Image source={require('./assets/dashboard/doll2.png')} style={{width: 10.5*convertRatio, height: 13.5*convertRatio}}/>
                    </View>

                    <View style={styles.childPortrait}>
                    </View>

                    <View style={styles.topButton}>
                        <Image source={require('./assets/dashboard/pyramid2.png')} style={{width: 10.5*convertRatio, height: 11.5*convertRatio}}/>
                    </View>
                </View>
                <ScrollView style={{marginTop: -28.5*convertRatio, zIndex: 50}}>
                    <View style={styles.dashboard}>
                        <View style={styles.dashboardButtons}>
                            <View style={styles.dashboardButton}>
                                <Image source={require('./assets/dashboard/moon.png')} style={{width: 15.4*convertRatio, height: 16*convertRatio}}/>
                            </View>

                            <View style={styles.dashboardButton}>
                                <Image source={require('./assets/dashboard/feedingBottle.png')} style={{width: 8*convertRatio, height: 17.5*convertRatio}}/>
                            </View>

                            <View style={styles.dashboardButton}>
                                <Image source={require('./assets/dashboard/diaper.png')} style={{width: 15*convertRatio, height: 12.5*convertRatio}}/>
                            </View>

                            <View style={styles.dashboardButton}>
                                <Image source={require('./assets/dashboard/baby.png')} style={{width: 18.5*convertRatio, height: 16*convertRatio}}/>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.scheduleHeading}>Дела на сегодня</Text>
                    <View style={styles.eventCard}/>
                    <View style={styles.eventCard}/>
                    <Text style={styles.scheduleHeading}>На этой неделе</Text>
                    <View style={styles.eventCard}/>
                </ScrollView>
            </View>
        );
    }
}

const colors = {
    darkSkyBlue: "#3fabe6"
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkSkyBlue,
    },
    topOval: {
        height: 51*convertRatio,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#ffffff",
        padding: 7*convertRatio,
        zIndex: 100,
    },
    topButtons: {
        height: 57*convertRatio,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: -28.5*convertRatio,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        paddingLeft: 17*convertRatio,
        paddingRight: 17*convertRatio,
        position: 'relative',
        zIndex: 110,
    },
    dashboard: {
        height: 97*convertRatio,
        backgroundColor: 'white',
        marginLeft: 7*convertRatio,
        marginRight: 7*convertRatio,
        borderRadius: 9*convertRatio,
        marginTop: 30*convertRatio
    },
    dashboardButtons: {
        height: 32*convertRatio,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 11*convertRatio,
        paddingRight: 11*convertRatio,
        paddingTop: 11*convertRatio
    },
    topButton: {
        width: 32*convertRatio,
        height: 32*convertRatio,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16*convertRatio,
        elevation: 20,
        shadowColor: "rgba(0, 0, 0, 0.18)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 1
    },
    dashboardButton: {
        width: 32*convertRatio,
        height: 32*convertRatio,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16*convertRatio,
        borderStyle: "solid",
        borderWidth: 2*convertRatio,
        borderColor: "#e0e3e6"
    },
    childPortrait: {
        width: 57*convertRatio,
        height: 57*convertRatio,
        borderRadius: 28.5*convertRatio,
        borderStyle: "solid",
        borderWidth: 3.5*convertRatio,
        borderColor: colors.darkSkyBlue,
        backgroundColor: '#ffffff'
    },
    childText: {
        fontSize: 7.5*convertRatio,
        fontFamily: "Muller",
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center"
    },
    scheduleHeading: {
        fontFamily: "Muller",
        fontSize: 6.5*convertRatio,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff",
        marginLeft: 17*convertRatio,
        marginRight: 17*convertRatio,
        marginBottom: 8*convertRatio,
        marginTop: 16*convertRatio
    },
    eventCard: {
        height: 30*convertRatio,
        backgroundColor: 'white',
        borderRadius: 5*convertRatio,
        marginLeft: 17*convertRatio,
        marginRight: 17*convertRatio,
        marginBottom: 5*convertRatio
    }
});
