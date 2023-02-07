import * as React from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
