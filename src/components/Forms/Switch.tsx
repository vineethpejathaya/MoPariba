import {Pressable, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

function Switch({isChecked, onToggle}: any) {
  return (
    <Pressable
      onPress={onToggle}
      style={[styles.track, isChecked && styles.trackActive]}>
      <View style={[styles.thumb, isChecked && styles.thumbActive]} />
    </Pressable>
  );
}

export default Switch;

const styles = StyleSheet.create({
  track: {
    width: 40, // Desired track width
    height: 20, // Desired track height
    borderRadius: 15,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    padding: 4,
  },
  trackActive: {
    backgroundColor: '#6CC51D',
  },
  thumb: {
    width: 16, // Thumb diameter
    height: 16,
    borderRadius: 11,
    backgroundColor: 'white',
    transform: [{translateX: 0}],
  },
  thumbActive: {
    transform: [{translateX: 16}], // Move the thumb to the right when active
  },
});
