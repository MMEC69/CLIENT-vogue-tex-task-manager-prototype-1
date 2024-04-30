import moment from 'moment';
export const dateExtractor = (date) => {
    
    const ConvertedDate = new Date(date);
    
    //for obj
    let year = ConvertedDate.getFullYear().toString();
    let month = ConvertedDate.getMonth().toString();
    let day = ConvertedDate.getDay().toString();

    if(month.length<2){
        month = `0${month}`;
    }
    if(day.length<2){
        day = `0${day}`
    }

    const convertedDateObj = {
        year: year,
        month: month,
        day: day
    }

    return convertedDateObj;
}

export const dateFormat1 = (date) =>{
    let month = moment(date).format('YYYY-MM-DD');
    return (month);
}