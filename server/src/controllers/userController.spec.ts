/** If it gives 400, it means you can't create more */
describe.skip('POST USER', () => {
  const path = `${import.meta.env.VITE_DEV_URL}/user`;

  it('Without body -> 500', async () => {
    const res = await fetch(path, {
      method: 'POST'
    });

    expect(res.status).toBe(500)
  })

  it('Without parameters in body -> 423', async () => {
    const res = await fetch(path, {
      method: 'POST',
      body: JSON.stringify({})
    });

    expect(res.status).toBe(423)
  })

  it('Post a user that already exists -> 409', async () => {
    const res = await fetch(path, {
      method: 'POST',
      body: JSON.stringify({ username: "bargun", password: "password", role: "1" })
    });

    expect(await res.text()).includes("duplicate key value");
  })

  it('Post a user -> 200', async () => {
    const uniqueUserName = "bargun20";
    const res = await fetch(path, {
      method: 'POST',
      body: JSON.stringify({ username: uniqueUserName, password: "12345", role: "6" })
    });
    expect(res.status).toBe(200)
  })
});



