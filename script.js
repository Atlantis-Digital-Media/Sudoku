const cubeReferenceArray = document.querySelectorAll(".cube");  //references to cube objects in index.html
const difficultyMenu = document.querySelector(".difficultyMenu");  //reference to difficulty menu dialog element in the index.html
const easyButton = document.querySelector(".easyButton"); //reference to the easy button if the difficulty menu on the html page
const standardButton = document.querySelector(".standardButton"); //reference to the standard button if the difficulty menu on the html page
const hardButton = document.querySelector(".hardButton"); //reference to the hard button if the difficulty menu on the html page
const clearBoardButton = document.querySelector(".clearBoardButton"); //reference to the clear board button on the html page
const startNewGameButton = document.querySelector(".startNewGameButton"); //reference to the start new game button on the html page
const areYouSureMenu = document.querySelector(".areYouSure"); //reference to the dialog element on the html page that opens when the "Clear Board" or "New Game" buttons are pressed
const yesButton = document.querySelector(".yesButton"); //reference to the "yes" button on the dialog element on the html page that opens when the "Clear Board" or "New Game" buttons are pressed
const noButton = document.querySelector(".noButton"); //reference to the "no" button on the dialog element on the html page that opens when the "Clear Board" or "New Game" buttons are pressed
const numberPad = document.querySelector(".numberPad"); //reference to the number pad on the html page
const numberPadNumberKeyReferenceArray = document.querySelectorAll(".numberPadNumber"); //references to the number pad number keys
const numberPadRedButton = document.querySelector(".redButton"); //reference to the number pad red button to close the number pad
const numberPadClearButton = document.querySelector(".clearButton"); //reference to the clear value button on the number pad
const failureMenu = document.querySelector(".failureMenu");  //reference to failure dialog element in the index.html
const retryButton = document.querySelector(".retryButton"); //reference to the "retry" button on the failur dialog element in the index.html
const winnerBanner = document.querySelector(".winnerBanner");  //reference to winner banner dialog element in the index.html
const winnerStartNewGameButton = document.querySelector(".winnerButton"); //reference to the "Start New Game" button on the winner banner dialog element in the index.html 
const spaceReferenceArray = []; //references to the html spaces
let board = []; //holds the coordinates and values assigned to the board
let boardSetupSuccess = false; //boolean that captures if the wave function completed successfully;
let revealedSpaces = []; //array that holds which spaces are revealed at the start of the game
let numbersAvailableBySpace = []; //array keeps track of which numbers are still available by space
let numbersAvailableByRow = []; //keeps track of which numbers are still available by row
let numbersAvailableByColumn = []; //keeps track of which numbers are still available by row
let numbersAvailableByCube = []; //keeps track of which numbers are still available by row
let entropy = []; //keeps track of the entropy values of the spaces during the wave function
let playerAssignedValues = []; //holds the values the player has assigned to the spaces on the board
let spaceSelected; //variable that holds the number of the last space selected
let menuButtonSelected; //variable that holds "0" if the "Clear Board" button was pressed or "1" if the "New Game" button was pressed
let difficulty; //variable that sets the game difficulty; 0 = difficult; 1 = standard; 2 = easy
let playersBoard = []; //array that holds the players assigned values for each board space


//returns the cube a space is located in.  There are 9 cubes on the board with 0 at the top left, and going left to right, top down, the bottom
//right is cube 9
function GetCube (number){
  let cube = 0;
  if (number > 2 && number < 6){cube = 1;}
  if (number > 5 && number < 9){cube = 2;}
  if (number > 11 && number < 15){cube = 1;}
  if (number > 14 && number < 18){cube = 2;}
  if (number > 20 && number < 24){cube = 1;}
  if (number > 23 && number < 27){cube = 2;}
  if (number > 26 && number < 30){cube = 3;}
  if (number > 29 && number < 33){cube = 4;}
  if (number > 32 && number < 36){cube = 5;}
  if (number > 35 && number < 39){cube = 3;}
  if (number > 38 && number < 42){cube = 4;}
  if (number > 41 && number < 45){cube = 5;}
  if (number > 44 && number < 48){cube = 3;}
  if (number > 47 && number < 51){cube = 4;}
  if (number > 50 && number < 54){cube = 5;}
  if (number > 53 && number < 57){cube = 6;}
  if (number > 56 && number < 60){cube = 7;}
  if (number > 59 && number < 63){cube = 8;}
  if (number > 62 && number < 66){cube = 6;}
  if (number > 65 && number < 69){cube = 7;}
  if (number > 68 && number < 72){cube = 8;}
  if (number > 71 && number < 75){cube = 6;}
  if (number > 74 && number < 78){cube = 7;}
  if (number > 77){cube = 8;}
  return cube;
}

