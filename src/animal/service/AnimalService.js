let arr = []
export function displayAnimal() {
    arr = JSON.parse(localStorage.getItem("arr"))
    if (arr === null) {
        arr = []
    }
    return arr
}

export function create(animal) {
    arr = displayAnimal()
    arr.push(animal)
    localStorage.setItem("arr", JSON.stringify(arr))
}

export function findOne(id) {
    arr = displayAnimal()
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return arr[i]
        }
    }
}

export function update(animal) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === animal.id) {
            arr[i] = animal
        }
    }
    localStorage.setItem("arr", JSON.stringify(arr))
}


