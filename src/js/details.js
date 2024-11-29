import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/style.scss';


//books' details container
export const detailsContainer = document.createElement('div');
detailsContainer.className = 'details-container';

//img's cover book
export const imgCover = document.createElement('img');
imgCover.className= 'img-cover';

//book title
export const title = document.createElement('h4');
export const detailsAuhtor = document.createElement('p');

//trama's book
export const bookTrama = document.createElement('div');
bookTrama.className = ' card-text book-trama';
detailsContainer.append(imgCover,title,detailsAuhtor, bookTrama);
