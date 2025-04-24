const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let scoreX = 0; // Contador de victorias de X
let scoreO = 0; // Contador de victorias de O

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            alert(`${gameBoard[a]} gana!`);
            if (gameBoard[a] === 'X') {
                scoreX++; // Incrementa el contador de X
                document.getElementById('score-X').textContent = `X: ${scoreX}`;
            } else {
                scoreO++; // Incrementa el contador de O
                document.getElementById('score-O').textContent = `O: ${scoreO}`;
            }
            gameOver = true;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        alert('Empate!');
        gameOver = true;
    }
};

const handleClick = (e) => {
    const index = e.target.dataset.index;
    if (!gameBoard[index] && !gameOver) {
        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(currentPlayer);
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

// Función para reiniciar el juego
const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];  // Restablecer el estado del tablero
    gameOver = false;  // Restablecer la variable de fin de juego
    cells.forEach(cell => {
        cell.textContent = '';  // Limpiar el texto de las celdas
        cell.classList.remove('X', 'O');  // Eliminar las clases de color
    });
    currentPlayer = 'X';  // Restablecer al jugador X
};

// Asignar el evento al botón de reinicio
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);

cells.forEach(cell => cell.addEventListener('click', handleClick));
