describe.skip('GET', () => {
  const path = `${import.meta.env.VITE_DEV_URL}/refresh`;
  const refreshToken = import.meta.env.VITE_REFRESH_TOKEN;

  it('Without token -> 423', async () => {
    const res = await fetch(path, {
      method: 'GET',
    });

    expect(res.status).toBe(423)
  })

  it('Invalid token -> 406', async () => {
    const res = await fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `refresh_token=123`
      },
    });
    expect(res.status).toBe(406)
  })

  it('Valid token -> 200', async () => {
    const res = await fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `refresh_token=${refreshToken}`
      },
    });
    console.log(await res.json());
    expect(res.status).toBe(200)
  })
});