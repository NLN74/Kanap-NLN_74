
//récupération des la key Canap avec c'est object
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




                //Supprimer l'élément au click

                function deleteProductAndModify() {

                    

                    let getClassQuantity = document.querySelectorAll('.itemQuantity');


                    

                    for (let j = 0; j < produitPanier.length; j++) {

                        let deleteItem = document.querySelectorAll('.deleteItem')
                        console.log(deleteItem)


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



                function initFormAddEventListener() {

                    const order = document.getElementById('order');




                    order.addEventListener('click', function () {

                        let firstName = document.getElementById('firstName').value;
                        let lastName = document.getElementById('lastName').value;
                        let address = document.getElementById('address').value;
                        let city = document.getElementById('city').value;
                        let email = document.getElementById('email').value;



                        let contact = {

                            prenom: firstName,
                            nom: lastName,
                            addresse: address,
                            ville: city,
                            e_mail: email

                        };

                        console.log(contact)

                    });



                }

                initFormAddEventListener();




            })

            .catch(function (err) {
                //une erreur est survenue
            });
    };
};

panier();
