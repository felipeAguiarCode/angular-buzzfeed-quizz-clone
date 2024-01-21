export type JsonQuizz = {
    title:string
    questions: []
    results: {}
}

export type questions = {
    id:number
    question:string
    options: {
        id:number
        name:string
        alias:string
    }[]
    
}[]

export type question = {
    id:number
    question:string
    options: {
        id:number
        name:string
        alias:string
    }[]
}