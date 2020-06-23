let page;
var startBtn = document.querySelector("#start-btn");
var nxtBtn = document.querySelector("#next-btn");
var button = document.querySelector(".btn");
var ansBtns = document.querySelector("#ans-btns");
var questEl = document.querySelector("#question");
var questContEl = document.querySelector("#questcont");
var intro = document.querySelector("#preamble")
var ansChoice = [];
const answers = ["Monomers / Polymers", "Carbohydrates", "Lipds", "Proteins", "Neucleotides"];
const fauxAns = ["Nucleic Acids", "Glycogen", "Collegen", "Carboxyl Group", "Phospholipids"]
const questions = ["What is/are a structural basis in which the four main macromolecules or biopolymers of biochemistry are based on?", 
"Which of these is a dissachiride composed of sucrose (glucose + fructose)?",
"Which is a triglyceride with a glycerol molecule on the left and three fatty acids coming off it",
"What is the general structure of an α-amino acid?",
"Adenine, cytosine, guanine, thymine, and uracil are examples of what?"];

function startFcn() {
    console.log("Quiz has begun");
    page = 0;
    startBtn.classList.add("hide");
    intro.classList.add("hide");
    questContEl.classList.remove("hide");

    nxtQuest();
}

function nxtQuest() {
    resetState();
    questEl.innerHTML = questions[page];
    popAnsChoice();
}

function nxtPage() {
    page++;
}

function popAnsChoice() {
    //Building answer choice vectors with correct answer as the first entry
    for(let i = 1; i < 4; i++){
        ansChoice[0] = answers[page];
        var j = randomIndex(answers);
        if( j == page){
            j = randomIndex(fauxAns);
            ansChoice[i] = fauxAns[j];
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
            console.log("right ans")
            button.dataset.type = true;
        } else {
            button.dataset.type = false;
        }
        button.addEventListener("click", selectAns);
        ansBtns.appendChild(button);
    })

}

function resetState() {
    nxtBtn.classList.add('hide');
    while(ansBtns.firstChild) {
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

function selectAns(choice) {
    var selectedBtn = choice.target;
    var correct = selectedBtn.dataset.type;
    console.log("answer selected");
    if(correct){
        alert("correct!");
    }
}

// Fcn to check answers with
function checkAns() {

}
// Randomizes index of any array
function randomIndex(vect) {
    return Math.floor(Math.random() * vect.length);
}
// Vector Building ---------------------------------------------------------------------------

//Building answer choice vectors with correct answer as the first entry
for(let i = 1; i < 4; i++){
    ansChoice[0] = answers[page];
    var j = randomIndex(answers);
    if( j == page){
        j = randomIndex(fauxAns);
        ansChoice[i] = fauxAns[j];
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
for(let i = 0; i < 4; i++){
    button.selectedIndex = i;
}

//------------------------------------------------------------------------------------

startBtn.addEventListener("click", startFcn);
button.addEventListener("click", checkAns);

//7. Monomers and Polymers  Monomers and polymers are a structural basis in which the four main macromolecules or biopolymers, (Carbohydrates, lipids, proteins, and nucleic acids) of biochemistry are based on.  Monomers are smaller micromolecules that are put together to make macromolecules.  Polymers are those macromolecules that are created when monomers are synthesized together. When they are synthesized, the two molecules undergo a process called dehydration synthesis.
//8. CARBOHYDRATES  A molecule of sucrose (glucose + fructose), a disaccharide.  Carbohydrates have monomers called monosaccharides. Some of these monosaccharides include glucose (C6H12O6), fructose (C6H12O6), and deoxyribose (C5H10O4). When two monosaccharides undergo dehydration synthesis, water is produced, as two hydrogen atoms and one oxygen atom are lost from the two monosaccharides' carboxyl group.
//9. LIPIDS  A triglyceride with a glycerol molecule on the left and three fatty acids coming off it.  Lipids are usually made up of a molecule of glycerol and other molecules. In triglycerides, or the main lipid, there is one molecule of glycerol, and three fatty acids. Fatty acids are considered the monomer in that case, and could be saturated or unsaturated. Lipids, especially phospholipids, are also used in different pharmaceutical products, either as co-solubilisers e.g. in Parenteral infusions or else as drug carrier components (e.g. in a Liposome or Transfersome ).
//10. PROTEINS  The general structure of an α-amino acid, with the amino group on the left and the carboxyl group on the right.  Proteins are large molecules, and have monomers of amino acids. There are 20 standard amino acids, and they contain a carboxyl group, an amino group, and an "R" group. The "R" group is what makes each amino acid different. When Amino acids combine, they form a special bond called a peptide bond, and become a polypeptide, or a protein.
//11. NUCLEIC ACIDS  The structure of deoxyribonucleic acid (DNA), the picture shows the monomers being put together.  Nucleic acids are very important in biochemistry, as they are what make up DNA, something all cellular organism use to store their genetic information. The most common nucleic acids are deoxyribonucleic acid and ribonucleic acid.
//12.  Their monomers are called nucleotides. The most common nucleotides are called adenine, cytosine, guanine, thymine, and uracil. Adenine binds with thymine and uracil, thymine only binds with adenine, and cytosine and guanine can only bind with each other.

//excecuting functions