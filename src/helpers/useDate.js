export function useDate(DateValue) {
    // Создаем новый объект Date из исходной даты
    const date = new Date(DateValue)
    
    return {
        // Короткие константы дней
        days_shorts: [
            'Вскр',
            'Пнд',
            'Втр',
            'Срд',
            'Чтв',
            'Пят',
            'Суб'
        ],

        // Полные константы дней
        days_full: [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
        ],

        // Возвращаем константу дней, short:boolean - короткие или полные
        day(short = false) {
            return short ? this.days_shorts[date.getDay()] : this.days_full[date.getDay()]
        },

        // Переводим месяц, день, год, в формат mm/dd/yyyy
        humanFormat() {
            let mm = date.getMonth()
            let dd = date.getDate()
            let yyyy = date.getFullYear()

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            return `${mm}/${dd}/${yyyy}`
        },

        // Переводим часы и минуты в формат hh:mm
        time() {
            let hh = date.getHours()
            let mm = date.getMinutes()
            
            if (hh < 10) hh = '0' + hh;
            if (mm < 10) mm = '0' + mm;

            return `${hh}:${mm}`
        }
    }
}

