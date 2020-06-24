let page, score, answered, secsLeft;
var heading = document.querySelector(".display");
var startBtn = document.querySelector("#start-btn");
var nxtBtn = document.querySelector("#next-btn");
var button = document.querySelector(".btn");
var ansBtns = document.querySelector("#ans-btns");
var questEl = document.querySelector("#question");
var questContEl = document.querySelector("#questcont");
var results = document.querySelector('.results');
var intro = document.querySelector("#preamble");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var restart = document.querySelector(".game-over")
var clock = document.querySelector(".timer");
var ansChoice = [];
const answers = ["Monomers / Polymers", "Carbohydrates", "Lipds", "Proteins", "Neucleotides"];
const fauxAns = ["Nucleic Acids", "Glycogen", "Collegen", "Carboxyl Group", "Phospholipids"]
const questions = ["What is/are a structural basis in which the four main macromolecules or biopolymers of biochemistry are based on?", 
"Which of these is a dissachiride composed of sucrose (glucose + fructose)?",
"Which is a triglyceride with a glycerol molecule on the left and three fatty acids coming off it",
"What are the general structure of an α-amino acid?",
"Adenine, cytosine, guanine, thymine, and uracil are examples of what?"];

function startFcn() {
    console.log("Quiz has begun");
    page = 0;
    score = 0;
    startTimer();
    startBtn.classList.add("hide");
    nxtBtn.classList.remove('hide');
    intro.classList.add("hide");
    questContEl.classList.remove("hide");
    results.classList.add('hide');

    nxtQuest();
}

function nxtQuest() {
    heading.classList.add("hide");
    if(page > questions.length - 1){
        gameOver();
    } else {
        resetState();
        questEl.innerHTML = questions[page];
        popAnsChoice();
    }
}

function nxtPage() {
    page++;
    if(page > questions.length - 1){
        nxtBtn.classList.add("game-over");
        nxtBtn.textContent = "Restart"
        secsLeft = secs;
    }
}

function popAnsChoice() {
    //Building answer choice vectors with correct answer as the first entry
    for(let i = 1; i < 4; i++){
        ansChoice[0] = answers[page];
        var j = randomIndex(answers);
        var ans = answers[j];
        console.log(j + " index, val: " + answers[j]);
        var repeat = null;
        repeat = ansChoice.indexOf(ans); //tried "hacking" a check for repeats: if there exists a value in the ansChoice vector, then it will return the index and is threfore a number otherwise it is undefined
        console.log(repeat);
        if( repeat > -1){
            while( repeat !== -1){ //introducing faux answers into the mix while checking for repetitions
            var j = randomIndex(fauxAns);
            var fAns = fauxAns[j];
            repeat = ansChoice.indexOf(fAns);
            ansChoice[i] = fAns;
            }
        } else {
        ansChoice[i] = answers[j];
        }
    }
    //Randomly populating answer choices using Fisher-Yates algo in order to ensure there are no repeating correct answers
    for(let i = ansChoice.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * i);
        var entry = ansChoice[i];
        ansChoice[i] = ansChoice[j];
        ansChoice[j] = entry;
    }
    // Use doc select to grab elements and include text content
    ansChoice.forEach(ansChoice => {
        var button = document.createElement("button");
        button.innerText = ansChoice;
        button.classList.add("btn");
        if(ansChoice == answers[page]){
            console.log("-right answer-");
            button.dataset.type = true;
        } else {
            console.log("-wrong answer-");
            button.dataset.type = false;
        }
        button.addEventListener("click", selectAns);
        ansBtns.appendChild(button);
    })

}

