import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/style.scss'
import axios from 'axios';
import { detailsContainer,title, detailsAuhtor, bookTrama, imgCover } from './details.js';

const createDomElement = (tag, className, content) => {
    const el = document.createElement(tag);
    className.forEach(e => el.classList.add(e));
    el.innerHTML = content;
    return el;
}


//favicon
const favicon = document.createElement('link');
favicon.rel = 'icon'
favicon.href = '../src/img/favicon.png';
document.head.appendChild(favicon)

//home page

const homePage = createDomElement('div', ['homePage-container'], ' ');
document.body.appendChild(homePage);

//home page title
const homePageTitle = createDomElement('h1', ['homePage-title'], 'Wonderful Books');

//search bar
const homePageSearchBar = createDomElement('input', ['homePage-searchBar'], '');
homePageSearchBar.placeholder = 'Which story you want to know...';
// submit button
const homePageButton = createDomElement('button', ['btn', 'btn-outline-success', 'homePage-button'], 'Search');
//loading's icon
const loading = createDomElement('div', ['spinner-border', 'text-success', 'loading-spinner'], ' ');
homePage.append(homePageTitle, homePageSearchBar, homePageButton, loading)


//books' cover container
const coverBooksContainer = createDomElement('div', ['container-fluid', 'text-center', 'coverBooks-container'], ' ');
document.body.appendChild(coverBooksContainer);



//create card

function createCard(){
    const card = document.createElement('div');
    card.className = 'card ';
    coverBooksContainer.append(card);
    return card
}

//call of books
async function getBooks(){
    let searchBooks = homePageSearchBar.value;
    coverBooksContainer.innerHTML = '';


    try{
        const response = await axios.get(`https://openLibrary.org/search.json?q=${searchBooks}&limit=20`);
        const data = response.data;

        const books = data.docs.map(book => ({
            cover: book.cover_i ? `https://covers.openLibrary.org/b/id/${book.cover_i}-M.jpg` : null,
            title: book.title ,
            author: book.author_name || [],
            key: book.key
        })).filter(book => book.cover && book.title && book.author.length > 0 );
        

        books.forEach(book =>{
            const card = createCard();
            loading.style.display = 'none';
            coverBooksContainer.style.border= '1px solid #00853E';
           
            //books'cover
            const coverBooksImg = createDomElement('img', ['card-img-top', 'coverBook-img'], ' ');
            coverBooksImg.src = book.cover;

            //title and author container
            const cardBody = createDomElement('div', ['card-body'], ' ');
            card.append(coverBooksImg, cardBody);

            //book's title
             const bookTitle = createDomElement('h3', ['card-title', 'book-title'], book.title);

            //book's author
             const bookAuthor = createDomElement('p', ['card-text', 'book-author'], book.author.slice(0, 3).join(', '));

            //derails' button
            const detailsButton = createDomElement('button', ['btn', 'btn-outline-success', 'details-button'], ' Details...');
            cardBody.append(bookTitle, bookAuthor, detailsButton)
            
            //details' book call
            detailsButton.addEventListener('click',async () =>{
            const detailsPage = createDomElement('div', ['card', 'details-page'], ' ');
             const closeButton = createDomElement('button', ['btn', 'btn-outline-light', 'close-button'], 'X');
             detailsPage.append(closeButton, detailsContainer );

             imgCover.src = book.cover;
             title.textContent = book.title;
             detailsAuhtor.textContent = book.author;

             try{
               const description = await getTramaBook(book.key);
               bookTrama.textContent = ` ${description}`;
             }catch(e){
                alert('Non sta funzionando');
             } ;


             closeButton.addEventListener('click', () =>{
                detailsPage.style.display = 'none';
              })
             document.body.append(detailsPage);
            })
          

        })


    }catch(error){console.log(error)}
};


//var alert = document.getElementById('alert');
const alert = createDomElement('div', ['alert', 'alert-danger'], 'Please enter a valid search term!');
homePage.append(alert);
alert.style.display = 'none';
//alert and books' call 
homePageButton.addEventListener('click', () =>{
  alertMessage()
})
function alertMessage (){
  if(homePageSearchBar.value ===''){
    alert.style.display = 'block';
    homePageSearchBar.style.border = '2px solid red';
    loading.style.display = 'none';
  }else{
    alert.style.display = 'none';
    homePageSearchBar.style.border = 'none';
    loading.style.display = 'block'
    getBooks();

  }
}





      

//trama's books call
async function getTramaBook(bookKey){
    try{
        const response = await axios.get(`https://openlibrary.org${bookKey}.json`);
        const data = response.data;
       
       if(typeof data.description === 'string'){
        return data.description;
       }else if(typeof data.description === 'object'){
        return data.description.value
       }else{
        return 'Description is not avaliable for this book';
       }
    }catch(err){
        console.log(err);
        return 'Error fetching book details'
    }
}