describe.skip('POST', () => {
  const path = `${import.meta.env.VITE_DEV_URL}/auth`;

  it('Without body -> 400', async () => {
    const res = await fetch(path, {
      method: 'POST'
    });

    expect(res.status).toBe(400)
  })

  it('Without parameters in body -> 423', async () => {
    const res = await fetch(path, {
      method: 'POST',
      body: JSON.stringify({})
    });

    expect(res.status).toBe(423)
  })

  it('User not found -> 403', async () => {
    const res = await fetch(path, {
      method: 'POST',
      body: JSON.stringify({ username: "1xcz", password: "1xcz" })
    });

    expect(res.status).toBe(403)
  })

  it('Invalid Password -> 401', async () => {
    const res = await fetch(path, {
      method: 'POST',
      body: JSON.stringify({ username: "bargun", password: "123" })
    });

    expect(res.status).toBe(401)
  })

  it.only('Post a user with valid password -> 200', async () => {
    const res = await fetch(path, {
      method: 'POST',
      body:JSON.stringify({ username: "bargun", password: "12345" })
    });
    console.log(await res.json());
    expect(res.status).toBe(200)
  })
});