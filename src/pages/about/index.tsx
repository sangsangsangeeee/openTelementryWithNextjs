function Page() {
  const onClickH6 = () => {
    alert();
  };

  return (
    <section>
      <h1>hello world</h1>
      <h2>hello world</h2>
      <h3>hello world</h3>
      <h4>hello world</h4>
      <h5>hello world</h5>
      <h6 onClick={onClickH6}>hello world</h6>
    </section>
  );
}

export default Page;
