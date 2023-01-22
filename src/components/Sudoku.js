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
        this.fillDiagonal();
        this.fillRemaining(0,this.SRN);
    }

    getSolution(){
        return this.mat;
    }

    fillDiagonal(){
        for(let i = 0; i < this.N; i += this.SRN){
            this.fillBox(i,i);
        }
    }

    unUsedInBox(rowStart,colStart,num){
        for(let i = 0; i < this.SRN; i++){
            for(let j = 0; j < this.SRN; j++){
                if (this.mat[rowStart+i][colStart+j] == num){
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

    fillRemaining(ii,jj){
        let i = ii;
        let j = jj;
        if(i == this.N - 1 && j == this.N){
            return true;
        }
        if(j == this.N){
            i += 1;
            j = 0;
        }

        if(this.mat[i][j] != 0){
            return this.fillRemaining(i,j+1);
        }

        for(let num = 1; num < this.N+1; num++){
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

    swapZeros(){
        for(let i = 0; i < this.N; i++){
            for(let j = 0; j < this.N; j++){
                if(this.mat[i][j] == 0){
                    this.mat[i][j] = "";
                }
            }
        }
    }

    removeKDigits(){
        let count = this.K;
        while(count != 0){
            let i = parseInt(Math.floor((Math.random() * 9) ));
            let j = parseInt(Math.floor((Math.random() * 9) ));
            if(this.mat[i][j] != 0){
                count--;
                this.mat[i][j] = 0;
            }
        }
        this.swapZeros();
        return this.mat;
    }

}



const SudokuCell = ({ind,row,shader,column,boardfuncs}) => {

    let board = boardfuncs.board;
    let activeBlock = boardfuncs.activeBlock;
    let setActiveBlock = boardfuncs.setActiveBlock;

    const [value,setValue] = useState(board[index]);
    const index = ind;
    const id = "r" + row.toString() + "c" + column.toString();

    let cn = "SudokuCell" + shader;

    return (
        <div 
            id={id} 
            className={cn} 
            onClick={() => {
                setActiveBlock([index,id]);
            }}>{value}</div>
    )

};

const SudokuRow = ({row,isCorner,boardfuncs}) => {
    const rowNumber = row;

    let placeholder = [0,0,0,0,0,0,0,0,0];
    return (
        <div className="SudokuRow">
            {
                placeholder.map((ph,j) => {
                    let ccn = "";
                    if(isCorner){
                        if(j < 3 || j > 5){
                            ccn = " shadedcell";
                        }
                    }else{
                        if(j > 2 && j < 6){
                            ccn=" shadedcell";
                        }
                    }
                    return (
                        <SudokuCell
                            key={j}
                            ind={row*9 + j}
                            row={rowNumber}
                            shader={ccn}
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
                    let isCorner = true;
                    if(i > 2 && i < 6){
                        isCorner = false;
                    }
                    return (
                        <SudokuRow
                            key={i}
                            row={i}
                            isCorner={isCorner}
                            boardfuncs={boardfuncs}
                        />
                    )
                })
            }
        </div>
    )

};

//easy=45 medium=49 hard=58
const SudokuMenu = ({makeBoard}) => {

    return (
        <div className="SudokuMenu">
            <h1>Sudoku</h1>
            <div className="SMBs">
                <button onClick={()=>{makeBoard(45);}}>EASY</button>
                <button onClick={()=>{makeBoard(49);}}>MEDIUM</button>
                <button onClick={()=>{makeBoard(58);}}>HARD</button>
            </div>
        </div>
    );


};

const Sudoku = () => {

    const [boardStatus, setBoardStatus] = useState(false);
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
    const [solutionValues, setSolutionValues] = useState([
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

    

    useEffect(() => {
        console.log(activeBlock);

    },[activeBlock]);

    const makeSudokuBoard = (difficulty) => {
        let sg = new SudokuGenerator(difficulty);
        setSolutionValues(sg.getSolution().flat());
        setTimeout(()=>{
            setBoardValues(sg.removeKDigits().flat());
            setBoardStatus(true);
        },100);
    };

    let checkSolution = (ind,val) => {

    };

    let boardfuncs = {
        status : boardStatus,
        setstatus : setBoardStatus,
        board : boardValues,
        activeBlock : activeBlock,
        setActiveBlock : setActiveBlock
    };

    return (boardStatus ? 
        <SudokuBoard boardfuncs={boardfuncs}/> : 
        <SudokuMenu makeBoard={makeSudokuBoard}/>
    )

};

export default Sudoku;