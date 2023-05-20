// Fusion:fujs
// Løsningsforslag til innlevering uke 43





//Oppgave 1
print("Oppgave 1");
const Tid = ["01.2021", "02.2021", "03.2021", "04.2021", "05.2021", "06.2021", "07.2021", "08.2021", "09.2021", "10.2021",  "11.2021", "12.2021"];
const Maksimums_temperatur = [8.9, 15.4, 13.8, 16.5, 21.2, 26.4, 29.1, 26.2, 21.8, 19.7, 15.0, 11.8];
const Minimums_temperatur = [-10.2, -11.1, -5.1, -3.7, 0, 6.9, 7.8, 6.5, 4.2, -1.0, -6.1, -7.3];
const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const Differences = [];
const AllAverages = [];

//Oppgave 2
print("Oppgave 2");
const data = {

};
const allData = {
};


Tid.forEach(date => {
    data[`${Tid.indexOf(date)}`] = {
        date:date,
        monthNumber: date.substring(0,2),
        min_temp: Minimums_temperatur[Tid.indexOf(date)], 
        max_temp: Maksimums_temperatur[Tid.indexOf(date)], 
    };
    
    allData[`${Tid.indexOf(date)}`] = data[`${Tid.indexOf(date)}`];
    allData[`${Tid.indexOf(date)}`].month = Months[Tid.indexOf(date)];
});
console.table(data);

//Oppgave 3
print("Oppgave 3")
function maxMinDifference(ind){
    //Fetches an object from the data dict and finds the difference between the max and minimum temperature of it.
    try{
      ind = Number(ind);
      let obj = data[ind];
      var difference = (obj.max_temp) - (obj.min_temp);
      return difference;
    } catch(err) {
        throw err;
    }
}
for(var index of Object.keys(data)){
    let diff = maxMinDifference(index);
    //console.log(`Difference between Max and Min temperatures for ${Months[index]} is ${diff}`)
    allData[index].minMaxDifference = diff;
    Differences.push(diff);
}
console.log(Differences);


//Oppgave 4
print("Oppgave 4");
function Average(obj=null){
    //Loops through an array/list and returns the average of its contents.
    function getSum(total, value, ind, arr){
        return total+value;
    }
    if(obj == null){
        obj = Differences;
    }
    
    sum = obj.reduce(getSum);
    return (sum/obj.length);
}

for(let ind=0; ind<Object.keys(data).length; ind++){
    maxAndMin = [data[ind].max_temp, data[ind].min_temp]
    __Average = Average(maxAndMin);
    allData[ind].maxAndMinAverage = __Average;
    AllAverages.push(__Average);
    //console.log(`Max og Min Gjennomsnitt av ${Months[ind]} er ${__Average}`) //Kontrollere funksjonen
}
//console.log(AllAverages) //``` Debugging```


//Opgave 5
print("Oppgave 5");
function checkDegOver20(val, ind, arr){
    return allData[val].max_temp > 20;
}
monthsOver20deg = Object.keys(allData).filter(checkDegOver20)
console.log(`Months with a temperature over 20 degrees: ${monthsOver20deg.map((ind)=>{return allData[ind].month})}`);
for(var m of monthsOver20deg){
    console.log(`${allData[m].month}: ${allData[m].max_temp}`);
}


//I cant seem to get plot() to work.

//Oppgave 6
print("Oppgave 6")
function drawGraf(arr, col="red"){
    //Draws a graph from an array of numbers.
    var allXes = []
    var allYes = []
    obj = arr
    tegnBrukXY(0, 11, -15, 30)
    for(let ind in obj){
        yVal = obj[ind]
        x = ind
        y =  yVal
        allXes.push(x)
        allYes.push(y)
        tegnPunkt(x,y, /*/verdi=allData[ind].month,/*/ markør = "sirkel", farge=col)
    }
    
    tegnAkser("Month", "Value", 2, 4)
    tegnKurve(allXes, allYes, farge=col, bredde=0.5)
}
drawGraf(Maksimums_temperatur)
drawGraf(Minimums_temperatur, "green")
drawGraf(AllAverages, "blue")
drawGraf(Differences, "cyan")
console.log(Differences)

tegnTekst("maximum temp",5,-3, "red")
tegnTekst("minimum temp",5,-4.5, "green")
tegnTekst("gjennomsnitt av temp",5,-6, "blue")
tegnTekst("difference maxMin",5,-7.5, "cyan")

//tegnPunkt(5,1)
//tegnPunkt(0,5)