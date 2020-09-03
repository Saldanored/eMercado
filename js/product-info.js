// DOM ELEMENTS
const centralImage = document.getElementById("centralImage");
const previewImageContainer = document.getElementById("previewImageContainer");
const reviewContainer = document.getElementById("reviewContainer");
const descriptionDiv = document.getElementById("descriptionDiv");

//FUNCTIONS
const getPreviewImages = (array) => {
  let imagesToAppend = [];
  for (let images = 1; images < array.length; images++) {
    const element = array[images];
    imagesToAppend += `<img src ="${element}" onclick="uploadPhoto(this)" class="w-25 h-60 px-1 img-fluid preview" alt=""> `
  }
  previewImageContainer.innerHTML= imagesToAppend;
}

const getReviews = (array) => {
    //array.sort((a,b) => b.score - a.score)
    let reviewsToAppend = [];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      reviewsToAppend += `
      <div class="p-4 my-2">
        <div class="d-flex justify-content-between">
          <h5 class="font-weight-bold"><i class="fas fa-user mr-1"></i> ${element.user}</h5>
          <div>
            <p>Puntuación ${element.score}/5</p>
          </div>
        </div>
        <p class="pt-2">${element.description}</p>
        <p class="text-right">${element.dateTime}</p>
        <hr>
      </div>
      </div>
      `
    }
    reviewContainer.innerHTML = reviewsToAppend;
}

const uploadPhoto = (previewPic) => {
  centralImage.src = previewPic.src;
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(respuesta => {
      let productInfo = respuesta.data;
      
      centralImage.src = productInfo.images[0];
      getPreviewImages(productInfo.images);
    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(respuesta =>{
      let productComments = respuesta.data;
      getReviews(productComments);
    })
});

