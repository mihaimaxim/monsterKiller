const attackValue = 9;
const strongAttackValue = 15;
const monsterAttackValue = 25;
const healValue = 20;

giveMaxLife = () => {
   const userGivenLife = prompt("Give life!", "100");
   let parsedLife = parseInt(userGivenLife);
   if (isNaN(parsedLife) || parsedLife <= 0) {
      throw { message: "Entered value is not valid!" };
   }
   return parsedLife;
};

let maxLife;

try {
   maxLife = giveMaxLife();
} catch (error) {
	console.log(error);
	maxLife = 100;
}

let battleLog = [];

const logAttack = "ATTACK";
const logStrongAttack = "STRONG_ATTACK";
const logMonsterAttack = "MONSTER_ATTACK";
const logHeal = "HEAL";
const logGameOver = "GAME_OVER";

writeToLog = (outcome, action) => {
   let logEntry = {
      outcome: outcome,
      action: action,
   };

   // if (action === logAttack) {
   // 	logEntry;
   // } else if (action === logStrongAttack) {
   // 	logEntry;
   // } else if (action === logMonsterAttack) {
   // 	logEntry;
   // } else if (action === logHeal) {
   // 	logEntry;
   // } else if (action === logGameOver) {
   // 	logEntry;
   // }

   switch (action) {
      case logAttack:
         logEntry;
         break;
      case logStrongAttack:
         logEntry;
         break;
      case logMonsterAttack:
         logEntry;
         break;
      case logHeal:
         logEntry;
         break;
      case logGameOver:
         logEntry;
         break;
   }

   battleLog.push(logEntry);
};

let currentMonsterHealth = maxLife;
let currentPlayerHealth = maxLife;
let hasExtraLife = true;

adjustHealthBars(maxLife);

reset = () => {
   currentMonsterHealth = maxLife;
   currentPlayerHealth = maxLife;
   resetGame(maxLife);
   addBonusLife();
   hasExtraLife = true;
};

attackHandler = () => {
   const damage = dealMonsterDamage(attackValue);
   monsterAttack(damage);
   writeToLog(null, logAttack);
};

strongAttackHandler = () => {
   const strongDamage = dealMonsterDamage(strongAttackValue);
   monsterAttack(strongDamage);
   writeToLog(null, logStrongAttack);
};

monsterAttack = (damage) => {
   currentMonsterHealth -= damage;
   endRound();
};

healHandler = () => {
   let heal;
   if (currentPlayerHealth >= maxLife - healValue) {
      alert("no more!");
      heal = maxLife - currentPlayerHealth;
   } else {
      heal = healValue;
   }
   // const healDamage = increasePlayerHealth(heal);
   // currentPlayerHealth += healDamage;
   increasePlayerHealth(heal);
   currentPlayerHealth += heal;
   endRound();
   writeToLog(null, logHeal);
};

endRound = () => {
   const playerDamage = dealPlayerDamage(monsterAttackValue);
   currentPlayerHealth -= playerDamage;

   if (currentPlayerHealth <= 0 && hasExtraLife) {
      currentPlayerHealth = maxLife;
      removeBonusLife();
      hasExtraLife = false;
      setPlayerHealth(maxLife);
      alert("no worries!");
   }

   if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      alert("you won!");
      reset();
      writeToLog("CHAMPION!", null);
   } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
      alert("you lost!");
      reset();
      writeToLog("LOSER!", null);
   } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
      alert("draw!");
      reset();
      writeToLog("DRAW!", null);
   }
};

logBattle = () => {
   // console.log(battleLog);
   // for (let i = 0; i < battleLog.length; i++) {
   // 	console.log(battleLog[i]);
   // }
   for (const element of battleLog) {
      console.log(element);
   }
};

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
logBtn.addEventListener("click", logBattle);
