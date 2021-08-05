const addButton = document.querySelector('#add');

addButton.addEventListener('click', () => addNote());

// for updating data
const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}
    // for adding new note 
const addNote = (text = '') => {

    const note = document.createElement('div')
    note.classList.add('note');

    const htmlData = `<div class="operation">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`;

    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note)

    // getting references
    const editButton = note.querySelector('.edit');
    const deleButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');


    // deleting the node 
    deleButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    })

    // toggle using edit icons
    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;



        updateLSData();
    })


    document.body.appendChild(note);

}
// getting data back from localstorage

const notes = JSON.parse(localStorage.getItem('notes'));


if (notes) { notes.forEach(() => addNote(note)) }

