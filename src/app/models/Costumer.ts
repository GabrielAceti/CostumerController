export default class Costumer{

    private date: Date;
    private name: String;    
    private address: String;
    private telephone: String;
    private observation: String;
    

    constructor(date: Date, name: String, address: String, telephone: String, observation: String){
        this.date = date;
        this.name = name;        
        this.address = address;
        this.telephone = telephone;
        this.observation = observation;        
    }

}

