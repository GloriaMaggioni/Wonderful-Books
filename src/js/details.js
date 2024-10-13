import '../css/style.css';

//book's details container
export const detailsContainer = document.createElement('div');
detailsContainer.className = 'details-container';
detailsContainer.textContent = 'PAGINA DEI DETTAGLI DEI LIBRI';

// book's cover
export const bigCoverBook = document.createElement('div');
bigCoverBook.className = 'big-cover-book';
detailsContainer.appendChild(bigCoverBook);


export const coverImage = document.createElement('img');
coverImage.placeholder = "image of the book's cover"; 
bigCoverBook.appendChild(coverImage);


//book's title
export const bookTitle = document.createElement('h2');
bookTitle.className = 'details-book-title';
detailsContainer.appendChild(bookTitle);


//book's author
export const detailsBookAuthors = document.createElement('p');
detailsBookAuthors.className = 'details-book-authors';
detailsContainer.appendChild(detailsBookAuthors);

//book's description

export const bookDescription = document.createElement('div');
bookDescription.className = 'book-description';
// bookDescription.style.border = '1px solid red'
detailsContainer.appendChild(bookDescription);

export const bookTrama = document.createElement('p');
bookTrama.className = 'book-trama';
bookTrama.style.border = '1px solid black'
bookDescription.appendChild(bookTrama);
