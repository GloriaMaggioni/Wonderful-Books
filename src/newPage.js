import './css/style.css';

import { sayHello} from './js/index.js';
 function sayGoodbye() {
    alert('Goodbye from page 2');
 }
sayGoodbye()


const secondButton = document.createElement('button');
secondButton.textContent = 'click me';
document.body.appendChild(secondButton);
secondButton.addEventListener( 'click', () =>{
    windox.open('index.js', '_blank');
})
 export {sayGoodbye};