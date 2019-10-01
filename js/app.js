console.log(`yup`);


// STEP 1 
// Create class for ROBOTS
// Create class for PARTS

class Robot {
  constructor(body, leftHand, rightHand, leftLeg, rightLeg, sword, gun){
    this.body = body; //obj
    this.leftHand = leftHand; //obj
    this.rigthHand = rightHand; //obj
    this.leftLeg = leftLeg; //obj
    this.rightLeg = rightLeg; //obj
    this.sword = sword; //obj
    this.gun = gun; //gun
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

game = {
  start: false,
  ended: false,
  baseEvade: 0,
  playerAttackPhase: false,
  opponentAttackPhase: false
}


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


// Step 5
// Create RNG function for each zone