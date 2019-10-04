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
      this.sword.selector.addClass(`hidden`);
    } else if (this.rightHand.functioning===false){
      this.gun.selector.addClass(`hidden`)
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
      this.selector.addClass(`hidden`);
    }
  }
  damageIndicator(){
    this.selector.toggleClass(`damage-indicator`)
  }
}

//jQuery
  // START GAME
  $startGame = $(`#temporary-start`)

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
  $next = $(`#next`)
  $endTurn = $(`#end-turn`)
  
  // GAME MISC
  $damageIndicator = $(`#damage-indicator`)
  $healthPoint = $(`#health-point`)
  $currentPlayer = $(`#current-player`)

  // PLAYER STATUS
  $playerSword = $(`#player-sword`)
  $playerLeftArm = $(`#player-left-arm`)
  $playerLeftLeg = $(`#player-left-leg`)
  $playerBody = $(`#player-body`)
  $playerRightLeg = $(`#player-right-leg`)
  $playerRightArm = $(`#player-right-arm`)
  $playerGun = $(`#player-gun`)


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
const playerBody = new Part ("playerBody",6,6,true,0,0,0,$playerBody);
const playerLeftHand = new Part ("playerLeftHand", 3,3,true,0,0,0,$playerLeftArm);
const playerRightHand = new Part ("playerRighthand",3,3,true,0,0,0,$playerRightArm);
const playerLeftLeg = new Part ("playerLeftLeg",3,3,true,0,0,5,$playerLeftLeg);
const playerRightLeg = new Part ("playerRightLeg",3,3,true,0,0,5,$playerRightLeg);
const playerSword = new Part ("playerSword",0,0,true,1,75,0);
const playerGun = new Part ("playerGun",0,0,true,2,60,0);
const playerPartsArr = [
  playerBody,
  playerLeftHand,
  playerLeftLeg,
  playerRightHand,
  playerRightLeg
]

// Opponent Parts
const opponentBody = new Part ("opponentBody",6,6,true,0,0,0,$opponentBody);
const opponentLeftHand = new Part ("opponentLeftHand",3,3,true,0,0,0,$opponentLeftArm);
const opponentRightHand = new Part ("opponentRightHand",3,3,true,0,0,0,$opponentRightArm);
const opponentLeftLeg = new Part ("opponentLeftLeg",3,3,true,0,0,5,$opponentLeftLeg);
const opponentRightLeg = new Part ("opponentRightLeg",3,3,true,0,0,5,$opponentRightLeg);
const opponentSword = new Part ("opponentSword",0,0,true,1,75,0);
const opponentGun = new Part ("opponentGun",0,0,true,2,60,0);
const opponentPartsArr = [
  opponentBody,
  opponentLeftHand,
  opponentLeftLeg,
  opponentRightHand,
  opponentRightLeg
]


// STEP 4
// Create Robots

const player = new Robot ("player", playerBody, playerLeftHand, playerRightHand, playerLeftLeg, playerRightLeg, playerSword, playerGun);
const opponent = new Robot ("opponent", opponentBody, opponentLeftHand, opponentRightHand, opponentLeftLeg, opponentRightLeg, opponentSword, opponentGun);

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
      return true; 
    } else if (opponent.body.functioning === false){
      console.log(`game over - opponent body destroyed`);
      return true; 
    } else if (player.leftHand.functioning === false && player.rightHand.functioning === false) {
      console.log(`game over - player disabled, no weapons`);
      return true; 
    } else if (opponent.rightHand.functioning === false && opponent.leftHand.functioning === false){  
      console.log(`game over - opponent disabled, no weapons`);  
      return true;
    }else {
      return false;
    } 
  },
  endTurn() {
    if (this.targetPart !== undefined){
      this.targetPart.damageIndicator();
    }
    this.targetPart = undefined;
    console.log(`${this.currentPlayer.name} turn ended`)
    this.playerTurnEndVisibility();
    this.turnSwitcher();
  },
  turnSwitcher(){
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
    // if (this.currentPlayer === player){
    this.awaitNextButton();
    // } else {

    // }
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
      this.targetPart = this.currentTarget.leftHand;
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
        if (this.targetPart.name==="opponentLeftHand"||this.targetPart.name==="playerLeftHand"){
          this.currentTarget.sword.functioning = false
          console.log(`${this.currentTarget.name}'s sword is broken`);
        }else if (this.targetPart.name==="opponentRightHand"||this.targetPart.name==="playerRightHand"){
          this.currentTarget.gun.functioning = false
          console.log(`${this.currentTarget.name}'s gun is broken`);
        }
        this.damageSuccessShow();
        this.targetPart.removeSelf()
        this.targetPart.updateHitPoints();
        console.log(`awaiting next button to be pressed`);
      } else {
        this.targetPart.currentHP = damagedPartHP;
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
    $currentPlayer.html(`<p>Currently Playing:</p>
    <p>${this.currentPlayer.name}</p>`)

  },
  gameOver () {
    console.log(`gameover status`);
    console.log(`player body hp ${player.body.currentHP}
     player arms ${player.leftHand.currentHP} ${player.rightHand.currentHP}
     player legs ${player.leftLeg.currentHP} ${player.rightLeg.currentHP}`)
    console.log(`opponent body hp ${opponent.body.currentHP} opponent arms ${opponent.leftHand.currentHP} ${opponent.rightHand.currentHP} 
    opponent legs ${opponent.leftLeg.currentHP} ${opponent.rightLeg.currentHP}`)

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
    $selectSword.toggleClass(`hidden`);
  },
  toggleSelectGun() {
    $selectGun.toggleClass(`hidden`);
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
    game.gameStartSet()
  });

  // WEAPON SELECTION
  $selectSword.on(`click`, function(event){
    console.log(`$selectSword clicked`);
    game.selectedWeapon = player.sword;
    game.toggleWeaponSelection();
    game.pressWeaponSelect();
  });

  $selectGun.on(`click`, function(event){
    console.log(`$selectGun clicked`);
    game.selectedWeapon = player.gun;
    game.toggleWeaponSelection();
    game.pressWeaponSelect();
  });

  // TARGET AREA SELECT
  $attackLeft.on(`click`, function(event){
    console.log(`$attackLeft clicked`);
    game.selectedZone = "left" ;
    game.pressTargetSelect() ;
  });

  $attackBody.on(`click`, function(event){
    console.log(`$attackBody clicked`);
    game.selectedZone = "up" ;
    game.pressTargetSelect() ;
  });

  $attackRight.on(`click`, function(event){
    console.log(`$attackRight clicked`);
    game.selectedZone = "right" ;
    game.pressTargetSelect() ;
  });

  $attackLegs.on(`click`, function(event){
    console.log(`$attackLegs clicked`);
    game.selectedZone = "down" ;
    game.pressTargetSelect() ;
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

// STEP 17
// MISS INDICATOR


// STEP 18
// COOL GRAPHICS


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


