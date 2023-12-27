
document.addEventListener("DOMContentLoaded", function() {

    // whe  DOM loaded , and then run the js code
<!--task 1 , test the connection of css and js -->

// function oneDemo(){
//     alert('this is a successful demo')
// }

<!--task 2 started -->
document.querySelector('#keyboard').addEventListener('click', function(event) {
    if (event.target.classList.contains('clickBtn')) {
        console.log(event.target.textContent);
    }
});
<!--task 2 ended -->
















});