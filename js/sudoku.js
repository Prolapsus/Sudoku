
const plateauEl = document.querySelector("#plateau"); //solution plateau

let hasWon = false;

const sudoku = [
    [1, 0, 6, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 8, 2, 0, 0],
    [9, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 7, 0, 8, 0, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 9, 1],
    [0, 0, 0, 2, 0, 0, 0, 0, 0],
    [5, 0, 0, 0, 1, 0, 0, 6, 0],
    [0, 4, 0, 0, 0, 0, 8, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function isRowOk(value, rowNumber, sudoku) {
    for (let i = 0 ; i < 9 ; i++) {
        if (sudoku[rowNumber][i] == value) {
            alert("Something's wrong in this row");
            return false;
            // value == "";
            // sudoku[rowNumber][i] == "";            
        }
    }
};

function isColumnOk(value, columnNumber, sudoku) {
    for (let i = 0 ; i< 9 ; i++) {
        if (sudoku[i][columnNumber] == value) {
            alert("Check this column, I bet there's a problem in it");
            return false;
            // value == "";
            // sudoku[i][columnNumber] == "";
        }
    }
};

function isSquareOk(value, rowNumber, columnNumber, sudoku) {
    for (let i = 0 ; i < 3 ; i++) {
        for (let j = 0 ; j < 3 ; j++) {
            if (sudoku[Math.floor(rowNumber/3)*3 + i][Math.floor(columnNumber/3)*3 + j] == value) {
                alert("This square is wrong dude");
                return false;
            }
        }
    }
};

function checkIfWon () {};

function checkValue(value, rowNumber, columnNumber, sudoku) {
    if (isRowOk(value, rowNumber, sudoku) == false ||
        isColumnOk(value, columnNumber, sudoku) == false ||
        isSquareOk(value, rowNumber, columnNumber, sudoku) == false) {
        return false;
    } else {
        return true;
    }
};


sudoku.forEach((row, rowNumber) => {
    // console.log(row);
    // console.log(rowNumber);
    row.forEach((column, columnNumber) => {
        // console.log(valeur);
        // console.log(index);
        if (column === 0) {
            const newEl = document.createElement("input");
            newEl.classList.add("box");
            newEl.type = "number";
            newEl.min = "1";
            newEl.max = "9";
            plateauEl.append(newEl);
            newEl.addEventListener("keyup", function(event) {
                console.log(event);
                if(newEl.value < 1 || newEl.value > 9) {
                    newEl.value = "";
                    column = "";
                    alert("Spoiler alert! try a number between 1 and 9");
                };
                if(event.key === "Enter") {
                    console.log(newEl.value);
                    if (checkValue(newEl.value, rowNumber, columnNumber, sudoku) == true) {
                        sudoku[rowNumber][columnNumber] = parseInt(newEl.value);
                    };
                    console.log(sudoku);
                };
            });
        } else {
            const newEl = document.createElement("div");
            newEl.classList.add("box");
            newEl.classList.add("readonly");
            newEl.innerText = column;
            plateauEl.append(newEl);         
        };
    });
});
