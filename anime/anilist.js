    
    
    
const animeContainer = document.querySelector('.anime-series-container');

// funcion para agregar las series, que se triggerea al hacer click en el boton de agregar
function addSeries(event){
    event.preventDefault();
	document.querySelector('.anime-series-container').style.flexDirection = 'row-reverse';
    const newDiv = document.createElement("div");
	var input = document.querySelector('#nombre');
     
	var info = parser(input.value);
	var fondo = info.then((data) =>{
		var foto = data.results[0].image_url;
		return foto;
	}).then((foto) =>{
		newDiv.style.backgroundImage = 'url(' + foto + ')'
	});
	newDiv.classList.add('anime-series');
	newDiv.innerHTML = '<p>'+input.value+'</p>';
	newDiv.style.backgroundImage = 'url(foto)';
	newDiv.style.backgroundSize = 'cover';

	console.log(info);
	
	if(input.value == '' || info == undefined){
		alert('Hubo un error con el nombre de la serie');
	}else{
		setTimeout(function(){
			animeContainer.appendChild(newDiv);
		},1000);
	}
}

// funcion para cerrar el pop up
var cerrarPagina = ()=>{
    document.querySelector('.pop-up-parent').style.display = 'none';
	document.querySelector('.abrirPopUp').classList = 'anime-series-adder';
}

//------------------------------- 
// abrir el pop up al presionar el adder
const addButton = document.querySelector('.anime-series-adder');

addButton.addEventListener('click', popUpForm);
function popUpForm(event){
    event.preventDefault();
	
    document.querySelector('.pop-up-parent').style.display = 'flex';
	document.querySelector('.anime-series-adder').classList = 'abrirPopUp';
}
//--------------------------------

// agregar una serie al presionar el boton agregar
const submitButton = document.querySelector('.btn-agregar');
submitButton.addEventListener('click', addSeries);
submitButton.addEventListener('click', cerrarPagina);

//--------------------------------------

// cerrar pagina al hacer click en la cruz

const closeButton = document.querySelector('.close-btn');
closeButton.addEventListener('click', cerrarPagina);
    
    
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd287f5a002msh2e8afedde416679p1d3973jsn3beb6169f170',
		'X-RapidAPI-Host': 'jikan1.p.rapidapi.com'
	}
};



async function parser(anime){

	newstring = anime.replaceAll(' ', '%20');
	try {
		const response = await fetch('https://api.jikan.moe/v3/anime/id/request/parameter', options);
		const data = await response.json();
		return data;
	} catch (err) {
		return console.error(err);
	}
}


