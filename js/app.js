console.log(`yup`);


// STEP 1 
// Create class for ROBOTS
// Create class for PARTS

class Robot {
  constructor(body, leftHand, rightHand, leftLeg, rightLeg, sword, gun){
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
  constructor(currentHP, maxHP, functioning, damageValue, accuracy, dodgeValue){
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
const playerBody = new Part (6,6,true,0,0,0,0);
const playerLeftHand = new Part (3,3,true,0,0,0);
const playerRightHand = new Part (3,3,true,0,0,0);
const playerLeftLeg = new Part (3,3,true,0,5,0);
const playerRightLeg = new Part (3,3,true,0,0,5,0);
const playerSword = new Part (0,0,true,1,75,0);
const playerGun = new Part (0,0,true,2,60,0);

// Opponent Parts
const opponentBody = new Part (6,6,true,0,0,0,0);
const opponentLeftHand = new Part (3,3,true,0,0,0);
const opponentRightHand = new Part (3,3,true,0,0,0);
const opponentLeftLeg = new Part (3,3,true,0,5,0);
const opponentRightLeg = new Part (3,3,true,0,0,5,0);
const opponentSword = new Part (0,0,true,1,75,0);
const opponentGun = new Part (0,0,true,2,60,0);


// STEP 4
// Create Robots

const player = new Robot (playerBody, playerLeftHand, playerRightHand, playerLeftLeg, playerRightLeg, playerSword, playerGun);
const opponent = new Robot (opponentBody, opponentLeftHand, opponentRightHand, opponentLeftLeg, opponentRightLeg, opponentSword, opponentGun);

console.log(player)
console.log(opponent)


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
    this.start = true;
    this.playerTurn();
  },
  playerTurn(){
    this.playerAttackPhase = true;
    this.opponentAttackPhase = false;
    this.currentTarget = opponent;
  },
  opponentTurn(){
    this.playerAttackPhase = false;
    this.opponentAttackPhase = true;
    this.currentTarget = player;
  },
  turnSwitcher(){
    if (this.playerAttackPhase === true){
      this.opponentTurn();
    }else{
      this.playerTurn();
    }
  },
  randomNGHitConnect (){
    if ((Math.random()*(15+this.selectedWeapon.accuracy-this.currentTarget.dodgeBonus))>50){
      return true;
    } else {
      attackMissed ();
    }
  },
  attackMissed (){
    console.log(`Attack missed!`);
    //switchTurn
  },
  randomNGPart (){
    let randomNum = Math.random()*100;
    if(this.selectedZone === "up"){
      if (this.targetPart.functioning === false) {
        attackMissed();
      } else if (randomNum < 66) {
        this.targetPart = this.currentTarget.body;
      } else if (randomNum < 74.5) {
        this.targetPart = this.currentTarget.leftHand;
      } else if (randomNum < 83) {
        this.targetPart = this.currentTarget.rightHand;
      } else if (randomNum < 91.5) {
        this.targetPart = this.currentTarget.leftLeg;
      } else {
        this.targetPart = this.currentTarget.rightLeg}
    }
    if(this.selectedZone === "down"){
      if (this.targetPart.functioning === false) {
        attackMissed();
      } else if (randomNum < 33) {
        this.targetPart = this.currentTarget.leftLeg;
      } else if (randomNum < 66) {
        this.targetPart = this.currentTarget.rightLeg;
      } else {
        this.targetPart = this.currentTarget.body}
    }
    if(this.selectedZone === "right"){
      if (this.targetPart.functioning === false) {
        attackMissed();
      } else if (randomNum < 66) {
        this.targetPart = this.currentTarget.rightHand;
      } else {
        this.targetPart = this.currentTarget.body}
    }
    if(this.selectedZone === "left"){
      if (this.targetPart.functioning === false) {
        attackMissed();
      } else if (randomNum < 66) {
        this.targetPart = this.currentTarget.leftHand;
      } else {
        this.targetPart = this.currentTarget.body}
    }
  },
  applyDamage () {
    let damagedPartHP = this.targetPart.currentHP - this.selectedWeapon.damageValue
    if (damagedPartHP <= 0) {
      this.targetPart.functioning = false;
    } else {
      this.targetPart.currentHP = damagedPartHP;
    }
  },
  opponentAutoSelectWeapon (){
    let randomNum = Math.random()*100;
    if (randomNum >=50){
      this.selectedWeapon = opponent.sword;
    } else {
      this.selectedWeapon = opponent.gun;
    }
  },
  opponentAutoSelectArea (){
    let randomNum = Math.random()*100;
    if (randomNum < 25){
      this.selectedZone = "up";
    } else if ( random < 50){
      this.selectedZone = "down";
    } else if (random < 75){
      this.selectedZone = "left";
    } else {
      this.selectedZone = "right"
    } 
  },
  gameOver () {
    if(player.body.functioning === false || opponent.body.functioning === false || player.leftHand.functioning === false && player.rightHand.functioning === false || opponent.rightHand.functioning === false && opponent.leftHand.functioning === false) {
      this.ended = true;
    }
  }
}

// STEP 8 
// Adding in opponent auto select weapon & auto select target zone functions

// STEP 9
// Game ending conditions

