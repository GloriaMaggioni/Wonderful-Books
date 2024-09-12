// file  entry point del progetto

import '../css/style.css';
import axios from 'axios';


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


 function createCard(){
   const card = createDomElement('div', ['card'], '');
   coverBooksContainer.append(card)
   return card

 }
 


async function getBooks(){

  let searchBooks = homePageSearch.value;

    try{

      const response = await axios.get(`https://openLibrary.org/search.json?q=${searchBooks}`);
      const data = response.data;

      const books = data.docs.map(book =>({
          cover: book.cover_i ? `https://covers.openLibrary.org/b/id/${book.cover_i}-M.jpg` : null,
          title: book.title ? book.title : null,

          // richiamo autori

      })).filter(book => book.cover && book.title);

       books.forEach(book =>{
        const card = createCard()


        // covers' books
          const coverBooksImg = createDomElement('img',['coverBook-img'], '');
          coverBooksImg.src = book.cover;
          card.appendChild(coverBooksImg);

          
        // book's title
        const titleBook = createDomElement('h3',['title-book'], '');
        titleBook.textContent = book.title;
        card.appendChild(titleBook)

      
       })

      

    }catch(error){
      console.log(error)
    }

}


homePageButton.addEventListener('click', () =>{
  getBooks();
 
})











// async function getBooks() {
//   let searchBooks = homePageSearch.value;
//     try{
//         const response = await axios.get(`https://openLibrary.org/search.json?q=${searchBooks}`);
//        const data =  response.data;
//       //  cover books call



//     //   const coverBooksUrl =   data.docs.map(book => book.cover_i ? `https://covers.openLibrary.org/b/id/${book.cover_i}-M.jpg` : null).filter(url => url);
//     //   const titleBooksUrl = data.docs.map(book => book.title ? book.title : null).filter(title => title);
//     //  const books = data.docs.map([coverBooksUrl, titleBooksUrl]);
//     //  books.forEach( book =>{
//     //   const coverBooksImg = createDomElement('img', ['coverBook-img'], '');
//     //     coverBooksImg.src = url;
//     //    createCard().appendChild(coverBooksImg);
          
//     //    const titleBook = createDomElement('h3', ['title-book'], '');
//     //    titleBook.textContent = title;
//     //      createCard().appendChild(titleBook);
//     //  })
//     //   coverBooksUrl.forEach(url =>{
//     //     const coverBooksImg = createDomElement('img', ['coverBook-img'], '');
//     //     coverBooksImg.src = url;
//     //     createCard().appendChild(coverBooksImg);
        
      
//     //    })      

//     //   //  title book call

//     //   titleBooksUrl.forEach(title =>{
//     //     const titleBook = createDomElement('h3', ['title-book'], '');
//     //     titleBook.textContent = title;
//     //     createCard().appendChild(titleBook);
//     //   })
        
//       // FUNZIONANO ENTRAMBI , PERO BISOGNA CHE IL TITOLO SI ATTACCHI ALLA IMMAGINE CORRISPONDENTE
     
//     }catch(error){
//         console.log(error)
//     }
    
// }


// async function getBooks() {
//   let searchBooks = homePageSearch.value;
//   try {
//     const response = await axios.get(`https://openLibrary.org/search.json?q=${searchBooks}`);
//     const data = response.data;

//     // Crea un array di oggetti che contiene sia il titolo che la copertina di ogni libro
//     const books = data.docs.map(book => ({
//       title: book.title ? book.title : null,
//       cover: book.cover_i ? `https://covers.openLibrary.org/b/id/${book.cover_i}-M.jpg` : null
//     })).filter(book => book.title && book.cover);

//     // Itera sull'array di libri e crea la carta per ogni libro
//     books.forEach(book => {
//       const card = createCard();
//       const titleBook = createDomElement('h3', ['title-book'], '');
//       titleBook.textContent = book.title;
//       card.appendChild(titleBook);

//       const coverBooksImg = createDomElement('img', ['coverBook-img'], '');
//       coverBooksImg.src = book.cover;
//       card.appendChild(coverBooksImg);
//     });
//   } catch (error) {
//     console.log(error)
//   }
// }     
//QUESTO FUNZIONA(SCRITTO DAL AI)


















































































