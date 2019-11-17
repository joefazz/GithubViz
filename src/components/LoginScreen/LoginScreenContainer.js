import { connect } from 'react-redux';
import LoginScreen from './LoginScreen';
import { doLogin } from '../../redux/modules/login';

const mapStateToProps = () => ({
});

const mapDispatchToProps = { doLogin };

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