//returns the column a space is located in.  There are 9 columns starting with 0 on the left and 8 on the right
function GetColumn (number){
  let column = 0;
  if (number == 0 || number == 9 || number == 18 || number == 27 || number == 36 || number == 45 || number == 54 || number == 63 || number == 72){ column = 0;}
  if (number == 1 || number == 10 || number == 19 || number == 28 || number == 37 || number == 46 || number == 55 || number == 64 || number == 73){ column = 1;}
  if (number == 2 || number == 11 || number == 20 || number == 29 || number == 38 || number == 47 || number == 56 || number == 65 || number == 74){ column = 2;}
  if (number == 3 || number == 12 || number == 21 || number == 30 || number == 39 || number == 48 || number == 57 || number == 66 || number == 75){ column = 3;}
  if (number == 4 || number == 13 || number == 22 || number == 31 || number == 40 || number == 49 || number == 58 || number == 67 || number == 76){ column = 4;}
  if (number == 5 || number == 14 || number == 23 || number == 32 || number == 41 || number == 50 || number == 59 || number == 68 || number == 77){ column = 5;}
  if (number == 6 || number == 15 || number == 24 || number == 33 || number == 42 || number == 51 || number == 60 || number == 69 || number == 78){ column = 6;}
  if (number == 7 || number == 16 || number == 25 || number == 34 || number == 43 || number == 52 || number == 61 || number == 70 || number == 79){ column = 7;}
  if (number == 8 || number == 17 || number == 26 || number == 35 || number == 44 || number == 53 || number == 62 || number == 71 || number == 80){ column = 8;}
  return column;
}

//returns the row a space is located in.  There are 9 rows starting with 0 at the top and 8 on the bottom
function GetRow (number){
  let row = 0;
  if (number > 8 && number < 18){row = 1;}
  if (number > 17 && number < 27){row = 2;}
  if (number > 26 && number < 36){row = 3;}
  if (number > 35 && number < 45){row = 4;}
  if (number > 44 && number < 54){row = 5;}
  if (number > 53 && number < 63){row = 6;}
  if (number > 62 && number < 72){row = 7;}
  if (number > 71){row = 8;}
  return row;
}

//dynamically creates the board spaces as button elements
function CreateBoard() {
  for (let i = 0; i < 81; i++){
    const cube = GetCube(i);
    const newSpace = document.createElement("button");
    newSpace.className = "space";
    newSpace.addEventListener("click", function(){PlayerSelectsSpace(i);});
    cubeReferenceArray[cube].appendChild(newSpace);
    spaceReferenceArray.push(newSpace);
  }
}

//sets the game difficulty and then starts a new game
function SelectDifficulty(number){
  difficulty = number;
  RestartGame();
  difficultyMenu.close();
}

//opens the numberpad when the player selects a board space
function PlayerSelectsSpace(space){
  spaceSelected = space;
  if (!revealedSpaces.includes(spaceSelected)){
    DisplayNumberPad(space);
  }
}

//displays the number pad when the player selects a space
function DisplayNumberPad(space){
  const cube = GetCube(space);
  const column = GetColumn(space);
  const row = GetRow(space);
  GetNumbersAvailableForSpace(space, cube, column, row);
  numberPad.show();
  for (let i = 0; i < numberPadNumberKeyReferenceArray.length; i++){
    if (numbersAvailableBySpace[space].includes(i+1)){
      numberPadNumberKeyReferenceArray[i].innerText = (i+1);
    }
    else{
      numberPadNumberKeyReferenceArray[i].innerText = "";
    }
  }
}

