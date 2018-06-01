  // example 1
  
  var slideIndex = 1;
  showSlides(slideIndex);
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
  }

// example 2
var data = [
    { src: "..img/portfolio/aerial1.jpg", title: "Image 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a est mauris. Sed non sollicitudin lacus. Sed maximus facilisis purus, et blandit lectus vehicula in." },
    { src: "img/portfolio/aerial2.jpg", title: "Image 2", description: "Aenean accumsan metus ipsum, id vehicula felis semper sed. Sed hendrerit pulvinar porttitor. Etiam id tortor leo. Integer ex dui, vulputate vel iaculis sit amet, laoreet eu sem." },
    { src: "img/portfolio/aerial3.jpg", title: "Image 3", description: "Vivamus luctus est at sapien sollicitudin, nec mattis arcu condimentum. Vivamus sed varius diam. Nulla varius, tortor vel tempus feugiat, libero felis pellentesque mi, sit amet sagittis lacus massa et erat. " },
    { src: "img/portfolio/aerial4.jpg", title: "Image 4", description: "Vestibulum eu ex ac nunc pretium hendrerit vel in quam. Morbi imperdiet imperdiet pharetra." }
  ];

  // var data = [
  //   { src: "https://placehold.it/150x150?text=Image1", title: "Image 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a est mauris. Sed non sollicitudin lacus. Sed maximus facilisis purus, et blandit lectus vehicula in." },
  //   { src: "https://placehold.it/150x150?text=Image2", title: "Image 2", description: "Aenean accumsan metus ipsum, id vehicula felis semper sed. Sed hendrerit pulvinar porttitor. Etiam id tortor leo. Integer ex dui, vulputate vel iaculis sit amet, laoreet eu sem." },
  //   { src: "https://placehold.it/150x150?text=Image3", title: "Image 3", description: "Vivamus luctus est at sapien sollicitudin, nec mattis arcu condimentum. Vivamus sed varius diam. Nulla varius, tortor vel tempus feugiat, libero felis pellentesque mi, sit amet sagittis lacus massa et erat. " },
  //   { src: "https://placehold.it/150x150?text=Image4", title: "Image 4", description: "Vestibulum eu ex ac nunc pretium hendrerit vel in quam. Morbi imperdiet imperdiet pharetra." }
  // ];

var currentItem = 0;

function prevImg() {
  if (currentItem > 0) {
    currentItem--;
  }
  loadData();
}

function nextImg() {
  if (currentItem < data.length - 1) {
    currentItem++;
  }
  loadData();
}

function loadData() {
  $("#modalTitle").html(data[currentItem].title);
  $("#modalImg").attr("src", data[currentItem].src).attr("alt", data[currentItem].title);
  $("#modalText").html(data[currentItem].description);

  // enable/disable nav buttons  
  $("#navPrev").removeAttr("disabled");
  $("#navNext").removeAttr("disabled");

  if (currentItem == 0) {
    $("#navPrev").attr("disabled", "disabled");
  }
  else if (currentItem == data.length - 1) {
    $("#navNext").attr("disabled", "disabled");
  }
}

function openModal(idx) {
  currentItem = idx;
  loadData();
  $("#modal").modal();
}

$(document).ready(function () {
  var $thumbs = $(".thumbnails");
  
  // dynamically add thumbnails to page
  for (var i = 0; i < data.length; i++) {
    $thumbs.append('<a href="#" onclick="openModal(' + i + ')" class="thumbnail" data-toggle="modal" alt="' + data[i].title + '"><img src="' + data[i].src + '" class="img-responsive center-block" /></a>');
  }
});


// example 3
/* copy loaded thumbnails into carousel */
$('.row .thumbnail').on('load', function() {
  
}).each(function(i) {
  if(this.complete) {
  	var item = $('<div class="item"></div>');
    var itemDiv = $(this).parents('div');
    var title = $(this).parent('a').attr("title");
    
    item.attr("title",title);
  	$(itemDiv.html()).appendTo(item);
  	item.appendTo('.carousel-inner'); 
    if (i==0){ // set first item active
     item.addClass('active');
    }
  }
});

/* activate the carousel */
$('#modalCarousel').carousel({interval:false});

/* change modal title when slide changes */
$('#modalCarousel').on('slid.bs.carousel', function () {
  $('.modal-title').html($(this).find('.active').attr("title"));
})

/* when clicking a thumbnail */
$('.row .thumbnail').click(function(){
    var idx = $(this).parents('div').index();
  	var id = parseInt(idx);
  	$('#myModal').modal('show'); // show the modal
    $('#modalCarousel').carousel(id); // slide carousel to selected
  	
});

