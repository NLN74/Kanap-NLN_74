
//Recupération de L'ID 'items' dans le document HTML
const items = document.getElementById("items");
let cartsItems;


//récuperation des données de l'API
fetch("http://localhost:3000/api/products/")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }


    })

    .then(function values(value) {
        //Boucle for qui continue jusqu'a le dernier objet du tableau
        for (let i = 0; i < value.length; i++) {

            //Création des variable pour la création d'élément

            let cartsItems = document.createElement("a");

            let article = document.createElement("article")
            let image = document.createElement("img")
            let title3 = document.createElement("h3")
            let paragraphe = document.createElement("p")

            //Ajout des élément creer dans leurs parents     
            items.appendChild(cartsItems)
            cartsItems.appendChild(article)
            article.appendChild(image)
            article.appendChild(title3)
            article.appendChild(paragraphe)

            //Mise en relation des donnée du tableau et des Element créer 
            let _id = (value[i])._id
            image.src = (value[i]).imageUrl
            title3.innerHTML = (value[i]).name
            paragraphe.innerHTML = (value[i]).description

            //Ajout de l'id cartsItems

            //cartsItems.setAttribute('id', "0"+(i))
            //Liens Hypertext
            cartsItems.setAttribute('href', "../html/product.html?id=" + (_id))


        }



    })
    .catch(function (err) {
        //une erreur est survenue
    });











