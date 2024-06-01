let userMove = '';
let computerMove='';
let result='';
var game= JSON.parse(localStorage.getItem('game')) || {
    wins:0,
    looses:0,
    ties:0
};
let gameHistory=JSON.parse(localStorage.getItem('gameHistory')) || [];
let win='';
let Loose='';
let Ties='';
//some function call
renderGameSummary();
renderGameHistory();
//let gameHistory=[];

function captureUserMove(move){
    userMove=move;
    console.log("UserMove: "+userMove);
}



function gernerateComputerMove(){
    const randNum=Math.random();        // Generate the value between 0 and 1
    if(randNum<1/3){                      // if the value is greater than 0 and less than 0.33;
        computerMove='Rock';
    }
    else if(randNum<2/3){                 //if the value is already greater than 0.33 and less than 0.66;
        computerMove='Paper';
    }
    else {                                  //if the value is already greater than 0.66 and less than 1;
        computerMove='Scissor';
    }
    console.log("computerMove: "+computerMove);
}



function evaluteMove(){
    if(userMove === computerMove ){           //(R,R)  , (P,P)  , (S,S)
        result='Tie';
    } 
    else if(userMove==='Rock' && computerMove==='Scissor'||
    userMove==='Scissor' && computerMove==='Paper'||
    userMove==='Paper' && computerMove==='Rock'){          //(R,S) , (S,P) ,(P,R)
        result='Win';    
    }
    else {                      //(R,P) ,(P,S),  (S,R)
        result='Loose'; 
    }
    console.log('Result:'+result);
}


function updateScores(){
    if(result==='Win'){
        game.wins++;
    }
    else if(result==='Loose'){
        game.looses++;
    }
    else if(result==='Tie'){
        game.ties++;
    }
    console.log(game);

    const gameHistoryItem={
        userMove: userMove,
        computerMove: computerMove,
        result: result
    };
    gameHistory.push(gameHistoryItem);
    localStorage.setItem('game',JSON.stringify(game));
    localStorage.setItem('gameHistory',JSON.stringify(gameHistory));
    // console.log("gameHistory: ");
    // console.log(gameHistory);
    //document.getElementById('gameHistory').innerHTML = gameHistoryHTML;
}


function renderGameSummary(){
    const gamesPlayed=game.wins+game.looses+game.ties;
    console.log("gamesPlayed "+gamesPlayed);
    document.getElementById('wins').innerHTML = game.wins;
    document.getElementById('looses').innerHTML = game.looses;
    document.getElementById('ties').innerHTML = game.ties;
    document.getElementById('gamesPlayed').innerHTML = gamesPlayed;

}


function renderGameHistory(){
    let gameHistoryHTML = `
    <tr>
            <th>#</th>
            <th>User Move</th>
            <th>Computer Move</th>
            <th>Result</th>
        </tr>
    `;
    for (let i=0 ; i < gameHistory.length;i++){
        const gameItem = gameHistory[i];    //object
        gameHistoryHTML+=`
        <tr> 
            <td>${i+1}</td>
            <td>${gameItem.userMove}</td>
            <td>${gameItem.computerMove}</td>
            <td>${gameItem.result}</td>
        </tr>
        `;

    }
    document.getElementById('gameHistory').innerHTML = gameHistoryHTML;

}


function playGame(move){
    captureUserMove(move);
    gernerateComputerMove();
    evaluteMove();
    updateScores();
    renderGameSummary();
    renderGameHistory();
}





function resetScores(){
    game.wins = 0;
    game.looses = 0;
    game.ties = 0;
    gameHistory = [];
    localStorage.setItem('game',JSON.stringify(game));
    localStorage.setItem('gameHistory',JSON.stringify(gameHistory));
}