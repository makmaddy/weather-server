console.log('Client side js file is loaded');


fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);

    })

})


const waetherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

waetherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            //console.log(data);
            if (data.error) {
                // console.log(data.error);
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = JSON.stringify(data.forecast)
                // console.log(data.location);
                // console.log(data.forecast);

            }
        })
    })
    // console.log(location);

})