const library = document.querySelector('main');
const addBtn = document.getElementById('addBtn');
const addBtnDiv = document.getElementById('addBtnDiv');

let myLibrary = [];

render();
createForm();
 
function createForm() {
    const form = document.createElement('form');
    const authorInput = document.createElement('input');
    const titleInput = document.createElement('input');
    const pagesInput = document.createElement('input');
    const submitBtn = document.createElement('button');

    addBtn.addEventListener('click', (event) => {
        form.setAttribute('action', 'post')
        form.setAttribute('class', 'form');
        authorInput.setAttribute('type', 'text');
        titleInput.setAttribute('type', 'text');
        pagesInput.setAttribute('type', 'number');
        pagesInput.setAttribute('id', 'pagesInput');
    
        authorInput.setAttribute('placeholder', 'Author');
        titleInput.setAttribute('placeholder', 'Title');
        pagesInput.setAttribute('placeholder', 'Pages');

        submitBtn.classList.add('submitBtn');
        submitBtn.innerText = '✔️';

        library.insertBefore(form, addBtnDiv);
        form.appendChild(authorInput);
        form.appendChild(titleInput);
        form.appendChild(pagesInput);
        form.appendChild(submitBtn);
    });

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        if (authorInput.value !== '' && titleInput.value !== '' && pagesInput.value !== '') {
            addBookToLibrary(authorInput.value, titleInput.value, pagesInput.value);
            render();
            authorInput.value = ''; 
            titleInput.value = '';
            pagesInput.value = '';
            form.remove();
        }
    });

}

function book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
    const newBook = new book(author, title, pages, read);
    myLibrary.push(newBook);
}

function render() {
    if (myLibrary.length > 0) {
        for (let i = myLibrary.length - 1; i < myLibrary.length; i++) {
            createBook(myLibrary[i]);
        }
    }
    
    else {
        for (let i = 0; i < myLibrary.length; i++) {
            createBook(myLibrary[i]);
        }
    }
    
}

function createBook(item) {
    const cardDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const buttonsDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    cardDiv.classList.add('book');
    buttonsDiv.classList.add('buttonsDiv');
    removeBtn.classList.add('bookButton');
    readBtn.classList.add('bookButton');

    titleDiv.textContent = `«${item.title}»`;
    cardDiv.appendChild(titleDiv);

    authorDiv.textContent = `by ${item.author}`;
    cardDiv.appendChild(authorDiv);

    pagesDiv.textContent = `Pages: ${item.pages}`;
    cardDiv.appendChild(pagesDiv);

    removeBtn.innerText = 'Remove';
    readBtn.innerText = 'Read';

    removeBtn.addEventListener('click', () => {
        cardDiv.remove();
        myLibrary.splice(-1);
    })

    readBtn.addEventListener('click', () => {
        if (item.read !== true) {
            item.read = true;
            cardDiv.setAttribute('class', 'bookRead');
            readBtn.innerText = 'Unread';
        }
        else if (item.read === true) {
            item.read = false;
            cardDiv.setAttribute('class', 'book')
            readBtn.innerText = 'Read';
        }
    })

    cardDiv.appendChild(buttonsDiv);
    buttonsDiv.appendChild(removeBtn);
    buttonsDiv.appendChild(readBtn);
    library.insertBefore(cardDiv, addBtnDiv);
}