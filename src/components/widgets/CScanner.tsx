import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import {Button, Title} from 'react-native-paper';
import {BlurView} from 'expo-blur';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Fonts} from '../../styles/CommonStyles';
import {showToast} from './Toaster';

function Hint({children}: {children: string}) {
  return (
    <BlurView style={styles.hint} intensity={50} tint="dark">
      <Text style={styles.headerText}>{children}</Text>
    </BlurView>
  );
}
const CScanner = () => {
  const {bottom} = useSafeAreaInsets();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function toggleCameraType() {
    console.log('testing 1');
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  useEffect(() => {
    (async () => {
      if (!permission || !permission.granted) {
        const response = await requestPermission();
        if (!response.granted) {
          showToast('Please provide Camera Permissions!');
        }
      }
    })();
  }, [permission, requestPermission]);

  if (!permission || !permission.granted) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Title>
          {
            'No Permissions for Camera. Please provide camera permissions from app\
            settings.'
          }
        </Title>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Camera type={CameraType.front} style={StyleSheet.absoluteFill} />
      <BlurView
        intensity={50}
        tint="dark"
        style={[styles.header, {bottom: bottom}, {padding: 12}]}>
        <Button
          textColor={'black'}
          buttonColor={'rgb(33,243,206)'}
          style={styles.punchButton}
          mode="contained"
          onPress={() => {}}>
          PUNCH IN/OUT
        </Button>
      </BlurView>
    </View>
  );
};

// exporting Scanner as Pure Component
export default memo(CScanner);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    fontFamily: Fonts.IBMPlexSans_600SemiBold,
  },
  punchButton: {
    color: 'black',
    borderRadius: 0,
    width: '100%',
    marginStart: 20,
    marginEnd: 20,
  },
});
