import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react';
import Searchar from './SearchBar'
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index';


export default function Weather() {

    const [backgroundImage, setBackgroundImage] = useState(null);

    const { weather,
        name,
        main: { temp, humidity },
        wind: { speed }
    } = weatherData;
    const [{ main }] = weather;

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main));
    }, [weatherData])

    function getBackgroundImg(weather) {
        if (weather === 'Snow') return snow
        if (weather === 'Clear') return sunny
        if (weather === 'Rain') return rainy
        if (weather === 'Haze') return haze
        return haze;
    }

    let textColor = backgroundImage !== sunny ? 'white' : 'black'

    return (
        <View style={styles.container}>
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'
            >
                <Searchar />
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 46 }}>{name}</Text>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold' }}>{main}</Text>
                    <Text style={{ ...styles.headerText, color: textColor, }}>{temp} °C</Text>                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    headerText: {
        fontSize: 36,
        marginTop: 10,
    },

});
