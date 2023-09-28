function formatDate(date, precise=true) {
    date = new Date();
    if(new Date().setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0)){
        if(precise) return `Aujourd'hui à ${date.getHours()}:${date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()}`; else return "Aujourd'hui"
    }else if(isYesterday(date)){
        if(precise) return `Hier à ${date.getTime()}`; else return "Hier"
    }else if(isBeforeThisYear(date)){
        return date.toLocaleDateString("fr-FR", { month:"short", day:"numeric", year:"numeric" });
    }else{
        return date.toLocaleDateString("fr-FR", { month:"short", day:"numeric" });
    }
}
function isYesterday(date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();
}
function isBeforeThisYear(date) {
    const lastYear = new Date();
    return date.getFullYear() < lastYear.getFullYear()-1;
}

function formatDuration(duration){
    if (duration < 0) duration = -duration;
    const time = {
        j: Math.floor(duration / 1440),
        h: Math.floor(duration / 60) % 24,
        min: Math.floor(duration) % 60
    };
    return Object.entries(time).filter(val => val[1] !== 0).map(([key, val]) => val+key).join(', ');
}

function formatPrice(price){
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
}

export { formatDate, formatDuration, formatPrice }