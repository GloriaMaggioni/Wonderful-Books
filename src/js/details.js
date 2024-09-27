import '../css/style.css';


export const detailsContainer = document.createElement('div');
detailsContainer.className = 'details-container';
detailsContainer.textContent = ' PAGINA DEI DETTAGLI DEI LIBRI'

export const bigCoverBook =  document.createElement('div');
bigCoverBook.className = 'big-cover-book';
detailsContainer.appendChild(bigCoverBook);
export const detailsContainer = createDomElement('div');
detailsContainer.className = 'details-container';
detailsContainer.textContent = 'DETAILS PAGEEEESSSSSS'

const bigCoverBook =  document.createElement('div');
bigCoverBook.className = 'big-cover-book';
detailsContainer.appendChild(bigCoverBook);
// NON SI AGGIUNGE LO STILE
