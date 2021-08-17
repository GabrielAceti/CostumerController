export default class Costumer{

    public id: Number;
    public date: Date;
    public name: String;    
    public address: String;
    public telephone: String;
    public observation: String;
    

    constructor(id:Number, date: Date, name: String, address: String, telephone: String, observation: String){
        this.id = id;
        this.date = date;
        this.name = name;        
        this.address = address;
        this.telephone = telephone;
        this.observation = observation;        
    }

}

