const ORDER_BY_NAME_ASC = "AZ";
const ORDER_BY_NAME_DESC = "ZA";
const ORDER_BY_SOLD_COUNT_ASC = "CantUp.";
const ORDER_BY_SOLD_COUNT_DESC = "CantDown.";
const ORDER_BY_COST_ASC = "CostUp.";
const ORDER_BY_COST_DESC = "CostDown.";
let currentProductsArray = [];
let filteredArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


function sortProducts(criteria, array){
    let result = [];

    if (criteria === ORDER_BY_NAME_ASC)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    
    }else if (criteria === ORDER_BY_NAME_DESC){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT_DESC){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;

        });
        
    }else if (criteria === ORDER_BY_SOLD_COUNT_ASC){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;

        });
    }else if (criteria === ORDER_BY_COST_ASC){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;

        });

    }else if (criteria === ORDER_BY_COST_DESC){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost < bCost ){ return -1; }
            if ( aCost > bCost ){ return 1; }
            return 0;

        });
        
    }

    return result;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}


function showProductsList(){
    let htmlContentToAppend = "";
    
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

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
                    <a href="product-info.html" class="btn text-white" style="background-color: #52026f;">Ver artículo</a>
                </div>
            </div>
            `
            }

            document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}



function showProductsList1(array){
    let htmlContentToAppend = "";
    if (array === undefined || array.length == 0) {
        document.getElementById("prod-list-container").innerHTML="<h2  style='min-height: 80vh;' >No se encontraron resultados.</h2>";
    } else{
        for(let i = 0; i < array.length; i++){
            let product = array[i];
    
            if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
    
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
                        <a href="product-info.html" class="btn text-white" style="background-color: #52026f;">Ver artículo</a>
                    </div>
                </div>
                `
                }
    
                document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
        }
    }



}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_BY_NAME_DESC, resultObj.data);
        }
    });

    document.getElementById("searchBar").addEventListener("input", function(e){
        var searchString = e.target.value.toLowerCase();
        filteredArray = currentProductsArray.filter((product) =>{
            return  (product.name.toLowerCase().includes(searchString) || product.description.toLowerCase().includes(searchString));
        });
        showProductsList1(filteredArray);
        
    })

    document.getElementById("sortByCount").addEventListener("click", function(){
        const iByCount = document.getElementById("iByCount")
        if (iByCount.classList.contains("fa-sort-amount-up")) {
            iByCount.classList.remove("fa-sort-amount-up");
            iByCount.classList.add("fa-sort-amount-down");

            sortAndShowProducts(ORDER_BY_SOLD_COUNT_ASC);
        }else{
            iByCount.classList.add("fa-sort-amount-up");
            iByCount.classList.remove("fa-sort-amount-down");
            sortAndShowProducts(ORDER_BY_SOLD_COUNT_DESC);
        }
    })

    document.getElementById("sortByCost").addEventListener("click", function(){
        const iByCost = document.getElementById("iByCost");
        if(iByCost.classList.contains("fa-sort-amount-up")){
            iByCost.classList.remove("fa-sort-amount-up");
            iByCost.classList.add("fa-sort-amount-down");
            sortAndShowProducts(ORDER_BY_COST_ASC);

            iByCount.classList.add("fa-sort-amount-up");
            iByCount.classList.remove("fa-sort-amount-down");
        }
        else{
            iByCost.classList.remove("fa-sort-amount-down");
            iByCost.classList.add("fa-sort-amount-up");
            sortAndShowProducts(ORDER_BY_COST_DESC)
        }
    })
    document.getElementById("sortByAlpha").addEventListener("click", function(){
        const iByAlpha = document.getElementById("iByAlpha");
        if(iByAlpha.classList.contains("fa-sort-amount-up")){
            iByAlpha.classList.remove("fa-sort-amount-up");
            iByAlpha.classList.add("fa-sort-amount-down");
            sortAndShowProducts(ORDER_BY_NAME_ASC);
        }
        else{
            iByAlpha.classList.remove("fa-sort-amount-down");
            iByAlpha.classList.add("fa-sort-amount-up");
            sortAndShowProducts(ORDER_BY_NAME_DESC);
        }
    })




/*
    document.getElementById("clearRangeFilter").addEventListener("click", () =>{
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        minCount = undefined;
        maxCount = undefined;
        showProductsList();
    })

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
    */

});
