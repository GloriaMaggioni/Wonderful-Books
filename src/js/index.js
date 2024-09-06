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
// const coverBooksCard = createDomElement('div', ['coverBooks-card'], '')
// coverBooksContainer.appendChild(coverBooksCard)




 function createCard(){
   const card = createDomElement('div', ['card'], '');
   coverBooksContainer.append(card)
   return card

 }

async function getBooks(coverBooksContainer) {
    let searchBooks = homePageSearch.value;
    try{
        const response = await axios.get(`https://openLibrary.org/search.json?q=${searchBooks}`);
       const data = response.data;
      const coverBooksUrl = data.docs.map(book => book.cover_i ? `https://covers.openLibrary.org/b/id/${book.cover_i}-M.jpg` : null).filter(url => url);
      // const authorsBookUrl = data.docs.map(book => book ? author.name[0] : null).filter(author => author)
       coverBooksUrl.forEach(url =>{
        
         const coverBooksImg = createDomElement('img', ['coverBook-img'], '');
         coverBooksImg.src = url;
         createCard().appendChild(coverBooksImg);
       
        })
          // DA SISTEMARE
        // authorsBookUrl.forEach( authors =>{
        //   const authorCard = createDomElement('h3', ['author-card'], '')
        //   authorCard.textContent = authors;
        //   coverBooksImg.append(authorCard)
        // })
    
    }catch(error){
        console.log(error)
    }
    
}


homePageButton.addEventListener('click', () =>{
    getBooks(coverBooksContainer)
})


























































































