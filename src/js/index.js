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

// creare la favicon

// let favicon = document.createElement('link');
// favicon.rel = 'icon';
// favicon.href = '../img/lupo.jpg';
// favicon.type = 'image/jpg';
// document.head.appendChild(favicon);
//DA SISTEMARE: NON FUNZIONA


// container father for cover books

const coverBooksContainer = createDomElement('div', ['coverBooks-container'], '');
homePage.appendChild(coverBooksContainer);

homePageButton.addEventListener('click', () => {
    let searchBooks = homePageSearch.value;

    axios.get(`https://www.openLibrary.org/search.json?q=${searchBooks}`)
    .then(response => data.json())
    .then(data =>{
        // richiedere le cover per i libri
       const coverBooksUrl = data.docs.map(book => book.cover_i ? `htttps://covers.openLibrary.org/b/id/${cover_i}.jpg` : null).filter(url => url);

       coverBooksUrl.forEach(url =>{
        const bookCoverCard = createDomElement('div', ['coverBooks-card'], '');
        const bookCoverImg = createDomElement('img', ['coverBooks-img'], 'img');
        bookCoverImg.src = url;
        bookCoverCard.appendChild(bookCoverImg);
        coverBooksContainer.appendChild(bookCoverCard);
        // non funziona .Problema CORS
       })

        //richiedere gli autori dei libri
    })
    .catch(e => console.log(e))
})

















// homePageButton.addEventListener('click', () => {
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//     headers.append('Accept', 'application/json');
//     headers.append('Access-Control-Allow-Origin', ' * ');
//     headers.append('Access-Control-Allow-Credentials', 'true');
//     headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

//     let searchBooks = homePageSearch.value;
//     fetch('https://www.openlibrary.org/search.json?q=' + searchBooks, {
//         method: 'GET',
//         credentials: 'same-origin',
//         headers: headers,

//     })
//         .then(response => response.json())
//         .then(data => {
//             const coverBooksUrl = data.docs.map(book => book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null).filter(url => url);

//             coverBooksUrl.forEach(url => {
//                 const coverBooksCard = createDomElement('div', ['coverBooks-card'], '');
//                 const coverBooksImg = createDomElement('img', ['coverBooks-img'], 'img');
//                 coverBooksImg.src = url;
//                 coverBooksCard.appendChild(coverBooksImg);

//                 coverBooksContainer.appendChild(coverBooksCard);
//             });
//         })
//         .catch(e => console.log(e));
// });



















































































































// homePageButton.addEventListener('click', () => {
//     let searchBooks = homePageSearch.value;

//     axios.get(`https://www.openlibrary.org/search.json?q=${searchBooks}`,{

//         // headers: {
//         //     'Access-Control-Allow-Origin': '*',
//         //     'Access-Control-Allow-Headers': 'Content-type, application-json, */*'
//         //   }
//     })
     
//         .then(response => {
//             const coverBooksUrl = response.data.docs
//                 .map(books => books.cover_i ? `https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg` : null)
//                 .filter(url => url);

//             coverBooksUrl.forEach(url => {
//                 const coverBooksCard = createDomElement('div', ['coverBooks-card'], '');
//                 const coverBooksImg = createDomElement('img', ['coverBooks-img'], 'img');
//                 coverBooksImg.src = url;
//                 coverBooksCard.appendChild(coverBooksImg);

//                 const coverBooksInfo = createDomElement('div', ['coverBooks-info'], '');
//                 const coverBooksTitle = createDomElement('h3', ['coverBooks-title'], 'h3');
//                 coverBooksTitle.textContent = books.title;
//                 coverBooksInfo.appendChild(coverBooksTitle);

//                 const coverBooksAuthor = createDomElement('p', ['coverBooks-author'], 'p');
//                 coverBooksAuthor.textContent = books.author_name;
//                 coverBooksInfo.appendChild(coverBooksAuthor);

//                 coverBooksCard.appendChild(coverBooksInfo);
//                 coverBooksContainer.appendChild(coverBooksCard);
//             });
//         })
//         .catch(e => console.log(e));
// });
















