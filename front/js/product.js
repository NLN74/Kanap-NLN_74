

//Récupération de L'id dans l'url
const queryString = window.location.search;
const urlSearch = new URLSearchParams(queryString);
const idObject = urlSearch.get("id");

//Récupération des donnée grace a fetch
let reponse = await fetch('http://localhost:3000/api/products/' + idObject)
    .then(function (rep) {
        if (rep.ok) {
            return rep.json();
        }
    })
    .then(function afficherPageProduit(listObject) {

        //Ajout du titre
        document
            .getElementById('title')
            .innerHTML = listObject.name;
        //Ajout de l'image
        document
            .getElementById('image')
            .src = listObject.imageUrl;
        //Ajout de la description
        document
            .getElementById('description')
            .innerHTML = listObject.description;
        //Ajout du prix
        document
            .getElementById('price')
            .innerHTML = listObject.price;


        //Ajout de la liste déroulante 
        const colorArray = listObject.colors;

        const numberOfColors = colorArray.length;

        const colors = document.getElementById('colors');

        for (let i = 0; i < numberOfColors; i++) {
            const option = document.createElement('option')
            option.innerText = listObject.colors[i]
            colors.appendChild(option)
            option.setAttribute('value', listObject.colors[i])
        };






        //titre de la page
        const titleName = listObject.name;
        const title = document.querySelector('title');
        title.innerText = titleName;


        //Mettre les information du kanap dans le local storage

        const addToPaner = document.getElementById('addToCart');

        const quantity = document.getElementById('quantity');

        //Ajout au panier via la fonction addEventListener
        addToPaner.addEventListener('click', function (event) {

            event.preventDefault()



            let contenant = {
                objectId: listObject._id,
                objectNumber: parseInt(quantity.value, 0),
                objectColors: colors.value

            };


            let produitPanier = JSON.parse(localStorage.getItem("Canap"));



            if (produitPanier) {

                let produitTrouver = false;

                for (let i = 0; i < produitPanier.length; i++) {

                    //Si le ProduitPanier avec la Bonne Id = Id listObject et Couleur du produit = a celle du panier alors juste modifié la quantité
                    if (produitPanier[i].objectId == listObject._id && colors.value == produitPanier[i].objectColors) {
                        console.log('produit trouver')


                        produitPanier[i].objectNumber += parseInt(quantity.value, 0);
                        produitTrouver = true;
                        break
                    }


                }
                //Si le produit Produit n'existe pas dans le LocalStorage alors le créer
                if (produitTrouver == false) {
                    produitPanier.push(contenant);
                }





            } else {

                produitPanier = [];
                produitPanier.push(contenant);

            }

            localStorage.setItem('Canap', JSON.stringify(produitPanier));
            alert(quantity.value + " " + listObject.name + " ajoutés au panier!!");
        });




    })
    .catch(function (err) {
        //une erreur est survenue
        return console.log("L'API ne fonctionne pas (une erreur est survenue consulter le code)")
    });
