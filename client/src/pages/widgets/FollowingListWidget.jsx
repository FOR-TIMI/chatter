import { setFollowing } from '../../state';
import { useNavigate } from 'react-router-dom';

const FollowingListWidget = ({ username }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const followings = useSelector((state) => state.user.followings);


}