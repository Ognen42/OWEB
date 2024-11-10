const words = ["RIDER", "STORM", "HOUSE", "WORLD", "THROW", "ACTOR", "BRAIN", "CHILD", "SWEET", "NEVER"];

var word;
var revealed_index_1;
var revealed_index_2;
var attempts_remaining;

function start_game() {
    var temp_index = Math.floor(Math.random() * 10);
    word = words[temp_index];
    attempts_remaining = 5;

    document.getElementById("attempts-counter").textContent = "Attempts remaining: " + attempts_remaining;
    document.getElementById("restart-button").style.visibility = "none";

    revealed_index_1 = Math.floor(Math.random() * 5);
    do {
        revealed_index_2 = Math.floor(Math.random() * 5);
    } while(revealed_index_2 == revealed_index_1)

    const word_block = document.getElementById("word-block");
    word_block.innerHTML = "";

    function handle_input(event) {
        event.target.value = event.target.value.toUpperCase();
        check_word();
    }

    for(var i = 0; i < 5; i++) {
        const input = document.createElement("input");
        input.className = "letter-block";
        input.type = "text";
        input.maxLength = 1;

        if((revealed_index_1 == i) || (revealed_index_2 == i)) {
            input.value = word[i];
            input.disabled = true;
        }
        else {
            input.addEventListener("input", handle_input);
        }
    
        word_block.append(input);
    }
}

function check_word() {
    const inputs = document.querySelectorAll(".letter-block:enabled");
    var all_inputs_flag = true;
    var correct_inputs_flag = true;

    for(var i = 0; i < inputs.length; i++) {
        var current = inputs[i];

        if(!current.value) {
            all_inputs_flag = false;
            break;
        }

        var full_index = 0;
        var all_blocks = current.parentNode.children;

        for(var j = 0; j < all_blocks.length; j++) {
            if(all_blocks[j] == current) {
                full_index = j;
                break;
            }
        }

        if(current.value.toUpperCase() !== word[full_index])
            correct_inputs_flag = false;
    }

    if(all_inputs_flag) {
        if(correct_inputs_flag) {
            alert("Congratulations on winning the game!");
            document.getElementById("restart-button").style.display = "inline";
        }
        else {
            attempts_remaining--;
            document.getElementById("attempts-counter").textContent = "Attempts remaining: " + attempts_remaining;

            if(attempts_remaining == 0) {
                alert("Game over!\nThe word was " + word);
                document.getElementById("restart-button").style.display = "inline";
            }
            else {
                alert("Wrong word! Try again!");
                for (var i = 0; i < inputs.length; i++)
                    inputs[i].value = "";
            }
        }
    }
}

start_game();