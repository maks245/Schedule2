import data from '/schedule.json' assert { type: 'json' };
let obj = data.schedule.sort(function(a, b){return new Date(a.date) - new Date(b.date);});
let daysOfWeek = [[new Date(obj[0].date).getDay()]];
let dates = [[obj[0].date]];
let counter = 0;

// Loop to distribute days by weeks
for (let i = 1; i < obj.length; i++) {
    let diffTime = Math.abs(new Date(obj[i].date) - new Date(obj[i-1].date));
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if(new Date(obj[i].date).getDay() - new Date(obj[i-1].date).getDay() === diffDays){
        daysOfWeek[counter].push(new Date(obj[i].date).getDay());
        dates[counter].push(obj[i].date);
    }
    else {
        counter++;
        daysOfWeek.push([new Date(obj[i].date).getDay()]);
        dates.push([obj[i].date])
    }
}

show(obj, daysOfWeek, dates);

function show(obj, arr, dates) {
    let tab = 
        `<tr>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>  
            <th>Friday</th>  
            <th>Saturday</th>  
            <th>Sunday</th>    
         </tr>`;
    document.getElementById("head").innerHTML = tab;
    tab = "";
    // Loop to create dates rows
    for (let r = 0; r < arr.length; r++) {
        let counter = 0;
        let counter2 = 0;
        tab += `<tr>`
        for (let i = 0; i < 7; i++){

            if (!arr[r].includes(i)) {
                tab += `<th class="dates">&nbsp</th>`;
            }
            else {
                tab += `<th class="dates">${dates[r][counter]}</th>`;
                counter++;
            }
        }
        tab += `</tr>`;
        tab += `<tr>`;
        // Loop to create lesson rows
        for (let i = 0; i < 7; i++) {

            if (!arr[r].includes(i)) {
                tab += `<td>&nbsp</td>`;
            }
            else{
                tab += `<td>`;
                for (let j of obj[counter2].lessonList){

                    tab += `${j.subject}<br>${j.time}<br>${j.teacher}<br>${j.classroom}<br>`;
                    tab += `<hr>`;
                }
                tab = tab.slice(0, tab.length-4);
                tab +=`</td>`;
                counter2++;
            }
        }
        tab += `</tr>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById("body").innerHTML = tab;
}