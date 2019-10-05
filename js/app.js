// console.log(`yup`);


// STEP 1 
// Create class for ROBOTS
// Create class for PARTS

class Robot {
  constructor(name, body, leftHand, rightHand, leftLeg, rightLeg, sword, gun){
    this.name = name; //str
    this.body = body; //obj
    this.leftHand = leftHand; //obj
    this.rightHand = rightHand; //obj
    this.leftLeg = leftLeg; //obj
    this.rightLeg = rightLeg; //obj
    this.sword = sword; //obj
    this.gun = gun; //gun
    this.dodgeBonus = this.leftLeg.dodgeValue + this.rightLeg.dodgeValue
  }
  disarmSelf(){
    if (this.leftHand.functioning===false){
      this.gun.selector.addClass(`hidden`);
    } else if (this.rightHand.functioning===false){
      this.sword.selector.addClass(`hidden`)
    }
  }
 
}

class Part {
  constructor(name, currentHP, maxHP, functioning, damageValue, accuracy, dodgeValue,selector){
    this.name = name; // str
    this.currentHP = currentHP; //obj
    this.maxHP = maxHP; //obj
    this.functioning = functioning; //obj
    this.damageValue = damageValue; //obj
    this.accuracy = accuracy; //obj
    this.dodgeValue = dodgeValue; //obj
    this.selector = selector;
  }
  updateHitPoints(){
      this.selector.empty();
    for(let i=0;i <this.currentHP; i++){
      this.selector.append(`<div id="health-point">|</div> `)
    }
  }
  removeSelf(){
    if (this.functioning===false){
      this.selector.toggleClass(`animated hinge`);
      // setTimeout(function(){
        // this.selector.addClass(`hidden`);
      //  },250)
    }
  }
  damageIndicator(){
    // if(this.functioning===true){
    console.log(`applying effects`)
    this.selector.toggleClass(`damage-indicator`);
    this.selector.toggleClass(`animated swing`);
      // setTimeout(function(){
      //   this.selector.toggleClass(`animated swing`);
      // },10)
    // }
   


  }
}

//jQuery
  // START GAME
  $startGame = $(`#game-start`)

  // ENEMY ROBOT
  $opponent = $(`.opponent`)
  $opponentGun = $(`#opponent-gun`)
  $opponentRightArm = $(`#opponent-right-arm`)
  $opponentBody = $(`#opponent-body`)
  $opponentLeftArm = $(`#opponent-left-arm`)
  $opponentSword = $(`#opponent-sword`)
  $opponentLeftLeg = $(`#opponent-left-leg`)
  $opponentRightLeg = $(`#opponent-right-leg`)

  // WEAPON SELECT
  $selectSword = $(`#select-sword`)
  $selectGun = $(`#select-gun`)


  // TARGET AREA SELECT
  $attackLeft = $(`#attack-left`)
  $attackBody = $(`#attack-body`)
  $attackRight = $(`#attack-right`)
  $attackLegs = $(`#attack-leg`)

  // POST BATTLE
  $attackSummary = $(`#attack-summary`)
  $attackLog = $(`#log`)
  $next = $(`#next`)
  $endTurn = $(`#end-turn`)
  
  // GAME MISC
  $damageIndicator = $(`#damage-indicator`)
  $healthPoint = $(`#health-point`)
  $currentPlayer = $(`#current-player`)
  $mainGame = $(`.main-game`)

  // PLAYER HP BARS
  $playerSword = $(`#player-sword`)
  $playerLeftArm = $(`#player-left-arm`)
  $playerLeftLeg = $(`#player-left-leg`)
  $playerBody = $(`#player-body`)
  $playerRightLeg = $(`#player-right-leg`)
  $playerRightArm = $(`#player-right-arm`)
  $playerGun = $(`#player-gun`)

  // PLAYER PARTS DIVS
  $playerSwordDiv = $(`#player-sword-div`)
  $playerLeftArmDiv = $(`#player-left-arm-div`)
  $playerLeftLegDiv = $(`#player-left-leg-div`)
  $playerBodyDiv = $(`#player-body-div`)
  $playerRightLegDiv = $(`#player-right-leg-div`)
  $playerRightArmDiv = $(`#player-right-arm-div`)
  $playerGunDiv = $(`#player-gun-div`)




