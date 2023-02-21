import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Weather from './components/Weather';

const API_KEY = "01bd3c5047d97a5d22c0cc1d71c2c057";
const API = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

export default function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  async function fetchWeatherData(cityName) {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      // setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeatherData('Mumbai');
    console.log(weatherData);
  }, [])

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={'gray'} size={36} />
      </View>
    )
  } else if (weatherData == null) {
    return (
      <View style={styles.container}>
      </View>
    )

  }

  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
