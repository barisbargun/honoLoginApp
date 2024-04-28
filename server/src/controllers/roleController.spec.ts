
/** If it gives 400, it means you can't create more */
describe.skip('POST ROLE', () => {
  const path =  `${import.meta.env.VITE_DEV_URL}/role`;
  const uniqueRoleName = "Role091";

  it('Without body or any error -> 500', async () => {
    const res = await fetch(path, {
      method: 'POST'
    });
    expect(res.status).toBe(500)
  })

  it('Without parameters in body -> 423', async () => {
    const res = await fetch(path, {
      method: 'POST',
      body:JSON.stringify({})
    });

    expect(res.status).toBe(423)
  })

  it('Post a role that already exists -> 409', async () => {
    const res = await fetch(path, {
      method: 'POST',
      body:JSON.stringify({name:"Role1"})
    });

    expect(res.status).toBe(409)
  })

  it('Post a role -> 200', async () => {
    const res = await fetch(path, {
      method: 'POST',
      body:JSON.stringify({name:uniqueRoleName})
    });

    expect(res.status).toBe(200)
  })
});