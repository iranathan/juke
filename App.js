import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Music } from "./sections/MusicSection";
import { Control } from './sections/ControlSection';

export default function App() {
  return (
    <View style={styles.container}>
      <Music/>
      <Control/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
