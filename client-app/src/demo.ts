export interface Duck{
    name: string,
    legs: number,
    MakeSound: (sound: any) => void
}


const duck1: Duck = {
    name: "Miki",
    legs: 2,
    MakeSound: (sound) => console.log(sound)
}

const duck2: Duck = {
    name: "Jeawy",
    legs: 3,
    MakeSound: (sound) => console.log(sound)
}

export const ducks = [duck1, duck2];
