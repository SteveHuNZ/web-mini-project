
document.addEventListener("DOMContentLoaded", function() {

    // whe  DOM loaded , and then run the js code
<!--task 1 , test the connection of css and js -->

// function oneDemo(){
//     alert('this is a successful demo')
// }


    <!--task 3 started -->
    let word = "TARGET"

    // <!--task 3 finished  -->





// <!--task 2 started -->
    // 1, set screen keyboard  keypress event
document.querySelector('#keyboard').addEventListener('click', function(event) {
    if (event.target.classList.contains('clickBtn')) {
        console.log(event.target.textContent);
    }
});

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
                console.log(event.key.toUpperCase());
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




    <!--task 4 'current guess' started -->

    <!--task 4 'current guess' ended -->
















});