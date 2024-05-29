// file  entry point del progetto
import '../css/style.css';



// creare la HOME PAGE


const createDomElement = (tag, classes, content) =>{
    const el = document.createElement(tag);
    classes.forEach( e => el.classList.add(e));
    el.innerHTML = content;
    return el;

}

const homePage = createDomElement('div', ['homePage-container'], '');
document.body.appendChild(homePage);

const homePageTitle = createDomElement('h1', ['homePage-title'], 'Wonderful Books');
homePage.appendChild(homePageTitle);

const homePageSearch = createDomElement( 'input', ['homePage-search'], ' ');
homePage.appendChild(homePageSearch);

const homePageButton = createDomElement('button', ['homePage-button'], 'Search');
homePage.appendChild(homePageButton);