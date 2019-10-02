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
}

class Part {
  constructor(name, currentHP, maxHP, functioning, damageValue, accuracy, dodgeValue){
    this.name = name; // str
    this.currentHP = currentHP; //obj
    this.maxHP = maxHP; //obj
    this.functioning = functioning; //obj
    this.damageValue = damageValue; //obj
    this.accuracy = accuracy; //obj
    this.dodgeValue = dodgeValue; //obj
  }
}



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
const playerBody = new Part ("playerBody",6,6,true,0,0,0,0);
const playerLeftHand = new Part ("playerLeftHand", 3,3,true,0,0,0);
const playerRightHand = new Part ("playerRighthand",3,3,true,0,0,0);
const playerLeftLeg = new Part ("playerLeftLeg",3,3,true,0,0,7.5);
const playerRightLeg = new Part ("playerRightLeg",3,3,true,0,0,0,7.5);
const playerSword = new Part ("playerSword",0,0,true,1,75,0);
const playerGun = new Part ("playerGun",0,0,true,2,60,0);

// Opponent Parts
const opponentBody = new Part ("opponentBody",6,6,true,0,0,0,0);
const opponentLeftHand = new Part ("opponentLeftHand",3,3,true,0,0,0);
const opponentRightHand = new Part ("opponentRightHand",3,3,true,0,0,0);
const opponentLeftLeg = new Part ("opponentLeftLeg",3,3,true,0,5,0);
const opponentRightLeg = new Part ("opponentRightLeg",3,3,true,0,0,5,0);
const opponentSword = new Part ("opponentSword",0,0,true,1,75,0);
const opponentGun = new Part ("opponentGun",0,0,true,2,60,0);


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
  gameStartSet() {
    console.log(`game start`);
    this.start = true;
    this.playerTurn();
  },
  startNewTurn() {
    if (this.currentPlayer === opponent){
      this.opponentAutoSelectWeapon();
      this.opponentAutoSelectArea();
      this.randomNGHitConnect()
    } else {

    }

  },
  playerTurn(){
    this.playerAttackPhase = true;
    this.opponentAttackPhase = false;
    this.currentTarget = opponent;
    this.currentPlayer = player;
    console.log(`player turn started `);
    game.randomNGHitConnect() // NOTE testing only
  },
  opponentTurn(){
    this.playerAttackPhase = false;
    this.opponentAttackPhase = true;
    this.currentTarget = player;
    this.currentPlayer = opponent;
    console.log (`opponent turn started`);
    this.startNewTurn();
  },
  turnSwitcher(){
    if(player.body.functioning === false || opponent.body.functioning === false || player.leftHand.functioning === false && player.rightHand.functioning === false || opponent.rightHand.functioning === false && opponent.leftHand.functioning === false){  
      console.log(`game over`)    
      this.gameOver(); 
    }else{
      if (this.playerAttackPhase === true){
        console.log(`turn switch activated - enemy turn coming up`);
        this.opponentTurn();
      }else if(this.playerAttackPhase === false){
        console.log(`turn switch activated - player turn coming up`);
        this.playerTurn();
      }else {
        console.log(`something broke at turn switcher`)
      }
  }
    
  },
  randomNGHitConnect (){
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
    this.turnSwitcher();
  },
  randomNGPart (){
    let randomNum = Math.random()*100;
    console.log(`rng part process`)
    if(this.selectedZone === "up"){
     /*  if (this.targetPart.functioning === false) {
        console.log(`target part is missing - attack will count as a miss ${randomNum} ${this.target.part}`)
        attackMissed();
      } else */ if (randomNum < 66) {
        this.targetPart = this.currentTarget.body;
        console.log(`rolled: ${randomNum} - target part: ${this.targetPart.name} - current target: ${this.currentTarget.name}`);
        this.applyDamage();
      } else if (randomNum < 74.5) {
        this.targetPart = this.currentTarget.leftHand;
        console.log(`rolled: ${randomNum} - target part: ${this.targetPart.name} - current target: ${this.currentTarget.name}`);
        this.applyDamage();
      } else if (randomNum < 83) {
        this.targetPart = this.currentTarget.rightHand;
        console.log(`rolled: ${randomNum} - target part: ${this.targetPart.name} - current target: ${this.currentTarget.name}`);
        this.applyDamage();
      } else if (randomNum < 91.5) {
        this.targetPart = this.currentTarget.leftLeg;
        console.log(`rolled: ${randomNum} - target part: ${this.targetPart.name} - current target: ${this.currentTarget.name}`);
        this.applyDamage();
      } else {
        this.targetPart = this.currentTarget.rightLeg}
        console.log(`rolled: ${randomNum} - target part: ${this.targetPart.name} - current target: ${this.currentTarget.name}`);
        this.applyDamage();
    }
    if(this.selectedZone === "down"){
   /*    if (this.targetPart.functioning === false) {
        attackMissed();
      } else  */if (randomNum < 33) {
        this.targetPart = this.currentTarget.leftLeg;
        this.applyDamage();
      } else if (randomNum < 66) {
        this.targetPart = this.currentTarget.rightLeg;
      } else {
        this.targetPart = this.currentTarget.body}
    }
    if(this.selectedZone === "right"){
     /*  if (this.targetPart.functioning === false) {
        attackMissed();
      } else  */if (randomNum < 66) {
        this.targetPart = this.currentTarget.rightHand;
        this.applyDamage();
      } else {
        this.targetPart = this.currentTarget.body}
        this.applyDamage();
    }
    if(this.selectedZone === "left"){
     /*  if (this.targetPart.functioning === false) {
        attackMissed();
      } else  */if (randomNum < 66) {
        this.targetPart = this.currentTarget.leftHand;
        this.applyDamage();
      } else {
        this.targetPart = this.currentTarget.body}
        this.applyDamage();
    }
  },
  applyDamage () {
    if (this.targetPart.functioning === false) {
      console.log(`apply damage - ${this.targetPart.name} not functioning`);
      this.attackMissed();
    } else if (this.selectedWeapon.functioning === false) {
      this.attackMissed() 
    } else {
      console.log(`apply damage - attack success`);
      let damagedPartHP = this.targetPart.currentHP - this.selectedWeapon.damageValue
      if (damagedPartHP <= 0) {
        targetPart.currentHP = 0;
        this.targetPart.functioning = false;
        if (targetPart.name==="opponentLeftHand"||targetPart.name==="playerLeftHand"){
          currentTarget.gun.functioning = false
        }else if (targetPart.name==="opponentRightHand"||targetPart.name==="playerRightHand"){
          currentTarget.gun.functioning = false
        }
        console.log(`${this.targetPart.name} has been broken`)
        this.turnSwitcher()
      } else {
        this.targetPart.currentHP = damagedPartHP;
        console.log(`${this.targetPart.name} has been damaged`)
        this.turnSwitcher()
      }
    }
    
  },
  opponentAutoSelectWeapon (){
    console.log(`opponent auto select weapon`);
    let randomNum = Math.random()*100;
    if (randomNum >=50){
      this.selectedWeapon = opponent.sword;
    } else {
      this.selectedWeapon = opponent.gun;
    }
  },
  opponentAutoSelectArea (){
    console.log(`opponent auto select area`);
    let randomNum = Math.random()*100;
    if (randomNum < 25){
      this.selectedZone = "up";
    } else if ( randomNum < 50){
      this.selectedZone = "down";
    } else if (randomNum < 75){
      this.selectedZone = "left";
    } else {
      this.selectedZone = "right"
    } 
  },
  gameOver () {
    console.log(`gameover status`);
    console.log(`player body hp ${player.body.currentHP} player arms ${player.leftHand.currentHP} ${player.rightHand.currentHP}`)
    console.log(`opponent body hp ${opponent.body.currentHP} opponent arms ${opponent.leftHand.currentHP} ${opponent.rightHand.currentHP}`)
    this.ended = true;
    return `game ended`
  }
}


// STEP 10
// testing out one round 

// game start
game.selectedWeapon = player.sword;
game.selectedZone = "up";
game.gameStartSet();

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
// FIX GAME OVER STATUS