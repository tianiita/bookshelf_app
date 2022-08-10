const bookList = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const BOOK_KEY = 'BOOKSHELF_APPS';

function bookId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, bookCheck) {
    return {
        id,
        title,
        author,
        year,
        bookCheck
    }
}

function addBook () {
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const bookCheck = document.getElementById('inputBookIsComplete').checked;

    const generateBookId = bookId();
    const bookObject = generateBookObject (generateBookId, bookTitle, bookAuthor, bookYear, bookCheck);
    bookList.push(bookObject);
    Toastify({
        text: 'Berhasil menambahkan buku',
        className: 'info',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
        }
    }).showToast();

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
}

function findBook (bookId) {
    for (const bookItem of bookList) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function findBookIndex (bookId) {
    for (const index in bookList) {
        if (bookList[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

function bookShelf(bookObject) {
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookObject.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = 'Penulis: ' + bookObject.author;

    const bookYear = document.createElement('p');
    bookYear.innerText = 'Tahun: ' + bookObject.year;

    const container = document.createElement('article');
    container.classList.add('book_item');

    const bookButton = document.createElement('div');
    bookButton.classList.add('green', 'red', 'orange','action');

    container.append(bookTitle, bookAuthor, bookYear);
    container.append(bookButton);
    container.setAttribute('id', `bookList-${bookObject.id}`);

    if (bookObject.bookCheck) {
        const incompleteButton = document.createElement('button');
        incompleteButton.classList.add('green');
        incompleteButton.innerText = 'Belum Selesai dibaca';

        incompleteButton.addEventListener('click', function () {
            incompleteBookshelf(bookObject.id);
        });

        const removeButton = document.createElement('button');
        removeButton.classList.add('red');
        removeButton.innerText = 'Hapus buku';

        removeButton.addEventListener('click', function () {
            removeBookshelf(bookObject.id);
            Toastify({
                text: 'Berhasil menghapus buku',
                className: 'info',
                style: {
                    background: 'linear-gradient(to right, #c34d32, #1c2f45)',
                }
            }).showToast();
        });

        const editButton = document.createElement('button');
        editButton.classList.add('orange');
        editButton.innerText = 'Edit buku';

        editButton.addEventListener('click', function () {
            const editBox = document.querySelector('.edit_box');
            const editClose = document.getElementById('editClose');
            const editForm = document.getElementById('editBook');
        
            const editTitle = document.getElementById('editBookTitle');
            editTitle.value = bookObject.title;
        
            const editAuthor = document.getElementById('editBookAuthor');
            editAuthor.value = bookObject.author;
        
            const editYear = document.getElementById('editBookYear');
            editYear.value = bookObject.year;
        
            const editIsCompleted = document.getElementById('editBookIsCompleted');
            editIsCompleted.checked = bookObject.bookCheck;
        
            editForm.addEventListener('submit', function (ev) {
                ev.preventDefault();
                editBookshelf(bookObject.id);
                editBox.classList.remove('edit_active');
                Toastify({
                    text: 'Berhasil mengedit buku',
                    className: 'info',
                    style: {
                        background: 'linear-gradient(to right, #f07c00, #96c93d)',
                    }
                }).showToast();
            });
        
            editBox.classList.add('edit_active');
            editClose.addEventListener('click', function () {
                editBox.classList.remove('edit_active');
            });
        });

        bookButton.append(incompleteButton, removeButton, editButton);

    } else {
        const completeButton = document.createElement('button');
        completeButton.classList.add('green');
        completeButton.innerText = 'Selesai dibaca';

        completeButton.addEventListener('click', function() {
            completeBookshelf(bookObject.id);
        });

        const removeButton = document.createElement('button');
        removeButton.classList.add('red');
        removeButton.innerText = 'Hapus buku';

        removeButton.addEventListener('click', function () {
            removeBookshelf(bookObject.id);
            Toastify({
                text: 'Berhasil menghapus buku',
                className: 'info',
                style: {
                    background: 'linear-gradient(to right, #c34d32, #1c2f45)',
                }
            }).showToast();
        });

        const editButton = document.createElement('button');
        editButton.classList.add('orange');
        editButton.innerText = 'Edit buku';

        editButton.addEventListener('click', function () {
            const editBox = document.querySelector('.edit_box');
            const editClose = document.getElementById('editClose');
            const editForm = document.getElementById('editBook');
        
            const editTitle = document.getElementById('editBookTitle');
            editTitle.value = bookObject.title;
        
            const editAuthor = document.getElementById('editBookAuthor');
            editAuthor.value = bookObject.author;
        
            const editYear = document.getElementById('editBookYear');
            editYear.value = bookObject.year;
        
            const editIsCompleted = document.getElementById('editBookIsCompleted');
            editIsCompleted.checked = bookObject.bookCheck;
        
            editForm.addEventListener('submit', function (ev) {
                ev.preventDefault();
                editBookshelf(bookObject.id);
                editBox.classList.remove('edit_active');
                Toastify({
                    text: 'Berhasil mengedit buku',
                    className: 'info',
                    style: {
                        background: 'linear-gradient(to right, #f07c00, #96c93d)',
                    }
                }).showToast();
            });
        
            editBox.classList.add('edit_active');
            editClose.addEventListener('click', function () {
                editBox.classList.remove('edit_active');
            });
        });

        bookButton.append(completeButton, removeButton, editButton);
    }

    return container;
}

function completeBookshelf (bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.bookCheck = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
}

function removeBookshelf (bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    bookList.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
}

function editBookshelf (bookId) {
    const bookTarget = findBook(Number(bookId));
    if (bookTarget === null) return;

    const editTitle = document.getElementById('editBookTitle').value;
    const editAuthor = document.getElementById('editBookAuthor').value;
    const editYear = document.getElementById('editBookYear').value;
    const editIsCompleted = document.getElementById('editBookIsCompleted').checked;

    bookTarget.title = editTitle;
    bookTarget.author = editAuthor;
    bookTarget.year = editYear;
    bookTarget.bookCheck = editIsCompleted;

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
}


function incompleteBookshelf (bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.bookCheck = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
}

function saveBook() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(bookList);
        localStorage.setItem(BOOK_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(BOOK_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            bookList.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('inputBook');

    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener(RENDER_EVENT, function () {
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    incompleteBookshelfList.innerHTML = '';

    const completeBookshelfList = document.getElementById('completeBookshelfList');
    completeBookshelfList.innerHTML = '';

    for (const bookItem of bookList) {
        const bookElement = bookShelf(bookItem);
        
        if (!bookItem.bookCheck) {
            incompleteBookshelfList.append(bookElement);
        } else {
            completeBookshelfList.append(bookElement);
        }
    }
});

document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(BOOK_KEY));
});

document.getElementById('searchSubmit').addEventListener('click', function (event) {
    event.preventDefault();

    const searchBook = document.getElementById('searchBookTitle').value.toLowerCase();
    const searchTitle = document.querySelectorAll('.book_item > h3');
    for (title of searchTitle) {
        if (title.innerHTML.toLowerCase().includes(searchBook)) {
            title.parentElement.style.display = 'block';
        } else {
            title.parentElement.style.display = 'none';
        }
    }
});

document.getElementById('dark_mode').addEventListener('click', function () {
    const body = document.body;
    body.classList.toggle('dark-mode');
});