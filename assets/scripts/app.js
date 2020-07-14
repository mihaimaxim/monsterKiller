const attackValue = 9;
const strongAttackValue = 15;
const monsterAttackValue = 12;
const healValue = 20;

const userGivenLife = prompt("Give life!", "100");

let maxLife = parseInt(userGivenLife);

if(isNaN(maxLife) || maxLife <= 0) {
	maxLife = 100;
}

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
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert("you lost!");
		reset();
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
		alert("draw!");
		reset();
	}
};

attackMonster = (damage) => {
	currentMonsterHealth -= damage;
	endRound();
};

attackHandler = () => {
	const damage = dealMonsterDamage(attackValue);
	attackMonster(damage);
	console.log(currentPlayerHealth.toFixed(1));
};

strongAttackHandler = () => {
	const strongDamage = dealMonsterDamage(strongAttackValue);
	attackMonster(strongDamage);
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
	console.log(currentPlayerHealth.toFixed(1));
};

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
