var randomGeneration = function () {
	let initialArr = new Array(18 * 18).fill(1);

	function getArrVoisinDindex(index) {
		let arrVoisin = [];
		if ((index - 1) % 18 != 17) {
			arrVoisin.push(index - 1);
		}
		if ((index + 1) % 18 != 0) {
			arrVoisin.push(index + 1);
		}
		arrVoisin.push(index - 18);
		arrVoisin.push(index + 18);
		// only keep acceptable values
		return arrVoisin.filter(value => value >= 0 && value < initialArr.length);;
	}

	function nbVoisinVide(index) {
		return getArrVoisinDindex(index).filter(val => initialArr[val] == 0).length;
	}

	const indexStart = Math.floor(Math.random() * initialArr.length) + 1;
	initialArr[indexStart] = 0;
	let arrVoisin, arrBifurc = [indexStart];

	while (arrBifurc.length != 0) {
		arrVoisin = getArrVoisinDindex(arrBifurc.pop());
		while (arrVoisin.length != 0) {
			const nombreRandom = Math.floor(Math.random() * arrVoisin.length);
			let voisinIndex = arrVoisin[nombreRandom];
			if (nbVoisinVide(voisinIndex) <= 1) {
				initialArr[voisinIndex] = 0;
				arrBifurc.push(voisinIndex);
				arrVoisin = getArrVoisinDindex(voisinIndex);
			} else {
				arrVoisin = arrVoisin.filter(item => item !== voisinIndex);
			}
		}
	}

	initialArr[indexStart] = "s";

	for (let k = 0; k < 18; ++k) {
		const index = k * 18 + k * 2;
		initialArr.splice(index, 0, 1);
		initialArr.splice(index + 19, 0, 1);
	}
	for (let i = 0; i < 20; ++i) {
		initialArr.unshift(1);
		initialArr.push(1);
	}

	return initialArr;
}

function fusionRandomGeneration() {
	// que des murs
	let initialArr = new Array(18 * 18).fill(1);
	
	// array avec les indexs de chaque case comme valeur
	// index == value
	let arrIndexsRestantPossibleDeRendreVide = [];
	for (let i = 0; i < 18 * 18; i++) { arrIndexsRestantPossibleDeRendreVide.push(i); }
	
	function getArrVoisinDindex(index) {
		let arrVoisin = [];
		if ((index - 1) % 18 != 17) {
			arrVoisin.push(index - 1);
		}
		if ((index + 1) % 18 != 0) {
			arrVoisin.push(index + 1);
		}
		arrVoisin.push(index - 18);
		arrVoisin.push(index + 18);
		// only keep acceptable values
		return arrVoisin.filter(value => value >= 0 && value < initialArr.length);
	}
	
	function nbVoisinVide(index) {
		return getArrVoisinDindex(index).filter(val => initialArr[val] == 0).length;
	}
	
	function getIndexesMursJuxtapose(index) {
		let arrayVoisin = getArrVoisinDindex(index);
		return arrayVoisin.filter(indexVoisin => initialArr[indexVoisin] == 1);
	}
	
	function getIndexesMursJuxtaposeAvecPlusDeDeuxVoisinsVides(index) {
		let indexesVoisinsMurs = getIndexesMursJuxtapose(index);
		return indexesVoisinsMurs.filter(indexVoisin => nbVoisinVide(indexVoisin) > 2);
	}
	
	console.log('passe here');
	
	var nbPasse = 0;
	
	while (arrIndexsRestantPossibleDeRendreVide.length != 0 && nbPasse < 10_000) {
		// on choisi un index random dans l'array d'index encore disponible
		let indexArrayRandom = Math.floor(Math.random() * arrIndexsRestantPossibleDeRendreVide.length);
		let indexCase = arrIndexsRestantPossibleDeRendreVide[indexArrayRandom];
		
		// on rend vide la case 
		initialArr[indexCase] = 0;
		
		// on enlève la case qui vient d'etre vidée de l'array d'indexs possibles
		arrIndexsRestantPossibleDeRendreVide.splice(indexArrayRandom, 1);
		
		// on doit enlever au array les cases qui sont des murs
		indexesDesMursJuxtaposeCaseVide = getIndexesMursJuxtaposeAvecPlusDeDeuxVoisinsVides(indexCase);
		
		if (indexesDesMursJuxtaposeCaseVide.length) {
			// pour cela on enlève de arrIndexsRestantPossibleDeRendreVide les indexs des cases qui sont des murs définitifs
			arrIndexsRestantPossibleDeRendreVide = arrIndexsRestantPossibleDeRendreVide.filter(val => !indexesDesMursJuxtaposeCaseVide.includes(val));
		}
		
		nbPasse++;
	}
	
	console.log('nbPasse : ' + nbPasse);
	
	// fermer le labyrinthe
	// close the maze
	for (let k = 0; k < 18; ++k) {
		const index = k * 18 + k * 2;
		initialArr.splice(index, 0, 1);
		initialArr.splice(index + 19, 0, 1);
	}
	for (let i = 0; i < 20; ++i) {
		initialArr.unshift(1);
		initialArr.push(1);
	}
	
	return initialArr;
}