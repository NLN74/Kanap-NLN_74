   
   //Récupérer L'id dans l'url
   const queryString = window.location.search;
    const urlSearch = new URLSearchParams(queryString);
    const idObject = urlSearch.get("id");

    //Insérer le bon numéro de commande dans L'HTML
    let orderId = document.getElementById('orderId');
    orderId.innerHTML = idObject;