// file  entry point del progetto
import '../css/style.css';






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


// richiesta al server


// fetch("http://openlibrary.org")
// .then(response =>{
//     console.log(response)
// })
// .catch(error=> console.log(TypeError(error)))


homePageButton.addEventListener('click', () => {
  window.open('newPage.html')
})