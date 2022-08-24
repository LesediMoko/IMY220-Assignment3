function EventHandler(ObjArr) {
    this.ObjArr = ObjArr;

    this.getEventsBetweenDates = function(start,end) 
    {
        convertedStart = start.replace('/','-');
        convertedEnd = end.replace('/','-');
        convertedStart = new Date(convertedStart);
        convertedEnd = new Date(convertedEnd);

        resultArray = new Array();
        arrModifiedDateTime = ObjArr.map( (currObj) => {
            
            currObj.dateStart = currObj.dateStart.replace('/','-');
            currObj.dateEnd = currObj.dateEnd.replace('/','-');
            currObj.dateStart = currObj.dateStart.replace('/','-');
            currObj.dateEnd = currObj.dateEnd.replace('/','-');
            return currObj;
            //console.log(currObj); //works
        })
        //console.log(arrModifiedDateTime)

        arrModifiedDateTime = arrModifiedDateTime.map( (currObj) => {
            //console.log(currObj);
            currObj.dateStart = new Date(currObj.dateStart);
            currObj.dateEnd = new Date(currObj.dateEnd);
        })
        resultArray = ObjArr.filter( (currObj) => {
            if (currObj.dateStart >= convertedStart && currObj.dateEnd <= convertedEnd)
                return currObj;
        })

        return resultArray;
    }

    this.getMonth = function(month) 
    {
        var resultArray = ObjArr.filter( (currObj) => {
            currMonth = currObj.dateStart.substr(5,2);
            //console.log(`the current month is ${currMonth}`);
            if (currMonth == month)
                return currObj;
        })

        return resultArray;
    }

    this.getUniqueDateAndSort = function()
    {
        var resultArray = new Array();
        var sortedArr = ObjArr.sort( (a,b) => a.dateStart.substr(5,2) - b.dateStart.substr(5,2)); //sort according to month
        // initalArray = new Array();
        // resultArray = resultArray.reduce( (redArr, obj) => { //redArr is initial or current array. obj is current object
            
        //     if ( redArr.length == 0) //for the first iteration. Array empty so cannot access dateEnd nor dateStart
        //     {
        //         redArr.push(obj);
        //         //return redArr;)
        //     }

        //     var arrayOfStartingDates = redArr.map( (currObj) => { 
        //         return currObj.dateStart
        //     }); //get current array of starting dates
        //     var arrayOfEndingDates = redArr.map( (currObj) => {
        //         return currObj.endStart
        //     }); //get current array of ending dates

        //     if (!arrayOfStartingDates.includes(obj.dateStart) && !arrayOfEndingDates.includes(obj.dateEnd)) //check for duplicates
        //     {
        //         redArr.push(obj); //insert current object into current array if condtion met
        //         //return redArr; //return current array without duplicate start and end dates
        //     }
        // }, initalArray); //initial array is empty
        var startingDateArray = new Array();
        var endingDateArray = new Array();
        var initialArray = new Array();
        //console.log(sortedArr);
        resultArray = sortedArr.map( (currObj) => {
            if (initialArray.length == 0)
            {
                initialArray.push(currObj);
                return currObj;
            }
            else
            {
                startingDateArray = initialArray.map ( (iObj) => {
                    return iObj.dateStart;
                })

                endingDateArray = initialArray.map ( (iObj) => {
                    return iObj.endStart;
                })

                if (!endingDateArray.includes(currObj.dateStart) && !startingDateArray.includes(currObj.dateEnd)) //check for duplicates
                {
                 initialArray.push(currObj);
                 return currObj; //insert current object into current array if condtion met
                 //return redArr; //return current array without duplicate start and end dates
                }
            }
        })

        resultArray = resultArray.filter((arrayItem) => {
            return arrayItem !== undefined;
          });

        return resultArray;
    }

    this.getSummary = function()
    {
        var argsArray = Array.prototype.slice.apply(arguments);
        if (argsArray.length == 0) //no parameters passed in
        {
            var stringArr = ObjArr.map( (obj) => {
            if (obj.dateStart === obj.dateEnd)
                return `On ${obj.dateStart}: ${obj.name} (${obj.description})`;
            else
                return `From ${obj.dateStart} to ${obj.dateEnd}: ${obj.name} (${obj.description})`;
            })
            return stringArr;
        }
        else if (argsArray.length == 1) //single array of objects or single object
        {
            if (argsArray[0].constructor === Array)
            {
                var stringArr = argsArray[0].map( (obj) => {
                    if (obj.dateStart === obj.dateEnd)
                        return `On ${obj.dateStart}: ${obj.name} (${obj.description})`;
                    else
                        return `From ${obj.dateStart} to ${obj.dateEnd}: ${obj.name} (${obj.description})`;
                })
                return stringArr;
            }
            else 
            {
                obj = argsArray[0];
                if (obj.dateStart === obj.dateEnd)
                    return `On ${obj.dateStart}: ${obj.name} (${obj.description})`;
                else
                    return `From ${obj.dateStart} to ${obj.dateEnd}: ${obj.name} (${obj.description})`;
            }
        }
        else //more than one arguemnt: more than one object passed in
        {
            var stringArr = argsArray.map( (obj) => {
            if (obj.dateStart === obj.dateEnd)
                return `On ${obj.dateStart}: ${obj.name} (${obj.description})`;
            else
                return `From ${obj.dateStart} to ${obj.dateEnd}: ${obj.name} (${obj.description})`;
            })
            return stringArr;
        }
    }
}

EventHandler.prototype.getMonth2 = function(month){
    
    
    this.ObjArr = this.getMonth(month);
    //console.log(this.ObjArr);
    return this;
}

EventHandler.prototype.getUniqueDateAndSort2 = function(){
    
    
    this.ObjArr = this.getUniqueDateAndSort();
    //console.log(this.ObjArr);
    return this;
}

EventHandler.prototype.getEventsBetweenDates2 = function(start,end){
    
    
    this.ObjArr = this.getEventsBetweenDates(start,end);
    //console.log(this.ObjArr);
    return this;
}