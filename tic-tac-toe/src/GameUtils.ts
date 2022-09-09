export const checkDraw = (gameboard: string[][]) => {
    for (let i = 0; i < gameboard.length; i++) {
      for (let j = 0; j < gameboard.length; j++) {
        if (gameboard[i][j] === "") {
          return false;
        }
      }
    }
    return true;
}

export const checkWin = (gameboard: string[][], player: string) => {
    // check diagonals
    if ((gameboard[0][0] === player && gameboard[1][1] === player && gameboard[2][2] === player)  ||
        (gameboard[0][2] === player && gameboard[1][1] === player && gameboard[2][0] === player)) {
          return true;
    }
      
    // check verticals
    for (let i = 0; i < gameboard.length; i++) {
        if (gameboard[0][i] === player && gameboard[1][i] === player && gameboard[2][i] === player) {
          return true;
        }
    }

    // check horizontals
    for (let i = 0; i < gameboard.length; i++) {
      if (gameboard[i][0] === player && gameboard[i][1] === player && gameboard[i][2] === player) {
        return true;
      }
    }
    return false;
  }

export const deepCopy = (state: Object) => JSON.parse(JSON.stringify(state));

export const updatePlayer = (player: string) => {
    if (player === 'X') {
      return 'O';
    }
    return 'X';
}



 