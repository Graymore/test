export function useStats(collection) {
    // Возвращаем размер коллекции
    function size() {
        return collection.length
    }

    // Вычислаем кол-во контактов каждого гендера и гендера фаворита
    function genders() {
        let result = {male: 0, female: 0, none: 0}
        for (let contact of collection) {
            if (contact.gender === 'male') result.male++
            if (contact.gender === 'female') result.female++
            if (contact.gender !== 'male' && contact.gender !== 'female') result.none++
        }
        result.favorite = Object.keys(result).reduce((acc, key) => result[key] > result[acc] ? key : acc)
        return result
    }

    // Переводим названия гендеров на русский
    function translateGender(genderType) {
        switch (genderType.toLowerCase()) {
            case "male": return "Мужчина";
            case "female": return "Женщина";
            case "none": return "Неопределившихся";
        }
    }

    // Вычисляем сколько контактов по каждой национальности
    function getNationals() {
        let nationals = {}
        collection.forEach(item => {
            item.nat in nationals ? nationals[item.nat]++ : nationals[item.nat] = 1
        })
        return nationals
    }

    return {
        size,
        translateGender,
        getNationals,
        genders
    }
}