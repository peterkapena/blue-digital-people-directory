import { useAppDispatch } from "../redux/hooks";
import { signOut } from "../redux/user-slice";

function Welcome() {
  function logout() {
    dispatch(signOut());
  }
  const dispatch = useAppDispatch();
  return (
    <div>
      Welcome
      <button type="button" onClick={() => logout()}>dsssdsdsd</button>
    </div>
  );
}

export default Welcome;
