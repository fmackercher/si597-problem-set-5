
document.getElementById('show_rhymes').addEventListener('click', fetchRhymes);
document.getElementById('show_synonyms').addEventListener('click', fetchSynonyms);

async function fetchRhymes() {
    const userRhyme = document.getElementById('word_input').value;
    document.getElementById("output_description").innerHTML = `Words that rhyme with ${userRhyme}`;
    async function fetchRhy(word) {
        const url = 'https://api.datamuse.com/words?rel_rhy=' + userRhyme;
        const response = await fetch(url);
        const words = await response.json();
        return words;
    }

    const wordList = await fetchRhy(userRhyme);
    console.log(wordList);

    var container = document.getElementById('word_output');
    const groupedList = groupBy(wordList, 'numSyllables');
    console.log(groupedList);
    const resultList = Object.values(groupedList);
    console.log(resultList);
    if (resultList.length == 0) {
        var div = document.createElement("div");
        div.innerHTML = "(no results)";
        container.appendChild(div);
    } else {
        /*for (let i = 0; i < resultList.length; i++) {
            const divEl = document.createElement("span");
            //add syllable num here i+1 for int + for syll
            for (j = 0; j < resultList[i].length; j++) {
                const list = document.createElement("li");
                list.setAttribute('id', 'li_item');
                const button = document.createElement('button');
                const text1 = resultList[i][j].word;
                const listItem = document.createTextNode(text1);
                list.append(listItem, ' ');
                button.setAttribute('id', `save_word_${i}`);
                button.classList.add('btn', 'btn-outline-success');
                button.innerHTML = "Save";
                list.appendChild(button);
                container.appendChild(list);
                document.getElementById(`save_word_${i}`).addEventListener('click', function () {
                    document.getElementById('saved_words').append(text1, ', ');
                });
            }
        }*/
        for (let i = 0; i < resultList[0].length + resultList[1].length + resultList[2].length; i++) {
            const list = document.createElement("li");
            list.setAttribute('id', 'li_item');
            const button = document.createElement('button');
            const text1 = resultList[0][i].word;
            const listItem = document.createTextNode(text1);
            list.append(listItem, ' ');
            button.setAttribute('id', `save_word_${i}`);
            button.classList.add('btn', 'btn-outline-success');
            button.innerHTML = "Save";
            list.appendChild(button);
            container.appendChild(list);
            document.getElementById(`save_word_${i}`).addEventListener('click', function () {
                document.getElementById('saved_words').append(text1, ', ');
            });
        }
    }
}


async function fetchSynonyms() {
    const userSyn = document.getElementById('word_input').value;
    document.getElementById("output_description").innerHTML = `Words with a similar meaning to ${userSyn}`;
    async function fetchSyn(word) {
        const url = 'https://api.datamuse.com/words?rel_syn=' + userSyn;
        const response = await fetch(url);
        const words = await response.json();
        return words;
    }
    const wordList = await fetchSyn(userSyn);
    var container = document.getElementById('word_output');
    if (wordList.length == 0) {
        var div = document.createElement("div");
        div.innerHTML = "(no results)";
        container.appendChild(div);
    } else {
        for (let i = 0; i < wordList.length; i++) {
            const list = document.createElement("li");
            list.setAttribute('id', 'li_item');
            const button = document.createElement('button');
            const text = wordList[i].word;
            const listItem = document.createTextNode(text);
            list.append(listItem, ' ');
            button.setAttribute('id', `save_word_${i}`);
            button.classList.add('btn', 'btn-outline-success');
            button.innerHTML = "Save";
            list.appendChild(button);
            container.appendChild(list);
            button.addEventListener('click', function () {
                document.getElementById('saved_words').append(text, ', ');
            });
        }
    }

}

/*for (var i = 0; i < wordList.length; i++) {
    (function () {
        var list = document.createElement("li");
        var button = document.createElement('button');
        var text = wordList[i].word;
        var listItem = document.createTextNode(text);
        list.appendChild(listItem);
        button.setAttribute('id', `save_word_${i}`);
        button.innerHTML = "Save";
        list.appendChild(button);
        container.appendChild(list);
        document.getElementById(`save_word_${i}`).addEventListener('click', function () { makeItHappen(listItem); }, false);
    }());
}*/



function groupBy(objects, property) {
    // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
    // value for property (obj[property])
    if (typeof property !== 'function') {
        const propName = property;
        property = (obj) => obj[propName];
    }

    const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
    for (const object of objects) {
        const groupName = property(object);
        //Make sure that the group exists
        if (!groupedObjects.has(groupName)) {
            groupedObjects.set(groupName, []);
        }
        groupedObjects.get(groupName).push(object);
    }

    // Create an object with the results. Sort the keys so that they are in a sensible "order"
    const result = {};
    for (const key of Array.from(groupedObjects.keys()).sort()) {
        result[key] = groupedObjects.get(key);
    }
    return result;
}

/*function fetchRhymes() {
    const userRhyme = document.getElementById('word_input').value;
    document.getElementById("output_description").innerHTML = `Words that rhyme with ${userRhyme}`;
    //document.getElementById('word_output').innerHTML =
    console.log(userRhyme);
    const promise = fetch('https://api.datamuse.com/words?rel_rhy=' + userRhyme);
    promise.then((response) => {
        console.log("response:", response)
        return response.text();
    })
        .then((data) => { console.log(data); })
}*/

/*function fetchSynonyms() {
    var userSyn = document.getElementById('word_input').value;
    console.log(userSyn);
    document.getElementById("output_description").innerHTML = `Words with a similar meaning to ${userSyn}`;
    //document.getElementById('word_output').innerHTML =
    fetch('https://api.datamuse.com/words?rel_syn=' + userSyn)
        .then(function (response) {
            console.log("Response:", response)
            return response.json();
        })
        .then(function (data) { console.log(data); })
        .then(function (data) {
            appendData(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
}

function appendData(data) {
    var container = document.getElementById('word_output');
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = data[i].word;
        container.appendChild(div);
    }
}*/
