describe.skip('POST Test JWT', () => {
  const path = `${import.meta.env.VITE_DEV_URL}/test_verifyRole`;
  const token = import.meta.env.VITE_ACCESS_TOKEN;

  it('Not permitted role -> 401', async () => {
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        Authorization: token!
      },
    });
    expect(res.status).toBe(401)
  })

  it('Permitted role -> 200', async () => {
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        Authorization: token!
      },
    });
    if (res.status == 200) console.log(await res.json());
    expect(res.status).toBe(200)
  })
});