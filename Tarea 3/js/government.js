function fetchGetData(congress) {
    const url =
      congress == "senate"
        ? "https://api.propublica.org/congress/v1/113/senate/members.json"
        : "https://api.propublica.org/congress/v1/113/house/members.json";
    fetch(url, {
      // method: "GET",
      headers: new Headers({
        "X-API-Key": "ggoJJ9D5kP53izx1E6Y1j2EUYfcb9C7zJA0A8wE0"
      })
    })
      .then(res => res.json())
      .then(data => {
        app.members = data.results[0].members;
        members = app.members;
        console.log(app.members = data.results[0].members);
        
      });
  }

// generamos la app VUE 
var app = new Vue({
    el: '#app',
    data: {
      members: [],
      results: {
        glance:{
            democrats: [],
            republicants: [],
            independents: [],
            // total: []
            },
        least_engaged: [],
        most_engaged: [],
        least_loyal: [],
        most_loyal: []
    }
    }
});

fetchGetData(congress);

//--------------------------------FILTROS DE BUSQUEDAS---------------------------------------------------------
 function filterByState() {
    app.members = members; //rellenamos los miembros iniciales antes de volver a realizar un filtro 
    stateSelect = document.getElementById("stateFilter");  //traemos el elemnto que selecciona las ciudades
    stateValue = stateSelect.options[stateSelect.selectedIndex].value; //guardamos el valor del select
    //console.log(stateValue);
    stateArray = []; // inicializamos una lista donde guardarems los miembros que pertecen a la ciudad seleccionada

    if (stateValue === ("ALL")){
        filterByParty(app.members);
    }else{
        for(m of app.members){
            if(m.state === stateValue){
                stateArray.push(m)
            }
        }
        filterByParty(stateArray);
    }
}

function filterByParty(array){
    checkBoxes = Array.from(document.querySelectorAll('input[name=party]:checked')); // guardamos una lista de los partidos seleccionados
    partyArray = checkBoxes.map( e => e.value); // guardamos el valor de los partidos seleccionados
    console.log("chequeados: ", partyArray);
    filterArray = []; // Icializamos una lista para los miembros perteneciente a los partidos seleccionados
    if(partyArray.length == 0){
        app.members = array;
    }else{
        for(ar of array){
            if(partyArray.includes(ar.party)){ // si alguno de los partidos seleccionados es el partido del que pertenece el miembro
                filterArray.push(ar); // lo agregamos a la lista
            }
        }
        app.members = filterArray; 
        console.log(app.members);
    }
    
}