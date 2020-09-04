import React, {useEffect, useState} from 'react';
import Draw from '../Draw'
import './App.css';

function App() {
  const boardLength = 4;
  const [ number,setNumber] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
  const [board, setBoard] = useState(Array.from({length: boardLength},()=> Array.from({length: boardLength}, () => 0)));
  const [win,setWin] = useState(false);

  useEffect(() => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        random();
      }
    }
  },[]);

  useEffect(() => {
    setWin(check());
  },[board])
  const check = () =>{
    let winresult = [
      [1,2,3,4],
      [5,6,7,8],
      [9,10,11,12],
      [13,14,15,0]
    ]
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if(board[i][j] !== winresult[i][j]){
          return false;
        }
      }
    }
    return true;
  }
  const muve = ({target}) => {
    if(!win) {
      const copy = [...board];
      const [index_i, index_j] = target.id.split("");
      const newArr = getVertical();
      if (board[index_i].includes(0)) {
        copy[index_i] = horizontal(+index_i, +index_j, copy[index_i], target.innerText);
        setBoard(copy);
      }
      if (newArr[index_j].includes(0)) {
        newArr[index_j] = horizontal(index_j, +index_i, newArr[index_j], target.innerText);
        const arrV = getHorizontal(newArr);
        setBoard(arrV);
      }
    }
  }
  const horizontal = (i,j,array,value) => {
    const fzp = array.indexOf(0);
    if (j+1 === fzp && j <= 2) {
      const temp = array[j];
      array[j] = 0;
      array[j+1] = temp;
    }else if (j-1 === fzp && j >= 1) {
      const temp = array[j];
      array[j] = 0;
      array[j-1] = temp;
    }
    return array;
  }
  const getHorizontal = (arrV) => {
    const newArr = [];
    for (let i = 0; i < arrV.length; i++) {
      newArr[i] = [];
      for (let j = 0; j < arrV[i].length; j++) {
        newArr[i][j] = arrV[j][i];
      }
    };
    return newArr;
  }
  const getVertical = () => {
    const arrV =  []
    for (let i = 0; i < board.length; i++) {
      arrV[i] = []
      for (let j = 0; j < board[i].length; j++) {
        arrV[i][j] = board[j][i];
      }
    }
    return arrV
  }
  const random = () => {
    let copy = [...board];
    const index_i = Math.floor(Math.random() * number.length);
    const num = number[index_i];
    const res = number.splice(index_i, 1);
    setNumber(res);
    for (var i = 0; i < copy.length; i++) {
      if(copy[i].includes(0)){
        let index  = copy[i].indexOf(0);

        copy[i][index] = num !== undefined ? num : 0;
        break;
      }
    }
    setBoard(copy);
  }
    return (
      <div className="App">
        { board !== null ? <Draw data={board} muve={muve} endgame={win}/> : null }
      </div>
    );
}

export default App;
