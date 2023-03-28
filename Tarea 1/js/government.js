members = data.results[0].members;
var html = CrearTabla(members);
var tblHead = document.getElementById("table-headers");
document.getElementById("government-data").innerHTML = html;

//----------------------------------------------------------------------------

function CrearTabla(data){
    return data.map(element=>{
        return "<tr>" + "<td>" + "<a href=" + element.url + ">" + element.first_name + " " + (element.middle_name || " " ) + " " + element.last_name + "</a>" + "</td>" +
            "<td>" + element.party + "</td>" +
            "<td>" + element.state + "</td>" + 
            "<td>" + element.seniority + "</td>" +
            "<td>" + element.votes_with_party_pct + "%" + "</td>"
            + "</tr>" 
    }).join("")

}
 
 function filterByState() {
    stateSelect = document.getElementById("stateFilter");
    stateValue = stateSelect.options[stateSelect.selectedIndex].value;
    //console.log(stateValue);
    stateArray = [];

    if (stateValue === ("ALL")){
        filterByParty(members);
    }else{
        for(m of members){
            if(m.state === stateValue){
                stateArray.push(m)
            }
        }
        filterByParty(stateArray);
    }
}

function filterByParty(array){
    checkBoxes = Array.from(document.querySelectorAll('input[name=party]:checked'));
    partyArray = checkBoxes.map( e => e.value);
    console.log("chequeados: ", partyArray);
    filterArray = [];
    if(partyArray.length == 0){
        html = CrearTabla(array);
        document.getElementById("government-data").innerHTML = html;
    }else{
        for(ar of array){
            if(partyArray.includes(ar.party)){
                filterArray.push(ar);
            }
        }
        //console.log(filterArray)
        html = CrearTabla(filterArray);
        document.getElementById("government-data").innerHTML = html;
    }
    
}