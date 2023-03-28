//Guardamos en una variable los datos obtenidos del JSON
var senate_members = data.results[0].members;
//Generamos los totales
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
console.log(JSON.stringify(totals));

// funciones de cantidades de miembros por partido----------------------------------------------------

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

// funciones para promedios ----------------------------------------------------------------

var votes_list_democ = [];
var votes_democrats = 0;
for(i in total_democrats){
votes_list_democ[i] = parseFloat(total_democrats[i].votes_with_party_pct); //?
votes_democrats = votes_democrats + parseFloat(total_democrats[i].votes_with_party_pct); 
}
var average_democrats_votes = (votes_democrats/total_democrats.length).toFixed(2);
totals.average_democrats = average_democrats_votes;

var votes_list_repub = [];
var votes_republicans = 0;
for(i in total_republicans){
votes_list_repub[i] = parseFloat(total_republicans[i].votes_with_party_pct);//?
votes_republicans = votes_republicans + parseFloat(total_republicans[i].votes_with_party_pct); 
}
var average_republicans_votes = (votes_republicans/total_republicans.length).toFixed(2);
totals.average_republicans = average_republicans_votes;

var votes_list_indep = [];
var votes_independients = 0;
for(i in total_independients){
votes_list_indep[i] = parseFloat(total_independients[i].votes_with_party_pct);//?
votes_independients = votes_independients + parseFloat(total_independients[i].votes_with_party_pct); 
}
var average_independent_votes = (votes_independients == 0) ? 0 : (votes_independients/total_independients.length).toFixed(2);
totals.average_independents = average_independent_votes;


// Calculo de most and least engaged----------------------------------------------------

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
// Calculo de most and least loyal -----------------------------------------------------

var ordenados_loyal = senate_members.sort((a, b) => (a.votes_with_party_pct < b.votes_with_party_pct) ? 1 : -1);
for (i = 0; i < ordenados_loyal.length * 0.1; i++) {
    totals.most_loyal[i] = ordenados_loyal[i];
}
ordenados_loyal = ordenados_loyal.reverse();
for (i = 0; i < ordenados_loyal.length * 0.1; i++) {
    totals.least_loyal[i] = ordenados_loyal[i];
}
console.log(totals);

// creo una variable filename que guarda un string con el nombre del html----------------
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
console.log(filename)

// CREACION DE TABLAS ATTENDANCE ----------------------------------------------------------

var senate_glance =
  "<thead class='thead-dark'>"+
                    "<tr>"+
                        "<th>Party</th>"+
                        "<th>Number of Reps</th>"+
                        "<th>% Voted with Party</th>"+
                    "</tr>"+
                "</thead>"+
                "<tbody>"+
                    "<tr>"+
                        "<td>Republican</td>"+
                        "<td>"+totals.number_of_republicans+"</td>"+
                        "<td>"+totals.average_republicans+"</td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td>Democrat</td>"+
                        "<td>"+totals.number_of_democrats+"</td>"+
                        "<td>"+totals.average_democrats+"</td>"+
                    "</tr>"+
                    "<tr>"+
                        "<td>Independent</td>"+
                        "<td>"+totals.number_of_independients+"</td>"+
                        "<td>"+totals.average_independents +"</td>"+
                   "</tr>"+
                "</tbody>"
;
//--------------------------------------------------------------------------------------------------------
var least_engaged_theader="<tr>"+
    "<th>Name</th>"+
    "<th>Number of Missed Votes</th>"+
    "<th>% Missed</th>"+
    "</tr>";
var most_engaged_theader="<tr>"+
    "<th>Name</th>"+
    "<th>Number of Missed Votes</th>"+
    "<th>% Missed</th>"+
    "</tr>";
//--------------------------------------------------------------------------------------------------------
var most_engaged_table = "";
for (i=0; i<totals.most_engaged.length; i++){
    most_engaged_table = most_engaged_table+                
                        "<tr>"+
                        "<td>" + "<a href=" + totals.most_engaged[i].url + ">" + totals.most_engaged[i].first_name + " " + (totals.most_engaged[i].middle_name || " ") + " " + totals.most_engaged[i].last_name + "</a>" + "</td>"+
                            "<td>"+totals.most_engaged[i].missed_votes+"</td>"+
                            "<td>"+totals.most_engaged[i].missed_votes_pct+"</td>"+
                        "</tr>";
}
var least_engaged_table = "";
for (i=0; i<totals.least_engaged.length; i++){
    least_engaged_table = least_engaged_table+                
                        "<tr>"+
                        "<td>" + "<a href=" + totals.least_engaged[i].url + ">" + totals.least_engaged[i].first_name + " " + (totals.least_engaged[i].middle_name || " ") + " " + totals.least_engaged[i].last_name + "</a>" + "</td>"+
                            "<td>"+totals.least_engaged[i].missed_votes+"</td>"+
                            "<td>"+totals.least_engaged[i].missed_votes_pct+"</td>"+
                        "</tr>";
    }
