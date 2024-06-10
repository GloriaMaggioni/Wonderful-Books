// file  entry point del progetto
import '../css/style.css';
import '../newPage.js';






const createDomElement = (tag, classes, content) =>{
    const el = document.createElement(tag);
    classes.forEach( e => el.classList.add(e));
    el.innerHTML = content;
    return el;

}
// creare la HOME PAGE

    const homePage = createDomElement('div', ['homePage-container'], '');
    document.body.appendChild(homePage);

    const homePageTitle = createDomElement('h1', ['homePage-title'], 'Wonderful Books');
    const homePageSearch = createDomElement('input', ['homePage-search'], ' ');
    homePageSearch.placeholder = 'Search your books...'
    const homePageButton = createDomElement('button', ['homePage-button'], 'Search');
    homePage.append(homePageTitle,homePageSearch,homePageButton);




// contenitore per la cover dei libri

const booksCover = createDomElement('div', ['booksCover-container'], '');
document.body.appendChild(booksCover)

//  DEVO CHIEDERE IL PERMESSO A ONPENLIBRARY(CORS)

// homePageButton.addEventListener('click',   () => {
// fetch('https://openlibrary.org/search.json?q=harry+potter')
//   .then(response => response.json())
//   .then(data => {
//     // Display the fetched data
//     const booksList = document.getElementById('books-list');
//     data.docs.forEach(book => {
//       const li = document.createElement('li');
//       li.textContent = `${book.title} by ${book.author_name}`;
//       booksList.appendChild(li);
//       console.log('funzia')
//     });
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

// });

// richiesta al server

export function sayHello() {
 homePageButton.addEventListener('click',   () => {
       window.open('newPage.js', '_blank');
 })
}

import{sayGoodbye} from '../newPage.js';
sayGoodbye();
sayHello();