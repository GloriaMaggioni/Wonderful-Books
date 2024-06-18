// file  entry point del progetto
import '../css/style.css';
// import '../newPage.js';







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



// contenitore per la cover dei libri




//pagina dei risultati

homePageButton.addEventListener('click',  () => {
    let searchTerm = homePageSearch.value;
    fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            // Creare un array di URL delle copertine dei libri
            const coverUrls =   data.docs.map(book => book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null).filter(url => url);
            
            // Aprire una nuova finestra del browser con i risultati delle copertine dei libri
            const newWindow = window.open();
            coverUrls.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                newWindow.document.body.appendChild(img);
            });
        })
        .catch(err => console.error(err));
});





// homePageButton.addEventListener(' click', async () => {
//     let searchBooks = homePageSearch.value;

//     try{
//         const response = await fetch(`https://openlibrary.org/search.json?q=${searchBooks}`);
//         const data = await response.json();

//         const coverBooksUrls = data.docs.map(book => book.cover_i ? `https://covers.openLibrary.org/b/id/${book.cover_i}-L.jpg` : null).filter(url => url);

//         const newWindow = window.open();
//         coverBooksUrls.forEach(url => {
//             const img = document.createElement('img');
//             img.src = url;
//             newWindow.document.body.appendChild(img);
//         })
    
//     }catch (error) {
//         coconsole.log(error);
//     }
// })