//when the player selects a number on the numberpad, this calls the function to update the space value
function PlayerPushesNumberPadKey(number){
  const oldValue = playersBoard[spaceSelected];
  if (!revealedSpaces.includes(spaceSelected) && (oldValue != number) && numbersAvailableBySpace[spaceSelected].includes(number)){
    ChangeSpaceValue(spaceSelected, number);
    playersBoard[spaceSelected] = number;
    const column = GetColumn(spaceSelected);
    const row = GetRow(spaceSelected);
    const cube = GetCube(spaceSelected);
    let index = numbersAvailableByCube[cube].indexOf(number);
    numbersAvailableByCube[cube].splice(index, 1);
    index = numbersAvailableByColumn[column].indexOf(number);
    numbersAvailableByColumn[column].splice(index, 1);
    index = numbersAvailableByRow[row].indexOf(number);
    numbersAvailableByRow[row].splice(index, 1);
    console.log("removed " + number + " from the list of possible choices")
    console.log("numbers available for cube " + cube);
    console.log(numbersAvailableByCube[cube]);
    console.log("numbers available for column " + column);
    console.log(numbersAvailableByColumn[column]);
    console.log("numbers available to row " + row);
    console.log(numbersAvailableByRow[row]);
    if (oldValue > 0){
      numbersAvailableByCube[cube].push(oldValue);
      numbersAvailableByColumn[column].push(oldValue);
      numbersAvailableByRow[row].push(oldValue);
      console.log("added the old value, " + oldValue + " back onto the list of possible choices")
      console.log("numbers available for cube " + cube);
      console.log(numbersAvailableByCube[cube]);
      console.log("numbers available for column " + column);
      console.log(numbersAvailableByColumn[column]);
      console.log("numbers available to row " + row);
      console.log(numbersAvailableByRow[row]);
    }
    numberPad.close();
    const gameOver = PlayerBoardCheck();
    if (gameOver){
      DisplayWinnerBanner();
    }
  }
}

//clears the value the player assigned to the space currently select
function ClearSpace(){
  if (!revealedSpaces.includes(spaceSelected)){
    const oldValue = playersBoard[spaceSelected];
    if (oldValue > 0){
      ChangeSpaceValue(spaceSelected, 0);
      playersBoard[spaceSelected] = 0;
      const column = GetColumn(spaceSelected);
      const row = GetRow(spaceSelected);
      const cube = GetCube(spaceSelected);
      numbersAvailableByCube[cube].push(oldValue);
      numbersAvailableByColumn[column].push(oldValue);
      numbersAvailableByRow[row].push(oldValue);
      console.log("added the old value, " + oldValue + " back onto the list of possible choices")
      console.log("numbers available for cube " + cube);
      console.log(numbersAvailableByCube[cube]);
      console.log("numbers available for column " + column);
      console.log(numbersAvailableByColumn[column]);
      console.log("numbers available to row " + row);
      console.log(numbersAvailableByRow[row]);
    }
    numberPad.close();
  }
}

//changes the value assigned to a space based on player input and updates it on the screen
function ChangeSpaceValue(space, newValue){
    playerAssignedValues[space] = newValue;
    if (newValue > 0){
      spaceReferenceArray[space].innerText = newValue;
    }
    else{
      spaceReferenceArray[space].innerText = "";
    }
}

//opens the "Are You Sure" dialog when a player pushes the "Clear Board" or "New Game" menu buttons
function PlayerPushedMenuButtons(number){
  numberPad.close();
  menuButtonSelected = number;
  areYouSureMenu.showModal();
}

// confirms the player decision to clear the board or restart the game and closes the dialog box
function PlayerPushedYesNoButtons(){
  areYouSureMenu.close();
  if (menuButtonSelected === 0) { // the player confirmed "Clear Board"
    ClearAllPlayerSpaceValues();
  }
  if (menuButtonSelected === 1) { // the player confirmed "New Game"
    difficultyMenu.showModal();
  }
}

//displays the winner banner when the player solves the sudoku challenge
function DisplayWinnerBanner(){
  winnerBanner.showModal();
}

//restarts the game after the retry button is pressed because the wave function failed 3 times
function RetryBoardSetup(){
  RestartGame();
  failureMenu.close();
}

//sets all of the tracking arrays back to full and zeros out the player's board
function InitializeArrays(){
  //console.log("Initializing Arrays");
  for (let i = 0; i < 9; i++){
    numbersAvailableByRow[i] = []; 
    numbersAvailableByColumn[i] = [];
    numbersAvailableByCube[i] = [];
    for (let x = 1; x < 10; x++){
      numbersAvailableByRow[i].push(x); 
      numbersAvailableByColumn[i].push(x);
      numbersAvailableByCube[i].push(x);
    }
  }
  for (let i = 0; i < 81; i++){
    playersBoard[i] = 0;
  }
}

