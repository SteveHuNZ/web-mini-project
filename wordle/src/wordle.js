
document.addEventListener("DOMContentLoaded", function() {

    // whe  DOM loaded , and then run the js code
<!--task 1 , test the connection of css and js -->

// function oneDemo(){
//     alert('this is a successful demo')
// }


    // const keys and then use for loop to console key names
    const keys = document.querySelectorAll(".row button");


    let guessedWords =[[]];
    let availableSpace = 1;

    <!--task 3 started -->
    let word = "TARGET"
 // set words api

    // <!--task 3 finished  -->

    let guessedWordCount = 0;
    function  getTileColor(letter, index){
        const isCorrectLetter = word.includes(letter);
        if (!isCorrectLetter){
            return "rgb(58,58,60)";

        }
        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = (letter === letterInThatPosition);
        if(isCorrectPosition){
            return "rgb(83,141,78)";
        }
        return "rgb(181,159,59)";

    }


 // a function handleSubmitWord started
    function handleSubmitWord(){
        const currentWordArr = getCurrentWordArr();
        if(currentWordArr.length !== 6){
            window.alert("word must be 6 letters");
        }
        // combine all the elements of the array into one continuous string without any separator,
        const currentWord = currentWordArr.join("");

        const firstLetterId =guessedWordCount * 6 + 1;

        const interval= 200;
        currentWordArr.forEach((letter,index) =>{
            setTimeout (()=>{
                const tileColor = getTileColor(letter,index);
                const letterId = firstLetterId+ index;
                const letterEl = document.getElementById (letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style =` background-color:${tileColor};border-color:${tileColor}`;

                },interval*index

            );
        });




        guessedWordCount += 1;




        if(currentWord === word){
            window.alert("congratulations!");
        }X

        if (guessedWords.length === 6){
            window.alert(`sorry, you have no more 6 guesses! the word is ${word}.`)
        }
        guessedWords.push([]);

    }

    // a function handleSubmitWord finished






    <!--task 4 'current guess' started -->
// generate 30 squares

    createSquares()
    function createSquares(){
        const gameBoard = document.getElementById("board")


        for (let index =0;index<36; index++){
            let square =document.createElement("div");
            square.classList.add("square");
            square.classList.add('animate__animated');
            square.setAttribute("id",index + 1);
            gameBoard.appendChild(square);

        }
    }

    //  update the guessed words
    function getCurrentWordArr(){
        const numberOfGuessedWords = guessedWords.length
        return guessedWords[numberOfGuessedWords-1]
    }

    function updateGuessedWords (letter){
        const currentWordArr= getCurrentWordArr()
        if(currentWordArr&&currentWordArr.length < 6){
            currentWordArr.push(letter)
            const availableSpaceEl=document.getElementById(String(availableSpace))
            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }


    }



    <!--task 4 'current guess' ended -->


    // handleDeleteLetter function
    function handleDeleteLetter(){
        const currentWordArr = getCurrentWordArr()
        const removedLetter = currentWordArr.pop()
        guessedWords[guessedWords.length-1] = currentWordArr
        const lastLetterEl= document.getElementById(String(availableSpace -1))

        lastLetterEl.textContent = ''
        availableSpace = availableSpace -1;

    }


// <!--task 2 started -->
    // 1, set screen keyboard  keypress event
// document.querySelector('#keyboard').addEventListener('click', function(event) {
//     if (event.target.classList.contains('clickBtn')) {
//         console.log(event.target.textContent);
//     }
// });

    // const keys and then use for loop to console key names
    for (let i = 0; i< keys.length; i++) {
        keys[i].onclick = ({target}) => {
            // const key = target.getAttribute("id");
            const letter = target.getAttribute("id");

            // console.log(key);
            // this is to decide if the word is 6 digital, if it's not the function handlesubmitword will be applyed and the
            // window will alert , please type 6 letter words
            if(letter ==='enter'){
                handleSubmitWord()
                return;
            }

// delete letter function
            if(letter ==='BACKSPACE'){
                handleDeleteLetter()
                return;
            }





            updateGuessedWords(letter)
        };

    }






// 2set the computer keyboard event
    document.addEventListener('keydown', function(event) {
        // Check if the key is one of A-Z, Enter, Backspace, or Escape
        if ((event.key >= 'a' && event.key <= 'z') ||
            event.key === 'Enter' ||
            event.key === 'Backspace' ||
            event.key === 'Escape') {

            // Special handling for the Escape key
            if (event.key === 'Escape') {
                console.log('NewGame');
                // Here, add the logic for starting a new game
            } else {
                // Print the name of the key
                console.log(event.key.toUpperCase())

                // const letter = event.key.toUpperCase();
                const letter = event.key.toUpperCase();

                // this is to decide if the word is 6 digital, if it's not the function handlesubmitword will be applyed and the
                // window will alert , please type 6 letter words
                if(letter ==='Enter'){
                    handleSubmitWord()
                    return
                }




                // delete letter function
                if(letter ==='BACKSPACE'){
                    handleDeleteLetter()
                    return;
                }


                updateGuessedWords(letter)
            }
        }
    });

    //set 2-3 handle the click events and change the background color for screen keyboard

    document.querySelectorAll('.clickBtn').forEach(key => {

        key.addEventListener('click', function() {
            this.classList.add('active');
            // setTimeout(() => this.classList.remove('active'), 1000); // Removes the class after a short delay
        });
    });
    //set 2-4 handle the click events and change the background color for mechanic keyboard
    document.addEventListener('keyup', event => {
        const key = event.key.toUpperCase();
        const button = document.getElementById(`key${key}`);
        if (button) {
            button.style.backgroundColor = 'skyblue'; // Resets the background color
        }
    });


    <!--task 2 ended -->













});