// CREACION DE TABLAS PARTY --------------------------------------------------------------------------------

var least_loyal_theader = "<tr>" +
    "<th>Name</th>" +
    "<th>Number of Party Votes</th>" +
    "<th>% Party</th>" +
    "</tr>";
var most_loyal_theader = "<tr>" +
    "<th>Name</th>" +
    "<th>Number of Party Votes</th>" +
    "<th>% Party</th>" +
    "</tr>";

//--------------------------------------------------------------------------------------------------------

var most_loyal_table = "";
for (i = 0; i < totals.most_loyal.length; i++) {
    most_loyal_table = most_loyal_table +
        "<tr>" +
        "<td>" + "<a href=" + totals.most_loyal[i].url + ">" + totals.most_loyal[i].first_name + " " + (totals.most_loyal[i].middle_name || " ") + " " + totals.most_loyal[i].last_name + "</a>" + "</td>" +
        "<td>" + ((totals.most_loyal[i].total_votes * totals.most_loyal[i].votes_with_party_pct) / 100).toFixed(0) + "</td>" +
        "<td>" + totals.most_loyal[i].votes_with_party_pct + "</td>" +
        "</tr>";
}
var least_loyal_table = "";
for (i = 0; i < totals.least_loyal.length; i++) {
    least_loyal_table = least_loyal_table +
        "<tr>" +
        "<td>" + "<a href=" + totals.least_loyal[i].url + ">" + totals.least_loyal[i].first_name + " " + (totals.least_loyal[i].middle_name || " ") + " " + totals.least_loyal[i].last_name + "</a>" + "</td>" +
        "<td>" + ((totals.least_loyal[i].total_votes * totals.least_loyal[i].votes_with_party_pct) / 100).toFixed(0) + "</td>" +
        "<td>" + totals.least_loyal[i].votes_with_party_pct + "</td>" +
        "</tr>";
}

// Asigno de acuerdo el html que se guardo en filename, lsa tablas correspondientes -----------------------

// if (filename == "senate_attendance_page.html") {
//     document.getElementById("senate-glance").innerHTML = senate_glance;
//     document.getElementById("least_theader").innerHTML = least_engaged_theader;
//     document.getElementById("least_engaged").innerHTML = least_engaged_table;
//     document.getElementById("most_theader").innerHTML = most_engaged_theader;
//     document.getElementById("most_engaged").innerHTML = most_engaged_table;
// }
// else if (filename == "house_attendance_page.html") {
//     document.getElementById("senate-glance").innerHTML = senate_glance;
//     document.getElementById("least_theader").innerHTML = least_engaged_theader;
//     document.getElementById("least_engaged").innerHTML = least_engaged_table;
//     document.getElementById("most_theader").innerHTML = most_engaged_theader;
//     document.getElementById("most_engaged").innerHTML = most_engaged_table;
// }
// else if (filename == "senate_party_loyalty_page.html") {
//     document.getElementById("senate-glance").innerHTML = senate_glance;
//     document.getElementById("least_theader").innerHTML = least_loyal_theader;
//     document.getElementById("least_loyal").innerHTML = least_loyal_table;
//     document.getElementById("most_theader").innerHTML = most_loyal_theader;
//     document.getElementById("most_loyal").innerHTML = most_loyal_table; 
// }
// else if (filename == "house_party_loyalty_page.html") {
//     document.getElementById("senate-glance").innerHTML = senate_glance;
//     document.getElementById("least_theader").innerHTML = least_loyal_theader;
//     document.getElementById("least_loyal").innerHTML = least_loyal_table;
//     document.getElementById("most_theader").innerHTML = most_loyal_theader;
//     document.getElementById("most_loyal").innerHTML = most_loyal_table;
// }
if (filename == "senate_attendance_page.html" || filename == "house_attendance_page.html") {
    document.getElementById("senate-glance").innerHTML = senate_glance;
    document.getElementById("least_theader").innerHTML = least_engaged_theader;
    document.getElementById("least_engaged").innerHTML = least_engaged_table;
    document.getElementById("most_theader").innerHTML = most_engaged_theader;
    document.getElementById("most_engaged").innerHTML = most_engaged_table;
}
else if (filename == "senate_party_loyalty_page.html" || filename == "house_party_loyalty_page.html") {
    document.getElementById("senate-glance").innerHTML = senate_glance;
    document.getElementById("least_theader").innerHTML = least_loyal_theader;
    document.getElementById("least_loyal").innerHTML = least_loyal_table;
    document.getElementById("most_theader").innerHTML = most_loyal_theader;
    document.getElementById("most_loyal").innerHTML = most_loyal_table; 
}