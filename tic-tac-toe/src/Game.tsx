import './Game.css';
import {useReducer} from 'react';
import {checkWin, checkDraw, updatePlayer, deepCopy} from './GameUtils'

function Game() {
  const BOARD_LENGTH = 3;
  const BOARD_WIDTH = 3;

  interface InitialState {
    player: string;
    gameboard: string[][];
    message: string;
    status: string;
  }

  const initState: InitialState = {player: 'X',
                        gameboard: Array.from(Array<string>(BOARD_LENGTH).fill(""), () => new Array<string>(BOARD_WIDTH).fill("")),
                        message: "",
                        status: "",
                       };
 
  const reducer = (state: Object, action: { type: String; payload: { rowIdx: number; colIdx: number; }; }) => {
    switch (action.type) {
      // players move
      case 'MOVE': {
        const {rowIdx, colIdx } = action.payload
        const newState = deepCopy(state);          // copy state for updates since state should be immutable
    
        // if move has already been made, or game has been won/drawn return current state
        if (newState.gameboard[rowIdx][colIdx] || newState.status !== "") {            
          return state
        }
        else {
          newState.gameboard[rowIdx][colIdx] = newState.player;
          // check if move was a winning move
          if (checkWin(newState.gameboard, newState.player)) {
            newState.message =`Player ${newState.player} wins! 🥳 `;  
            newState.status = "WIN";
          }
          // check if move resulted in a draw
          else if (checkDraw(newState.gameboard)) {
            newState.message = `It's a draw 🥲`;               
            newState.status = "DRAW";
          }
          // update which player has the next move
          newState.player = updatePlayer(newState.player); 
          return newState
        }
      }
      // reset game to initial state
      case 'RESET': {                
        return initState;
      }
      default: return state;
      }
    }
  
  const handleClick = (rowIdx: number, colIdx: number) => { dispatch({ type: 'MOVE', payload: { rowIdx, colIdx }})}
  const handleReset = () => { dispatch({
    type: 'RESET',
    payload: {
      rowIdx: 0,
      colIdx: 0
    }
  }) }
  
  const [state, dispatch] = useReducer(reducer, initState);
  const {player, gameboard, message} = state;

  return (
    <div className="wrapper">
      <div className='game-info'>
        <h1>Tic Tac Toe</h1>
        <h3>{message === "" ? `${player}'s turn`: `${message}`}</h3>
      </div>
      <div className="gameboard">
        {gameboard.map((row: string[], rowIdx: number) =>
          row.map((col, colIdx) => (
            <div className="gameboard-item" key={`${rowIdx}, ${colIdx}`} onClick={()=>{handleClick(rowIdx, colIdx)}}><p>{gameboard[rowIdx][colIdx]}</p></div>
          ))
        )}
      </div>
      <div className = "resetBtn">
        <button onClick={()=>handleReset()}>Reset</button>
      </div>
    </div>
    )
  }

export default Game;
