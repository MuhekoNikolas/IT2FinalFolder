

daysOfWeekDiagram = function (sketch){
    sketch.setup = function setup(){
        sketch.createCanvas(650, 500)
        canvas = document.querySelector("#defaultCanvas0")
        canvas.setAttribute("id", "daysOfWeekDiagram")
        document.querySelector(".daysOfWeekdiagramSection").appendChild(canvas)
    
    } 

    sketch.draw = function draw(){
        if(DATA != null && DATA.constructor == [].constructor){
            sketch.background("#143439")
            sortedByDayOfWeek = dataAnalyzer.sortByDayOfWeek()
    
            sortedByHighestRecords = Object.keys(sortedByDayOfWeek).sort((a,b)=>{
                return sortedByDayOfWeek[a].records > sortedByDayOfWeek[b].records
            })
            highestRecords = sortedByDayOfWeek[sortedByHighestRecords[0]].records
    
            var sortedByDayOfWeekMappedRecords = {}
    
            for(_rec of Object.keys(sortedByDayOfWeek)){
                _record = sortedByDayOfWeek[_rec]
                _mappedRecord = sketch.map(_record.records, 0, highestRecords, 0, sketch.height-300)
                if(_mappedRecord <= 1){
                    continue
                }
    
                sortedByDayOfWeekMappedRecords[_rec] = {
                    records: _mappedRecord,
                    day: sortedByDayOfWeek[_rec].day
                }
            }
    
            for(_recKey of Object.keys(sortedByDayOfWeekMappedRecords)){
                _rec = sortedByDayOfWeekMappedRecords[_recKey]
                _thisGraphElementWidth = (sketch.width/ (Object.keys(sortedByDayOfWeekMappedRecords).length)) - 10
                _index = Object.keys(sortedByDayOfWeekMappedRecords).indexOf(_recKey)
                _thisColor = sketch.color(sketch.random(255), sketch.random(255), sketch.random(255))
    
                sketch.fill(_thisColor)
                sketch.rect( (_thisGraphElementWidth * (_index * 1.1)) + _index, (sketch.height - _rec.records) - 50, _thisGraphElementWidth, _rec.records)
                sketch.textSize(25)
                sketch.fill(255)
                sketch.text(_recKey, ((_thisGraphElementWidth + 10) * _index) + (_thisGraphElementWidth/2 - (7)) + _index, (sketch.height - 25))
                sketch.text( sortedByDayOfWeek[_recKey].records, ((_thisGraphElementWidth + 10) * _index) + (_thisGraphElementWidth/2 - (40)) + _index, (sketch.height - _rec.records))
    
                sketch.fill(_thisColor)
                sketch.textSize(15)
                sketch.text(`${_recKey} - ${_rec.day}`, sketch.width-150, (25*_index) + 25)
            }
    
        } else {
            sketch.background("#143439");
            sketch.textSize(25);
            sketch.fill(sketch.color(255,0, 0))
            sketch.text("Please import the dataset file.", sketch.width/2 - 150, sketch.height/2)
        }
    
        sketch.noLoop();
    }

}


topThreeVisitedPointsDiagram = function(sketch){
    sketch.setup = function setup(){
        sketch.createCanvas(650, 500)
        canvas = document.querySelector("#defaultCanvas0")
        canvas.setAttribute("id", "topThreeVisitedDiagram")
        document.querySelector(".topThreeMostVisiteddiagramSection").appendChild(canvas)
    
    } 

    sketch.draw = function setup(){
        if(dataAnalyzer?.mostVisitedStartingPoints != null && dataAnalyzer.mostVisitedStartingPoints.constructor == {}.constructor){ 
            sketch.background("#143439")
            _lastRecPos = sketch.createVector(-10, 0)
            _recWidth = ( sketch.width/Object.keys(dataAnalyzer.mostVisitedStartingPoints).length ) + 20
            for(_recKey of Object.keys(dataAnalyzer.mostVisitedStartingPoints)){
                _rec = dataAnalyzer.mostVisitedStartingPoints[_recKey]
                _thisColor = sketch.color(sketch.random(255), sketch.random(255), sketch.random(255))

                _recPos = sketch.createVector(
                    (_recWidth * Number(_recKey)) + 20, 
                    sketch.height - ( sketch.map(_rec.visits, (dataAnalyzer.mostVisitedStartingPoints[Object.keys(dataAnalyzer.mostVisitedStartingPoints)[Object.keys(dataAnalyzer.mostVisitedStartingPoints).length-1]].visits), (dataAnalyzer.mostVisitedStartingPoints[Object.keys(dataAnalyzer.mostVisitedStartingPoints)[0]].visits), 50, sketch.height-100  ))
                )
                sketch.stroke(255)
                sketch.strokeWeight(5)
                if(Number(_recKey) != 0){
                    sketch.line(_lastRecPos.x, _lastRecPos.y, _recPos.x, _recPos.y)
                } else {
                    sketch.fill(sketch.color(40, 100, 20))
                    sketch.text("Three most visited Starting locations.", sketch.width/3, (20 * (Number(_recKey))) + 80 )
                }

                sketch.strokeWeight(2.5)
                sketch.fill(_thisColor)
                sketch.circle(_recPos.x, _recPos.y, 20)

                sketch.strokeWeight(0.5)
                sketch.textSize(20)
                sketch.text(`${Number(_recKey)+1}`, _recPos.x-5, _recPos.y-20)

                sketch.textSize(15)
                sketch.text(`${Number(_recKey)+1} ${_rec.locationName} ( ${_rec.visits} visits)`, sketch.width/3, (20 * (Number(_recKey))) + 100 )

                _lastRecPos = _recPos
                console.log(_rec, _recKey, _recPos)
            }
        } else {
            sketch.background("#143439");
            sketch.textSize(25);
            sketch.fill(sketch.color(255,0, 0))
            sketch.text("Please import the dataset file.", sketch.width/2 - 150, sketch.height/2)
        }
    
        sketch.noLoop();
    } 

}

