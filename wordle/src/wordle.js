let state = undefined;

const WORD_LENGTH = 6;
const MAX_GUESSES = 6;



async function getWord() {
    let server_data = await fetch(`https://words.trex-sandwich.com/?length=${WORD_LENGTH}`);
    let json_data = await server_data.json();
    console.log(json_data)
    let word = json_data[0].toUpperCase();
    return word.split("");
}

async function isWordValid(word) {
    // TODO: Stub method, complete later
    return true;
}

async function initState(newgame) {
    if (newgame || !localStorage.getItem("gameState")) {
        state = {
            target: [],
            current: [],
            gameOver: false,
            prior: []
        };

        state.target = await getWord();
        stateChanged();
    } else {
        state = JSON.parse(localStorage.getItem("gameState"));
        stateChanged();
    }
}

function _updateOnScreenEnterKey() {
    if (state.current.length === WORD_LENGTH) {
        document.querySelector("#enter").classList.remove("btn-disabled");
    } else {
        document.querySelector("#enter").classList.add("btn-disabled");
    }
}

function _updateOnScreenBackspaceKey() {
    // Update backspace
    if (state.current.length > 0) {
        document.querySelector("#BACKSPACE").classList.remove("btn-disabled");
    } else {
        document.querySelector("#BACKSPACE").classList.add("btn-disabled");
    }
}

function _updateCurrentGuess() {
    let area = document.querySelector("#guess");
    area.innerHTML = "";

    state.current.forEach(letter => {
        let div = document.createElement("div");
        div.classList.add("square");
        div.innerText = letter;
        area.append(div);
    });

    for (let i = 0; i < (WORD_LENGTH - state.current.length); i++) {
        let div = document.createElement("div");
        div.classList.add("square");
        area.append(div);
    }
}

function _updatePriorGuesses() {
    let area = document.querySelector("#history");
    area.innerHTML = "";
    state.prior.forEach(guess => {
        guess.forEach((letter, idx) => {
            let div = document.createElement("div");
            div.classList.add("square");

            if (!state.target.includes(letter)) {
                div.classList.add("grey");
            } else if (state.target[idx] === letter) {
                div.classList.add("green");
            } else {
                div.classList.add("yellow");
            }

            div.innerText = letter;
            area.append(div);
        });
    });

    for (let i = 0; i < (MAX_GUESSES - state.prior.length); i++) {

        for (let j = 0; j < WORD_LENGTH; j++) {

            let div = document.createElement("div");
            div.classList.add("square");
            area.append(div);
        }
    }
}

function _updateOnScreenKeyboard() {

}

function stateChanged() {
    if (!state.gameOver) {
        // Update enter key
        _updateOnScreenEnterKey();
        _updateOnScreenBackspaceKey();

        _updateCurrentGuess();
        _updatePriorGuesses();
        _updateOnScreenKeyboard();

        if (state.prior.length > 0) {
            if (state.target.join("") === state.prior[state.prior.length - 1].join("")) {
                alert("You win");
                state.gameOver = true;
            }

            if (state.prior.length === MAX_GUESSES) {
                state.gameOver = true;
            }
        }
    }

    window.localStorage.setItem("gameState", JSON.stringify(state));
}

function alphaKey(key) {
    if (!state.gameOver) {
        if (state.current.length < WORD_LENGTH) {
            state.current.push(key);
            stateChanged();
        }
    }
}

async function enterKey() {
    if (!state.gameOver) {
        if (state.current.length === WORD_LENGTH) {
            if (await isWordValid(state.current)) {
                state.prior.push(state.current);
                state.current = [];

                // TODO: submit the guess


                stateChanged();
            } else {
                // TODO: Animate the bad word
            }
        }
    }
}

function backspaceKey() {
    if (!state.gameOver) {
        if (state.current.length > 0) {
            state.current.pop();
            stateChanged();
        }
    }
}

function  escapeKey(){

        // let startNewGame = confirm("Do you wish to start a new game?");
        // if (startNewGame) {
        //     initState(true);
        // }


}

function _wireClickHandlers() {
    document.querySelectorAll(".alpha").forEach(b => {
        b.addEventListener("click", () => { alphaKey(b.id); })
    });
    document.querySelector("#enter").addEventListener("click", enterKey);
    document.querySelector("#BACKSPACE").addEventListener("click", backspaceKey);
    document.querySelector("#NewGame").addEventListener("click",  escapeKey);

}

function _wireKeyHandlers() {
    // Key handlers
    window.addEventListener("keydown", async (evt) => {
        if (evt.key === "Enter") {
            await enterKey();
        } else if (evt.key === "Backspace") {
            backspaceKey();
        }else if (evt.key === "Escape") {
            escapeKey();
        }
        else if (evt.key.match(/^[a-zA-Z]$/)) {
            alphaKey(evt.key.toUpperCase());
        }
    });
}

function wireHandlers() {
    _wireClickHandlers();
    _wireKeyHandlers();
}



window.addEventListener("load", async () => {
    wireHandlers();
    await initState();
});
