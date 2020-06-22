const gameLoop = () => {
    const curArr = gameState.cellLife
    const size = gameState.gridSize

    
    const newArr = curArr.map((cell, index) => {
        //get the number of live cells, or "neighbors"
        let neighbors = 0
        //top row!
        if (index >= size) {
            if (index % size != 0) {
                if (curArr[index - size - 1]) {
                    neighbors += 1
                }
            }
            if (curArr[index - size]) {
                neighbors += 1
            }
            if (index % size != size - 1) {
                if (curArr[index - size + 1]) {
                    neighbors += 1
                }
            }
        }
        //middle
        if (index % size != 0) {
            if (curArr[index - 1]) {
                neighbors += 1
            }
        }
        if (index % size != size - 1) {
            if (curArr[index + 1]) {
                neighbors += 1
            }
        }

        //bottom
        if (index < size * (size - 1)) {
            if (index % size != 0) {
                if (curArr[index + size - 1]){
                    neighbors += 1
                }
            }
            if(curArr[index + size]) {
                neighbors += 1
            }
            if (index % size != size - 1) {
                if (curArr[index + size + 1]) {
                    neighbors += 1
                }
            }
        }
        
        if (neighbors > 3) {
            return false;
        } else if (curArr[index] == false) {
            if (neighbors == 3) {
                return true;
            } else {
                return false;
            }
        } else if (neighbors > 1) {
            return true;
        } else {
            return false;
        }

        return neighbors
    })
    
    setGameState({
        ...gameState,
        'cellLife': newArr
    })

}

export default gameLoop;