// file  entry point del progetto
import '../css/style.css';



// creare la HOME PAGE


// const homePageTitle = document.createElement('h1');
// homePageTitle.textContent = "Wonderful Books";
// homePageTitle.style.fontFamily = "Iknut Antiqua";
// homePageTitle.style.fontWeight= 'regular';
// homePageTitle.style.fontSize = '50px';
// homePageTitle.style.textAlign = 'center';
// document.body.appendChild(homePageTitle);

const createDomElement = (tag, classes, content) =>{
    const el = document.createElement(tag);
    classes.forEach( e => el.classList.add(e));
    el.innerHTML = content;
    return el;

}

const homePageTitle = createDomElement('h1', ['title'], 'Wonderful Books');
document.body.appendChild(homePageTitle);