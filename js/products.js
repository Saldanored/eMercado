function showProductsList(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];
        
        
        htmlContentToAppend += `
        <div class="col-sm-4" style="padding: 0.5rem;">
            <div class="card shadow-sm custom-card border rounded h-100">
                <img src="${product.imgSrc}" class="card-img-top" alt="...">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="text-muted">` + product.cost + `  ` + product.currency +  `</p>
                    </div>

                    <p class="card-text text-muted text-justify">${product.description}</p>
                    <small class="text-muted">${product.soldCount} productos vendidos</small>
                </div>
                <a href="#" class="btn btn-primary">Ver artículo</a>
            </div>
        </div>
        `

        
/*
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.cost + `  ` + product.currency +  `</small>
                    </div>
                    <p>` + product.description + `  </p>
                </div>
            </div>
        </div>
        `
*/

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
        }
    });
});