
// console.log("client side javascript file loaded");


const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "hello world"

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "loading weather...";
    messageTwo.textContent = "";

    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            }
            else {
                console.log(data.location);
                console.log(data.weather);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.weather;
            }
        });
    });


})



// fetch("http://puzzle.mead.io/puzzle").then((response)=>{

//    response.json().then((data)=>{
//     console.log(data);
//    });

// });