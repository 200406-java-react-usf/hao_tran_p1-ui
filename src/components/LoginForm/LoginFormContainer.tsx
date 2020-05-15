  
import { IState } from "../../reducers";
import { loginAction } from "../../actions/login-action";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: state.login.errorMessage
    }
}

const mapDispatchToProps = {
    loginAction
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);