//resets the board back to the start of the game
function ClearAllPlayerSpaceValues(){
  //console.log("Clearing all player assigned values");
  playerAssignedValues = [];
  //console.log("Player Assigned Values Array");
  //console.log(playerAssignedValues);
  for (let i = 0; i < 81; i++){
    ChangeSpaceValue(i,"");
    spaceReferenceArray[i].style.background = '#D3D3D3';
  }
  InitializeArrays();
  if (boardSetupSuccess){
    RevealStaringSpaces();
  }
}

//determines which numbers are still available for a give space
function GetNumbersAvailableForSpace(space, cube, column, row){
  numbersAvailableBySpace[space] = [];
  //console.log("getting the numbers available for space " + space);
  //console.log("the column numbers available are:");
  //console.log(numbersAvailableByColumn[column]);
  //console.log("the row numbers available are:");
  //console.log(numbersAvailableByRow[row]);
  //console.log("the cube numbers available are:");
  //console.log(numbersAvailableByCube[cube]);
  for (let i = 0; i < numbersAvailableByColumn[column].length; i++){
    const number = numbersAvailableByColumn[column][i];
    if (numbersAvailableByRow[row].includes(number) && numbersAvailableByCube[cube].includes(number)){
      numbersAvailableBySpace[space].push(number);
    }
  }
  //console.log("the numbers aviable for space " + space + " are:");
  //console.log(numbersAvailableBySpace[space]);
}

//returns the entropy (the number of values still available to the space) of a specific space
function GetSpaceEntropy (space){
  let numberOfNumbersAvailable = 0;
  if (board[space] == 0){
    const column = GetColumn(space);
    const row = GetRow(space);
    const cube = GetCube(space);
    GetNumbersAvailableForSpace(space, cube, column, row);
    numberOfNumbersAvailable = numbersAvailableBySpace[space].length;
  };
  //console.log("Getting the entropy for space " + space);
  //console.log("Space " + space + " is located in column " + column + ", row " + row + " and cube " + cube);
  //console.log("column " + column + " has the following numbers");
  //console.log(numbersAvailableByColumn[column]);
  //console.log("row " + row + " has the following numbers")
  //console.log(numbersAvailableByRow[row]);
  //console.log("cube " + cube + " has the following numbers available:");
  //console.log(numbersAvailableByCube[cube]);
  return numberOfNumbersAvailable;
}

//picks a random space from amongst the lowest entropy array
function PickRandomSpace(){
  let random = -1;
  let index = 10;
  let length;
  for (let i = 9; i > 0; i--){
    if (entropy[i].length > 0) {index = i;}
  }
  try{
    length = entropy[index].length;
  } catch{
    length = -1;
  }
  if (length > 0){
      //console.log("the lowest entropy is in entropy column " + index + " which has " + entropy[index].length + " numbers in it");
      const randomSpace = Math.floor(Math.random() * length);
      random = entropy[index][randomSpace];
      //console.log("the random number selected was " + randomSpace + ".  Index " + randomSpace + " references board space " + random);
  }
  return random;
}

//picks a random value for the board space selected
function AssignSpaceStartingValue (space){
  let range;
  let value = 10;
  try{
    range = numbersAvailableBySpace[space].length;
  } catch {
    range = -1;
  }
  if (range > 0){
    const random = Math.floor(Math.random() * range);
    value = numbersAvailableBySpace[space][random];
  }
  const column = GetColumn(space);
  const row = GetRow(space);
  const cube = GetCube(space);
  //console.log("space " + space + " is located in cube " + cube + " column " + column + " row " + row);
  //console.log("space " + space + " has the following values still available:");
  //console.log(numbersAvailableBySpace[space]);
  //console.log("the random index selected was " + random + " which holds the value " + value);
  board[space] = value;
  //spaceReferenceArray[space].innerText = value;
  let index = numbersAvailableByCube[cube].indexOf(value);
  if (index > -1) {
    numbersAvailableByCube[cube].splice(index, 1);
  }
  index = numbersAvailableByColumn[column].indexOf(value);
  if (index > -1) {
    numbersAvailableByColumn[column].splice(index, 1);
  }
  index = numbersAvailableByRow[row].indexOf(value);
  if (index > -1) {
    numbersAvailableByRow[row].splice(index, 1);
  }
}

