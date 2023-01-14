import axios from "axios";
import React, {useState,useEffect} from "react";

class SudokuGenerator{

    constructor(missingDigits){
        this.N = 9;
        this.SRN = 3;
        this.K = missingDigits;
        this.mat = [];
        for(let i = 0; i < this.N; i++){
            let temp = [];
            for(let j = 0; j < this.N; j++){
                temp.push(0);
            }
            this.mat.push(temp);
        }
        this.fillValues();
    }

    fillValues(){
        this.fillDiagonal();
        this.fillRemaining(0,this.SRN);
        console.log(this.mat);
        this.removeKDigits();
        console.log(this.mat);
    }

    fillDiagonal(){
        for(let i = 0; i < this.N; i += this.SRN){
            this.fillBox(i,i);
        }
    }

    unUsedInBox(rowStart,colStart,num){
        for(let i = 0; i < this.SRN; i++){
            for(let j = 0; j < this.SRN; j++){
                if (this.mat[rowStart+1][colStart+j] == num){
                    return false;
                }
            }
        }
        return true;
    }

    fillBox(row,col){
        let num = 0;
        for(let i = 0; i < this.SRN; i++){
            for(let j = 0; j < this.SRN; j++){
                do{
                    num = Math.floor((Math.random() * 9) + 1);
                }while(!this.unUsedInBox(row,col,num));
                this.mat[row+i][col+j] = num;
            }
        }
    }

    checkIfSafe(i,j,num){
        return (
            this.unUsedInRow(i,num) &&
            this.unUsedInCol(j,num) &&
            this.unUsedInBox(i-i%this.SRN, j-j%this.SRN, num)
        );
    }

    unUsedInRow(i,num){
        for(let j = 0; j < this.N; j++){
            if(this.mat[i][j] == num){
                return false;
            }
        }
        return true;
    }

    unUsedInCol(j,num){
        for(let i = 0; i < this.N; i++){
            if(this.mat[i][j] == num){
                return false;
            }
        }
        return true;
    }

    fillRemaining(i,j){
        if(j >= this.N && i < this.N - 1){
            i += 1;
            j = 0;
        }
        if(i >= this.N && j >= this.N){
            return true;
        }
        if(i < this.SRN){
            if(j < this.SRN){
                j = this.SRN;
            }
        }else if(i < this.N - this.SRN){
            if(j == parseInt((i/this.SRN)*this.SRN)){
                j += this.SRN;
            }
        }else{
            if(j == this.N - this.SRN){
                i += 1;
                j = 0;
                if (i >= this.N){
                    return true;
                }
            }
        }
        for(let num = 1; num <= this.N; num++){
            if(this.checkIfSafe(i,j,num)){
                this.mat[i][j] = num;
                if(this.fillRemaining(i,j+1)){
                    return true;
                }
                this.mat[i][j] = 0;
            }
        }
        return false;
    }

    removeKDigits(){
        let count = this.K;
        while(count != 0){
            let cellId = Math.floor((Math.random() * 9));
            let i = parseInt(cellId/this.N);
            let j = parseInt(cellId%9);
            if(j != 0){
                j -= 1;
            }
            if(this.mat[i][j] != 0){
                count--;
                this.mat[i][j] = 0;
            }
        }
    }

}

const SudokuMenu = () => {

};

const SudokuCell = ({ind,row,column,boardfuncs}) => {

    let board = boardfuncs.board;
    let setboard = boardfuncs.setboard;
    let setActiveBlock = boardfuncs.setActiveBlock;

    const [value,setValue] = useState(board[index]);
    const index = ind;
    const id = row.toString() + column.toString();

    return (
        <div id={id} className="SudokuCell" onClick={() => setActiveBlock([index,id])}>{board[index]}</div>
    )

};

const SudokuRow = ({row,boardfuncs}) => {
    const rowNumber = row;

    let placeholder = [0,0,0,0,0,0,0,0,0];

    return (
        <div className="SudokuRow">
            {
                placeholder.map((ph,j) => {
                    return (
                        <SudokuCell
                            ind={row*9 + j}
                            row={rowNumber}
                            column={j}
                            boardfuncs={boardfuncs}
                        />
                    )
                }) 
            }
        </div>
    )
};

const SudokuBoard = ({boardfuncs}) => {

    let placeholder = [0,0,0,0,0,0,0,0,0];

    return (
        <div className="SudokuBoard">
            {
                placeholder.map((ph,i) => {
                    return (
                        <SudokuRow
                            row={i}
                            boardfuncs={boardfuncs}
                        />
                    )
                })
            }
        </div>
    )

};

const Sudoku = () => {

    const [boardStatus, setBoardStatus] = useState(true);
    const [activeBlock, setActiveBlock] = useState([]);
    const [boardValues, setBoardValues] = useState([
        1,2,3,4,5,6,7,8,9,
        1,2,3,4,5,6,7,8,9,
        1,2,3,4,5,6,7,8,9,
        1,2,3,4,5,6,7,8,9,
        1,2,3,4,5,6,7,8,9,
        1,2,3,4,5,6,7,8,9,
        1,2,3,4,5,6,7,8,9,
        1,2,3,4,5,6,7,8,9,
        1,2,3,4,5,6,7,8,9
    ]);

    //let sg = new SudokuGenerator(30);
    
    let solution = [];

    let checkSolution = (ind,val) => {

    };

    let boardfiller = (responseString) => {

    };

    let getBoard = (difficulty) => {
        axios.get('/_sudoku',{
            params: {
                level : difficulty
            }
        }).then((resp) => {
            boardfiller(resp.data["board"]);
        }).catch((err) => {
            console.log(err);
        });
    };

    let boardfuncs = {
        board : boardValues,
        setboard : setBoardValues,
        setActiveBlock : setActiveBlock
    };

    return (boardStatus ? 
        <SudokuBoard boardfuncs={boardfuncs}/> : 
        <SudokuMenu setStatus={setBoardStatus}/>
    )

};

export default Sudoku;