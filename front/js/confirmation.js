const queryString = window.location.search;
const urlSearch = new URLSearchParams(queryString);
const idObject = urlSearch.get("id");

let orderId = document.getElementById('orderId');
orderId.innerHTML = idObject;