import Connection from '../../data/Index'
import { Request, Response } from 'express';
import Users from '../models/Users'

const Tedious = require('tedious');
const TediousRequest = Tedious.Request;

class UserController {

    create(req: Request, res: Response) {
        const date = new Date();
        const inclusionDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        const { userName, completedName, telephone, passWord, observation } = req.body;        

        let request = new TediousRequest(`INSERT INTO USERS(INCLUSIONDATE, USERNAME, COMPLETEDNAME, TELEPHONE, PASSWORD, OBSERVATION) VALUES('${inclusionDate}', '${userName}', '${completedName}', '${telephone}', '${passWord}', '${observation}')`, (err: any, rowCount: any) => {
            if (err) {
                return res.status(400).json(err);
            }
            else {
                return res.status(200).json("Sucessful");
            }
        });

        Connection.execSql(request);
    }

    get(req: Request, res: Response) {

        var row: String[] = [];
        var users: Users[] = [];

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

            const user = new Users(Number.parseInt(row[0].toString()), new Date(row[5].toString()), row[1], row[6], row[2], row[3], row[4])
            users.push(user);

        });

        Connection.execSql(request);
    }

    getOne(req: Request, res: Response) {

        const { _id } = req.params;
        var row: String[] = [];
        var costumer: Users[] = [];

        let request = new TediousRequest(` SELECT * FROM USERS WHERE ID = ${_id}`, (err: any, rowCount: Number) => {

            if (err) {
                return res.status(400).json(err);
            }
            else {
                return res.status(200).json(costumer);
            }
        });

        request.on('row', (columns: any[]) => {

            columns.forEach(function (column: { value: any; }) {
                row.push(column.value);
            });

            costumer.push(new Users(Number.parseInt(row[0].toString()),new Date(row[1].toString()), row[2], row[3], row[4], row[5], row[6]));
        });

        Connection.execSql(request);
    }

    put(req: Request, res: Response) {
        const { date, userName, completedName, telephone, passWord, observation} = req.body;
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


}

export default UserController