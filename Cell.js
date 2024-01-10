import { StyleSheet, View, Text } from 'react-native';

export default function Cell({ cellValue }) {
  return (
    <View style={styles.container}>
      <Text>{cellValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    aspectRatio: 1,
    bordeRadius: 8,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