//uses the wave function to setup a sudoku board randomly
function WaveFunction(){
  //console.log("entering the wave function");
  for (let wave = 0; wave < 81; wave++){
    //console.log("starting wave " + wave);
    entropy = [];
    for (let i = 0; i < 10; i++){
      entropy[i] = [];
    }
    for (let i = 0; i < 81; i++){
      const spaceEntropy = GetSpaceEntropy(i);
      entropy[spaceEntropy].push(i);
    }
    //console.log("entropy by space at the end of wave " + wave);
    //console.log(numbersAvailableBySpace);
    //console.log("entropy at the end of wave " + wave);
    //console.log(entropy);
    const randomSpace = PickRandomSpace();
    if (randomSpace > -1){
      AssignSpaceStartingValue(randomSpace);
    }
  }
}

//checks the board to make sure that all values are assigned properly
function PlayerBoardCheck(){
  let boolCheck = false;
  let cubeArray = [];
  let columnArray = [];
  let rowArray = [];

  for (let i = 0; i < 9; i++){
    cubeArray[i] = [];
    columnArray[i] = [];
    rowArray[i] = [];
  }

  for (let i = 0; i < 81; i++){
    const value = playersBoard[i];
    const cube = GetCube(i);
    const column = GetColumn(i);
    const row = GetRow(i);
    cubeArray[cube].push(value);
    rowArray[row].push(value);
    columnArray[column].push(value);
  }

  for (let i = 0; i < 9; i++){
    cubeArray[i].sort();
    rowArray[i].sort();
    columnArray[i].sort();
  }

  for (let i = 0; i < 9; i++){
    for (let x = 0; x < 9; x++){
      if (cubeArray[i][x] != (x+1)){
        //console.log("for cube " + i + " index " + x + " expecting value of " + (x+1) + " but instead the value is " + cubeArray[i][x]);
        boolCheck = false;
      }
      if (columnArray[i][x] != (x+1)){
        //console.log("for column " + i + " index " + x + " expecting value of " + (x+1) + " but instead the value is " + columnArray[i][x]);
        boolCheck = false;
      }
      if (rowArray[i][x] != (x+1)){
        //console.log("for row " + i + " index " + x + " expecting value of " + (x+1) + " but instead the value is " + rowArray[i][x]);
        boolCheck = false;
      }
    }
  }
  return boolCheck;
}

//checks the board to make sure that all values are assigned properly
function BoardCheck(){
  numbersAvailableByCube = [];
  numbersAvailableByRow = [];
  numbersAvailableByColumn = [];

  for (let i = 0; i < 9; i++){
    numbersAvailableByCube[i] = [];
    numbersAvailableByRow[i] = [];
    numbersAvailableByColumn[i] = [];
  }

  let boolCheck = true;

  for (let i = 0; i < 81; i++){
    const value = board[i];
    const cube = GetCube(i);
    const column = GetColumn(i);
    const row = GetRow(i);
    numbersAvailableByCube[cube].push(value);
    numbersAvailableByRow[row].push(value);
    numbersAvailableByColumn[column].push(value);
  }

  for (let i = 0; i < 9; i++){
    numbersAvailableByCube[i].sort();
    numbersAvailableByRow[i].sort();
    numbersAvailableByColumn[i].sort();
  }

  for (let i = 0; i < 9; i++){
    for (let x = 0; x < 9; x++){
      if (numbersAvailableByCube[i][x] != (x+1)){
        //console.log("for cube " + i + " index " + x + " expecting value of " + (x+1) + " but instead the value is " + numbersAvailableByCube[i][x]);
        boolCheck = false;
      }
      if (numbersAvailableByColumn[i][x] != (x+1)){
        //console.log("for column " + i + " index " + x + " expecting value of " + (x+1) + " but instead the value is " + numbersAvailableByColumn[i][x]);
        boolCheck = false;
      }
      if (numbersAvailableByRow[i][x] != (x+1)){
        //console.log("for row " + i + " index " + x + " expecting value of " + (x+1) + " but instead the value is " + numbersAvailableByRow[i][x]);
        boolCheck = false;
      }
    }
  }
  return boolCheck;
}

