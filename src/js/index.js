// file  entry point del progetto
import '../css/style.css';



// creare la HOME PAGE


const createDomElement = (tag, classes, content) =>{
    const el = document.createElement(tag);
    classes.forEach( e => el.classList.add(e));
    el.innerHTML = content;
    return el;

}

// let homePageTitle = createTitle();


// function createTitle() {
//     let homePageTitle = createDomElement('h1', ['homePage-title'], 'Wonderful Books');
//     homePageTitle.style.fontFamily = "Iknut Antiqua";
//     homePageTitle.style.fontWeight = 'regular';
//     homePageTitle.style.fontSize = '30px';
//     homePageTitle.style.textAlign = 'center';
//     // homePageTitle.style.color = 'red';
//     return homePageTitle;
// }
// document.body.appendChild(homePageTitle);


const homePageTitle = createDomElement('h1', ['homePage-title'], 'Wonderful Books');
document.body.appendChild(homePageTitle);