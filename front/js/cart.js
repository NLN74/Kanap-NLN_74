
//récupération de la key Canap avec c'est objet
let produitPanier = JSON.parse(localStorage.getItem("Canap"));

//mise en place de l'HTML
function panier() {
    for (let i = 0; i < produitPanier.length; i++) {

        const idProduit = produitPanier[i].objectId;


        fetch("http://localhost:3000/api/products/" + idProduit)
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }


            })

            .then(function values(value) {
                const doc = document.getElementById('cart__items')



                doc.innerHTML +=
                    `<article class="cart__item" data-id="${produitPanier[i].objectId}" data-color="${produitPanier[i].objectColors}">
                <div class="cart__item__img">
                    <img src="${value.imageUrl}" alt="Photographie d un canapé">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${value.name}</h2>
                        <p>${produitPanier[i].objectColors}</p>
                        <p>${value.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                             <p>Qté : </p>
                            <input type="number" id="quantity" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitPanier[i].objectNumber}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`;





                //Prix total + Nombre total d'article


                function displayTotalPriceAndQuantity() {
                    let prixTotalDavid = 0;
                    let quantityTotalDavid = 0;
                    for (let f = 0; f < produitPanier.length; f++) {


                        let priceProduit = value.price * produitPanier[f].objectNumber;
                        prixTotalDavid = prixTotalDavid + priceProduit

                        //Utilisation de parseInt pour retirer les string
                        let numberOfProduit = parseInt(produitPanier[f].objectNumber);

                        quantityTotalDavid = quantityTotalDavid + numberOfProduit;

                    };

                    //Prix total des Canapé
                    const totalPrice = document.getElementById('totalPrice');
                    totalPrice.innerHTML = prixTotalDavid;

                    //Total du nombre de Canapé
                    const totalQuantity = document.getElementById('totalQuantity');
                    totalQuantity.innerHTML = quantityTotalDavid;


                };

                displayTotalPriceAndQuantity();




                /////////////////////Supprimer l'élément au click et modification////////////////////////////

                function deleteProductAndModify() {



                    let getClassQuantity = document.querySelectorAll('.itemQuantity');




                    for (let j = 0; j < produitPanier.length; j++) {

                        let deleteItem = document.querySelectorAll('.deleteItem')



                        deleteItem[j].addEventListener("click", (event) => {

                            event.preventDefault();
                            const cart__item = deleteItem[j].closest('.cart__item')

                            let idDelete = cart__item.dataset.id;
                            let colorDelete = cart__item.dataset.color;


                            produitPanier = produitPanier.filter(el => el.objectId !== idDelete || el.objectColors !== colorDelete);

                            localStorage.setItem("Canap", JSON.stringify(produitPanier))


                            alert('produit bien supprimer');



                            const cart_item = document.querySelector('.cart__item')

                            cart_item.remove();

                            location.reload();

                        });








                        getClassQuantity[j].addEventListener('change', function (event) {

                            event.preventDefault();

                            const getIdQuantity = document.getElementById('quantity')
                            const valueInputKanap = getClassQuantity[j].value;

                            getClassQuantity[j].setAttribute('value', valueInputKanap)

                            produitPanier[j].objectNumber = parseInt(valueInputKanap);
                            localStorage.setItem('Canap', JSON.stringify(produitPanier))

                            displayTotalPriceAndQuantity();

                        });



                    }



                };

                deleteProductAndModify();


                ///////////////TEST INPUT VALIDATOR FORMULAIRE////////////////////////////////////


                const cart_order_from_question = document.querySelectorAll('.cart__order__form__question');


                //Input prénom test

                let firstNameInput = document.getElementById('firstName');
                let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
                firstNameInput.addEventListener('change', function firstNameInputValidator() {

                    let regexName = new RegExp("^[\\D](\\w+)[\\D]$")
                    let firstNameValue = firstNameInput.value;

                    console.log(regexName.test(firstNameValue))

                    if (regexName.test(firstNameValue)) {
                        firstNameErrorMsg.style.display = 'none';
                    } else {
                        firstNameErrorMsg.style.display = 'block';
                        firstNameErrorMsg.innerHTML = 'Veuillez saisir un prénom valide';
                    }
                });

                //Input nom test

                let lastNameInput = document.getElementById('lastName');
                let lastNameInputError = document.getElementById('lastNameErrorMsg');

                lastNameInput.addEventListener('change', function lastNameInputValidator() {

                    let regexName = new RegExp("^[\\D](\\w+)[\\D]$")
                    let lastNameValue = lastNameInput.value;

                    console.log(regexName.test(lastNameValue))

                    if (regexName.test(lastNameValue)) {
                        lastNameInputError.style.display = 'none';
                    } else {
                        lastNameInputError.style.display = 'block';
                        lastNameInputError.innerHTML = 'Veuillez saisir un prénom valide';
                    }
                });

                //Input adresse test

                let addressInput = document.getElementById('address');
                let addressInputError = document.getElementById('addressErrorMsg')

                addressInput.addEventListener('change', function () {
                    let regexAdress = new RegExp("^([\\d]{1,6})(\\s(\\w+))+$")
                    let adressInputValue = addressInput.value;

                    console.log(regexAdress.test(adressInputValue))

                    if (regexAdress.test(adressInputValue)) {
                        addressInputError.style.display = 'none';
                    } else {
                        addressInputError.style.display = 'block';
                        addressInputError.innerHTML = "Veuillez saisir une adresse valide.";
                    }
                });

                //Input ville test

                let cityInput = document.getElementById('city');
                let cityInputError = document.getElementById('cityErrorMsg');

                cityInput.addEventListener('change', function () {
                    let regexCity = new RegExp("^[\\D](\\w+)[\\D]$")
                    let cityInputValue = cityInput.value;

                    console.log(regexCity.test(cityInputValue))

                    if (regexCity.test(cityInputValue)) {
                        cityInputError.style.display = 'none';
                    } else {
                        cityInputError.style.display = 'block';
                        cityInputError.innerHTML = "Veuillez saisir une ville valide. ";
                    }
                });

                //Input mail test
                let mailInput = document.getElementById('email');
                let mailError = document.getElementById('emailErrorMsg');



                mailInput.addEventListener('change', function () {
                    let mailValue = mailInput.value;
                    let regexEmail = new RegExp("^(\\w+)[a-zA-Z0-9\-\._]+@(\\w+)\\.(\\w+)$");

                    if (regexEmail.test(mailValue)) {
                        mailError.style.display = 'none';

                    } else {
                        mailError.style.display = 'block';
                        mailError.innerHTML = 'Veuillez saisir une adresse email valide';

                    }

                });











                //////////////////////RECUPERATION DES DONNEE DU FORMULAIRE/////////////////////
                function initFormAddEventListenerBtnCommander() {

                    const btnCommander = document.getElementById('order');

                    let products = [];

                    for (let m = 0; m < produitPanier.length; m++) {
                        products.push(produitPanier[m].objectId)
                    };




                    btnCommander.addEventListener('click', function (e) {
                        e.preventDefault();
                        let prenom = document.getElementById('firstName');
                        let nom = document.getElementById('lastName');
                        let addresse = document.getElementById('address');
                        let ville = document.getElementById('city');
                        let mail = document.getElementById('email');


                        /////////////Test pour envoie//////////
                        let regexName = new RegExp("^[\\D](\\w+)[\\D]$");
                        let firstNameValue = firstNameInput.value;
                        let validatorName = regexName.test(firstNameValue);

                        let mailValue = mailInput.value;
                        let regexEmail = new RegExp("^(\\w+)[a-zA-Z0-9\-\._]+@(\\w+)\\.(\\w+)$");
                        let validatorEmail = regexEmail.test(mailValue);

                        let regexAdress = new RegExp("^([\\d]{1,6})(\\s(\\w+))+$");
                        let adressInputValue = addressInput.value;
                        let validatorAdress = regexAdress.test(adressInputValue);


                        let regexLastName = new RegExp("^[\\D](\\w+)[\\D]$");
                        let lastNameValue = lastNameInput.value;
                        let validatorLastName = regexLastName.test(lastNameValue);

                        let regexCity = new RegExp("^[\\D](\\w+)[\\D]$");
                        let cityInputValue = cityInput.value;
                        let validatorCity = regexCity.test(cityInputValue);
                        console.log(validatorCity)
                        //////////////////

                        /////ENVOIE DE LA COMMANDE SI VALIDE/////
                        if (validatorEmail && validatorName && validatorLastName && validatorAdress && validatorCity) {
                            const orders = {

                                contact: {
                                    firstName: prenom.value,
                                    lastName: nom.value,
                                    address: addresse.value,
                                    city: ville.value,
                                    email: mail.value

                                },
                                products: products,


                            }

                            //Utilisation de la Method POST via un Fetch pour envoyez au serveur les valeurs
                            fetch("http://localhost:3000/api/products/order", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(orders),
                            })
                                .then(response => response.json())
                                .then(data => {
                                    let confirmationUrl = "./confirmation.html?id=" + data.orderId;
                                    window.location.href = confirmationUrl;
                                    localStorage.clear();

                                })

                        } else {
                            alert('Verifié vos information saisi')

                        }




                    });



                }

                initFormAddEventListenerBtnCommander();





            })

            .catch(function (err) {
                //une erreur est survenue
            });
    };
};

panier();


