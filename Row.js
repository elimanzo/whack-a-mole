import { StyleSheet, View } from 'react-native';

import Cell from './Cell';

export default function Row({ cellValues, rowIndex, dispatch, isGameOver }) {
  return (
    <View style={styles.container}>
      {cellValues.map((cellValue, colIndex) => (
        <Cell
          key={colIndex}
          rowIndex={rowIndex}
          colIndex={colIndex}
          cellValue={cellValue}
          dispatch={dispatch}
          isGameOver={isGameOver}
        />
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
