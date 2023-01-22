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
    }

}