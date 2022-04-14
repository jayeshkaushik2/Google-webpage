function Voice_command() {
    // have to add a css animation on the micIcon
    document.getElementById("micIcon").style.animation = "pulstate";
    
    if ("webkitSpeechRecognition" in window) {
        const search = document.querySelector(".serach");
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        const recognition = new window.SpeechRecognition();
        recognition.interimResult = true;

        let p = document.createElement('p');
        recognition.addEventListener('result', (e) => {
            const text = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
            complete_Query = Join_Query(text);
            document.getElementById('search').value = text;
            SearchTheQuery(complete_Query);
        })
        recognition.start();

    } else {
        console.log("Speech Recognition Not Available")
    }
}

function Join_Query(query) {
    let googleSearch = "https://www.google.com/search?q=";
    if (query != null) {
        let perv = query[0];
        for (let i = 0; i < query.length; i++) {
            if (perv == " " & query[i] == " ") {
                continue;
            }
            else if (query[i] == " " & perv != " ") {
                googleSearch += "+";
                perv = query[i];
            }
            else {
                googleSearch += query[i];
                perv = query[i];
            }
        };
        return googleSearch;
    }
}

function SearchTheQuery(completeQuery) {
    // assigning a new page to the current window(thatopened in the tab)
    window.location.assign(completeQuery);
}

function searchQuery() {
    let query = document.getElementById('search').value;
    complete_Query = Join_Query(query);
    SearchTheQuery(complete_Query);
}

let val = document.getElementById("search");
val.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchBtn").click();
    }
})