// STEP 2 
// Create game obj to hold variables

// game = {
//   start: false,
//   ended: false,
//   baseEvade: 0,
//   playerAttackPhase: false,
//   opponentAttackPhase: false
// }


// STEP 3 
// Create Robot Parts

// Player Parts
const playerBody = new Part ("Body",6,6,true,0,0,0,$playerBody);
const playerLeftHand = new Part ("Left Hand", 3,3,true,0,0,0,$playerLeftArm);
const playerRightHand = new Part ("Right Hand",3,3,true,0,0,0,$playerRightArm);
const playerLeftLeg = new Part ("Left Leg",3,3,true,0,0,5,$playerLeftLeg);
const playerRightLeg = new Part ("Right Leg",3,3,true,0,0,5,$playerRightLeg);
const playerSword = new Part ("Sword",0,0,true,1,200,0); // damage 1, accuracy 75
const playerGun = new Part ("Gun",0,0,true,2,200,0); // damage 2, accuracy 60
const playerPartsArr = [
  playerBody,
  playerLeftHand,
  playerLeftLeg,
  playerRightHand,
  playerRightLeg
]

// Opponent Parts
const opponentBody = new Part ("Body",6,6,true,0,0,0,$opponentBody);
const opponentLeftHand = new Part ("Left Hand",3,3,true,0,0,0,$opponentLeftArm);
const opponentRightHand = new Part ("Right Hand",3,3,true,0,0,0,$opponentRightArm);
const opponentLeftLeg = new Part ("Left Leg",3,3,true,0,0,5,$opponentLeftLeg);
const opponentRightLeg = new Part ("Right Leg",3,3,true,0,0,5,$opponentRightLeg);
const opponentSword = new Part ("Sword",0,0,true,1,100,0); // damage 1 , accuracy 75
const opponentGun = new Part ("Gun",0,0,true,2,100,0);
const opponentPartsArr = [
  opponentBody,
  opponentLeftHand,
  opponentLeftLeg,
  opponentRightHand,
  opponentRightLeg
]


// STEP 4
// Create Robots

const player = new Robot ("Player", playerBody, playerLeftHand, playerRightHand, playerLeftLeg, playerRightLeg, playerSword, playerGun);
const opponent = new Robot ("Opponent", opponentBody, opponentLeftHand, opponentRightHand, opponentLeftLeg, opponentRightLeg, opponentSword, opponentGun);

// STEP 5
// Create RNG functions for each zone - zone
// Up (body, leftleg, rightleg, leftarm, right arm)
// Down (body, leftleg, rightleg)
// Left (body, leftarm) 
// Right (body, rightarm)
// RNG Function A - hit or miss
// RNG Function B - accept selectedZone, return targetPart

// STEP 6
// Apply Damage
// set part to non functional when destroyed


// STEP 7
// Create game start status

// STEP 8 
// Adding in opponent auto select weapon & auto select target zone functions

// STEP 9
// Game ending conditions


