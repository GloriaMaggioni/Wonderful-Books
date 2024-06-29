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
    // homePage.append(homePageTitle,homePageSearch,homePageButton);


    homePage.appendChild(homePageTitle);
    homePage.appendChild(homePageSearch);
    homePage.appendChild(homePageButton);







//pagina dei risultati






// PROVA CON AXIOS





// homePageButton.addEventListener('click', ()=> {
//     let searchBooks = homePageSearch.value;

//     axios.get(` https://openlibrary.org/search.json?q=books+${searchBooks}`)  
//     .then(response => response.data)
//     .then(data => {
//        const coverBooksUrl = data.docs.map(book => book.cover_i ? `https://covers.openLibrary.org/b/id/${book.cover_i}.jpg` : null).filter(url => url);
//        const authorBooksUrl = data.docs.map(book => book.author ? book.author[0].name : null).filter(author => author);

//        const newPage = window.open();

//        coverBooksUrl.forEach( url =>{
//          const coverImgContainer = document.createElement('div');
//          coverImgContainer.classList.add('coverImg-container');
//          const coverImg = document.createElement('img');
//          coverImg.src = url;
//          coverImgContainer.appendChild(coverImg);
//          newPage.document.body.appendChild(coverImgContainer);
       

       
//        })

//        authorBooksUrl.forEach( author =>{
//         const authorContainer = document.createElement('div');
//         authorContainer.className = 'author-container';
//         authorContainer.textContent = author;
//         coverImgContainer.appendChild(authorContainer);

//        })
         
//     })

//     .catch(error => {console.log(error)})
// })


// homePageButton.addEventListener('click', () =>{
//     let searchBooks = homePageSearch.value;
//     axios.get(`https://openLibrary.org/search.json?q=books+${searchBooks}`)
//     .then(response => response.data)
//     .then(data => {

//         // recuperare cover libri

//         const coverBooksUrl = data.docs.map(book => book.cover_i ? `https://cover.openLibrary.org/b/id/${book.cover_i}.jpg` : null).filter(url => url);
//         //recuperare autori
//         const authorBooksUrl = data.docs.map(book => book.author ? book.author[0].name : null ).filter(author => author);

//         //aprire nuova finestra

//         const resultsPage = window.open();

//         //contenitore per le cover e lo appendi al body
//            //a crea contenitore cover
//            //b dai nome alla classe
//            //c crea img
//            //d prendi url immagine
//            //e appendi img al contenitore cover
//            // f appendi contenitore cover a resultsPage


//            coverBooksUrl.forEach(url =>{
//                const coverBooksContainer = createDomElement('div', ['coverBooks-container'], ' ');
//                const coverBooksImg = createDomElement('img', ['coverBooks-img'], ' img');
//                coverBooksImg.src = url;
//                coverBooksContainer.appendChild(coverBooksImg);
//                resultsPage.document.body.appendChild(coverBooksContainer);

//            })


//         //contenitore per gli autori e lo appendi al contenitore cover
//              //a crea contenitore autori
//              // b dai nome di classe al contenitore
//              // c immetti testo nel contenitore
//              // d appendi contenitore autori a contenitore cover

//     })

//     // gestire l'errore
//     .catch(error => console.log(error))
// })






homePageButton.addEventListener('click', () =>{
    let searchBooks = homePageSearch.value;

    async function richiesta() {
        let searchBooks = homePageSearch.value;
       try{
        const response = await axios.get(`https://openLibrary.org/search.json?q=books+${searchBooks}`);
        const coverBooksUrl = response.data.docs.map(book => book.cover_i ? `https://covers.openLibrary.org/b/id/${book.cover_i}.jpg` : null).filter(url => url);

        const newPage = window.open();
        coverBooksUrl.forEach(url =>{
            const coverBooksContainer = createDomElement('div', ['coverBooks-container'], ' ');
              const coverBooksImg = createDomElement('img', ['coverBooks-img'], ' img');
             coverBooksImg.src = url;
             coverBooksContainer.appendChild(coverBooksImg);
             newPage.document.body.appendChild(coverBooksContainer);

            //  coverBooksContainer.style.border = '1px solid red';
            
        })
    

       }catch(error ){
         console.log(error)
       }
    }
   richiesta();
    // .catch(err => console.log(err))
})

















