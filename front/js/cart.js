
//récupération des la key Canap avec c'est object
let produitPanier = JSON.parse(localStorage.getItem("Canap"));


//mise en place de l'HTML

function insertionHtml (){
for (let i = 0; i < produitPanier.length; i++) {


    const doc = document.getElementById('cart__items')


    doc.innerHTML +=
        `<article class="cart__item" data-id="${produitPanier[i].objectId}" data-color="${produitPanier[i].objectColors}">
                <div class="cart__item__img">
                    <img src="${produitPanier[i].objectUrl}" alt="Photographie d un canapé">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${produitPanier[i].objectName}</h2>
                        <p>${produitPanier[i].objectColors}</p>
                        <p>${produitPanier[i].objectPrice} €</p>
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


};
};

insertionHtml();

//Prix total + Nombre total d'article

let prixTotalCalcul = [];
let numberTotalOfProduit = [];

function prixTotal_nombreArticle (){
    for (let f = 0; f < produitPanier.length; f++) {


        let priceProduit = produitPanier[f].objectPrice * produitPanier[f].objectNumber;

        //Utilisation de parseInt pour retirer les string
        let numberOfProduit = parseInt(produitPanier[f].objectNumber, 10);

        //Mettre les prix dans un tableau
        prixTotalCalcul.push(priceProduit);
        numberTotalOfProduit.push(numberOfProduit);



    };


//Calcul pour le total des Canapé ainsi que du nombre de Canapé
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer);
const numberTotal = numberTotalOfProduit.reduce(reducer);

//Prix total des Canapé
const totalPrice = document.getElementById('totalPrice');
totalPrice.innerHTML = prixTotal;

//Total du nombre de Canapé
const totalQuantity = document.getElementById('totalQuantity');
totalQuantity.innerHTML = numberTotal;


};

prixTotal_nombreArticle();




//Supprimer l'élément au click

function deleteProduct(){

    let deleteItem = document.querySelectorAll('.deleteItem')

    for (let j = 0; j < deleteItem.length; j++){
        deleteItem[j].addEventListener("click", (event) =>{

            event.preventDefault();

            let idDelete = produitPanier[j].objectId;
            let colorDelete = produitPanier[j].objectColors;

            produitPanier = produitPanier.filter(el => el.objectId !== idDelete || el.objectColors !== colorDelete );
 
            localStorage.setItem("Canap", JSON.stringify(produitPanier))

            alert("Ce produit a bien été supprimé du panier");
            location.reload();

        })
    }

};

deleteProduct();


