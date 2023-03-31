function mostrarConteudo() {
    // Carrega o conteúdo do arquivo HTML desejado
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'projects/pokedex/index.html', true);
    xhr.onload = function () {
        if (this.status === 200) {
            // Exibe o conteúdo do arquivo HTML na página atual
            document.getElementById('conteudo').innerHTML = this.responseText;
        }
    };
    xhr.send();
}

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const pokemonWeight = document.querySelector('.pokemon-weight');
const pokemonHeight = document.querySelector('.pokemon-height');

const form = document.querySelector('.form');
const input = document.querySelector('.search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonGo = document.querySelector('.btn-go');

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const  renderPokemon = async (pokemon) => {  
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
    pokemonWeight.innerHTML = data.weight + ' oz'; 
    pokemonHeight.innerHTML = data.height + ' ft';  
  } else {
    // pokemonImage.style.display = 'none';
    pokemonImage.src = './assets/img/missign.png'
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '404';
    pokemonWeight.innerHTML = '--'; 
    pokemonHeight.innerHTML = '--';  
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

console.log('a')

buttonNext.addEventListener('click', () => {
  console.log('alo')
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

buttonGo.addEventListener('click', () => {
  console.log('oi')
  var valorInput = document.getElementById("search").value;
  renderPokemon(valorInput.toLowerCase());
});

renderPokemon(searchPokemon);

});








