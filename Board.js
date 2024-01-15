import { StyleSheet, View } from 'react-native';

import Row from './Row';

export default function Board({ board, dispatch, isGameOver }) {
  return (
    <View style={styles.container}>
      {board.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          rowIndex={rowIndex}
          cellValues={row}
          dispatch={dispatch}
          isGameOver={isGameOver}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#27AE60',
    gap: 8,
    borderRadius: 8,
  },
});
