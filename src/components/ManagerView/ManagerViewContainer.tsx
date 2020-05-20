import { IState } from "../../reducers";
import { connect } from "react-redux";
import ManagerView from "./ManagerView";
import { searchUseAction } from "../../actions/search-user-action";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        searchUser: state.searchUser.searchUser,
        errorMessage: state.login.errorMessage
    }
}
const mapDispatchToProps = {
    searchUseAction
}


export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(ManagerView);