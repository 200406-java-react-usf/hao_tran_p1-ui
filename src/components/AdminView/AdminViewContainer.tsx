import { IState } from "../../reducers";
import { connect } from "react-redux";
import { logoutAction } from "../../actions/logout-action";
import AdminView from "./AdminView";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: state.login.errorMessage
    }
}
const mapDispatchToProps = {
    logoutAction
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminView);