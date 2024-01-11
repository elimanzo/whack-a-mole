import { StyleSheet, View } from 'react-native';

import Cell from './Cell';

export default function Row({ cellValues, rowIndex }) {
  return (
    <View style={styles.container}>
      {cellValues.map((cellValue, cellIndex) => (
        <Cell key={cellIndex} cellValue={cellValue} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
});
