

//Récupération de L'id dans l'url
const queryString = window.location.search;
const urlSearch = new URLSearchParams(queryString);
const leId = urlSearch.get("id");

//Récupération des donnée grace a fetch
let reponse = await fetch('http://localhost:3000/api/products/'+ leId)
.then(function(rep){
    if(rep.ok){
        return rep.json();
    }
})
.then(function val (valeurs){

//Ajout du titre
    document
        .getElementById('title')
        .innerHTML = valeurs.name;
//Ajout de l'image
    document
        .getElementById('image')
        .src = valeurs.imageUrl;
//Ajout de la description
    document
        .getElementById('description')
        .innerHTML = valeurs.description;
//Ajout du prix
    document
        .getElementById('price')
        .innerHTML = valeurs.price;
//Ajout de la liste déroulante 
        const colorArray = valeurs.colors;

        const numberOfColors = colorArray.length;

        const colors = document.getElementById('colors');

        for(let i = 0; i < numberOfColors; i++){
            const option = document.createElement('option')
            option.innerText = valeurs.colors[i]
            colors.appendChild(option)
            option.setAttribute('value', valeurs.colors[i])
        };



        


        //titre de la page
        const titleName = valeurs.name;
        const title = document.querySelector('title');
        title.innerText = titleName;


        //Mettre les information du kanap dans le local storage

        const addToCart = document.getElementById('addToCart');

        const quantity = document.getElementById('quantity');

        addToCart.addEventListener('click', function(event){
            event.preventDefault()

    

            let contenant = {
                objectId: valeurs._id,
                objectName: valeurs.name,
                objectNumber: quantity.value,
                objectColors: colors.value,
                objectUrl: valeurs.imageUrl,
                objectPrice: valeurs.price
            };


            let produitPanier = JSON.parse(localStorage.getItem("Canap"));

            

            if(produitPanier){
                produitPanier.push(contenant);
                localStorage.setItem('Canap', JSON.stringify(produitPanier));
        
                
            }else{
               produitPanier = [];
               produitPanier.push(contenant);
               localStorage.setItem('Canap', JSON.stringify(produitPanier));
            }

        });
         
        
       
        

})
.catch(function(err){
    //une erreur est survenue
    return console.log("L'API ne fonctionne pas (une erreur est survenue consulter le code)")
});

