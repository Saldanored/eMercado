// DOM ELEMENTS
const centralImage = document.getElementById("centralImage");
const previewImageContainer = document.getElementById("previewImageContainer");
const reviewContainer = document.getElementById("reviewContainer");
const productDescriptionInfo = document.getElementById("productDescriptionInfo");
const productCategoryInfo = document.getElementById("productCategoryInfo");
const productSoldCountInfo = document.getElementById("productSoldCountInfo");
const productNameInfo = document.getElementById("productNameInfo");
const productPriceInfo = document.getElementById("productPriceInfo");
const relatedProductsContainer = document.getElementById("relatedProductsContainer");
const submitComment = document.getElementById("submitComment");

//FUNCTIONS

//
const publicarComentario = () =>{
  let textareaComment = document.getElementById("textareaComment").value;
  let selectRating = document.getElementById("selectRating").value;

  let date = new Date().toISOString().substr(0, 19);
  let dateTime = date.replace("T", " ")
  console.log(dateTime);
  console.log(selectRating);
  let paintedStars = `<span class="fa fa-star checked"></span>`.repeat(selectRating);
  let notPaintedStars = `<span class="fa fa-star"></span>`.repeat(5 - selectRating);
  if(textareaComment){
    let htmlToAppend =  `
    <div class="p-4 my-2">
      <div class="d-flex justify-content-between">
        <h5 class="font-weight-bold"><i class="fas fa-user mr-1"></i> ${localStorage.getItem('nombreUsuario')}</h5>
        <div class="starsContainer">
          ${paintedStars}${notPaintedStars}
        </div>
      </div>
      <p class="pt-2">${textareaComment}</p>
      <p class="text-right">${dateTime}</p>
      <hr>
    </div>
    </div>
  `
    reviewContainer.innerHTML += htmlToAppend;
  } 



}



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
    let reviewsToAppend = "";
    for (let i = 0; i < productInfo.length; i++) {
      const product = productInfo[i];
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
  for (let i = 0; i < productInfo.length; i++) {
    const product = productInfo[i];
    document.getElementsByClassName("starsContainer")[i].innerHTML += `<span class="fa fa-star checked"></span>`.repeat(product.score);
    document.getElementsByClassName("starsContainer")[i].innerHTML += `<span class="fa fa-star"></span>`.repeat(5 - product.score);
  }
}


//Función para cambiar la foto principal central por otras alternativas
const uploadPhoto = (previewPic) => {
  centralImage.src = previewPic.src;
}

//Función que llama todos los datos descriptivos del producto del json y los muestra
const getProductInfo = (productInfo) => {
  productNameInfo.innerText = `${productInfo.name}`;
  productPriceInfo.innerText = `${productInfo.currency} ${productInfo.cost}`;
  productDescriptionInfo.innerHTML = `<p><b>Descripción breve: </b> ${productInfo.description} </p> `;
  productCategoryInfo.innerText = `Categoría: ${productInfo.category}`;
  productSoldCountInfo.innerText= `Productos vendidos: ${productInfo.soldCount}`;
  centralImage.src = productInfo.images[0];
}

//Función que muestra los productos relacionados
const showRelatedProducts = (relatedProducts) =>{ // paso la array de los productos relacionados
  getJSONData(PRODUCTS_URL).then( res => {    // llamo el json donde estan ubicados esos productos
    let productos = res.data; 
    let htmlToAppend = "";
    for (let i = 0; i < relatedProducts.length; i++) {    //paso por todos los indices de la array de prod rel 
      let relatedProductPosition = relatedProducts[i];    // guardo en una variable los valores del array (1,3)
      let producto = productos[relatedProductPosition]; // uso las posiciones  para acceder en el otro objeto al array y la guardo en otra variable
      htmlToAppend += `
      <div class="col-lg-4 ">
          <div class="card shadow-sm custom-card border rounded h-100">
              <img src="${producto.imgSrc}" class="card-img-top" alt="...">
              <div class="card-body">
                  <div class="d-flex justify-content-between">
                      <h5 class="card-title textPrimaryColor">${producto.name}</h5>
                      <p class="text-muted">` + producto.cost + `  ` + producto.currency +  `</p>
                  </div>

                  <p class="card-text text-muted text-justify">${producto.description}</p>
                  <small class="text-muted">${producto.soldCount} productos vendidos</small>
              </div>
              <a href="product-info.html" class="btn text-white" style="background-color: #52026f;">Ver artículo</a>
          </div>
      </div>
      ` 
    }
    relatedProductsContainer.innerHTML = htmlToAppend;
  })

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(respuesta => {
      let productInfo = respuesta.data;
      getPreviewImages(productInfo.images);
      getProductInfo(productInfo);
      
      showRelatedProducts(productInfo.relatedProducts);

    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(respuesta =>{
      let productComments = respuesta.data;
      getReviews(productComments);
    })
    submitComment.addEventListener("click", publicarComentario);

});

