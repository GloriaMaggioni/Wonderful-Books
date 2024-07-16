// file  entry point del progetto
import '../css/style.css';
import axios from 'axios';

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

   


// container father for cover books

const coverBooksContainer = createDomElement('div', ['coverBooks-container'], ' ');

// container for cover


for (let i = 0; i<4; i++){
    const coverBooksCard = createDomElement('div', ['cover-books-card'], ' ');
    coverBooksContainer.appendChild(coverBooksCard);
    
}

homePage.append(coverBooksContainer);



homePageButton.addEventListener('click', () =>{
    let searchBooks = homePageSearch.value;
    axios.get(`https://www.openLibrary.org/search.json?q=${searchBooks}`)
    .then(response =>{
        const coverBooksUrl = response.data.docs
        .map(books => books.cover_i ? `https://covers.openLibrary.org/b/id/${book.cover_i}-M.jpg` : null).filter(url=>url);
     
        
     coverBooksUrl.forEach(url =>{
        const coverBooksImg = createDomElement('img', ['coverBooks-img'], 'img');
        coverBooksImg.src = url;
       
        coverBooksCard.appendChild(coverBooksImg);
     })
    })

     .catch(e => console.log(e));
    
})




// `https://www.openLibrary.org/search.json?q=
// `https://covers.openLibrary.org/b/id/${book.cover_i}-M.jpg`







// const coverBooksContainer = createDomElement('div', ['coverBooks-container'], ' ');

// // Container for cover

// for (let i = 0; i < 4; i++) {
//     const coverBooksCard = createDomElement('div', ['cover-books-card'], ' ');
//     coverBooksContainer.appendChild(coverBooksCard);
// }

// homePage.append(coverBooksContainer);

// homePageButton.addEventListener('click', () => {
//     let searchBooks = homePageSearch.value;
//     axios.get(`https://www.openLibrary.org/search.json?q=${searchBooks}`)
//         .then(response => {
//             const coverBooksUrl = response.data.docs
//                 .map(books => books.cover_i ? `https://covers.openLibrary.org/b/id/${books.cover_i}-M.jpg` : null)
//                 .filter(url => url);

//             coverBooksUrl.forEach(url => {
//                 const coverBooksImg = createDomElement('img', ['coverBooks-img'], 'img');
//                 coverBooksImg.src = url;
//                 coverBooksCard.appendChild(coverBooksImg); // Modifica la destinazione dell'elemento img
//             });
//         })
//         .catch(error => {
//             console.error('Errore nella richiesta axios:', error);
//         });
// });