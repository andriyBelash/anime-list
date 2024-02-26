export interface ICurrentCharacter {
  data: ICurrentCharacterData
}

export interface ICurrentCharacterData {
  mal_id: number
  url: string
  images: Images
  name: string
  name_kanji: string
  nicknames: string[]
  favorites: number
  about: string
  anime: Anime[]
  manga: Manga[]
  voices: Voice[]
}

export interface Images {
  jpg: Jpg
  webp: Webp
}

export interface Jpg {
  image_url: string
  small_image_url: string
}

export interface Webp {
  image_url: string
  small_image_url: string
}

export interface Anime {
  role: string
  anime: Anime2
}

export interface Anime2 {
  mal_id: number
  url: string
  images: Images2
  title: string
}

export interface Images2 {
  jpg: Jpg2
  webp: Webp2
}

export interface Jpg2 {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export interface Webp2 {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export interface Manga {
  role: string
  manga: Manga2
}

export interface Manga2 {
  mal_id: number
  url: string
  images: Images3
  title: string
}

export interface Images3 {
  jpg: Jpg3
  webp: Webp3
}

export interface Jpg3 {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export interface Webp3 {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export interface Voice {
  language: string
  person: Person
}

export interface Person {
  mal_id: number
  url: string
  images: Images4
  name: string
}

export interface Images4 {
  jpg: Jpg4
}

export interface Jpg4 {
  image_url: string
}
