$(document).ready(function () {
	const urlParams = new URLSearchParams(window.location.search);
	const userId = urlParams.get('ch') || '1';
	// Show the modal (Bootstrap 5 way)
// const gameModal = new bootstrap.Modal(document.getElementById('game-modal'));
// gameModal.show();

  
	// Update navigation links with userId
	$(".nav-links").each(function () {
	  const currentHref = $(this).attr("href").split('?')[0];
	  $(this).attr("href", `${currentHref}?ch=${userId}`);
	});
  
	function genGame() {
	  const randoNumber = $('<section>')
		.attr("class", "randomNumber")
		.append("<div class='panel-heading'><h4> Crystal Points </h4></div><div class='panel-body'><div class='pTwo' id='random-number'>00</div></div>");
  
	  const userGuess = $('<section>')
		.attr("id", "user-number")
		.attr("class", "userNumber")
		.append("<div class='panel-heading'><h4> Your Points </h4></div><div class='panel-body'><div class='pTwo'>00</div></div>");
  
	  const crystalOne = $('<button>')
		.attr("id", "crystal-one")
		.attr("class", "crystal crystalOne")
		.append("<div class='panel-body'><img id='crystal-img-one' class='crystalimg' src='images/gem1_blue.png'></div><div id='crystal-caption-one' class='caption'><h6>Rutilated Quartz Point</h6></div>");
  
	  const crystalTwo = $('<button>')
		.attr("id", "crystal-two")
		.attr("class", "crystal crystalTwo")
		.append("<div class='panel-body'><img id='crystal-img-two' class='crystalimg' src='images/gem2_green.png'></div><div id='crystal-caption-two' class='caption'><h6>Rutilated Quartz Point</h6></div>");
  
	  const crystalThree = $('<button>')
		.attr("id", "crystal-three")
		.attr("class", "crystal crystalThree")
		.append("<div class='panel-body'><img id='crystal-img-three' class='crystalimg' src='images/gem3_red.png'></div><div id='crystal-caption-three' class='caption'><h6>Rutilated Quartz Point</h6></div>");
  
	  const crystalFour = $('<button>')
		.attr("id", "crystal-four")
		.attr("class", "crystal crystalFour")
		.append("<div class='panel-body'><img id='crystal-img-four' class='crystalimg' src='images/gem4_white.png'></div><div id='crystal-caption-four' class='caption'><h6>Rutilated Quartz Point</h6></div>");
  
	  const game = $('<div>')
		.attr("class", "playgames")
		.append(randoNumber, crystalOne, crystalTwo, userGuess, crystalThree, crystalFour);
  
	  $("#crystalgame").append(game);
	}
  
	let randoNumber;
	let userNumber;
	const upperLimit = 100;
	const lowerLimit = 20;
	let randoCrystalOne, randoCrystalTwo, randoCrystalThree, randoCrystalFour;
	let totalWins = 0;
	let totalLosses = 0;
	let randoCrystalNames = [];
	let randoCrystalImgs = [];
  
	const crystalNames = ["blue gem", "green gem", "red gem", "white gem"];
	const crystalImgs = [
	  "images/gem1_blue.png",
	  "images/gem2_green.png",
	  "images/gem3_red.png",
	  "images/gem4_white.png"
	];
  
	function randoGen() {
	  randoNumber = Math.floor(Math.random() * upperLimit + lowerLimit);
	  $("#random-number").text(randoNumber);
	  $("#wins .panel-body").text(totalWins);
	  $("#losses .panel-body").text(totalLosses);
	}
  
	function changeCrystalImg() {
	  randoCrystalNames = [];
	  randoCrystalImgs = [];
	  for (let i = 0; i < 4; i++) {
		const val = Math.floor(Math.random() * crystalNames.length);
		randoCrystalNames.push(crystalNames[val]);
		randoCrystalImgs.push(crystalImgs[val]);
	  }
	}
  
	function assignCrystals() {
	  changeCrystalImg();
	  randoCrystalOne = Math.floor(Math.random() * (upperLimit / 5) + 1);
	  randoCrystalTwo = Math.floor(Math.random() * (upperLimit / 5) + 1);
	  randoCrystalThree = Math.floor(Math.random() * (upperLimit / 5) + 1);
	  randoCrystalFour = Math.floor(Math.random() * (upperLimit / 5) + 1);
  
	  $("#crystal-one").data("value", randoCrystalOne).find("#crystal-img-one").attr("src", randoCrystalImgs[0]);
	  $("#crystal-caption-one").text(randoCrystalNames[0]);
  
	  $("#crystal-two").data("value", randoCrystalTwo).find("#crystal-img-two").attr("src", randoCrystalImgs[1]);
	  $("#crystal-caption-two").text(randoCrystalNames[1]);
  
	  $("#crystal-three").data("value", randoCrystalThree).find("#crystal-img-three").attr("src", randoCrystalImgs[2]);
	  $("#crystal-caption-three").text(randoCrystalNames[2]);
  
	  $("#crystal-four").data("value", randoCrystalFour).find("#crystal-img-four").attr("src", randoCrystalImgs[3]);
	  $("#crystal-caption-four").text(randoCrystalNames[3]);
	}
  
	function addCrystal() {
	  const addCrystalValue = $(this).data("value");
	  userNumber = parseInt(userNumber) + parseInt(addCrystalValue);
	  $("#user-number .panel-body").text(userNumber);
  
	  if (userNumber < randoNumber) return;
  
	  if (userNumber === randoNumber) {
		$(".modal-title").text("Crystal Collector");
		$(".modal-text").text("Congratulations! You Won!");
		$("#game-modal").modal();
	  } else {
		$(".modal-title").text("Crystal Collector");
		$(".modal-text").text("Oh no! You've gone over. You'll need the exact combination to win.");
		$("#game-modal").modal();
		totalLosses++;
		startGame();
	  }
	}
  
	function startGame() {
	  randoNumber = 0;
	  userNumber = 0;
	  $("#crystalgame").empty();
  
	  genGame();
	  randoGen();
	  assignCrystals();
	}
  
	startGame();
	$(document).on("click", ".crystal", addCrystal);
  });
  