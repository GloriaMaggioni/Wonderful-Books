import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/style.scss';
 const createDomElement = (tag, className, content) => {
    const el = document.createElement(tag);
    className.forEach(e => el.classList.add(e));
    el.innerHTML = content;
    return el;
}

export const detailsPage = createDomElement('div', ['card', 'details-page'], '');

export const closeButton = createDomElement('button', ['btn', 'btn-outline-light', 'close-button'], 'X');

//books' details container
 const detailsContainer = document.createElement('div');
detailsContainer.className = 'details-container';
detailsPage.append(closeButton, detailsContainer);

//img's cover book
export const imgCover = document.createElement('img');
imgCover.className= 'img-cover';

//book title
export const title = document.createElement('h4');
//book's author
export const detailsAuhtor = document.createElement('p');

//trama's book
export const bookTrama = document.createElement('div');
bookTrama.className = ' card-text book-trama';
detailsContainer.append(imgCover,title,detailsAuhtor, bookTrama);