leastThreeVisitedPointsDiagram = function(sketch){
    sketch.setup = function setup(){
        sketch.createCanvas(650, 500)
        canvas = document.querySelector("#defaultCanvas0")
        canvas.setAttribute("id", "leastThreeVisitedDiagram")
        document.querySelector(".leastThreeMostVisiteddiagramSection").appendChild(canvas)
    
    } 

    sketch.draw = function setup(){
        if(dataAnalyzer?.leastVisitedStartingPoints != null && dataAnalyzer.leastVisitedStartingPoints.constructor == {}.constructor){ 
            sketch.background("#143439")
            _lastRecPos = sketch.createVector(-10, 0)
            _recWidth = ( sketch.width/Object.keys(dataAnalyzer.leastVisitedStartingPoints).length ) + 20
            for(_recKey of Object.keys(dataAnalyzer.leastVisitedStartingPoints)){
                _rec = dataAnalyzer.leastVisitedStartingPoints[_recKey]
                _thisColor = sketch.color(sketch.random(255), sketch.random(255), sketch.random(255))

                _recPos = sketch.createVector(
                    (_recWidth * Number(_recKey)) + 20, 
                    sketch.height - ( sketch.map(
                        _rec.visits, 
                        (dataAnalyzer.leastVisitedStartingPoints[Object.keys(dataAnalyzer.leastVisitedStartingPoints)[0]].visits),  
                        (dataAnalyzer.leastVisitedStartingPoints[Object.keys(dataAnalyzer.leastVisitedStartingPoints)[Object.keys(dataAnalyzer.leastVisitedStartingPoints).length-1]].visits), 
                        50, 
                        sketch.height-200  
                    ))
                )
                sketch.stroke(255)
                sketch.strokeWeight(5)
                if(Number(_recKey) != 0){
                    sketch.line(_lastRecPos.x, _lastRecPos.y, _recPos.x, _recPos.y)
                } else {
                    sketch.fill(sketch.color(40, 100, 20))
                    sketch.text("Three least visited Starting locations.", sketch.width/3, (20 * (Number(_recKey))) + 80 )
                }

                sketch.strokeWeight(2.5)
                sketch.fill(_thisColor)
                sketch.circle(_recPos.x, _recPos.y, 20)

                sketch.strokeWeight(0.5)
                sketch.textSize(20)
                sketch.text(`${Number(_recKey)+1}`, _recPos.x-5, _recPos.y-20)

                sketch.textSize(15)
                sketch.text(`${Number(_recKey)+1} ${_rec.locationName} ( ${_rec.visits} visits)`, sketch.width/3, (20 * (Number(_recKey))) + 100 )

                _lastRecPos = _recPos
                console.log(_rec, _recKey, _recPos)
            }
        } else {
            sketch.background("#143439");
            sketch.textSize(25);
            sketch.fill(sketch.color(255,0, 0))
            sketch.text("Please import the dataset file.", sketch.width/2 - 150, sketch.height/2)
        }
    
        sketch.noLoop();
    } 
}


DaysOfWeekDiagram = new p5(daysOfWeekDiagram)
TopThreeVisitedPointsDiagram = new p5(topThreeVisitedPointsDiagram)
LeastThreeVisitedPointsDiagram = new p5(leastThreeVisitedPointsDiagram)
