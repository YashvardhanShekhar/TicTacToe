import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import Icons from './components/icons';

type index = PropsWithChildren<{
  i: number;
  j: number;
}>;

const App = () => {

  let [turn, setTurn] = useState<boolean>(false);
  let [winner, setWinner] = useState('');
  let [arr, setArr] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  // let []

  const check = () => {

    if (!arr.flat().includes(0)) {
      setWinner('Draw');
    }
    
    if (arr[0][0] == 1 && arr[1][1] == 1 && arr[2][2] == 1) {
      console.log("----------------")
      setWinner('circle');
    }
    if (arr[0][2] == 1 && arr[1][1] == 1 && arr[2][0] == 1) {
      setWinner('circle');
    }
    if (arr[0][0] == -1 && arr[1][1] == -1 && arr[2][2] == -1) {
      setWinner('cross');
    }
    if (arr[0][2] == -1 && arr[1][1] == -1 && arr[2][0] == -1) {
      setWinner('cross');
    }
    for (let k = 0; k < 3; k++) {
      console.log("k"+k)
      if (arr[0][k] == 1 && arr[1][k] == 1 && arr[2][k] == 1) {
        setWinner('circle');
      }
      if (arr[0][k] == -1 && arr[1][k] == -1 && arr[2][k] == -1) {
        setWinner('cross');
      }
      if (arr[k][0] == 1 && arr[k][1] == 1 && arr[k][2] == 1) {
        setWinner('circle');
      }
      if (arr[k][0] == -1 && arr[k][1] == -1 && arr[k][2] == -1) {
        setWinner('cross');
      }
    }
  };

  const insertCircle = ({i, j}: index) => {
    if (arr[i][j] == 0) {
      let temp = [...arr];
      temp[i][j] = 1;
      setArr(temp);
      check();
      setTurn(!turn)
    } else {
      Snackbar.show({
        text: 'Cross has already selected the spot',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Dismiss',
          textColor: 'green',
          onPress: () => {
            /* Do something. */
          },
        },
      });
    }
  };
  const insertCross = ({i, j}: index) => {
    console.log(i+" "+j+" "+arr[i][j])

    if (arr[i][j] == 0) {
      let temp = [...arr];
      temp[i][j] = -1;
      setArr(temp);
      check();
      setTurn(!turn)
    } else {
      Snackbar.show({
        text: 'Circle has already selected the spot',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Dismiss',
          textColor: 'green',
          onPress: () => {
            /* Do something. */
          },
        },
      });
    }
  };

  const insert = ({i,j}:index)=>{
    if(turn){
      insertCircle({i,j})
    }else{
      insertCross({i,j})
    }
  }

  const warn = ()=>{
    Snackbar.show({
      text: 'Match has Ended',
      duration: Snackbar.LENGTH_SHORT,
      action: {
        text: 'Reset Game',
        textColor: 'green',
        onPress: () => {
          reloadGame()
        },
      },
    });
  }

  const reloadGame = () =>{
    setArr([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setWinner('')
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.head}>🎮 Tic Tac Toe</Text>

      {winner ? (
        <View style={styles.winnerBanner}>
          <Text style={styles.winnerText}>
            {winner === 'Draw'
              ? '🤝 The match is a draw!'
              : `🎉 ${winner} has won the match!`}
          </Text>
        </View>
      ) : (
        <Text style={styles.heading}>
          {turn ? "Circle's Turn" : "Cross's Turn"}
        </Text>
      )}

      <View style={styles.container}>
        {arr.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item, colIndex) => (
              <TouchableOpacity
                // disabled={winner.length > 0}
                key={colIndex}
                style={styles.cell}
                onPress={
                  winner.length > 0
                    ? () => warn()
                    : () => insert({i: rowIndex, j: colIndex})
                }>
                {item == 0 && <Icons name={'pencil'} />}
                {item == 1 && <Icons name={'circle'} />}
                {item == -1 && <Icons name={'cross'} />}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={reloadGame} style={styles.resetBtn}>
        <Text style={styles.resetText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  head: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: 'white',
  },
  winnerBanner: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  winnerText: {
    color: '#155724',
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 80,
    height: 80,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  icon: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  resetBtn: {
    marginTop: 30,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#1e90ff',
    borderRadius: 10,
  },
  resetText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});