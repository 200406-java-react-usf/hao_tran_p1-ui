
import React, { useState, useEffect, SyntheticEvent } from 'react';
import "../../style/employee.scss";
import { Alert } from '@material-ui/lab';

import { getReimbsByUser, updateReimb, getReimbById, getNewReimb } from '../../remote/reimb-service';
import { Reimb } from '../../dtos/reimb';
import { User } from '../../dtos/user';
import { Redirect } from 'react-router-dom';

export interface EmployeeProps {
    authUser: User;
    logoutAction: ()=>void;
}

function EmployeeView(props: EmployeeProps) {
    let date = (new Date()).toString();
    // let mockReimbs = [
    //     new Reimb(1, 100, date, date, 'text', 'reciept', 'testadmin', 'resv-test', 'pending', 'food'),
    //     new Reimb(2, 200, date, date, 'text', 'reciept', 'testadmin', 'resv-test', 'approved', 'food')
    // ];
    //@ts-ignore
    const [reimbList, setReimbList] = useState(null as Reimb[]);
    //@ts-ignore
    const [reimbsDisplay, setReimbsDisplay] = useState(null as any[]);
    const [errorMessage, setErrorMessage] = useState(false);

    //@ts-ignore
    const [reimbCurrent, setreimbCurrent] = useState(null as Reimb);

    //@ts-ignore
    const [reimbDetail, setReimbDetail] = useState(null as any);

    //@ts-ignore
    const [reimbId, setReimbId] = useState(null as number);

    //@ts-ignore
    const [amount, setAmount] = useState(null as number);

    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [submitted, setSubmitted] = useState('');
    const [resolved, setResolved] = useState('');
    const [author, setAuthor] = useState('');
    const [resolver, setResolver] = useState('');
    const [action, setAction] = useState("default");

    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    let formatDate = function (dt: Date) {
        if (dt) {
            let date = new Date(dt);
            let month = '' + (date.getMonth() + 1);
            let day = '' + date.getDate();
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            return [month, day].join('-');
        }
        else {
            return "---"
        }

    }

    let nulltoBlank = function (str: any) {
        if (!str) {
            return "---"
        } else {
            return str
        }
    }
    useEffect(() => {
        let reimbArr: any[] = [];
        let fetchData = async () => {
            if (reimbList) {
                for (let reimb of reimbList) {
                    // let resolved: string;
                    // if (!reimb.resolved) {
                    //     resolved = "---";
                    // }
                    // else {
                    //     resolved = formatDate(reimb.resolved);
                    // }
                    reimbArr.push(
                        <div className="reimb-container" key={reimb.reimb_id} id={(reimb.reimb_id).toString()} onClick={showDetail}>
                            <div className="reimb-short">{reimb.reimb_id}</div>
                            <div className="reimb-short">{reimb.amount}</div>
                            <div className="reimb">{formatDate(reimb.submitted)}</div>
                            <div className="reimb">{formatDate(reimb.resolved)}</div>
                            <div className="reimb">{reimb.author}</div>
                            <div className="reimb">{reimb.reimb_status}</div>
                            <div className="reimb">{reimb.reimb_type}</div>
                        </div>
                    )
                }
                setReimbsDisplay(reimbArr)
            }
        }
        let readData = async () => {
            console.log(action);
            if (action == "detail" || action == "new") {
                if (reimbCurrent) {
                    console.log("reset");
                    setReimbId(reimbCurrent.reimb_id);
                    setAmount(reimbCurrent.amount);
                    setSubmitted(formatDate(reimbCurrent.submitted));
                    setResolved(formatDate(reimbCurrent.resolved));
                    setAuthor(reimbCurrent.author);
                    setResolver(reimbCurrent.resolver);
                    setDescription(reimbCurrent.description);
                    setStatus(reimbCurrent.reimb_status);
                    setType(reimbCurrent.reimb_type);
                }
            }
        }
        fetchData();
        readData();
    }, [reimbList, reimbId, action]);

    let neonAni = async (e: any) => {
        let target = e.currentTarget.parentElement
        target.classList.add("neon-minor");
        await timeout(500);
        target.classList.remove("neon-minor");
    }

    let search = async () => {
        let response = await getReimbsByUser(props.authUser.ers_user_id);
        let reimbs: Reimb[] = response.data;
        setReimbList(reimbs);
    }

    let showDetail = async (e: any) => {
        let id = +e.currentTarget.id;
        let result = await getReimbById(id)
        setreimbCurrent(result.data);
        setAction("detail");

        let detail = document.getElementById("reimb-detail") as HTMLDivElement;
        let table = document.getElementById("reimb-table") as HTMLDivElement;
        let home = document.getElementById("reimb-bar") as HTMLDivElement;

        detail.classList.remove("disabled");
        table.classList.add("disabled");
        home.classList.add("disabled");
    }
    let cancelReimb = async (e: any) => {
        let detail = document.getElementById("reimb-detail") as HTMLDivElement;
        let table = document.getElementById("reimb-table") as HTMLDivElement;
        let home = document.getElementById("reimb-bar") as HTMLDivElement;

        detail.classList.add("disabled");
        table.classList.remove("disabled");
        home.classList.remove("disabled");
    }
    let update = async (e: any) => {
        let updatedReimb = new Reimb(
            reimbCurrent.reimb_id,
            amount,
            new Date(),
            reimbCurrent.resolved,
            description,
            reimbCurrent.reciept,
            props.authUser.username,
            reimbCurrent.resolver,
            reimbCurrent.reimb_status,
            reimbCurrent.reimb_type
        )
        setAction("update");
        await updateReimb(updatedReimb)
        search();
        let detail = document.getElementById("reimb-detail") as HTMLDivElement;
        let table = document.getElementById("reimb-table") as HTMLDivElement;

        detail.classList.add("disabled");
        table.classList.remove("disabled");
    }
    let updateAmount = async (e: any) => {
        neonAni(e);
        console.log(e.currentTarget.value);
        setAmount(+e.currentTarget.value);
    }
    let updateFormField = (e: any) => {
        switch (e.currentTarget.id) {
            case 'amount':
                neonAni(e);
                setAmount(e.currentTarget.value);
                break;
            case 'description':
                neonAni(e);
                setDescription(e.currentTarget.value);
                break;
            case 'type':
                neonAni(e);
                setType(e.currentTarget.value);
                break;
            default:
                console.warn(`Improper binding detected on element with id: ${e.currentTarget.id}`);
        }
    }
    let addNew = () => {
        let date = new Date;
        //@ts-ignore
        let newReimb = new Reimb(0, 0, date, null, "", "", props.authUser.username, null, "pending", "other")
        setreimbCurrent(newReimb);
        setAction("new");

        let detail = document.getElementById("reimb-detail") as HTMLDivElement;
        let table = document.getElementById("reimb-table") as HTMLDivElement;
        let home = document.getElementById("reimb-bar") as HTMLDivElement;

        detail.classList.remove("disabled");
        table.classList.add("disabled");
        home.classList.add("disabled");


    }
    let submitNew = async() => {
        let newReimb = new Reimb(
            reimbCurrent.reimb_id,
            amount,
            reimbCurrent.submitted,
            reimbCurrent.resolved,
            description,
            reimbCurrent.reciept,
            props.authUser.username,
            reimbCurrent.resolver,
            reimbCurrent.reimb_status,
            reimbCurrent.reimb_type
        );
        await getNewReimb(newReimb);
        search();
        let detail = document.getElementById("reimb-detail") as HTMLDivElement;
        let table = document.getElementById("reimb-table") as HTMLDivElement;

        detail.classList.add("disabled");
        table.classList.remove("disabled");
    }
    const [redirect, setRedirect] = useState(false);

    let returnHome = async function () {
        props.logoutAction();
        localStorage.clear();
        setRedirect(true);
    }
    return (
        <>
            {redirect ? <Redirect to="/" /> : null}
            <div>
                <div className="user-bar">

                    <div id="search" className="action-btn neon" onClick={search}>SEARCH</div>
                    <div id="addNew" className="action-btn neon" onClick={addNew}>NEW</div>

                </div>

            </div>
            <div id="reimb-detail" className="reimb-detail neon disabled">
                {reimbCurrent ?
                    <div>
                        <form className="reimb-container">
                            <div className="detail-row">
                                <div className="reimb">ID: {reimbId} </div>
                                <div className="reimb">AMOUNT: $
                                <input
                                        className="reimb-input"
                                        onChange={updateAmount}
                                        value={amount}
                                        id="amount" type="text"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="detail-row">
                                <div className="reimb" id="submitted">SUBMITTED {submitted}</div>
                                <div className="reimb" id="resolved">RESOLVED {resolved}</div>
                            </div>
                            <div className="detail-row">
                                <div className="reimb" id="author">AUTHOR: {author}</div>
                                <div className="reimb" id="resolver">RESOLVER: {nulltoBlank(resolver)}</div>
                            </div>
                            <textarea id="description" className="detail-description-textarea" value={description} onChange={updateFormField} />
                            <div className="detail-row">
                                <div className="reimb" id="status">STATUS: {status}</div>
                                <div className="reimb">
                                    <div className="unselectable">TYPE:
                                       <select className="reimb-input-dropdown" id="type" value={type} onChange={updateFormField}>
                                            <option value="lodging">LODGING</option>
                                            <option value="travel">TRAVEL</option>
                                            <option value="food">FOOD</option>
                                            <option value="other">OTHER</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                        </form>
                        <div className="action-row">
                            <div id="cancel-btn" className="reimb-submit-btn neon" onClick={cancelReimb}>CANCEL</div>
                            {(action == "new") ? <div id="addNew-btn" className="reimb-submit-btn neon" onClick={submitNew} >ADD</div> : null}
                            {(reimbCurrent.reimb_status == "pending" && action != "new") ? <div id="update-btn" className="reimb-submit-btn neon" onClick={update} >UPDATE</div> : null}
                        </div>
                    </div> : null}

            </div>
            <div id="reimb-table" className="reimb-table neon">

                <div id="reimb-container" className="reimb-container">
                    <div className="reimb-short">ID</div>
                    <div className="reimb-short">AMOUNT</div>
                    <div className="reimb">SUBMITTED</div>
                    <div className="reimb">RESOLVED</div>
                    <div className="reimb">AUTHOR</div>
                    <div className="reimb">STATUS</div>
                    <div className="reimb">TYPE</div>
                </div>
                {reimbsDisplay}
            </div>


            <div id="reimb-bar" className="reimb-bar">
                <div id="home-btn" className="reimb-home-btn neon" onClick={returnHome} >HOME</div>
            </div>
        </>
    );

}

export default EmployeeView;