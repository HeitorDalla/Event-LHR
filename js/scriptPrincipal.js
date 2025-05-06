"use strict";

const links = [...document.querySelectorAll(".link")];

// Implementar o efeito de scroll-behavior nos links do menu
links.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const elementoAtributo = link.getAttribute("atribute");
        const secaoLink = document.getElementById(elementoAtributo);
        if (secaoLink) {
            secaoLink.scrollIntoView({ behavior: 'smooth' });
        }
    })
});

// Mapa com localização do usuário
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        const userLatLng = [pos.coords.latitude, pos.coords.longitude];
        const map = L.map('mapa').setView(userLatLng, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // Local do evento (exemplo GDG Londrina)
        const eventoLatLng = [-23.304452, -51.169582];
        L.marker(eventoLatLng).addTo(map).bindPopup("Local do Evento").openPopup();
        L.marker(userLatLng).addTo(map).bindPopup("Sua Localização");

    }, () => alert("Localização não permitida."));
}

// Validação do formulário
document.getElementById("form-inscricao").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Inscrição enviada com sucesso!");
    e.target.reset();
});

document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.querySelector("ul.menu-links");
  
    toggle.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  });