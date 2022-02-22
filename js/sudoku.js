
const plateauEl = document.querySelector("#plateau");

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

// je laisse la constante sudoku pour vérifier la victoire. Il manque un 5 en avant dernière position et un à la fin

// const sudoku = [
//     [1, 8, 6, 9, 3, 2, 5, 4, 7],
//     [7, 5, 4, 1, 6, 8, 2, 3, 9],
//     [9, 3, 2, 7, 4, 5, 1, 8, 6],
//     [3, 7, 1, 8, 9, 4, 6, 2, 5],
//     [8, 2, 5, 3, 7, 6, 4, 9, 1],
//     [4, 6, 9, 2, 5, 1, 3, 7, 8],
//     [5, 9, 8, 4, 1, 3, 7, 6, 2],
//     [6, 4, 7, 5, 2, 9, 8, 1, 3],
//     [2, 1, 3, 6, 8, 7, 9, 0, 0],
// ]

// je vérifie chaque item de chaque "ligne" en le comparant à ma valeur de ref
function isRowOk(value, rowNumber, sudoku) {
    for (let i = 0 ; i < 9 ; i++) {
        if (sudoku[rowNumber][i] == value) {
            alert("Something's wrong in this row");
            return false;        
        }
    }
};

// je vérifie chaque item de chaque "colonne" en le comparant à ma valeur de ref
function isColumnOk(value, columnNumber, sudoku) {
    for (let i = 0 ; i< 9 ; i++) {
        if (sudoku[i][columnNumber] == value) {
            alert("Check this column, I bet there's a problem in it");
            return false;
        }
    }
};

// je vérifie chaque item de chaque "carré de 3 sur 3" en le comparant à ma valeur de ref
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

// je vérifie si c'est gagné en cherchant s'il reste un 0 dans ma grille (on est plutôt fier de ce include sur le reduce de concat)
function checkIfWon (sudoku) {
    if (sudoku.reduce((item1,item2) => {return item1.concat(item2)}).includes(0)) {
    console.log("keep up the good work");
    } else {
        alert("You Win, perfect");
    }
};

// fonction qui rassemble toutes les verifs de valeur
function checkValue(value, rowNumber, columnNumber, sudoku) {
    if (isRowOk(value, rowNumber, sudoku) == false ||
        isColumnOk(value, columnNumber, sudoku) == false ||
        isSquareOk(value, rowNumber, columnNumber, sudoku) == false) {
        return false;  // si au moins une vérif est fausse, la fonction return false
    } else {
        return true; // sinon elle return true
    }
};

// creation et remplissage et verif de la grille
sudoku.forEach((row, rowNumber) => {
    row.forEach((column, columnNumber) => {
        // si la valeur lue dans ma constante sudoku est égale à 0 (signifiant que c'est une case à remplir par l'utilisateur)
        if (column === 0) {
            const newEl = document.createElement("input"); // je crée une nouvelle case de type input
            newEl.classList.add("box"); // je l'habille avec les propriétés CSS de la classe box
            newEl.type = "number";
            newEl.min = "1";        // je filtre les valeurs possibles de l'input (à la souris et avec les fleches du clavier up et down)
            newEl.max = "9";
            plateauEl.append(newEl); // enfin j'ajoute dans mon element plateau la case nouvellement créee dans ma grille en float left pour qu'elles se "collent correctement" entre elles
            // j'écoute et je vérifie les valeurs entrées par l'utilisateur
            newEl.addEventListener("keyup", function(event) {
                console.log(event);
                if(newEl.value < 1 || newEl.value > 9) { // si une valeur non comprise entre 1 et 9 inclus, 
                    newEl.value = "";                    // elle est effacée du plateau
                    column = 0;                          // la valeur dans ma constante est réinitialisée à 0
                    alert("Spoiler alert! try a number between 1 and 9");  // un message d'alerte est affiché à l'écran
                };
                if(event.key === "Enter") {  // si la touche "enter" est enfoncée, la triple vérification (ligne, colonne, carré) se déclenche
                    console.log(newEl.value);
                    if (checkValue(newEl.value, rowNumber, columnNumber, sudoku) == true) { // dans le cas où la valeur match tous les citères
                        sudoku[rowNumber][columnNumber] = parseInt(newEl.value);            // la valeur insérée par l'utilisateur dans le plateau est enregistrée dans la constante sudoku
                    } else {   // si la valeur ne rempli pas tous les critères de la vérification, un message d'alerte indique le type d'erreur
                        newEl.value = "";   // la valeur est effacée du plateau
                        sudoku[rowNumber][columnNumber] = 0;   // et la valeur dans la constante est réinitialisée à 0
                    };
                    console.log(sudoku);
                    console.log(checkIfWon(sudoku));
                };
            });
        // si la valeur lue dans ma constante sudoku est differente de 0 (signifiant que c'est une case fixe de la grille)
        } else {
            const newEl = document.createElement("div"); // je crée cette fois une case de type div, et non pas input
            newEl.classList.add("box");   // même procedé d'habillage que précedemment
            newEl.classList.add("readonly");  // j'ajoute la classe readonly pour rendre ma div intouchable
            newEl.innerText = column; // j'ajoute dans ma div la valeur lue dans ma constante sudoku
            plateauEl.append(newEl);    // j'ajoute la div dans mon element plateau
        };
    });
});

