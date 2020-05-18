import { IState } from "../../reducers";
import { connect } from "react-redux";
import AdminView from "./AdminView";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        searchUser: state.searchUser.searchUser,
        errorMessage: state.login.errorMessage
    }
}



export default connect(mapStateToProps)(AdminView);