game = {
  // Variables

  start: false,
  ended: false,
  baseEvade: 0,
  playerAttackPhase: false,
  opponentAttackPhase: false,
  currentTarget: undefined,
  currentPlayer: undefined,
  selectedWeapon: undefined,
  selectedZone: undefined,
  targetPart: undefined,
  showStopper: "",

  // GAME METHODS

  gameStartSet() {
    this.startGameVisibility();
    this.addHitPoints(opponentPartsArr);
    this.addHitPoints(playerPartsArr);
    console.log(`game start`);
    this.start = true;
    this.playerTurn();
  },
  startNewTurn() {
    if (this.currentPlayer === opponent){
      this.opponentAutoSelectWeapon();
      this.opponentAutoSelectArea();
      this.randomNGHitConnect()
    }
  },
  addHitPoints (arr){
    console.log(`populating hit points`);
    for (let i=0; i<arr.length; i++){
      arr[i].updateHitPoints()
    }
  },
  playerTurn(){
    this.playerAttackPhase = true;
    this.opponentAttackPhase = false;
    this.currentTarget = opponent;
    this.currentPlayer = player;
    console.log(`player turn started `);
    console.log(`awaiting weapon select`)
    this.toggleWeaponSelection();
    this.displayCurrentPlayer();
    // game.randomNGHitConnect() // NOTE testing only
  },
  pressWeaponSelect() {
    console.log (`${this.selectedWeapon.name} selected`);
    console.log (`awaiting target area select`);
    this.toggleTargetingAreas();
  },
  pressTargetSelect() {
    console.log (`${this.selectedZone} selected`)
    console.log(`activating randomNGHitConnect `)
    this.randomNGHitConnect();

  },
  opponentTurn(){
    this.playerAttackPhase = false;
    this.opponentAttackPhase = true;
    this.currentTarget = player;
    this.currentPlayer = opponent;
    console.log (`opponent turn started`);
    this.displayCurrentPlayer();
    this.startNewTurn();
  },
  gameEndConditionsMet() {
    if(player.body.functioning === false) {
      console.log(`game over - player body destroyed`);
      this.showStopper = "Player Body Destroyed"
      return true; 
    } else if (opponent.body.functioning === false){
      console.log(`game over - opponent body destroyed`);
      this.showStopper = "Opponent Body Destroyed"
      return true; 
    } else if (player.leftHand.functioning === false && player.rightHand.functioning === false) {
      console.log(`game over - player disabled, no weapons`);
      this.showStopper = "Player Disabled - No Weapons"
      return true; 
    } else if (opponent.rightHand.functioning === false && opponent.leftHand.functioning === false){  
      console.log(`game over - opponent disabled, no weapons`); 
      this.showStopper = "Opponent Disabled - No Weapons" 
      return true;
    }else {
      return false;
    } 
  },
  endTurn() {
    if (this.targetPart !== undefined){
      this.targetPart.damageIndicator();
      // this.targetPart.selector.toggleClass(`damage-indicator`);
      if (this.targetPart.functioning===false){
        this.targetPart.selector.addClass(`hidden`);
      }
    }
    console.log(`${this.currentPlayer.name} turn ended`)
    $attackLog.empty();
    this.playerTurnEndVisibility();
    this.turnSwitcher();
  },
  turnSwitcher(){
    console.log(`removing targetPart`);
    this.targetPart = undefined;
    if (this.gameEndConditionsMet()===true){
      this.gameOver();
    }else if (this.gameEndConditionsMet()===false){
      if (this.playerAttackPhase === true && this.ended === false){
        console.log(`turn switch activated - enemy turn coming up`);
        this.opponentTurn();
      }else if(this.playerAttackPhase === false && this.ended === false){
        console.log(`turn switch activated - player turn coming up`);
        this.playerTurn();
      }else {
        console.log(`something broke at turn switcher`)
      }
    }
  },
  gameRandomNum () {
    return Math.random()*100;  
  },  
  applyDamageAndDisplay() {
    console.log(`target part: ${this.targetPart.name} - current target: ${this.currentTarget.name}`);
    // $attackLog.append(`<li>${this.currentPlayer.name} is targeting ${this.currentTarget.name}'s ${this.targetPart.name}</li>`);
    // this.targetPart.damageIndicator(); this prints out too late
    this.applyDamage();
  },
  randomNGHitConnect (){
    if (this.currentPlayer === player){
      this.toggleTargetingAreas();
    }
    let rNGTotal = Math.random()*(15+this.selectedWeapon.accuracy-this.currentTarget.dodgeBonus);
    if (rNGTotal>50){
      console.log(`rng hit success - ${rNGTotal}`);
      this.randomNGPart ()
      // return true;
    } else {
      console.log(`rng hit missed - ${rNGTotal}`);
      this.attackMissed ();
    }
  },
  attackMissed (){
    console.log(`Attack missed!`);
    $attackLog.append(`<li>${this.currentPlayer.name} attack missed! </li>`);
    this.awaitNextButton();
  
  },
  attackUpArea() {
    let randomNum = this.gameRandomNum();
    if (randomNum < 66) {
      this.targetPart = this.currentTarget.body;
      console.log(`rolled: ${randomNum}`);
      this.applyDamageAndDisplay();
    } else if (randomNum < 74.5) {
      this.targetPart = this.currentTarget.leftHand;
      console.log(`rolled: ${randomNum}`);
      this.applyDamageAndDisplay();
    } else if (randomNum < 83) {
      this.targetPart = this.currentTarget.rightHand;
      console.log(`rolled: ${randomNum}`);
      this.applyDamageAndDisplay();
    } else if (randomNum < 91.5) {
      this.targetPart = this.currentTarget.leftLeg;
      console.log(`rolled: ${randomNum}`);
      this.applyDamageAndDisplay();
    } else if (randomNum <= 100) {
      this.targetPart = this.currentTarget.rightLeg
      console.log(`rolled: ${randomNum}`);
      this.applyDamageAndDisplay();
    } else {
      console.log (`error in randomNGPart - body`)
    }
  },
  attackDownArea () {
    let randomNum = this.gameRandomNum();
    if (randomNum < 33) {
      this.targetPart = this.currentTarget.leftLeg;
      console.log(`rolled: ${randomNum}`);
      this.applyDamageAndDisplay();
    } else if (randomNum < 66) {
      this.targetPart = this.currentTarget.rightLeg;
      console.log(`rolled: ${randomNum}`);
      this.applyDamageAndDisplay();
    } else {
      this.targetPart = this.currentTarget.body;
      console.log(`rolled: ${randomNum}`);
      this.applyDamageAndDisplay();
    }
  },
  attackRightArea(){
    let randomNum = this.gameRandomNum();
    if (randomNum < 66) {
      this.targetPart = this.currentTarget.rightHand;
      console.log(`rolled: ${randomNum}`);
      this.applyDamageAndDisplay();
    } else{
      this.targetPart = this.currentTarget.body
      console.log(`rolled: ${randomNum}`);
      this.applyDamageAndDisplay();
    }
  },
  attackLeftArea(){
    let randomNum = this.gameRandomNum();
    if (randomNum < 66) {
      this.targetPart = this.currentTarget.left;
      console.log(`rolled: ${randomNum}`);
      this.applyDamageAndDisplay();
    } else {
      this.targetPart = this.currentTarget.body;
      console.log(`rolled: ${randomNum}`);
      this.applyDamageAndDisplay();
    }
  },
  randomNGPart (){
    if (this.ended === true) {
      this.gameOver(); // forcing game to end
    } else {
      console.log(`rng part process`)
      if(this.selectedZone === "up"){
        this.attackUpArea();
      } else if(this.selectedZone === "down"){
        this.attackDownArea();
      } else if(this.selectedZone === "right"){
        this.attackRightArea();
      } else if(this.selectedZone === "left"){
        this.attackLeftArea();
      } else {
        console.log (`error in randomNGpart`)
      }
    }
  },
  applyDamage () {
    if (this.ended === true) {
      this.gameOver(); // forcing game to 
    }else if (this.targetPart.functioning === false) {
      console.log(`apply damage - ${this.targetPart.name} not functioning`);
      this.attackMissed();
    } else if (this.selectedWeapon.functioning === false) {
      this.attackMissed() 
    } else {
      console.log(`apply damage - attack success`);
      let damagedPartHP = this.targetPart.currentHP - this.selectedWeapon.damageValue
      if (damagedPartHP <= 0) {
        this.targetPart.currentHP = 0;
        this.targetPart.functioning = false;
        console.log(`${this.targetPart.name} has been broken`)
        $attackLog.append(`
        <li>Attack Successful!</li>
        <li>${this.currentPlayer.name}'s ${this.selectedWeapon.name} has destroyed ${this.currentTarget.name}'s ${this.targetPart.name}.</li>
        `)
        if (this.targetPart.name==="Left Hand"){
          this.currentTarget.sword.functioning = false;
          if (this.currentTarget.name==="Opponent"){
            $(`#opponent-gun`).addClass(`hidden`);
          }else if(this.currentTarget.name=="Player"){
            $(`#player-sword`).addClass(`hidden`);
          }
          // this.currentTarget.sword.selector.addClass(`hidden`);
          console.log(`${this.currentTarget.name}'s sword is broken`);
          $attackLog.append(`
        <li>Weapon Disabled!</li>
        <li>${this.currentTarget.name}'s sword has been disabled.</li>
        `)
        }else if (this.targetPart.name==="Right Hand"){
          this.currentTarget.gun.functioning = false;
          if (this.currentTarget.name==="Opponent"){
            $(`#opponent-sword`).addClass(`hidden`);
          }else if(this.currentTarget.name=="Player"){
            $(`#player-gun`).addClass(`hidden`);
          }
          // if(this.currentTarget.name==="Player"){
          // this.currentTarget.gun.selector.addClass(`hidden`);
          // }
          console.log(`${this.currentTarget.name}'s gun is broken`);
          $attackLog.append(`
            <li>Weapon Disabled!<li>
            <li>${this.currentTarget.name}'s gun has been disabled.</li>
          `)
        }
        this.damageSuccessShow();
        this.targetPart.removeSelf()
        this.targetPart.updateHitPoints();
        console.log(`awaiting next button to be pressed`);
      } else {
        this.targetPart.currentHP = damagedPartHP;
        $attackLog.append(`
        <li>Attack Successful!</li>
        <li>${this.currentPlayer.name}'s ${this.selectedWeapon.name} has struck ${this.currentTarget.name}'s ${this.targetPart.name} for ${this.selectedWeapon.damageValue} damage.</li>
        `)
        this.targetPart.updateHitPoints();
        this.targetPart.damageIndicator()
        this.damageSuccessShow();
        console.log(`${this.targetPart.name} has been damaged`)
        console.log(`awaiting next button to be pressed`);
      }
    }
  },
  awaitNextButton () {
    console.log(`${this.currentPlayer.name} actions completed - summary`);
    this.turnOverVisibility();
    console.log(`print out some data - click end turn`)

  },
  opponentAutoSelectWeapon (){
    console.log(`opponent auto select weapon`);
    let randomNum = Math.random()*100;
    if (randomNum >=50){
      this.selectedWeapon = opponent.sword;
      console.log (`opponent auto selected sword`)
    } else {
      this.selectedWeapon = opponent.gun;
      console.log (`opponent auto selected gun`) // NOTE GRIEVOUS ERROR FIXED. GRIEVOUS SPELLING ERRROR FIXED
    }
  },
  opponentAutoSelectArea (){
    console.log(`opponent auto select area`);
    let randomNum = Math.random()*100;
    if (randomNum < 25){
      this.selectedZone = "up";
      console.log(`opponent selected "up" area`);
    } else if ( randomNum < 50){
      this.selectedZone = "down";
      console.log(`opponent selected "down" area`);
    } else if (randomNum < 75){
      this.selectedZone = "left";
      console.log(`opponent selected "left" area`);
    } else {
      this.selectedZone = "right";
      console.log(`opponent selected "right" area`);
    } 
  },
  displayCurrentPlayer (){
    $currentPlayer.html(`<p>Currently Active:</p>
    <p>${this.currentPlayer.name}</p>`)

  },
  gameOver () {
    console.log(`gameover status`);
    console.log(`player body hp ${player.body.currentHP}
     player arms ${player.leftHand.currentHP} ${player.rightHand.currentHP}
     player legs ${player.leftLeg.currentHP} ${player.rightLeg.currentHP}`)
    console.log(`opponent body hp ${opponent.body.currentHP} opponent arms ${opponent.leftHand.currentHP} ${opponent.rightHand.currentHP} 
    opponent legs ${opponent.leftLeg.currentHP} ${opponent.rightLeg.currentHP}`)
    $mainGame.empty();
    $mainGame.append(`<div id="game-over"><h2>GAME OVER - ${this.showStopper}</h2><div>`)
    this.ended = true;
    this.playerAttackPhase = false;
    this.opponentAttackPhase = false;
    this.currentTarget = undefined;
    this.currentPlayer = undefined;
    this.selectedWeapon = undefined;
    this.selectedZone = undefined;
    this.targetPart = undefined;
    console.log(`GAME SHOULD STOP HERE`)
    return `game ended`
  },
  toggleStartGameButton() {
    $startGame.toggleClass(`hidden`);
  },
  toggleAttackLeft() {
    $attackLeft.toggleClass(`hidden`);
  },
  toggleAttackBody() {
    $attackBody.toggleClass(`hidden`);
  },
  toggleAttackRight() {
    $attackRight.toggleClass(`hidden`);
  },
  toggleAttackLegs() {
    $attackLegs.toggleClass(`hidden`);
  },
  toggleAttackSummary() {
    $attackSummary.toggleClass(`hidden`);
  },
  toggleNextButton() {
    $next.toggleClass(`hidden`);
  },
  toggleEndTurnButton() {
    $endTurn.toggleClass(`hidden`);
  },
  toggleSelectSword() {
    if (player.sword.functioning === false){
      if ($selectSword.hasClass(`hidden`)===false){
        $selectSword.addClass(`hidden`);
      } 
    }else {
      $selectSword.toggleClass(`hidden`);
    }
  },
  toggleSelectGun() {
    if (player.gun.functioning === false){
      if ($selectGun.hasClass(`hidden`)===false){
        $selectGun.addClass(`hidden`);
      }
    }else {
      $selectGun.toggleClass(`hidden`);
    }
  },
  startGameVisibility () {
    this.toggleStartGameButton();
    this.toggleAttackLeft();
    this.toggleAttackRight();
    this.toggleAttackBody();
    this.toggleAttackLegs();
    this.toggleAttackSummary();
    this.toggleNextButton();
    this.toggleEndTurnButton();
    this.toggleWeaponSelection();
  },
  toggleWeaponSelection () {
    this.toggleSelectSword();
    this.toggleSelectGun();
  },
  damageSuccessShow() {
    this.toggleNextButton();
  },
  turnOverVisibility () {
    if ($next.hasClass(`hidden`) === false){
      $next.addClass(`hidden`)
    }
    // if (this.targetPart !== undefined){
    //   this.targetPart.damageIndicator();
    // }
    // TOO EARLY
    
    this.toggleAttackSummary();
    this.toggleEndTurnButton();
  },
  missedVisibility () {
   console.log(`placeholder for now`);
  },
  toggleTargetingAreas () {
    this.toggleAttackLeft();
    this.toggleAttackRight();
    this.toggleAttackBody();
    this.toggleAttackLegs();
  },
  playerTurnEndVisibility () {
    // if (this.targetPart !== undefined){
    //   this.targetPart.damageIndicator();
    // }
    // not a good place for damage indicator
    this.toggleEndTurnButton() ;
    this.toggleAttackSummary ();
    // this.toggleWeaponSelection() ;
  }
}


