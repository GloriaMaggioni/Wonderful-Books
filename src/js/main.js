import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/style.scss'
import axios from 'axios';
import { detailsPage, closeButton, title, detailsAuhtor, bookTrama, imgCover  } from './details.js';

export const createDomElement = (tag, className, content) => {
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
const homePage = createDomElement('div', ['homePage-container', 'container-fluid'], ' ');
document.body.appendChild(homePage);

//home page title
const homePageTitle = createDomElement('h1', ['h1','homePage-title', ], 'Wonderful Books');

//search bar
const homePageSearchBar = createDomElement('input', ['homePage-searchBar'], '');
homePageSearchBar.placeholder = 'Which story you want to know...';
// submit button
const homePageButton = createDomElement('button', ['btn', 'btn-outline-success', 'homePage-button'], 'Search');

//loading's icon
const loading = createDomElement('div', ['spinner-border', 'text-success', 'loading-spinner'], ' ');
homePage.append(homePageTitle, homePageSearchBar, homePageButton, loading)

//books' cover container
const coverBooksContainer = createDomElement('div', ['container', 'text-center', 'coverBooks-container'], ' ');
document.body.appendChild(coverBooksContainer);




//create card
function createCard(){
    const card = createDomElement('div', [ 'card'], '');
    coverBooksContainer.append(card);
    return card
}
// Book element constructor
class Book {
  constructor(bookData){
      this.cover = bookData.cover;
      this.title = bookData.title;
      this.author = bookData.author;
      this.key = bookData.key;


      this.card = createCard();
      this.coverBookImg = createDomElement('img', ['card-img-top', 'coverBook-img'], ' ');
      this.cardBody = createDomElement('div', ['card-body'], ' ');
      this.bookTitle = createDomElement('h3', ['card-title', 'book-title'], this.title);
      this.bookAuthor = createDomElement('p', ['card-text', 'book-author'], this.author.slice(0, 3).join(', '));
      this.detailsButton = createDomElement('button', ['btn', 'btn-outline-success', 'details-button'], ' Details...');
  

  }

  createCardElements(){
      this.coverBookImg.src = this.cover;
      this.card.append(this.coverBookImg, this.cardBody);
      this.cardBody.append(this.bookTitle, this.bookAuthor,this.detailsButton)
      return this.card;

  }
  detailsBookEvent(getTramaBook, detailsPage, imgCover, title, detailsAuthor, bookTrama, closeButton){
    this.detailsButton.addEventListener('click', async () =>{
      detailsPage.style.display = 'block';
      imgCover.src = this.cover;
      title.textContent = this.title;
      detailsAuthor.textContent = this.author;

      try{
          const description = await getTramaBook(this.key);
          bookTrama.textContent = `${description}`

      }catch(error){
          alert('Description is not available')
      };

      closeButton.addEventListener('click', () => {
          detailsPage.style.display = 'none';
      })
      document.body.append(detailsPage);
    })
  }
  
}


async function getBooks(){
  let serachBooks = homePageSearchBar.value;
  coverBooksContainer.innerHTML = '';


  try{
      const response = await axios.get(`https://openLibrary.org/search.json?q=${serachBooks}&limit=20`);;
      const data = response.data;

      const books = data.docs.map(book =>({
          cover: book.cover_i ? `https://covers.openLibrary.org/b/id/${book.cover_i}-M.jpg` : null,
          title: book.title ,
          author: book.author_name || [],
          key: book.key
      })).filter(book => book.cover && book.title && book.author.length > 0 );
      


      books.forEach(bookData =>{
          const book = new Book(bookData);
          const card = book.createCardElements();
          coverBooksContainer.append(card)
         

        book.detailsBookEvent(getTramaBook,detailsPage, imgCover, title, detailsAuhtor, bookTrama, closeButton);
         loading.style.display = 'none';
         coverBooksContainer.style.border= '1px solid #00853E';
      })

  }catch(error){console.log(error)}
};



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