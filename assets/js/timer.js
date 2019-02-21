//Variables de configuration
var timer = 3600; /* 60 minutes = 3600 , 30 minutes = 1800, 15 minutes = 900*/
var redTime = 300;
var orangeTime = 900;
var timerName = 'Escape Game:';
var teamOneName ='Equipe 1';
var teamTwoName ='Equipe 2';
var displayTeamOne = true;
var displayTeamTwo = true;
var endMessage = 'Fin du jeu !'
var audioFile = 'school.mp3' /*nom du fichier son déposé dans le dossier sounds*/


//variables fonctionnelles
var actualTime;
var isTimerOn = false;
var timerInterval;
var clockZone = '#clock'
var circle;
var audioElement;

$(document).ready(function(){
  //creation du lecteu audio avec le fichier choisi
  audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'assets/sounds/'+ audioFile);

  //initialisation du compteur graphique
  circle = $('.circleCountdown').circleProgress({
    value: 1,
    size: 700,
    animation: false,
    fill: 'green',
    thickness: 50 ,
    startAngle:-45 ,
    reverse: true,
  });

  //affichage du temps initial
  displayTime(timer,clockZone);

  //initialisation du compteur
  actualTime = timer;

  //Ajout, si souhaité, des affichages temps des équipes
  $('#title').html(timerName);
  if(displayTeamOne){
    $('#teamOne').html('<div id="nameTeamOne" class="teamTitle">'+teamOneName+'</div><span id="timeOne"></span>');
  };
  if(displayTeamTwo){
    $('#teamTwo').html('<div id="nameTeamTwo" class="teamTitle">'+teamTwoName+'</div><span id="timeTwo"></span>');
  };
});

$(document).keydown(function(e){
  if(e.keyCode==83){
    if(isTimerOn){
      stopTimer();
    }
    else{
      startTimer(actualTime);
    }
  };
  //Reinitialiser le compteur
  if(e.keyCode==82){
    resetTimer();
  };
  //Sauver le temps de l'équipe une
  if(e.keyCode==97){
    if(displayTeamOne){
      var finalTimeOne = timer-actualTime;
      displayTime(finalTimeOne,'#timeOne')
    };
  };
  //Sauver le temps de l'équipe deux
  if(e.keyCode==98){
    if(displayTeamTwo){
      var finalTimeTwo = timer-actualTime;
      displayTime(finalTimeTwo,'#timeTwo')
    }
  };
});

//fonctions disponibles

function displayTime(timer,where){
  var baseTimer= '';
  if(parseInt(timer/60) < 10){
    baseTimer += '0'+parseInt(timer/60);
  }else{
    baseTimer += parseInt(timer/60);
  };
  baseTimer += " : ";
  if(timer % 60 < 10){
    baseTimer += '0'+timer % 60;
  }else{
    baseTimer += timer % 60;
  };
  $(where).html(baseTimer);
};

function startTimer(){
  if (!isTimerOn){
    isTimerOn = true;
    timerInterval = setInterval(function(){
      actualTime -= 1;
      if(actualTime < 0){
        $(clockZone).html(endMessage);
        stopTimer();
        audioElement.play();
      }
      else{
        if(actualTime <= orangeTime ){
          $('.circleCountdown').circleProgress({
            fill:'orange',
          });
          $('#clock').removeClass('green').addClass('orange');
        }
        if(actualTime <= redTime ){
          $('.circleCountdown').circleProgress({
            fill:'red',
          });
          $('#clock').removeClass('green').addClass('red');
        }
        var actualPercent = (actualTime/timer)*1;
        $('.circleCountdown').circleProgress({
          value:actualPercent
        });
        displayTime(actualTime,clockZone);}
    }, 1000);
  }
};

function stopTimer(){
  isTimerOn = false;
  clearInterval(timerInterval);
};

function resetTimer(){
  actualTime=timer;
  stopTimer();
  displayTime(timer,clockZone);
  $('#timeOne').html('');
  $('#timeTwo').html('');
  $('.circleCountdown').circleProgress({
    fill:'green',
    value : 1
  });
  $('#clock').removeClass('orange').removeClass('red').addClass('green');
};
