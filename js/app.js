showNotes()

// if user adds a note add it to the local Storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
});

// Function to show notes fron the local Storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="mx-2 my-2 noteCards card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`
    });
    let noteElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        noteElm.innerHTML = html;
    }
    else {
        noteElm.innerHTML = `There is nothing to show Please Add some Notes`
    }
}

// Function to Delete the Particular Notes
function deleteNotes(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// Function to delete All Notes
let dltAll = document.getElementById('dltAll');
dltAll.addEventListener('click', function () {
    let confirmDelete = window.confirm('Are you sure want to delete?');
    if (confirmDelete == true) {
        localStorage.clear();
        showNotes();
    }
});

let search = document.getElementById('searchNotes');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    // console.log('input event fired', inputVal);
    let noteCards = document.getElementsByClassName('noteCards');
    Array.from(noteCards).forEach( function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});

/*
// further feature planing
1. Add title
2. Mark a note as inportant
3. Seprates notes for many users
4. Sync and host to the web server

*/