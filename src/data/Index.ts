import { Connection } from 'tedious';
import Config from './Config';

var connection = new Connection(Config);
connection.on('connect', (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Conected");
    }    
});

connection.connect();

export default connection;
