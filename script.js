"use strict";

const links = [...document.querySelectorAll(".link")];

// Implementar o efeito de scroll-behavior nos links do menu
document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
    
            const elementoAtributo = link.getAttribute("atribute");
            const secaoLink = document.getElementById(elementoAtributo);
            if (secaoLink) {
                secaoLink.scrollIntoView({behavior: 'smooth'});
            }  
        })
    });
});