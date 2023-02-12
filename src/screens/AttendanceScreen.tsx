import * as React from 'react';
import {Surface, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {CommonStyles} from '../styles/CommonStyles';
import CScanner from '../components/widgets/CScanner';

const AttendanceScreen = () => {
  return (
    <View style={CommonStyles.mainContainer}>
      <Surface style={styles.surface} elevation={4}>
        <Text> {new Date().toDateString()}</Text>
      </Surface>
      <View style={{flex: 1}}>
        <CScanner />
      </View>

      <Surface
        style={[CommonStyles.bottom, styles.surface, {backgroundColor: 'blue'}]}
        elevation={4}>
        <Text style={{color: 'white'}}>{new Date().toDateString()}</Text>
      </Surface>
      <Surface
        style={[
          CommonStyles.bottom,
          styles.surface,
          {backgroundColor: 'rgb(142,220,250)'},
        ]}
        elevation={4}>
        <Text style={{color: 'black'}}>{'Some warning text'}</Text>
      </Surface>
    </View>
  );
};
const styles = StyleSheet.create({
  surface: {
    padding: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurViewButton: {
    padding: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
});

export default AttendanceScreen;
