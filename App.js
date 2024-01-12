import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useReducer, useEffect } from 'react';

import make2DArray from './make2DArray';
import Board from './Board';
import randomInt from './randomInt';
import copy2DArray from './copy2DArray';

function reducer(state, action) {
  switch (action.type) {
    case 'whack-mole': {
      const colIndex = action.colIndex;
      const rowIndex = action.rowIndex;
      const boardCopy = copy2DArray(state.board);
      if (state.board[rowIndex][colIndex] === 'Mole') {
        boardCopy[rowIndex][colIndex] = null;
        return {
          ...state,
          board: boardCopy,
          molesWhacked: state.molesWhacked + 1,
        };
      }
      return state;
    }
    case 'new-game': {
      return makeInitialState();
    }
    case 'move-moles': {
      const randomRow = randomInt(3);
      const randomCol = randomInt(3);
      const boardCopy = copy2DArray(state.board);
      boardCopy[randomRow][randomCol] = 'Mole';
      return { ...state, board: boardCopy };
    }
  }
  return state;
}

function makeInitialState() {
  return { board: make2DArray(3, 3, null), molesWhacked: 0 };
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, null, makeInitialState);
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: 'move-moles' });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Whack A Mole!</Text>
      <Board board={state.board} dispatch={dispatch} />
      <Text style={styles.title}>Moles Whacked: {state.molesWhacked}</Text>
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
