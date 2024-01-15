import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
      return initialState();
    }
    case 'new-game-status': {
      return gameStatusInitialState();
    }
    case 'spawn-mole': {
      const boardCopy = copy2DArray(state.board);
      boardCopy[action.rowIndex][action.colIndex] = 'Mole';
      return {
        ...state,
        board: boardCopy,
        molesSpawned: state.molesSpawned + 1,
      };
    }
    case 'despawn-mole': {
      const rowIndex = action.rowIndex;
      const colIndex = action.colIndex;
      if (state.board[rowIndex][colIndex] != null) {
        const boardCopy = copy2DArray(state.board);
        boardCopy[rowIndex][colIndex] = null;
        return { ...state, board: boardCopy };
      }
      return state;
    }
    case 'decrease-timer': {
      return {
        ...state,
        timer: state.timer - 1,
        isGameOver: state.timer - 1 <= 0,
      };
    }
  }
  return state;
}

function initialState() {
  return {
    board: make2DArray(3, 3, null),
    molesWhacked: 0,
    molesSpawned: 0,
  };
}

function gameStatusInitialState() {
  return {
    isGameOver: false,
    timer: 60,
  };
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, null, initialState);
  const [gameStatusState, gameStatusDispatch] = useReducer(
    reducer,
    null,
    gameStatusInitialState,
  );
  useEffect(() => {
    const timerIntervalId = setInterval(() => {
      if (gameStatusState.isGameOver) {
        clearInterval(timerIntervalId);
        return;
      }
      gameStatusDispatch({ type: 'decrease-timer' });
    }, 1000);

    const moleIntervalId = setInterval(() => {
      if (gameStatusState.isGameOver) {
        clearInterval(moleIntervalId);
        return;
      }

      const randomRow = randomInt(0, 2);
      const randomCol = randomInt(0, 2);
      dispatch({
        type: 'spawn-mole',
        rowIndex: randomRow,
        colIndex: randomCol,
      });
      const despawnTimoutId = setTimeout(() => {
        if (gameStatusState.isGameOver) {
          clearTimeout(despawnTimoutId);
          return;
        }
        dispatch({
          type: 'despawn-mole',
          rowIndex: randomRow,
          colIndex: randomCol,
        });
      }, randomInt(500, 3000));
    }, randomInt(500, 1500));
    return () => {
      clearInterval(timerIntervalId);
      clearInterval(moleIntervalId);
    };
  }, [gameStatusState]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Whack A Mole!</Text>
      <Text style={styles.timer}>Timer: {gameStatusState.timer}</Text>
      <Board
        board={state.board}
        dispatch={dispatch}
        isGameOver={gameStatusState.isGameOver}
      />

      {gameStatusState.isGameOver && (
        <>
          <Text style={styles.info}>
            Moles Whacked: {state.molesWhacked}
            {'\n'}
            Moles Appeared: {state.molesSpawned}
            {'\n'}Accuracy Rate:{' '}
            {((state.molesWhacked / state.molesSpawned) * 100).toFixed(2)} %
          </Text>
          <TouchableOpacity
            onPress={() => {
              dispatch({ type: 'new-game' });
              gameStatusDispatch({ type: 'new-game-status' });
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>New Game!</Text>
          </TouchableOpacity>
        </>
      )}
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
  timer: {
    fontSize: 20,
  },
  info: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 110,
    fontSize: 20,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    padding: 10,
    backgroundColor: '#27AE60',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});
