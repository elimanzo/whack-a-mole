import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useReducer } from 'react';

import make2DArray from './make2DArray';
import Board from './Board';
function reducer(state, action) {
  switch (action.type) {
  }
  return state;
}

function makeInitialState() {
  return { board: make2DArray(3, 3, 'Mole') };
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, null, makeInitialState);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Whack A Mole!</Text>
      <Board board={state.board} />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 25,
  },
});
