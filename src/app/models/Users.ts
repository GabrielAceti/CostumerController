export default class Users{

    private id: Number;
    private date: Date;    
    private userName: String;
    private completedName: String;
    private telephone: String;
    private passWord: String;
    private observation: String;

    constructor(id:Number, date: Date, userName: String, completedName: String, telephone: String, passWord: String, observation: String){
        this.id = id;
        this.date = date;
        this.userName = userName;
        this.completedName = completedName;
        this.telephone = telephone;
        this.passWord = passWord;
        this.observation = observation;        
    }


}