export interface UserRow{
    key:string
    name:string
    email:string
    company:string
}
export interface User{
    id:string
    name:string
    email:string
    company:{
        name:string
    }
}
export interface userDetails extends User{
    username:string
    address:{
        street:string
        suite:string
        city:string
        zipcode:string
        geo:{
            lat:string
            lng:string
        }
    }
    phone:string
    website:string
    company:{
        name:string
        catchPhrase:string
        bs:string
    }
}