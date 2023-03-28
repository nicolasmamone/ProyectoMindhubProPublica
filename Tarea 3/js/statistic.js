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
        stadistic(app.members);
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


//funcion que genera las estadisticas de los miembros
function stadistic(senate_members){
    var totals = {
        "number_of_democrats": 0,
        "number_of_republicans": 0,
        "number_of_independients": 0,
        "average_democrats": 0,
        "average_republicans": 0,
        "average_independents": 0,
        "least_engaged": [],
        "most_engaged":[],
        "least_loyal":[],
        "most_loyal":[],
        "total": 0,
}

function democrats(member) {
    return member.party == "D";
}
var total_democrats = senate_members.filter(democrats);
totals.number_of_democrats = total_democrats.length;

function republicans(member) {
    return member.party == "R";
}
var total_republicans = senate_members.filter(republicans);
totals.number_of_republicans = total_republicans.length;

function independients(member) {
    return member.party == "I";
}
var total_independients = senate_members.filter(independients)
totals.number_of_independients = total_independients.length;

// function de promedios ----------------------------------------------------------------

var votes_list_democ = [];
var votes_democrats = 0;
for(i in total_democrats){
votes_list_democ[i] = parseFloat(total_democrats[i].votes_with_party_pct);
votes_democrats = votes_democrats + parseFloat(total_democrats[i].votes_with_party_pct); 
}
var average_democrats_votes = (votes_democrats/total_democrats.length).toFixed(2);
totals.average_democrats = average_democrats_votes;

var votes_list_repub = [];
var votes_republicans = 0;
for(i in total_republicans){
votes_list_repub[i] = parseFloat(total_republicans[i].votes_with_party_pct);
votes_republicans = votes_republicans + parseFloat(total_republicans[i].votes_with_party_pct); 
}
var average_republicans_votes = (votes_republicans/total_republicans.length).toFixed(2);
totals.average_republicans = average_republicans_votes;

var votes_list_indep = [];
var votes_independients = 0;
for(i in total_independients){
votes_list_indep[i] = parseFloat(total_independients[i].votes_with_party_pct);
votes_independients = votes_independients + parseFloat(total_independients[i].votes_with_party_pct); 
}
var average_independent_votes = (votes_independients == 0) ? 0 : (votes_independients/total_independients.length).toFixed(2);
totals.average_independents = average_independent_votes;

// // Calculo de most and least engaged----------------------------------------------------

// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_sort2
var ordenados = senate_members.sort((a, b) => (a.missed_votes < b.missed_votes) ? 1 : -1);
//la cantidad de senadores * 0.1 => es igual al 10 porciento de senadores
for (i=0; i<ordenados.length*0.1; i++){
    totals.least_engaged[i] = ordenados[i];
}
ordenados = ordenados.reverse();
for (i=0; i<ordenados.length*0.1; i++){
    totals.most_engaged[i] = ordenados[i];
}
console.log(totals.least_engaged);

// Calculo de most and least loyal -----------------------------------------------------

var ordenados_loyal = senate_members.sort((a, b) => (a.votes_with_party_pct < b.votes_with_party_pct) ? 1 : -1);
for (i = 0; i < ordenados_loyal.length * 0.1; i++) {
    totals.most_loyal[i] = ordenados_loyal[i];
}
ordenados_loyal = ordenados_loyal.reverse();
for (i = 0; i < ordenados_loyal.length * 0.1; i++) {
    totals.least_loyal[i] = ordenados_loyal[i];
}

app.results.glance.democrats.push("Democrats", totals.number_of_democrats,totals.average_democrats);
app.results.glance.republicants.push("Republicans", totals.number_of_republicans,totals.average_republicans);
app.results.glance.independents.push("Independents", totals.number_of_independients,totals.average_independents);

app.results.least_engaged.push(totals.least_engaged);
app.results.most_engaged.push(totals.most_engaged);
app.results.least_loyal.push(totals.least_loyal);
app.results.most_loyal.push(totals.most_loyal);
}



