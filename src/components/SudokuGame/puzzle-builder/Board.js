import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from './Grid';

const Board = (props) => {
  const classes = useStyles();

  console.log('BOARD PROPS: ', props);
  console.log('AKAKFILES: ', props);

  const handleSquareValueChange = (i, j, newValue) => {
    props.onSquareValueChange(i, j, newValue);
  };

  const boardState = props.boardState;

  const generateBoard = () => {
    const board = [];

    for (let i = 0; i < boardState.length; i++) {
      let currRow = [];
      for (let j = 0; j < boardState[i].length; j++) {
        const conflicts = props.conflicts;
        const conflict = conflicts.has(i + '' + j) ? true : false;
        let currSquare = (
          <Grid
            theme={props.theme}
            key={'' + i + j}
            value={boardState[i][j].cellValue}
            editable={boardState[i][j].editable}
            conflict={conflict}
            rowIndex={i}
            colIndex={j}
            onValueChange={handleSquareValueChange}
          />
        );
        currRow.push(currSquare);
      }
      board.push(
        <div className={classes.boardRow} key={i}>
          {currRow}
        </div>
      );
    }

    return board;
  };

  const board = generateBoard();

  return <div className={classes.board}>{board}</div>;
};

const useStyles = makeStyles(() => ({
  board: {
    display: 'felx',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  boardRow: {
    display: 'flex',
    width: '450px',
    height: '55px',
  },
}));

export default Board;
