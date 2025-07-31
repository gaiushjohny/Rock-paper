 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('Service Worker registered:', reg))
    .catch(err => console.log('Service Worker failed:', err));
}

 
 
 
 
 
 
 
 
 
 let score = JSON.parse(localStorage.getItem('score'));

        if(score === null){
            score = {
                wins: 0,
                losses: 0,
                ties: 0
            };
        }

       updateScoreElement();


       let isAutoPlaying = false;
       let intervalId

       /* const autoPlay = () => {

        }*/
       function autoPlay(){
        if(!isAutoPlaying){
             intervalId= setInterval(() =>{
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
         isAutoPlaying = true;
        }else{
            clearInterval(intervalId);
            isAutoPlaying = false;
        }
       }

       document.querySelector('.Rock-button').addEventListener('click', () => {
        playGame('Rock');
       });

       document.querySelector('.Paper-button').addEventListener('click', () => {
        playGame('Paper');
       })

       document.querySelector('.Scissors-button').addEventListener('click', ()=>{
        playGame('Scissors');
       })

       document.querySelector('.auto-play-button').addEventListener('click', () => {
        autoPlay();

        const button = document.querySelector('.auto-play-button');
        if (isAutoPlaying) {
        button.innerHTML = 'Stop Playing';
        } else {
        button.innerHTML = 'Auto Play';
        }
       })

       

               

       document.body.addEventListener('keydown',(event) =>{
        if(event.key === 'r'){
            playGame('Rock');
        } else if (event.key === 'p'){
            playGame('Paper');
        } else if (event.key === 's'){
            playGame('Scissors');
        }
       })
        function playGame(playerMove){
            const computerMove=pickComputerMove();
     result = '';

    if(playerMove === 'Scissors'){
         if(computerMove === 'Rock'){
        result = 'You lose';
    }else if (computerMove === 'Paper'){
        result = 'You win';
    }else if (computerMove === 'Scissors'){
        result = 'Tie';
    }
        }

        else if(playerMove === 'Paper'){
         if(computerMove === 'Rock'){
        result = 'You win';
    }else if (computerMove === 'Paper'){
        result = 'Tie';
    }else if (computerMove === 'Scissors'){
        result = 'You lose';
    }  
        }

     else if(playerMove === 'Rock'){
         if(computerMove === 'Rock'){
        result = 'Tie';
    }else if (computerMove === 'Paper'){
        result = 'You lose';
    }else if (computerMove === 'Scissors'){
        result = 'You win';
    }   
        }


    if(result === 'You win'){
        score.wins+=1;
    }
    else if(result === 'You lose'){
        score.losses+=1;
    }
    else if(result === 'Tie'){
        score.ties+=1;
    }

    updateScoreElement();

     document.querySelector('.js-result').innerHTML = result;

     document.querySelector('.js-moves').innerHTML = ` You
        <img src="images/${playerMove}-emoji.png" alt="" class="move-icon">
        <img src="images/${computerMove}-emoji.png" alt="" class="move-icon">
        Computer`;

    localStorage.setItem('score', JSON.stringify(score));
    }




        function updateScoreElement(){
             document.querySelector('.js-score').innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
        }
   




        function pickComputerMove(){
             const randomNumber = Math.random();
             let computerMove = '';
        if(randomNumber >= 0 && randomNumber < 1/3){
        computerMove = 'Rock';
    }
    else if(randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'Paper';
    }
    else if (randomNumber >= 2/3 && randomNumber < 1){
        computerMove = 'Scissors';
    }
    return computerMove;
}