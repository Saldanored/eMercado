// DOM ELEMENTS
const centralImage = document.getElementById("centralImage");
const previewImageContainer = document.getElementById("previewImageContainer");
const reviewContainer = document.getElementById("reviewContainer");
const productDescriptionInfo = document.getElementById("productDescriptionInfo");
const productCategoryInfo = document.getElementById("productCategoryInfo");
const productSoldCountInfo = document.getElementById("productSoldCountInfo");
const productNameInfo = document.getElementById("productNameInfo");
const productPriceInfo = document.getElementById("productPriceInfo");

//FUNCTIONS

//Función para traer las imágenes que faltan 
const getPreviewImages = (imagesArray) => {
  let imagesToAppend = "";
  for (let images = 1; images < imagesArray.length; images++) {
    const image = imagesArray[images];
    imagesToAppend += `<img src ="${image}" onclick="uploadPhoto(this)" class="w-25 h-60 px-1 img-fluid preview" alt=""> `
  }
  previewImageContainer.innerHTML= imagesToAppend;
}

//Función para traer todas las valoraciones
const getReviews = (productInfo) => {
    let reviewsToAppend = [];
    for (let index = 0; index < productInfo.length; index++) {
      const product = productInfo[index];
      reviewsToAppend += `
      <div class="p-4 my-2">
        <div class="d-flex justify-content-between">
          <h5 class="font-weight-bold"><i class="fas fa-user mr-1"></i> ${product.user}</h5>
          <div class="starsContainer">
          </div>
        </div>
        <p class="pt-2">${product.description}</p>
        <p class="text-right">${product.dateTime}</p>
        <hr>
      </div>
      </div>
      `
    }

    reviewContainer.innerHTML = reviewsToAppend;
    showStars(productInfo);
}


//Función para mostrar las estrellas en las valoraciones
const showStars = (productInfo) =>{
  for (let index = 0; index < productInfo.length; index++) {
    
    const product = productInfo[index];
    document.getElementsByClassName("starsContainer")[index].innerHTML += `<span class="fa fa-star checked"></span>`.repeat(product.score);
    document.getElementsByClassName("starsContainer")[index].innerHTML += `<span class="fa fa-star"></span>`.repeat(5 - product.score);
  }
}


//Función para cambiar la foto principal central por otras alternativas
const uploadPhoto = (previewPic) => {
  centralImage.src = previewPic.src;
}

//Función que llama todos los datos del json y los muestra
const getProductInfo = (productInfo) => {
  productNameInfo.innerText = `${productInfo.name}`;
  productPriceInfo.innerText = `${productInfo.currency} ${productInfo.cost}`;
  productDescriptionInfo.innerHTML = `<p><b>Descripción breve: </b> ${productInfo.description} </p> `;
  productCategoryInfo.innerText = `Categoría: ${productInfo.category}`;
  productSoldCountInfo.innerText= `Productos vendidos: ${productInfo.soldCount}`;
  centralImage.src = productInfo.images[0];
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(respuesta => {
      let productInfo = respuesta.data;
      getPreviewImages(productInfo.images);
      getProductInfo(productInfo);

    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(respuesta =>{
      let productComments = respuesta.data;
      getReviews(productComments);
    })
});