// STEP 10
// testing out one round 

// STEP 11
// HTML & CSS V1

// STEP 12
// jQuery Selectors



  
  // STEP 13
  // EVENT LISTENERS
  // START GAME
  $startGame.on(`click`, function(event){
    console.log(`$startGame clicked`);
    $(`#first-screen`).addClass(`animated flipOutX`);
    setTimeout(function(){ $(`#first-screen`).remove(); }, 400);
    
    $mainGame.toggleClass(`hidden animated flipInY`);
    game.gameStartSet();
  });

  // WEAPON SELECTION
  $selectSword.on(`click`, function(event){
    console.log(`$selectSword clicked`);
    game.selectedWeapon = player.sword;
    $selectSword.toggleClass(`animated heartBeat`);
    setTimeout(function(){
    game.toggleWeaponSelection();
    game.pressWeaponSelect(); 
    $selectSword.toggleClass(`animated heartBeat`);
    }, 500);
    
  });

  $selectGun.on(`click`, function(event){
    console.log(`$selectGun clicked`);
    game.selectedWeapon = player.gun;
    $selectGun.toggleClass(`animated heartBeat`);
    setTimeout(function(){
      game.toggleWeaponSelection();
      game.pressWeaponSelect();
      $selectGun.toggleClass(`animated heartBeat`);
      }, 500);
    
  });

  // TARGET AREA SELECT
  $attackLeft.on(`click`, function(event){
    console.log(`$attackLeft clicked`);
    $attackLeft.toggleClass(`animated flash`);
    setTimeout(function(){
      game.pressTargetSelect() ;
      $attackLeft.toggleClass(`animated flash`);
    }, 500)
    game.selectedZone = "left" ;
  });

  $attackBody.on(`click`, function(event){
    console.log(`$attackBody clicked`);
    $attackBody.toggleClass(`animated flash`);
    setTimeout(function(){
      game.pressTargetSelect() ;
      $attackBody.toggleClass(`animated flash`);
    }, 500)
    game.selectedZone = "up" ;
  });

  $attackRight.on(`click`, function(event){
    console.log(`$attackRight clicked`);
    $attackRight.toggleClass(`animated flash`);
    setTimeout(function(){
      game.pressTargetSelect() ;
      $attackRight.toggleClass(`animated flash`);
    }, 500)
    game.selectedZone = "right" ;
  });

  $attackLegs.on(`click`, function(event){
    console.log(`$attackLegs clicked`);
    $attackLegs.toggleClass(`animated flash`);
    setTimeout(function(){
      game.pressTargetSelect() ;
      $attackLegs.toggleClass(`animated flash`);
    }, 500)
    game.selectedZone = "down" ;
  });

  // POST BATTLE
  $next.on(`click`, function(event){
    console.log(`$next clicked`);
    game.awaitNextButton() ;
  });

  $endTurn.on(`click`, function(event){
    console.log(`$endTurn clicked`);
    game.endTurn()
  })
  
  
