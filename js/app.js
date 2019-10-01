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
  constructor(currentHP, maxHP, functioning, damageValue, accuracy){
    this.currentHP = currentHP; //obj
    this.maxHP = maxHP; //obj
    this.functioning = functioning; //obj
    this.damageValue = damageValue; //obj
    this.accuracy = accuracy; //obj
  }
}

let opponentsPartsArr = [

]

let playerPartsArr = [

]