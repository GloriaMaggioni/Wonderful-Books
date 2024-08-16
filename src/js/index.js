// file  entry point del progetto

import '../css/style.css';
import axios from 'axios';
import headers from '../api.config.js'

// `https://www.openLibrary.org/search.json?q=
// `https://covers.openLibrary.org/b/id/${book.cover_i}-M.jpg`




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


const coverBooksContainer = createDomElement('div', ['coverBooks-container'], '');
homePage.appendChild(coverBooksContainer);

const coverBooksCard = createDomElement('div', ['coverBooks-card'], '');
coverBooksContainer.appendChild(coverBooksCard);




homePageButton.addEventListener('click', () => {
    const searchBooks = homePageSearch.value;
  
   axios.get(`https://www.openLibrary.org/search.json?q=${searchBooks}`,{

     headers: headers,

   })
   .then(response => response.data)
   .then(data =>{
    const coverBooksUrl = data.docs.map(book => book.cover_i ? `https://covers.openLibrary.org/b/id/${book.cover_i}-M.jpg ` : null).filter(url => url);

     coverBooksUrl.forEach(url =>{
        const coverBooksImg = createDomElement('img', ['coverBook-img'], '');
        coverBooksImg.src = url;
        coverBooksCard.appendChild(coverBooksImg);
        homePage.appendChild(coverBooksCard);

     })
     .catch(e => console.log(e))

   })



})
    
























































































