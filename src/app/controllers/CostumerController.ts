import Connection from '../../data/Index'
import { Request, Response } from 'express';
import Costumer from '../models/Costumer'

const Tedious = require('tedious');
const TediousRequest = Tedious.Request;

class CostumerController {

    create(req: Request, res: Response) {
        const date = new Date();
        const inclusionDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        const { name, address, telephone, observation } = req.body;
        

        let request = new TediousRequest(`INSERT INTO COSTUMERS(INCLUSIONDATE, NAME, ADDRESS, TELEPHONE, OBSERVATION) VALUES('${inclusionDate}', '${name}', '${address}', '${telephone}', '${observation}')`, (err: any, rowCount: any) => {
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
        var costumers: Costumer[] = [];

        let request = new TediousRequest("SELECT * FROM COSTUMERS", (err: any, rowCount: any) => {
            if (err) {
                return res.status(400).json(err);
            }
            else {
                return res.status(200).json(costumers);
            }
        });


        request.on('row', function (columns: any[]) {

            row.length = 0;
            columns.forEach(function (column: { value: any; }) {
                row.push(column.value);
            });

            const costumer = new Costumer(new Date(row[0].toString()), row[1], row[2], row[3], row[4])
            costumers.push(costumer);

        });

        Connection.execSql(request);
    }

    getOne(req: Request, res: Response) {

        const { _id } = req.params;
        var row: String[] = [];
        var costumer: Costumer[] = [];

        let request = new TediousRequest(` SELECT * FROM COSTUMERS WHERE ID = ${_id}`, (err: any, rowCount: Number) => {

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

            costumer.push(new Costumer(new Date(row[0].toString()), row[1], row[2], row[3], row[4]));
        });

        Connection.execSql(request);
    }

    put(req: Request, res: Response) {
        const { date, name, address, telephone, observation} = req.body;
        const { _id } = req.params;

        let request = new TediousRequest(`UPDATE COSTUMERS SET NAME = '${name}', ADDRESS = '${address}', TELEPHONE = '${telephone}', OBSERVATION = '${observation}' WHERE ID = ${_id}`, (err: Error, rowCount: Number) => {
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

        let request = new TediousRequest(`DELETE COSTUMERS WHERE ID = ${_id}`, (err: Error, rowCount: Number) => {
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

export default CostumerController