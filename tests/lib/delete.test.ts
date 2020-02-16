// @ts-ignore
const { MultiTenant } = require('prisma-multi-tenant')

describe('delete', () => {
  test('delete existing tenant', async () => {
    const multiTenant = new MultiTenant()

    await multiTenant.createTenant({
      name: 'test-delete-1',
      provider: 'sqlite',
      url: 'file:test-delete-1.db'
    })

    await multiTenant.deleteTenant('test-delete-1')

    expect(multiTenant.existsTenant('test-delete-1'))
      .resolves.toBe(false)
      .then(() => multiTenant.disconnect())
  })

  test('delete non-existing tenant', async () => {
    const multiTenant = new MultiTenant()

    expect(multiTenant.deleteTenant('test-delete-2'))
      .rejects.toThrow()
      .then(() => multiTenant.disconnect())
  })

  test('useManagement: false', async () => {
    const multiTenant = new MultiTenant({ useManagement: false })

    expect(multiTenant.deleteTenant('test-delete-3'))
      .rejects.toThrow()
      .then(() => multiTenant.disconnect())
  })
})