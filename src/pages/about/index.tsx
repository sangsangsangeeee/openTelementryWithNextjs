import { ChangeEvent, SyntheticEvent, useState } from "react";

function Page() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const onClickH6 = () => {
    alert();
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    // alert("로그인 성공");
  };

  return (
    <section>
      <h2>hello world</h2>
      <h3>hello world</h3>
      <h4>hello world</h4>
      <h5>hello world</h5>
      <h6 onClick={onClickH6}>hello world</h6>

      <div>
        {/* <form onSubmit={onSubmit}> */}
        <input
          placeholder="email"
          value={login.email}
          name={"email"}
          className="text-black"
          onChange={onChangeInput}
        />
        <input
          type="password"
          placeholder="password"
          value={login.password}
          name="password"
          className="text-black"
          onChange={onChangeInput}
        />
        <button onClick={onSubmit} type="button" className="hello">
          submit
        </button>
        {/* </form> */}
      </div>
    </section>
  );
}

export default Page;
