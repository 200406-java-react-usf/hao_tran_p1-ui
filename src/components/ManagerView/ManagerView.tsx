
import React, { useState, useEffect } from 'react';
import "../../style/manager.scss";
import { Alert } from '@material-ui/lab';
import { getUserByUniqueKey } from "../../remote/user-service"

import { getReimbs, getReimbFilter, getReimbById, updateReimb } from '../../remote/reimb-service';
import { Reimb } from '../../dtos/reimb';
import { User } from '../../dtos/user';
import { Redirect } from 'react-router-dom';

interface ManagerProps {
    authUser: User;
    logoutAction: ()=>void;
}

function ManagerView(props: ManagerProps) {
    let date = (new Date()).toString();
    // let mockReimbs = [
    //     new Reimb(1, 100, date, date, 'text', 'reciept', 'testadmin', 'resv-test', 'pending', 'food'),
    //     new Reimb(2, 200, date, date, 'text', 'reciept', 'testadmin', 'resv-test', 'approved', 'food')
    // ];
    //@ts-ignore
    const [reimbList, setReimbList] = useState(null as Reimb[]);
    //const [reimbList, setReimbList] = useState(mockReimbs);

    const [errorMessage, setErrorMessage] = useState(false);

    const [statusFilter, setstatusFilter] = useState("all");

    const [typeFilter, settypeFilter] = useState("all");
    //@ts-ignore
    const [reimbsDisplay, setReimbsDisplay] = useState(null as any[]);

    //@ts-ignore
    const [reimbCurrent, setreimbCurrent] = useState(null as Reimb);
    //@ts-ignore
    const [reimbDetail, setReimbDetail] = useState(null as any);

    let timeout = function (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    let formatDate = function (dt: Date) {
        let date = new Date(dt);
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [month, day].join('-');

    }
    useEffect(() => {
        let reimbArr: any[] = [];
        let fetchData = async () => {
            if (reimbList) {
                for (let reimb of reimbList) {
                    let resolved: string;
                    if (!reimb.resolved) {
                        resolved = "";
                    }
                    else {
                        resolved = formatDate(reimb.resolved);
                    }
                    reimbArr.push(
                        <div className="reimb-container" key={reimb.reimb_id} id={(reimb.reimb_id).toString()} onClick={showDetail}>
                            <div className="reimb-short">{reimb.reimb_id}</div>
                            <div className="reimb-short">{reimb.amount}</div>
                            <div className="reimb">{resolved}</div>
                            <div className="reimb">{resolved}</div>
                            <div className="reimb">{reimb.author}</div>
                            <div className="reimb">{reimb.reimb_status}</div>
                            <div className="reimb">{reimb.reimb_type}</div>
                        </div>
                    )
                }
                setReimbsDisplay(reimbArr)
            }
        }

        let showdetail = async () => {
            if (reimbCurrent) {
                let detail: any[] = [];
                if (reimbCurrent.reimb_status == "pending") {
                    let approve = document.getElementById("approve-btn") as HTMLDivElement;
                    let deny = document.getElementById("deny-btn") as HTMLDivElement;

                    approve.classList.remove("disabled");
                    deny.classList.remove("disabled");

                }
                detail.push(
                    <div>
                        <div className="reimb-container" key={"detail_" + reimbCurrent.reimb_id}>
                            <div className="detail-row">
                                <div className="reimb">ID: {reimbCurrent.reimb_id}</div>
                                <div className="reimb">AMOUNT: ${reimbCurrent.amount}</div>
                            </div>
                            <div className="detail-row">
                                <div className="reimb">SUBMITTED: {formatDate(reimbCurrent.submitted)}</div>
                                <div className="reimb">RESOLVED: {formatDate(reimbCurrent.resolved)}</div>
                            </div>
                            <div className="detail-description">{reimbCurrent.description}</div>
                            <div className="detail-row">
                                <div className="reimb">AUTHOR: {reimbCurrent.author}</div>
                                <div className="reimb">RESOLVER: {reimbCurrent.resolver}</div>
                            </div>
                            <div className="detail-row">
                                <div className="reimb">STATUS: {reimbCurrent.reimb_status}</div>
                                <div className="reimb">TYPE: {reimbCurrent.reimb_type}</div>
                            </div>
                        </div>
                    </div>
                )
                setReimbDetail(detail)
            }
        }
        fetchData();

        showdetail();
    }, [reimbList, reimbCurrent]);

    let updateStatus = async (status: string) => {
        setstatusFilter(status);
        let statusBtn = document.getElementById("statusFilter")?.firstChild as HTMLDivElement;
        statusBtn.innerHTML = status.toUpperCase();
    }
    let updateType = async (type: string) => {
        settypeFilter(type);
        let typeBtn = document.getElementById("typeFilter")?.firstChild as HTMLDivElement;
        typeBtn.innerHTML = type.toUpperCase();
    }
    let selectTable = async (e: any) => {
        let newAction = e.currentTarget.id;
        switch (newAction) {
            case "statusFilter-all":
                updateStatus("all");
                break;
            case "statusFilter-pending":
                updateStatus("pending");
                break;
            case "statusFilter-approved":
                updateStatus("approved");
                break;
            case "statusFilter-denied":
                updateStatus("denied");
                break;
            case "typeFilter-all":
                updateType("all");
                break;
            case "typeFilter-lodging":
                updateType("lodging");
                break;
            case "typeFilter-travel":
                updateType("travel");
                break;
            case "typeFilter-food":
                updateType("food");
                break;
            case "typeFilter-other":
                updateType("other");
                break;
        }
    }
    let neonAni = async (e: any) => {
        let target = e.currentTarget.parentElement
        target.classList.add("neon-minor");
        await timeout(500);
        target.classList.remove("neon-minor");
    }

    let search = async () => {
        if (typeFilter == "all" && statusFilter == "all") {
            let response = await getReimbs();
            let reimbs: Reimb[] = response.data;
            setReimbList(reimbs);
        } else {
            let queryType;
            if (typeFilter == "all") {
                queryType = null;
            } else {
                queryType = typeFilter
            }
            let queryStatus;
            if (statusFilter == "all") {
                queryStatus = null;
            } else {
                queryStatus = statusFilter
            }
            let query = {
                type: queryType,
                status: queryStatus
            }
            let response = await getReimbFilter(query);
            let reimbs: Reimb[] = response.data;
            setReimbList(reimbs);
        }
    }

    let showDetail = async (e: any) => {
        let id = e.currentTarget.id;
        let result = await getReimbById(id)
        setreimbCurrent(result.data);
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

    let updateApprove = async (e: any) => {
        let updatedReimb = new Reimb(
            reimbCurrent.reimb_id,
            reimbCurrent.amount,
            reimbCurrent.submitted,
            new Date(),
            reimbCurrent.description,
            reimbCurrent.reciept,
            reimbCurrent.author,
            props.authUser.username,
            "approve",
            reimbCurrent.reimb_type
        )
        await updateReimb(updatedReimb)
        search();
        let detail = document.getElementById("reimb-detail") as HTMLDivElement;
        let table = document.getElementById("reimb-table") as HTMLDivElement;

        detail.classList.add("disabled");
        table.classList.remove("disabled");
    }

    let updateDeny = async (e: any) => {
        let updatedReimb = new Reimb(
            reimbCurrent.reimb_id,
            reimbCurrent.amount,
            reimbCurrent.submitted,
            new Date(),
            reimbCurrent.description,
            reimbCurrent.reciept,
            reimbCurrent.author,
            props.authUser.username,
            "deny",
            reimbCurrent.reimb_type
        )
        await updateReimb(updatedReimb)
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
                    <div id="statusFilter" className="reimb-action-btn neon">
                        <p className="filterText">ALL</p>
                        <div className="dropdown-content">
                            <div id="statusFilter-all" className="dropdown-option" onClick={selectTable}>ALL</div>
                            <div id="statusFilter-pending" className="dropdown-option" onClick={selectTable}>PENDING</div>
                            <div id="statusFilter-approved" className="dropdown-option" onClick={selectTable}>APPROVED</div>
                            <div id="statusFilter-denied" className="dropdown-option" onClick={selectTable}>DENIED</div>
                        </div>
                    </div>
                    <div id="typeFilter" className="reimb-action-btn neon" onClick={selectTable}>
                        <p className="filterText">ALL</p>
                        <div className="dropdown-content">
                            <div id="typeFilter-all" className="dropdown-option" onClick={selectTable}>ALL</div>
                            <div id="typeFilter-lodging" className="dropdown-option" onClick={selectTable}>LODGING</div>
                            <div id="typeFilter-travel" className="dropdown-option" onClick={selectTable}>TRAVEL</div>
                            <div id="typeFilter-food" className="dropdown-option" onClick={selectTable}>FOOD</div>
                            <div id="typeFilter-other" className="dropdown-option" onClick={selectTable}>OTHER</div>
                        </div>
                    </div>
                    <div id="search" className="action-btn neon" onClick={search}>SEARCH</div>

                </div>
                <div id="reimb-detail" className="reimb-detail neon disabled">
                    {reimbDetail}
                    <div className="action-row">
                        <div id="cancel-btn" className="reimb-submit-btn neon" onClick={cancelReimb}>CANCEL</div>
                        <div id="approve-btn" className="reimb-submit-btn neon disabled" onClick={updateApprove} >APPROVE</div>
                        <div id="deny-btn" className="reimb-submit-btn neon disabled" onClick={updateDeny}>DENY</div>

                    </div>
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
            </div>
        </>
    );

}

export default ManagerView;