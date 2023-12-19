import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { handleUserRegistration } from "./store/slices/userAuth";


const App = ()=>  {
  const {
    isLoading,
    isError,
    isFulfilled
  } = useAppSelector(state => state.userAuth);
  const dispatch = useAppDispatch();
  const input = useRef({
    username:'',
    password:''
  })

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        dispatch(handleUserRegistration(
          {
            username: input.current.username,
            password: input.current.password
          }));
      }}>
        <input placeholder="username"
        onChange={(e)=> input.current.username = e.target.value}
        />
        <input placeholder="password"
        onChange={(e)=> input.current.password = e.target.value}
        />
      <button type="submit">click me</button>
      </form>
     {isLoading ? <h2>Loading</h2> : isError? <h2>error</h2> : isFulfilled && <h2>DONE</h2>}
    </div>
  );
}

export default App;
