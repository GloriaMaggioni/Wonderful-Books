import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/style.scss'
import axios from 'axios';
import { detailsContainer,title, detailsAuhtor, bookTrama, imgCover } from './details.js';


//favicon
const favicon = document.createElement('link');
favicon.rel = 'icon'
favicon.href = '../src/img/favicon.png';
document.head.appendChild(favicon)

//home page
const homePage = document.createElement('div');
homePage.className = 'homePage-container';

document.body.appendChild(homePage);
//home page title
const homePageTitle = document.createElement('h1');
homePageTitle.className = '  homePage-title';
homePageTitle.textContent = 'Wonderful Books';

//search bar
const homePageSearchBar = document.createElement('input');
homePageSearchBar.classList = 'homePage-searchBar';
homePageSearchBar.placeholder = 'Which story you want to know...';

// submit button
const homePageButton = document.createElement('button');
homePageButton.className = 'btn btn-outline-success homePage-button';
homePageButton.textContent = 'Search';

//loading's icon
const loading = document.createElement('div');
loading.className = 'spinner-border text-success loading-spinner';
homePage.append(homePageTitle, homePageSearchBar, homePageButton, loading)



//books' cover container
const coverBooksContainer = document.createElement('div');
coverBooksContainer.className = 'container-fluid text-center coverBooks-container ';
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
            const coverBooksImg = document.createElement('img');
            coverBooksImg.className = 'card-img-top coverBook-img';
            coverBooksImg.src = book.cover;
            //title and author container
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            card.append(coverBooksImg, cardBody);

            //book's title
            const bookTitle = document.createElement('h3');
            bookTitle.className = 'card-title book-title';
            bookTitle.textContent = book.title;

            //book's author
            const bookAuthor = document.createElement('p');
            bookAuthor.className = 'card-text book-author';
            bookAuthor.textContent = book.author.slice(0, 3).join(', ')

            const detailsButton = document.createElement('button');
            detailsButton.className = ' btn btn-outline-success details-button';
            detailsButton.textContent = ' Details...';
            cardBody.append(bookTitle, bookAuthor, detailsButton)
            
            //details' book call
            detailsButton.addEventListener('click',async () =>{
             const detailsPage = document.createElement('div');
             detailsPage.className = ' card details-page ';

             const closeButton = document.createElement('button');
             closeButton.textContent = 'X';
             closeButton.className = 'btn btn-outline-light  close-button ';
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

//books' call
homePageButton.addEventListener('click', () =>{
    getBooks();
    loading.style.display = 'block';    
})


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

