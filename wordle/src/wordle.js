
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

    // <!--task 3 finished  -->
 // a function handleSubmitWord started
    function handleSubmitWord(){
        const currentWordArr = getCurrentWordArr();
        if(currentWordArr.length !== 6){
            window.alert("word must be 6 letters");
        }
        // combine all the elements of the array into one continuous string without any separator,
        const currentWord = currentWordArr.join("");
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
            // this is to decide if the word is 5 digital, if it's not the function handlesubmitword will be applyed and the
            // window will alert , please type  5 letter words
            if(letter ==='enter'){
                handleSubmitWord()
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
                console.log(event.key)

                // const letter = event.key.toUpperCase();
                const letter = event.key;





                updateGuessedWords(letter)
            }
        }
    });

    //set 2-3 handle the click events and change the background color for screen keyboard

    document.querySelectorAll('.clickBtn').forEach(key => {

        key.addEventListener('click', function() {
            this.classList.add('active');
            setTimeout(() => this.classList.remove('active'), 1000); // Removes the class after a short delay
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