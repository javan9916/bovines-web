import axios from 'axios'


const animalsAPI = axios.create({
    baseURL: 'http://localhost:8000/animals/api/animals/'
})

export const getAllAnimals = () => animalsAPI.get('/')

export const createAnimal = (animal) => animalsAPI.post('/', animal)
