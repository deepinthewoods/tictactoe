
const squareStyle = {
    border : "1px solid black",
    minWidth : "1rem",
    display: "inline-block",
    padding: "2px",
    margin: "2px"
}

const Squares = (props) => {
    
    let sp = '\u00A0';
    let lines = props.board.map((line, y) => {
        let row = line.map((square, x) => {
            return <span style={squareStyle} onClick = {(event) => props.squareClicked(x, y)}>{square.length === 0? sp:square}</span>
        })
        return <div>{row}</div>
    })
    let buttons = []
    for (let i = 0; i < props.historyCount+1; i++){
        buttons.push(<span><button onClick={() => props.historyClicked(i)}>{i}</button></span>)
    }
    
    let playerString = <p>PLAYER {props.winner} HAS WON! </p>
    if (props.winner === "") playerString = <p>Player {props.currentPlayer}, click a square to play</p> 
    let grid = <div>
        {playerString}
        <div id="playGrid">{lines} </div>
        <div id="history">{buttons}</div>
        <button onClick = {props.resetClicked}>Resets</button>
        </div>
    return grid
    
}

export default Squares;