//after the board is initialed this selects a certain amount of spaces to reveal to the player at the beginning of the game
function DetermineStartingSpaces(){
  const rowsAvailable = [0,1,2,3,4,5,6,7,8];
  const columnsAvailable = [0,1,2,3,4,5,6,7,8];
  const cubesAvailable = [0,1,2,3,4,5,6,7,8];
  let cube;
  let column;
  let row;
  let number = 3;
  if (difficulty == 1){
    number = 6;
  }
  if (difficulty == 2){
    number = 9;
  }
  for (let i = 0; i < number; i++){
    let spacesAvailable = []
    for (let space = 0; space < 81; space++){
      column = GetColumn(space);
      row = GetRow(space);
      cube = GetCube(space);
      if (columnsAvailable.includes(column) && rowsAvailable.includes(row) && cubesAvailable.includes(cube)){
        spacesAvailable.push(space);
      }
    }
    const random = Math.floor(Math.random() * spacesAvailable.length);
    revealedSpaces.push(spacesAvailable[random]);
    column = GetColumn(spacesAvailable[random]);
    row = GetRow(spacesAvailable[random]);
    cube = GetCube(spacesAvailable[random]);
    let index = cubesAvailable.indexOf(cube);
    if (index > -1) {
      cubesAvailable.splice(index, 1);
    }
    index = columnsAvailable.indexOf(column);
    if (index > -1) {
      columnsAvailable.splice(index, 1);
    }
    index = rowsAvailable.indexOf(row);
    if (index > -1) {
      rowsAvailable.splice(index, 1);
    }
  }
}

//reveals the starting spaces on the board
function RevealStaringSpaces(){
  //console.log("the starting spaces are:");
  //console.log(revealedSpaces);
  for (let i = 0; i < revealedSpaces.length; i++){
    const space = revealedSpaces[i];
    const value = board[space];
    ChangeSpaceValue(space, value);
    spaceReferenceArray[space].style.background = '#FFFFFF';
    playersBoard[space] = value;
    //console.log("Removing the starting spaces");
    const column = GetColumn(space);
    const row = GetRow(space);
    const cube = GetCube(space);
    let index = numbersAvailableByColumn[column].indexOf(value);
    if (index > -1) { // only splice array when item is found
      numbersAvailableByColumn[column].splice(index, 1); // 2nd parameter means remove one item only
    }
    index = numbersAvailableByRow[row].indexOf(value);
    if (index > -1) { numbersAvailableByRow[row].splice(index, 1);}
    index = numbersAvailableByCube[cube].indexOf(value);
    if (index > -1) { numbersAvailableByCube[cube].splice(index, 1);}
  }
}

//completely restarts the game and setups a new random sudoku puzzle
function RestartGame(){
  numberPad.close();
  boardSetupSuccess = false; //boolean that captures if the wave function completed successfully;
  for (let i = 0; i < 4; i++){
    if (!boardSetupSuccess){
      console.log("Restarting the Game");
      for (let i = 0; i < 81; i++){
        board[i] = 0;
      }
      revealedSpaces = [];
      ClearAllPlayerSpaceValues();
      WaveFunction(); //uses the wave function to assign values to the board
      boardSetupSuccess = BoardCheck();
      console.log("the board setup check is:" + boardSetupSuccess);
    }
  }
  if (boardSetupSuccess){
    DetermineStartingSpaces();
    RevealStaringSpaces();
  }
  else{
    failureMenu.showModal();
  }
}

//******************************************Setup the Difficulty Menu Buttons**********************************************************************
easyButton.addEventListener("click", function(){SelectDifficulty(2);});
standardButton.addEventListener("click", function(){SelectDifficulty(1);});
hardButton.addEventListener("click", function(){SelectDifficulty(0);});

//******************************************Setup the Menu Buttons**********************************************************************
clearBoardButton.addEventListener("click", function(){PlayerPushedMenuButtons(0);});
startNewGameButton.addEventListener("click", function(){PlayerPushedMenuButtons(1);});
yesButton.addEventListener("click", function(){PlayerPushedYesNoButtons();});
noButton.addEventListener("click", function(){PlayerPushedYesNoButtons();});

//******************************************Setup the Retry Button**********************************************************************
retryButton.addEventListener("click", function(){RetryBoardSetup();});

//******************************************Setup the Number Pad**********************************************************************
for (let i = 0; i < 9; i++){
  numberPadNumberKeyReferenceArray[i].addEventListener("click", function(){PlayerPushesNumberPadKey(i+1);});
}
numberPadRedButton.addEventListener("click", function(){numberPad.close();});
numberPadClearButton.addEventListener("click", function(){ClearSpace();});

//******************************************Setup the Start New Game Button on the Winner Banner**********************************************************************
winnerStartNewGameButton.addEventListener("click", function(){winnerBanner.close(); difficultyMenu.showModal();});

//******************************************Create the Board**********************************************************************
CreateBoard();
difficultyMenu.showModal();
//*********************************************Credits************************************************************************
//space background art:  Author:  ShinyOgre; Licences: cc-BY-SA 3.0;  https://opengameart.org/content/solar-system