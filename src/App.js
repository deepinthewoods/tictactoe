import React from 'react';
import './App.css';
import Squares from './Squares'

class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      currentPlayer : "X",
      board: 
      [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
      ],
      movesHistory: [],
      winner : "",
      currentMove: 0
    }
  }
  componentDidMount(){
    //get state from local storage
    //let st = localStorage.getItem("state")
    //localStorage.clear()
    this.setState({
     currentPlayer : localStorage.getItem("currentPlayer") || "X", 
     board : JSON.parse(localStorage.getItem("board")) || [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
      ],
     movesHistory : JSON.parse(localStorage.getItem("movesHistory")) || [],
     winner : localStorage.getItem("winner") || "",
     currentMove : localStorage.getItem("currentMove") || 0,
      
    });
  }

  componentDidUpdate(){
    localStorage.setItem("currentPlayer", this.state.currentPlayer)
    localStorage.setItem("board", JSON.stringify(this.state.board))
    localStorage.setItem("movesHistory", JSON.stringify(this.state.movesHistory))
    localStorage.setItem("winner", this.state.winner)
    localStorage.setItem("currentMove", this.state.currentMove)
    //console.log( localStorage.getItem("state"))
  }

  isWon(board, player){
    // for (let row of board){
    //   let won = true
    //   for (let block of row)
    //     if (block != player) won = false;
    //   if (won) return true;
    // }
    for (let x = 0; x < 3; x++){
      let wonX = true
      let wonY = true
      for (let y = 0; y < 3; y++){
        if (board[x][y] !== player) wonX = false
        if (board[y][x] !== player) wonY = false
      }
      if (wonX || wonY) return true
    }
    //diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true
    return false
  }

  squareClicked = (x, y) => {
    //check if  valid move
    if (this.state.board[y][x] !== ""){
      alert("not valid")
      return
    } 
    if (this.state.winner !== ""){
      alert("already won")
      return
    }
    let newBoard = [];
    for (let i = 0; i < this.state.board.length; i++)
      newBoard.push(this.state.board[i].slice())
      
    //copy board and add new move
    newBoard[y][x] = this.state.currentPlayer;
    //save history
    
    let newMovesHistory = this.state.movesHistory.slice(0, this.state.currentMove)

    newMovesHistory.push({x: x,y: y, player: this.state.currentPlayer})
    
    //check new board for win
    let newWinner = this.state.winner
    if (this.isWon(newBoard, this.state.currentPlayer)){
      newWinner = this.state.currentPlayer
    }
    
    let newCurrentPlayer = this.state.currentPlayer === "X"?"O":"X"
    let newCurrentMove = this.state.currentMove+1

    this.setState(
      {
        board: newBoard,
        currentPlayer: newCurrentPlayer,
        movesHistory: newMovesHistory,
        currentMove: newCurrentMove,
        winner: newWinner
    
    })
  }

  historyClicked = (i) => {
    //truncate history
    let newMovesHistory = this.state.movesHistory.slice(0, i)
    //rewrite board
    let newBoard = [
      ["","",""],
      ["","",""],
      ["","",""],
    ]
    let currentPlayer = "X"
    for (let move of newMovesHistory){
      newBoard[move.y][move.x] = move.player;
      currentPlayer = move.player
    }
    
    //check new board for win
    let newWinner = ""
    if (this.isWon(newBoard, currentPlayer)){
      newWinner = currentPlayer
    }

    let newCurrentPlayer = currentPlayer === "X"?"O":"X"
    
    this.setState(
      {
        board: newBoard,
        currentPlayer: newCurrentPlayer,
        //movesHistory: newMovesHistory,
        winner: newWinner,
        currentMove: i
    
    })

  }
  resetClicked = () => {
    this.historyClicked(0);
    this.setState({
      movesHistory : [],
      currentPlayer : "X"
    })
  }
  
  render(props) {
    return (
      <div className="App">
      <h1>Tic Tac Toe</h1>
      <h2></h2>
      
      <Squares board = {this.state.board} 
      squareClicked = {this.squareClicked} 
      historyClicked = {this.historyClicked} 
      resetClicked = {this.resetClicked}
      historyCount = {this.state.movesHistory.length - (this.state.winner ===""?0:0)} 
      winner = {this.state.winner}
      currentPlayer = {this.state.currentPlayer}
      />

    </div>
  );
    }
}

export default App;
