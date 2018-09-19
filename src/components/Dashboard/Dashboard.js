import React, {Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';

import {EventsFeed} from "../EventsFeed";
import {ProgressButton} from "../ProgressButton";

import {Colors} from "../../config/colors";
import {ConvertRatio} from "../../config/settings";
import PropTypes from "prop-types";

type Props = {};
export default class App extends Component<Props> {
    static propTypes = {
        name: PropTypes.string,
        birthday: PropTypes.instanceOf(Date),
        photo: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            childAvatarSource: this.props.photo || false,
            dailyEvents: [{name: 'Событие 1'}, {name: 'Событие 2'}],
            weeklyEvents: [{name: 'Событие 3'}]
        };
    }

    takePicture() {
        let imagePickerOptions = {
            title: 'Выберите изображение',
            takePhotoButtonTitle: 'Сделать фотографию...',
            chooseFromLibraryButtonTitle: 'Выбрать из каталога изображений...',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(imagePickerOptions, (response) => {
            let isPictureAccepted = !response.didCancel && !response.error;

            if (isPictureAccepted) {
                let source = { uri: response.uri };

                this.setState({
                    childAvatarSource: source
                });
            }
        });
    }

    renderTakePictureButton() {
        return (
            <TouchableOpacity style={styles.childPortraitContainer} onPress={this.takePicture.bind(this)}>
                <View style={styles.childPortrait}>
                    <Image source={require('../../../assets/dashboard/photoCamera.png')} style={{width: 16*ConvertRatio, height: 16*ConvertRatio}}/>
                </View>
            </TouchableOpacity>
        );
    }

    renderProfilePicture() {
        let hasNoProfilePicture = this.state.childAvatarSource === false;
        let childAvatarSource = this.state.childAvatarSource;

        if (hasNoProfilePicture) {
            return this.renderTakePictureButton();
        }

        return (
            <Image source={childAvatarSource} style={styles.childPortrait} onPress={this.takePicture.bind(this)}/>
        );
    }

    renderDashboard() {
        let age = "7 мес";

        return (
            <View style={styles.container}>
                <View style={styles.topOval}>
                    <Image source={require('../../../assets/dashboard/shape.png')} style={{height: 10*ConvertRatio, width: 10*ConvertRatio}}/>
                    <Text style={styles.childText}>{this.props.name}, {age}</Text>
                    <Image source={require('../../../assets/dashboard/menu.png')} style={{height: 10*ConvertRatio, width: 10*ConvertRatio}}/>
                </View>
                <View style={styles.topButtons}>
                    <View>
                        <View style={styles.topButton}>
                            <Image source={require('../../../assets/dashboard/doll2.png')} style={{width: 10.5*ConvertRatio, height: 13.5*ConvertRatio}}/>
                        </View>
                        <Text style={styles.topButtonTitle}>Рост и вес</Text>
                    </View>

                    {this.renderProfilePicture()}

                    <View>
                        <View style={styles.topButton}>
                            <Image source={require('../../../assets/dashboard/pyramid2.png')} style={{width: 10.5*ConvertRatio, height: 11.5*ConvertRatio}}/>
                        </View>
                        <Text style={styles.topButtonTitle}>Достижения</Text>
                    </View>
                </View>
                <ScrollView style={{marginTop: -28.5*ConvertRatio, zIndex: 50}}>
                    <View style={styles.dashboard}>
                        <View style={styles.dashboardButtons}>
                            <ProgressButton title="Устал" description="Спал 2ч назад" icon='moon' progressColor="" />
                            <ProgressButton title="Сыт" description="Ел 15м назад" icon='feedingBottle' progressColor="" />
                            <ProgressButton title="Чистый" description="5м назад" icon='diaper' progressColor="" />
                            <ProgressButton title="Рад" description="" icon='baby' progressColor="" />
                        </View>
                    </View>
                    <EventsFeed title="Дела на сегодня" events={this.state.dailyEvents}/>
                    <EventsFeed title="На этой неделе" events={this.state.weeklyEvents}/>
                </ScrollView>
            </View>
        );
    }

    render() {
        return this.renderDashboard();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.darkSkyBlue,
    },
    topOval: {
        height: 51 * ConvertRatio,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#ffffff",
        padding: 7 * ConvertRatio,
        zIndex: 100,
    },
    topButtons: {
        height: 57 * ConvertRatio,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: -28.5 * ConvertRatio,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        paddingLeft: 17 * ConvertRatio,
        paddingRight: 17 * ConvertRatio,
        position: 'relative',
        zIndex: 110,
    },
    dashboard: {
        height: 97 * ConvertRatio,
        backgroundColor: 'white',
        marginLeft: 7 * ConvertRatio,
        marginRight: 7 * ConvertRatio,
        borderRadius: 9 * ConvertRatio,
        marginTop: 30 * ConvertRatio
    },
    dashboardButtons: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 11 * ConvertRatio,
        paddingRight: 11 * ConvertRatio,
        paddingTop: 11 * ConvertRatio
    },
    topButton: {
        width: 32 * ConvertRatio,
        height: 32 * ConvertRatio,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16 * ConvertRatio,
        elevation: 20,
        shadowColor: "rgba(0, 0, 0, 0.18)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 1
    },
    topButtonTitle: {
        width: 32 * ConvertRatio,
        fontFamily: "Muller",
        fontSize: 4.5 * ConvertRatio,
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#ffffff"
    },
    childPortraitContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 28.5 * ConvertRatio
    },
    childPortrait: {
        width: 57 * ConvertRatio,
        height: 57 * ConvertRatio,
        borderRadius: 28.5 * ConvertRatio,
        borderWidth: 3.5 * ConvertRatio,
        borderColor: Colors.darkSkyBlue,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    childText: {
        fontSize: 7.5 * ConvertRatio,
        fontFamily: "Muller",
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center"
    },

    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});
