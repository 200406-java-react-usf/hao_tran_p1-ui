import { IState } from "../../reducers";
import { connect } from "react-redux";
import RoleDisplay from "./RoleDisplay";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: state.login.errorMessage
    }
}



export default connect(mapStateToProps, null, null, {pure: false})(RoleDisplay);