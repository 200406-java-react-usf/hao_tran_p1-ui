export class Reimb {

    amount: number;
    submitted: Date;
    description: string;
    reciept: any;
    author: string;
    reimb_status: string;
    reimb_type: string;

    constructor(
        am: number,
        sub: Date,
        res: Date,
        des: string,
        rec: any,
        auth: string,
        rei_sta: string,
        rei_typ: string
    ) {
        this.amount = am;
        this.submitted = sub;
        this.description = des;
        this.reciept = rec;
        this.author = auth;
        this.reimb_status = rei_sta;
        this.reimb_type = rei_typ;
    }

}