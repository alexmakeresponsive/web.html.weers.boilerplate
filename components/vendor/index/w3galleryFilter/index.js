filterSelection("all"); // Execute the function and show all columns

function filterSelection(c) {
    var x, i;
    x = document.querySelectorAll(".gallery1 .col");

    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        x[i].classList.remove('show')
    }

    setTimeout(func, 300);

    function func () {
        for (i = 0; i < x.length; i++) {
            if (x[i].className.indexOf(c) > -1) x[i].classList.add('show');
        }
    }
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("w3gallery1FilterButtons");
var btns = btnContainer.getElementsByClassName("filter");


for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(){

        var current = btnContainer.querySelector(".filter.active");
        current.classList.remove('active');

        this.classList.add('active');

        filterSelection(this.getAttribute('data-filter'));
    });
}


console.log('w3galleryFilter included success !!! change §');