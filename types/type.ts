
import Starship from './../components/Starships';
export type Character = {

    name:string
    gender:string
    hair_color:string
    height:string
    mass:string
    homeworld:string
    films:Array<string>
    starships:Array<string>
    url:string
}


export type CurrentCharacter ={
    data:Character
}

export type Film = {

    title:string
    producer:string
    release_date:string
    director:string
    opening_crawl:string
    url :string,
    episode_id:number

  
}
export type CurrentFilm ={
    data:Film
}

export type Planet = {

    name:string
    climate:string
    population:string
    terrain:string
    gravity:string
    films :string,
    url:string
}

export type CurrentPlanet ={
    data:Planet
}

export type Starship = {

    name:string
    model:string
    manufacturer:string
    starship_class:string
    passengers:string
    crew :string,
    films:Array<string>
    pilots:Array<string>
    url:string
}
export type CurrentStarship ={
    data:Planet
}