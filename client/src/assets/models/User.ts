export default class Users{

    public id: Number;
    public date: Date;    
    public userName: String;
    public completedName: String;
    public telephone: String;
    public passWord: String;
    public observation: String;

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