import GithubBreakdownScreen from './GithubBreakdownScreen';
import { connect } from 'react-redux';

export default connect((state) => ({ profile: state.login.profile }), {})(GithubBreakdownScreen);
