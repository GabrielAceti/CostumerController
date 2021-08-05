export default class Users{

    private date: Date;    
    private userName: String;
    private completedName: String;
    private telephone: String;
    private passWord: String;
    private observation: String;

    constructor(date: Date, userName: String, completedName: String, telephone: String, passWord: String, observation: String){
        this.date = date;
        this.userName = userName;
        this.completedName = completedName;
        this.telephone = telephone;
        this.passWord = passWord;
        this.observation = observation;        
    }


}