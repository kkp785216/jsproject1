update()

// if user adds a note save it to the local Storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    myObj = {
        title: addTitle.value,
        notes: addTxt.value
    }

    notesObj.push(myObj);

    localStorage.setItem('notes', JSON.stringify(notesObj));

    addTitle.value = "";
    addTxt.value = "";
    update()
});

// Function to show notes fron the local Storage
let notesDiv = document.getElementById('notes');
function update() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="mx-2 my-2 noteCards card" style="width: 18rem;">
        <div class="card-body note-body">
        <h5 class="card-title" style="color: #a2cfa2;">Note ${index + 1}</h5>
        <h5 class="card-titlee">${element.title}</h5>
        <p class="card-text">${element.notes}</p>
        <button id="edit${index}" onclick="editNotes(${index})" class="btn btn-primary btn-sm">Edit</button>
        <button id="delete${index}" onclick="deleteNotes(${index})" class="btn btn-primary btn-sm">Delete Note</button>
        </div>
        </div>`;
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
    let title = localStorage.getItem('title');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    update()
}

// Function to delete All Notes
let deleteAll = document.getElementById('dltAll');
deleteAll.addEventListener('click', function () {
    let confirm = window.confirm('Are you sure want to delete?');
    if (confirm == true) {
        localStorage.clear();
    }
    update()
})

// Function for edit notes
function editNotes(index) {
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');
    let addBtn = document.getElementById('addBtn')
    let updateBtn = document.querySelector('.buttonUpdate');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    addTitle.value = notesObj[index].title;
    addTitle.focus();
    addTxt.value = notesObj[index].notes;

    let updateHtml = `<button class="btn btn-success"  id="updateBtn${index}" onclick="updateNote(${index})">Update</button>`;
    addBtn.style.display = "none";
    updateBtn.innerHTML= updateHtml;
}

function updateNote(index) {
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');
    let addBtn = document.getElementById('addBtn')
    let updateBtn = document.querySelector('.buttonUpdate')
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj[index].title = addTitle.value;
    notesObj[index].notes = addTxt.value;
    let myStr = JSON.stringify(notesObj);
    localStorage.setItem('notes', myStr)

    updateBtn.innerHTML= '';
    addBtn.style.display = "block";
    addTitle.value = ''
    addTxt.value = ''
    update()
}

// Function to search notes
let searchInput = document.getElementById('searchNotes');
searchInput.addEventListener('input', 
function search(){
    let noteBody = document.querySelectorAll('.noteCards');
    noteBody.forEach(function (element, index) {
        let title = element.querySelector('.card-titlee');
        let note = element.querySelector('.card-text');
        let titleFilter = title.innerText.includes(searchInput.value)
        let noteFilter =  note.innerText.includes(searchInput.value);
        if(titleFilter == true || noteFilter == true) {
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
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