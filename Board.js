import { StyleSheet, View } from 'react-native';

import Row from './Row';

export default function Board({ board, dispatch }) {
  return (
    <View style={styles.container}>
      {board.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          rowIndex={rowIndex}
          cellValues={row}
          dispatch={dispatch}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    gap: 8,
    borderRadius: 8,
  },
});
