'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    AppRegistry, Image,
    StyleSheet,
    View,
    TouchableWithoutFeedback
} from "react-native";
import {NextButton} from '../NextButton';
import ProfileQuestion from "./ProfileQuestion";
import {Colors} from "../../config/colors";
import ImagePicker from "react-native-image-picker";

let ConvertRatio = 2.1;

export default class PhotoInput extends Component {
    static propTypes = {
        sex: PropTypes.string,
        childPhoto: PropTypes.object,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            sex: this.props.sex,
            name: this.props.name,
            childPhoto: this.props.childPhoto || false
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
                    childPhoto: source
                });

                if (this.props.onChange) {
                    this.props.onChange(source);
                }
            }
        });
    }

    render() {
        let hasNoProfilePicture = this.state.childPhoto === false;
        let questionText = hasNoProfilePicture
            ? "Хотите добавить фото?"
            : "Выглядит отлично!";

        return (
            <View style={styles.pageContainer}>
                <View style={styles.whiteBackground}>
                    <ProfileQuestion showIcon={true} sex={this.state.sex} question={questionText} />
                    {hasNoProfilePicture ? (
                        <TouchableWithoutFeedback onPress={this.takePicture.bind(this)}>
                            <View style={styles.photoInput}>
                                <Image source={require('../../../assets/newProfile/photoScreen/photoCamera3.png')} style={styles.cameraImage}/>
                            </View>
                        </TouchableWithoutFeedback>
                    ) : (
                        <Image source={this.state.childPhoto} style={styles.photoImage} onPress={this.takePicture.bind(this)}/>
                    )}
                </View>
                <View style={styles.nextButtonContainer}>
                    {hasNoProfilePicture ? (
                        <NextButton text="Пропустить" skip={true} to="/profile/height"/>
                    ) : (
                        <NextButton text="Далее" to="/profile/height"/>
                    )}
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
    photoInput: {
        width: 110 * ConvertRatio,
        height: 110 * ConvertRatio,
        marginTop: 26.5 * ConvertRatio,
        backgroundColor: "#ffffff",
        borderStyle: "dashed",
        borderWidth: 1 * ConvertRatio,
        borderColor: Colors.darkSkyBlue,
        borderRadius: 55 * ConvertRatio,
        alignItems: "center",
        justifyContent: "center"
    },
    cameraImage: {
        width: 48.5 * ConvertRatio,
        height: 39.5 * ConvertRatio
    },
    photoImage: {
        width: 110 * ConvertRatio,
        height: 110 * ConvertRatio,
        marginTop: 26.5 * ConvertRatio,
        backgroundColor: "#ffffff",
        borderWidth: 2 * ConvertRatio,
        borderColor: Colors.darkSkyBlue,
        borderRadius: 55 * ConvertRatio
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

AppRegistry.registerComponent('PhotoInput', () => PhotoInput);