function resetState() {
    heading.classList.add("hide");
    nxtBtn.classList.add('grey-out');
    answered = false;
    while(ansBtns.firstChild) {
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

function selectAns(choice) {
    var selectedBtn = choice.target;
    var correct = selectedBtn.dataset.type;
    correct = stringToBoolean(correct);
    console.log("answer selected");
    console.log("correct = " + correct);
    for(let i = 0; i < 4; i++){
        var bool = stringToBoolean(ansBtns.childNodes[i].dataset.type);
        console.log(bool)
        if(bool) {
            ansBtns.childNodes[i].classList.add("right");
        } else {
            ansBtns.childNodes[i].classList.add("blur");
        }
    }
    if(correct){
        selectedBtn.classList.remove("blur");
        selectedBtn.classList.add("right");
        score++;
        console.log("score: " + score);
        heading.classList.remove("hide");
        heading.textContent = "Correct!"
        heading.setAttribute("style", "color: green;")

    } else {
        var mins = parseInt(minutesDisplay.textContent);
        secs = mins * 60 + parseInt(secondsDisplay.textContent);
        secs = secs - 60;
        if(secs % 60 < 10){
            secondsDisplay.textContent = "0" + secs % 60;
          } else {
          secondsDisplay.textContent = secs % 60;}
          minutesDisplay.textContent = Math.floor( secs / 60 );
        selectedBtn.classList.remove("blur");
        selectedBtn.classList.add("wrong");
        console.log("score: " + score);
        heading.classList.remove("hide");
        heading.textContent = "Inorrect :("
        heading.setAttribute("style", "color: red;")
    }
    nxtBtn.classList.remove("grey-out");
    answered = true;
    
}

// Timer Function
var clockRunning = false;
let interval, secs;

function startTimer() {
    if(clockRunning){
      return;
    }
    clockRunning = true;
    clock.classList.remove("hide");
    interval = setInterval(function() {
  
      var mins = parseInt(minutesDisplay.textContent);
      secs = mins * 60 + parseInt(secondsDisplay.textContent);
        if(answered){
            secs = secs;
            clock.classList.add('blur');
        } else {
            clock.classList.remove('blur');
      secs = secs - 1;
        }
      //console.log('secs= ' + secs);
      if(secs % 60 < 10){
        secondsDisplay.textContent = "0" + secs % 60;
      } else {
      secondsDisplay.textContent = secs % 60;}
      minutesDisplay.textContent = Math.floor( secs / 60 );
  
      if(parseInt(minutesDisplay.textContent) < 0) {
        clearInterval(interval);
        gameOver();
      }
  
    }, 1000);
  }
// Game Over Screen
function gameOver() {
    if(secs < 0){
        secs = 0;
        results.lastElementChild.innerHTML = "with " + secs + " seconds left";
    }
    results.firstElementChild.innerHTML = "You scored " + 100 * score / answers.length + "%";
    results.lastElementChild.innerHTML = "with " + secs + " seconds left";
    results.classList.remove('hide');
    questContEl.classList.add('hide');
    clock.classList.add('hide');
}
// Randomizes index of any array
function randomIndex(vect) {
    return Math.floor(Math.random() * vect.length);
}

// Leveraging string to boolean function from https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
function stringToBoolean(string){
    switch(string.toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
}
// Vector Building ---------------------------------------------------------------------------

//------------------------------------------------------------------------------------

startBtn.addEventListener("click", startFcn);
button.addEventListener("click", function(){
    if(answered){
    } else {
        selectAns();
    }
    });

nxtBtn.addEventListener("click", function(){
    if(answered){
    nxtPage();
    nxtQuest();
    }
});



//7. Monomers and Polymers  Monomers and polymers are a structural basis in which the four main macromolecules or biopolymers, (Carbohydrates, lipids, proteins, and nucleic acids) of biochemistry are based on.  Monomers are smaller micromolecules that are put together to make macromolecules.  Polymers are those macromolecules that are created when monomers are synthesized together. When they are synthesized, the two molecules undergo a process called dehydration synthesis.
//8. CARBOHYDRATES  A molecule of sucrose (glucose + fructose), a disaccharide.  Carbohydrates have monomers called monosaccharides. Some of these monosaccharides include glucose (C6H12O6), fructose (C6H12O6), and deoxyribose (C5H10O4). When two monosaccharides undergo dehydration synthesis, water is produced, as two hydrogen atoms and one oxygen atom are lost from the two monosaccharides' carboxyl group.
//9. LIPIDS  A triglyceride with a glycerol molecule on the left and three fatty acids coming off it.  Lipids are usually made up of a molecule of glycerol and other molecules. In triglycerides, or the main lipid, there is one molecule of glycerol, and three fatty acids. Fatty acids are considered the monomer in that case, and could be saturated or unsaturated. Lipids, especially phospholipids, are also used in different pharmaceutical products, either as co-solubilisers e.g. in Parenteral infusions or else as drug carrier components (e.g. in a Liposome or Transfersome ).
//10. PROTEINS  The general structure of an α-amino acid, with the amino group on the left and the carboxyl group on the right.  Proteins are large molecules, and have monomers of amino acids. There are 20 standard amino acids, and they contain a carboxyl group, an amino group, and an "R" group. The "R" group is what makes each amino acid different. When Amino acids combine, they form a special bond called a peptide bond, and become a polypeptide, or a protein.
//11. NUCLEIC ACIDS  The structure of deoxyribonucleic acid (DNA), the picture shows the monomers being put together.  Nucleic acids are very important in biochemistry, as they are what make up DNA, something all cellular organism use to store their genetic information. The most common nucleic acids are deoxyribonucleic acid and ribonucleic acid.
//12.  Their monomers are called nucleotides. The most common nucleotides are called adenine, cytosine, guanine, thymine, and uracil. Adenine binds with thymine and uracil, thymine only binds with adenine, and cytosine and guanine can only bind with each other.

//excecuting functions