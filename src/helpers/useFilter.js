export function useFilter(collection, condition) {
    
    // Сортировка по алфовиту от A до Z
    function sortNameByAZ() {
        return collection.sort((current, prev) => {
            if (`${current.name.first} ${current.name.last}` < `${prev.name.first} ${prev.name.last}`) return -1
            if (`${current.name.first} ${current.name.last}` > `${prev.name.first} ${prev.name.last}`) return 1
            return 0
        })
    }

    // Сортировка по алфовиту от Z до A
    function sortNameByZA() {
        return collection.sort((current, prev) => {
            if (`${current.name.first} ${current.name.last}` > `${prev.name.first} ${prev.name.last}`) return -1
            if (`${current.name.first} ${current.name.last}` < `${prev.name.first} ${prev.name.last}`) return 1
            return 0
        })
    }

    // Сортировка по гендеру
    function sortByGender() {
        return collection.sort((current, prev) => {
            if (current.gender < prev.gender) return -1
            if (current.gender > prev.gender) return 1
            return 0
        })
    }

    // Сортировка по национальности
    function sortByNational() {
        return collection.sort((current, prev) => {
            if (current.nat < prev.nat) return -1
            if (current.nat > prev.nat) return 1
            return 0
        })
    }

    // Смотрим принятое условие фукнции высшего порятка и возвращаем результат нужной сортировки
    switch (condition.toLowerCase()) {
        case 'a-z': return sortNameByAZ()
        case 'z-a': return sortNameByZA()
        case 'gender': return sortByGender()
        case 'national': return sortByNational()
    }
}