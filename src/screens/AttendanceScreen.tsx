import * as React from 'react';
import {Surface, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {CommonStyles} from '../styles/CommonStyles';

const AttendanceScreen = () => {
  return (
    <View style={CommonStyles.mainContainer}>
      <Surface style={styles.surface} elevation={4}>
        <Text> {new Date().toDateString()}</Text>
      </Surface>
      <View style={{flex: 1}} >
        </View>

      <Surface
        style={[CommonStyles.bottom, styles.surface, {backgroundColor: 'blue'}]}
        elevation={4}>
        <Text style={{color: 'white'}}>{new Date().toDateString()}</Text>
      </Surface>
    </View>
  );
};
const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: '8%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AttendanceScreen;
