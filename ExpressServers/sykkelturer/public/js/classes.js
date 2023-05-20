

class DataAnalyzer {
    constructor(data){
        this.rawData = data
        this.weekDays = {

        }

        this.weekDaysAndRecords = null
    }

    sortByDayOfWeek(){
        if(this.weekDaysAndRecords == null){
            var _daysAndRecords = {
            
            }
    
            for(var _record of this.rawData){
                var _recoredCreationDate = new Date(_record.started_at)
                var _recordCreationWeekDay = _recoredCreationDate.getDay() + 1
                if(Object.keys(_daysAndRecords).includes(`${_recordCreationWeekDay}`) == false){
                    _daysAndRecords[`${_recordCreationWeekDay}`] = {
                        records: 1,
                        day: _recoredCreationDate.toLocaleString('en-US', {weekday: "long"})
                    }
                } else {
                    _daysAndRecords[`${_recordCreationWeekDay}`].records += 1
                }
            }

            this.weekDaysAndRecords = _daysAndRecords
        }

        return this.weekDaysAndRecords;
    }


    sortData(key){
        var oldRawData = this.rawData
        this.rawData.sort((a,b) => {
            return a[key] > b[key]
        })

        this.sortedData = this.rawData
        this.rawData = oldRawData

        return this.sortedData
    }

    analyzeLeastAndMostThree(){
        var locationsAndVisits = {

        }

        for(var _rec of this.rawData){
            if(Object.keys(locationsAndVisits).includes(_rec.start_station_id) == false){
                locationsAndVisits[_rec.start_station_id] = {
                    visits: 1,
                    locationName: _rec.start_station_name,
                    x: _rec.start_station_latitude,
                    y: _rec.start_station_longitude,
                    locationId: _rec.start_station_id
                }
            } else {
                locationsAndVisits[_rec.start_station_id].visits += 1
            }
        }

        var locationsAndVisitsSortedKeys = Object.keys(locationsAndVisits).filter(el=>{return el!="undefined"}).sort((a,b)=>{
            if(locationsAndVisits[a].visits > locationsAndVisits[b].visits){
                return 1
            } else {
                return -1
            }
        })

        var least = {} 
        locationsAndVisitsSortedKeys.slice(0,3).forEach((x)=>{ least[Object.keys(least).length] = locationsAndVisits[x]} )

        var most = {} 
        locationsAndVisitsSortedKeys.slice(locationsAndVisitsSortedKeys.length-3, locationsAndVisitsSortedKeys.length).reverse().forEach((x)=>{ most[Object.keys(most).length] = locationsAndVisits[x]} )

        this.mostVisitedStartingPoints = most
        this.leastVisitedStartingPoints = least
        
        return {most:most, least:least}
    }

}