import * as assert from 'assert'
export interface DoorSuggestion {
    name: string
    heatloss?: number,
    price: number,
    link?: string
}

export const doorSuggestion: DoorSuggestion[] = [
    {
        name: 'Byko sliding glass door',
        price: 400000
    },
    {
        name: 'Byko external main door',
        price: 150000
    },
    {
        name: 'Byko external back door',
        price: 100000
    },
    {
        name: 'Byko internal door',
        price: 50000
    },
    {
        name: 'Byko garage door',
        price: 500000
    }
]


export interface DoorChoice {
    type: string,
    price: number
}
const choose = (choice: string) => {
    const door = doorSuggestion.find(suggestion => {
        return suggestion.name === choice
    })
    assert(door, 'choice of door not found amond door suggestions. Choice: ' + choice)
    return door ? door.price : 99999999999
}

export const doorChoice: DoorChoice[] = [
    {
        type: '2000 x 2100mm',
        price: choose('Byko sliding glass door')
    },
    {
        type: '1200 x 2100mm',
        price: choose('Byko sliding glass door')
    },
    {
        type: 'Útihurð 950 x 2134mm',
        price: choose('Byko external back door')
    },
    {
        type: 'Innihurð 850 x 2134mm',
        price: choose('Byko internal door')
    },
    {
        type: 'Útihurð 1000 x 2134mm',
        price: choose('Byko external main door')
    },
    {
        type: 'Innihurð 950 x 2134mm',
        price: choose('Byko internal door')
    },
    {
        type: '4750 x 2600mm',
        price: choose('Byko garage door')
    }
]