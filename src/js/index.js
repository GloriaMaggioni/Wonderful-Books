// file  entry point del progetto

import '../css/style.css';
import axios from 'axios';
// import '../js/details.js';
import { detailsContainer } from './details.js';


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


   function createCard(){
       const card = createDomElement('div', ['card'], '');
      coverBooksContainer.append(card)
     return card

   }
 
 
// call of books
async function getBooks(){

  let searchBooks = homePageSearch.value;

    try{

      const response = await axios.get(`https://openLibrary.org/search.json?q=${searchBooks}`);
      const data = response.data;

      const books = data.docs.map(book =>({
          cover: book.cover_i ? `https://covers.openLibrary.org/b/id/${book.cover_i}-M.jpg` : null,
          title: book.title ? book.title : null,
          author: book.author_name ? book.author_name : null,
          key: book.key ? `https://openlibrary.org${book.key}` : null,

          // richiamo autori

        })).filter(book => book.cover && book.title && book.author);

      books.forEach(book =>{
        const card = createCard();


          // covers' books
            const coverBooksImg = createDomElement('img',['coverBook-img'], '');
            coverBooksImg.src = book.cover;
            card.appendChild(coverBooksImg);

          
          // title and author container
             const nameBookCont = createDomElement('div', ['nameBook-cont'], '');
             card.appendChild(nameBookCont);
         
          // book's title
             const titleBook = createDomElement('h3',['title-book'], '');
             titleBook.textContent = book.title;

          // books' author
            const authorBook = createDomElement('p', ['author-book'], '');

            if(book.author.length > 3){
          authorBook.textContent = book.author[0] && book.author[1] && book.author[2];

            }else{
               authorBook.textContent = book.author;
            }
        
            nameBookCont.append(titleBook, authorBook)
        

       
          detailsButton.addEventListener('click', () => {
            const detailsPage = window.open();
            detailsPage.document.body.appendChild(detailsContainer);
            coverImage.src = book.cover;
            bookTitle.textContent = book.title;
            detailsBookAuthors.textContent = book.author;
        

            // book's description
            bookDescription.style.border = '2px solid red'
             bookTrama.textContent = book.key;
             if(book.key === null){
               bookTrama.textContent = 'Trama non disponibile';
             }else{
               return book.key ;
               


             }
             
          })
    }catch(error){
      console.log(error)
    }

}


homePageButton.addEventListener('click', () =>{
  getBooks();
})











































































