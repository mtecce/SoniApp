import numpy as np
import random

class Sudoku:

    def __init__(self, missing_digits):
        self.N = 9
        self.SRN = 3
        self.K = missing_digits
        self.mat = np.zeros((self.N,self.N))
        self.fillValues()
        
    def fillValues(self):
        self.fillDiagonal()
        self.fillRemaining(0,self.SRN)
        print(self.mat)
        self.removeKDigits()
        print(self.mat)
        
    def fillDiagonal(self):
        i = 0
        while i < self.N:
            self.fillBox(i,i)
            i += self.SRN
    
    def unUsedInBox(self, rowStart, colStart, num):
        for i in range(self.SRN - 1):
            for j in range(self.SRN - 1):
                if self.mat[rowStart+i][colStart+j] == num:
                    return False
        return True
    
    def fillBox(self,row,col):
        num = None
        for i in range(self.SRN - 1):
            for j in range(self.SRN - 1):
                while True:
                    num = random.randint(1,9)
                    if self.unUsedInBox(row, col, num):
                        break
                self.mat[row+i][col+j] = num    
    
    def CheckIfSafe(self,i,j,num):
        a = self.unUsedInRow(i,num)
        b = self.unUsedInCol(j,num)
        c = self.unUsedInBox(i-(i%self.SRN), j-(j%self.SRN), num)
        return a and b and c 
                
    def unUsedInRow(self, i, num):
        for j in range(self.N - 1):
            if self.mat[i][j] == num:
                return False
        return True
    
    def unUsedInCol(self,j,num):
        for i in range(self.N - 1):
            if self.mat[i][j] == num:
                return False
        return True
    
    def fillRemaining(self,i,j):
        if (j >= self.N) and (i < self.N-1):
            i += 1
            j = 0
        if (i >= self.N) and (j >= self.N):
            return True
        if i < self.SRN:
            if j < self.SRN:
                j = self.SRN
        elif i < self.N - self.SRN:
            if j == int((i/self.SRN)*self.SRN):
                j += self.SRN
        else:
            if j == (self.N - self.SRN):
                i += 1
                j = 0
                if i >= self.N:
                    return True
        for num in range(1,self.N-1):
            if self.CheckIfSafe(i,j,num):
                self.mat[i][j] = num
                if self.fillRemaining(i,j+1):
                    return True
                self.mat[i][j] = 0
        return False

    def removeKDigits(self):
        count = self.K
        while count != 0:
            cellId = random.randint(1,self.N * self.N) - 1
            i = int(cellId/self.N)
            j = cellId%9
            if j != 0:
                j -= 1
            if self.mat[i][j] != 0:
                count -= 1
                self.mat[i][j] = 0
            
Sudoku(50)