// STEP 13
// Hiding & Showing items during each phase
// game start
// player weapon select
// player area select
// player hit/miss
// opponent summary
// game over

// STEP 14
// Printing out HP on parts


// STEP 15
// Not functioning removed
// Added methods 
// DAMAGE INDICATORS ****

// STEP 16
// BATTLE SUMMARY
// MISSED
// ATTACK SUCCESS
// PART BREAKS

// STEP 17
// REMOVE WEAPON OPTIONS AFTER DESTROYED
// REMOVE WEAPON GRAPHIC AFTER DESTROYED

// STEP 18
// GAME OVER SCREEN

// STEP 19
// START SCREEN

// STEP 20
// ACTUAL ROBOT

// STEP 21
// UPDATE PLAYER ICONS

// STRETCH GOALS
// FANCY MISS INDICATOR
// GAME RESTART




// game.$selectGun.
// game start
// game.selectedWeapon = player.sword; // ANCHOR testing only
// game.selectedZone = "up"; // ANCHOR testing only
// game.gameStartSet();

// game.activateEventListener();

// weapon select
// console.log(game.selectedWeapon);

// area select
// console.log(game.selectedZone);

// player attacks robot
// game.randomNGHitConnect();
// console.log (game)
// console.log(opponent);
// console.log(player)
// // console.log(player)
// // console.log(opponent)

// game.applyDamage()


