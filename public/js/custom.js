console.log("Client side JS is loaded") 

// // Fetch isn't part of JS but supported by all chrome
// fetch('http://puzzle.mead.io/puzzle').then((response) => {

//     response.json().then((data) => {
//         console.log(data)
//     });
// }); 



const search = document.getElementById('search');

const inputLocation = document.getElementById('inputLocation');

const messageOne = document.querySelector('.message-1')

const messageTwo = document.querySelector('.message-2')

 search.addEventListener('click', (e) => {
    e.preventDefault();
    messageOne.innerHTML = 'Loading..'
    messageTwo.innerHTML = ''
    
    fetch('http://localhost:3000/weather?address='+inputLocation.value).then((response) => {

    response.json().then((data) =>{
        if(data.error) {
            messageOne.innerHTML =  data.error
            messageOne.classList.add('alert','alert-danger')
        }   else {
            messageOne.innerHTML = '<b> Location : </b>' + data.location 
            
            messageTwo.innerHTML = '<b>Forecast : </b>' +data.forecast 
            messageOne.classList.add('alert', 'alert-warning')
            messageTwo.classList.add('alert', 'alert-primary')
        }
   
      }); 
    });

   
});