import Connection from '../../data/Index'
import { Request, Response } from 'express';
import User from '../models/Users'
import connection from '../../data/Index';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
const Tedious = require('tedious');
const TediousRequest = Tedious.Request;

const secret: String = "CostumerControllerToken"



class UserController {

    create(req: Request, res: Response) {
        const date = new Date();
        const inclusionDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        const { userName, completedName, telephone, passWord, observation } = req.body;

        bcrypt.hash(passWord, 10, (err, hash) => {
            let request = new TediousRequest(`INSERT INTO USERS(INCLUSIONDATE, USERNAME, COMPLETEDNAME, TELEPHONE, PASSWORD, OBSERVATION) VALUES('${inclusionDate}', '${userName}', '${completedName}', '${telephone}', '${hash}', '${observation}')`, (err: any, rowCount: any) => {
                if (err) {
                    return res.status(400).json(err);
                }
                else {
                    return res.status(200).json("Sucessful");
                }
            });
    
            Connection.execSql(request);
        });
        
    }

    get(req: Request, res: Response) {

        var row: String[] = [];
        var users: User[] = [];

        let request = new TediousRequest("SELECT * FROM USERS", (err: any, rowCount: any) => {
            if (err) {
                return res.status(400).json(err);
            }
            else {
                return res.status(200).json(users);
            }
        });


        request.on('row', function (columns: any[]) {

            row.length = 0;
            columns.forEach(function (column: { value: any; }) {
                row.push(column.value);
            });

            const user = new User(Number.parseInt(row[0].toString()), new Date(row[5].toString()), row[1], row[6], row[2], row[3], row[4])
            users.push(user);

        });

        Connection.execSql(request);
    }

    getOne(req: Request, res: Response) {

        const { _id } = req.params;
        var row: String[] = [];
        var user: User[] = [];

        let request = new TediousRequest(` SELECT ID, INCLUSIONDATE, USERNAME, COMPLETEDNAME, TELEPHONE, PASSWORD, OBSERVATION FROM USERS WHERE ID = ${_id}`, (err: any, rowCount: Number) => {

            if (err) {
                return res.status(400).json(err);
            }
            else {
                return res.status(200).json(user);
            }
        });

        request.on('row', (columns: any[]) => {

            columns.forEach(function (column: { value: any; }) {
                row.push(column.value);
            });

            user.push(new User(Number.parseInt(row[0].toString()), new Date(row[1].toString()), row[2], row[3], row[4], row[5], row[6]));
        });

        Connection.execSql(request);
    }

    put(req: Request, res: Response) {
        const { date, userName, completedName, telephone, passWord, observation } = req.body;
        const { _id } = req.params;

        let request = new TediousRequest(`UPDATE USERS SET USERNAME = '${userName}', COMPLETEDNAME = '${completedName}', TELEPHONE = '${telephone}', PASSWORD = '${passWord}',OBSERVATION = '${observation}' WHERE ID = ${_id}`, (err: Error, rowCount: Number) => {
            if (err) {
                return res.status(400).json(err);
            }
            else {
                return res.status(200).json("Sucessful");
            }
        });

        Connection.execSql(request);
    }

    delete(req: Request, res: Response) {
        const { _id } = req.params;

        let request = new TediousRequest(`DELETE USERS WHERE ID = ${_id}`, (err: Error, rowCount: Number) => {
            if (err) {
                return res.status(400).json(err);
            }
            else {
                return res.status(200).json("Sucessful")
            }
        });

        Connection.execSql(request);
    }

    login(req: Request, res: Response) {

        const { userName, passWord } = req.body;
        let row: String[] = [];
        let id: Number;
        let passwordHash: string;        

        const request = new TediousRequest(`SELECT ID, PASSWORD FROM USERS WHERE USERNAME = '${userName}'`, (err: any, rowCount: Number) => {
            if (err) {
                res.status(400).json(err);
            }
            else {

                if (bcrypt.compareSync(passWord, passwordHash)) {
                    const payload = { userName };
                    const token = jwt.sign(payload, secret, { expiresIn: '3h' });
                    res.cookie('token', token, { httpOnly: true });
                    res.status(200).json({
                        status: 1,
                        auth: true,
                        id: id,
                        token: token,
                        userName: userName
                    });
                }
                else {
                    return res.status(200).json({
                        status: 0,
                        auth: false,
                        id: null,
                        token: null,
                        userName: userName
                    });
                }

            }
        })

        request.on('row', (columns: any[]) => {

            columns.forEach((column: { value: any }) => {
                row.push(column.value);
            })

            id = Number.parseInt(row[0].toString());
            passwordHash = row[1].toString();
        });

        connection.execSql(request);
    }

    checkToken(req: Request, res: Response){
        const token = req.body.params;    
       
        if(!token){
            res.json({status: 400, msg: 'Not authorized: Inexistent token'})            
        }
        else{
            jwt.verify(token, secret, (err: String, decoded: any) => {
                if(err){
                     res.json({status: 400, msg: 'Not authorized: Invalid token'}) 
                                        
                }
                else{
                     res.json({status: 200, userName: decoded.userName});
                }
            })           
            return res
        }
    }

    clearToken(req: Request, res:Response){
        const {token} = req.body;       
        if(token){           
            res.cookie('token', null, {httpOnly:true})
        }
        else{
            res.status(400);
        }
        res.send("Session closed!");
    }


}

export default UserController