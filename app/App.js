import { StyleSheet, Text, View } from 'react-native';
import { Music } from "./sections/MusicSection";

export default function App() {
  return (
    <View style={styles.container}>
      <Music/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
