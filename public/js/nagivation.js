let allContent = document.getElementsByClassName("main-content");

function activePage(id) {
    for (content of allContent){
        content.classList.add("disabled");
    };

    document.getElementById(id).classList.remove("disabled");
}

let navLinks = Array.from(document.getElementsByClassName("navigation-link"));

for (navLink of navLinks){
    navLink.addEventListener("click", function(e){
        e.preventDefault();
        activePage(e.target.getAttribute("href").slice(1))
    })
}