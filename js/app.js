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

class Parts {
  constructor(currentHP, maxHP, functioning, damageValue, accuracy, dodgeValue){
    this.currentHP = currentHP; //obj
    this.maxHP = maxHP; //obj
    this.functioning = functioning; //obj
    this.damageValue = damageValue; //obj
    this.accuracy = accuracy; //obj
    this.dodgeValue = dodgeValue; //obj
  }
}

let opponentsPartsArr = [

]

let playerPartsArr = [

]


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

// STEP 4
// Create Robots


