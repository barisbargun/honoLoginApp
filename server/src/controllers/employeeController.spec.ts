const path = `${import.meta.env.VITE_DEV_URL}/employee`;
const options = { headers: { Authorization: import.meta.env.VITE_ACCESS_TOKEN! } };

describe.skip('GET EMPLOYEE', () => {
  it('Get employees -> 200', async () => {
    const res = await fetch(path, {
      method: 'GET',
      ...options,
    });
    if (res.status == 200) console.log(await res.json());
    expect(res.status).toBe(200)
  })
});

/** If it gives 400, it means you can't create more */
describe.skip('POST EMPLOYEE', () => {
  const uniqueEmployeeName = "Employee234";
  it('Without body or any error -> 500', async () => {
    const res = await fetch(path, {
      method: 'POST',
      ...options
    });

    expect(res.status).toBe(500)
  })

  it('Without parameters in body -> 423', async () => {
    const res = await fetch(path, {
      method: 'POST',
      body: JSON.stringify({}),
      ...options
    });

    expect(res.status).toBe(423)
  })

  it('Post an employee that already exists -> 409', async () => {
    const res = await fetch(path, {
      method: 'POST',
      ...options,
      body: JSON.stringify({ name: "Employee1", email: "123" })
    });
    expect(res.status).toBe(409)
  })

  it('Post an employee -> 200', async () => {
    const res = await fetch(path, {
      method: 'POST',
      ...options,
      body: JSON.stringify({ name: uniqueEmployeeName, email: "123@hotmail.com" })
    });
    if (res.status == 200) console.log(await res.json());
    expect(res.status).toBe(200)
  })
});

describe.skip('Delete EMPLOYEE', () => {
  const employeeId = "45";

  // If the employee does not exist, the status will be also 200
  it('Delete an employee -> 200', async () => {
    const res = await fetch(`${path}/${employeeId}`, {
      method: 'DELETE',
      ...options
    });
    if (res.status == 200) console.log(await res.json());
    expect(res.status).toBe(200)
  })
});

