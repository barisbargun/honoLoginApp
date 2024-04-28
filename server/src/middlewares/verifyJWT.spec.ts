describe.skip('POST Test JWT', () => {
  const path = `${import.meta.env.VITE_DEV_URL}/test_verifyJWT`;
  const token = import.meta.env.VITE_ACCESS_TOKEN;

  it('Without token -> 428', async () => {
    const res = await fetch(path, {
      method: 'POST'
    });

    expect(res.status).toBe(428)
  })

  it('Invalid token -> 428', async () => {
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        Authorization: `Bearer 1907`
      }
    });

    expect(res.status).toBe(428)
  })

  it('Verify token -> 200', async () => {
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