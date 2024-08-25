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

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.info("login params", login);
  };

  return (
    <section>
      <h1>hello world</h1>
      <h2>hello world</h2>
      <h3>hello world</h3>
      <h4>hello world</h4>
      <h5>hello world</h5>
      <h6 onClick={onClickH6}>hello world</h6>

      <div>
        <form onSubmit={onSubmit}>
          <input
            placeholder="email"
            value={login.email}
            name={"email"}
            onChange={onChangeInput}
          />
          <input
            type="password"
            placeholder="password"
            value={login.password}
            name="password"
            onChange={onChangeInput}
          />
          <button type="button" className="hello ">
            submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Page;
