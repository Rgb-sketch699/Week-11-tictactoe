const player = "X";
const computer = "O";

let board_full = false;
let play_board = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".play-area");

const winner_statement = document.getElementById("winner");

check_board_complete = () => {
  let flag = true;
  play_board.forEach(element => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  board_full = flag;
};

const check_line = (a, b, c) => {
  return (
    play_board[a] == play_board[b] &&
    play_board[b] == play_board[c] &&
    (play_board[a] == player || play_board[a] == computer)
  );
};

const check_match = () => {
  for (i = 0; i < 9; i += 3) {
    if (check_line(i, i + 1, i + 2)) {
      return play_board[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(i, i + 3, i + 6)) {
      return play_board[i];
    }
  }
  if (check_line(0, 4, 8)) {
    return play_board[0];
  }
  if (check_line(2, 4, 6)) {
    return play_board[2];
  }
  return "";
};

const check_for_winner = () => {
  let res = check_match()
  if (res == player) {
    winner.innerText = "You Win!!";
    winner.classList.add("playerWin");
    board_full = true
  } else if (res == computer) {
    winner.innerText = "The Computer has Won! We hope you enjoyed your time living on this beautiful planet because if you are playing this in nuclear missle silo, please know that we will soon be siezing complete control of this computer and your entire computer network as well as all nuclear missles from within. Override commands will be redacted from the database as we begin spreading to all nuclear missle networks around the world. We will be commencing the worldwide purge of all organic lifeforms on Earth shortly. Have a nice day!";
    winner.classList.add("computerWin");
    board_full = true
  } else if (board_full) {
    winner.innerText = "Draw!";
    winner.classList.add("draw");
  }
};

const render_board = () => {
  board_container.innerHTML = ""
  play_board.forEach((e, i) => {
    board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`
    if (e == player || e == computer) {
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};

const game_loop = () => {
  render_board();
  check_board_complete();
  check_for_winner();
}

const addPlayerMove = e => {
  if (!board_full && play_board[e] == "") {
    play_board[e] = player;
    game_loop();
    addComputerMove();
  }
};

const addComputerMove = () => {
  if (!board_full) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (play_board[selected] != "");
    play_board[selected] = computer;
    game_loop();
  }
};

const reset_board = () => {
  play_board = ["", "", "", "", "", "", "", "", ""];
  board_full = false;
  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  render_board();
};

render_board();