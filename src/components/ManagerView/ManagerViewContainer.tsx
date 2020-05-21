import { IState } from "../../reducers";
import { connect } from "react-redux";
import ManagerView from "./ManagerView";
import { logoutAction } from "../../actions/logout-action";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: state.login.errorMessage
    }
}
const mapDispatchToProps = {
    logoutAction
}


export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(ManagerView);