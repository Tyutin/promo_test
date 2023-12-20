import { DataSourceOptions, DataSource, EntityManager } from 'typeorm'
import {defaultEntities} from './entities'
import { parseDataSourceConfig, updateConnectionEntities } from './utils'
import {AdapterAccount, AdapterUser, AdapterSession, Adapter } from 'next-auth/adapters'

export const entities = defaultEntities
export type Entities = typeof entities

let _dataSource: DataSource | undefined

export async function getManager(options: {
  dataSource: string | DataSourceOptions
  entities: Entities
}): Promise<EntityManager> {
  if (!_dataSource) {
    const { dataSource, entities } = options
    const config = {
      ...parseDataSourceConfig(dataSource),
      entities: Object.values(entities),
    }
    _dataSource = new DataSource(config)
  }

  const manager = _dataSource?.manager

  if (!manager.connection.isInitialized) {
    await manager.connection.initialize()
  }

  if (process.env.NODE_ENV !== 'production') {
    await updateConnectionEntities(_dataSource, Object.values(options.entities))
  }
  return manager
}

export function TypeORMAdapter(
  dataSource: string | DataSourceOptions
): Adapter {
  const c: {
    dataSource: string | DataSourceOptions
    entities: Entities
  } = {
    dataSource,
    entities: {
      UserEntity: defaultEntities.UserEntity,
      SessionEntity: defaultEntities.SessionEntity,
      AccountEntity: defaultEntities.AccountEntity,
    },
  }

  return {
    async getUserByAccount(provider_providerAccountId) {
      const m = await getManager(c)
      const account = await m.findOne<AdapterAccount & { user: AdapterUser }>(
        'AccountEntity',
        { where: provider_providerAccountId, relations: ['user'] }
      )
      if (!account) return null
      return account.user ?? null
    },
    // @ts-expect-error
    createUser: async (data) => {
      const m = await getManager(c)
      const user = await m.save('UserEntity', data)
      return user
    },
    async linkAccount(data) {
      const m = await getManager(c)
      const account = await m.save('AccountEntity', data)
      return account
    },
    // @ts-expect-error
    async getUser(id) {
      const m = await getManager(c)
      const user = await m.findOne('UserEntity', { where: { id } })
      if (!user) return null
      return { ...user }
    },
    // @ts-expect-error
    async getUserByEmail(email) {
      const m = await getManager(c)
      const user = await m.findOne('UserEntity', { where: { email } })
      if (!user) return null
      return { ...user }
    },
    // @ts-expect-error
    async updateUser(data) {
      const m = await getManager(c)
      const user = await m.save('UserEntity', data)
      return user
    },
    async createSession(data) {
      const m = await getManager(c)
      const session = await m.save('SessionEntity', data)
      return session
    },
    async getSessionAndUser(sessionToken) {
      const m = await getManager(c)
      const sessionAndUser = await m.findOne<
        AdapterSession & { user: AdapterUser }
      >('SessionEntity', { where: { sessionToken }, relations: ['user'] })

      if (!sessionAndUser) return null
      const { user, ...session } = sessionAndUser
      console.log('='.repeat(40))
      console.log(user)
      console.log('='.repeat(40))
      return { session, user }
    },
    async updateSession(data) {
      const m = await getManager(c)
      await m.update('SessionEntity', { sessionToken: data.sessionToken }, data)
      return null
    },
    async deleteSession(sessionToken) {
      const m = await getManager(c)
      await m.delete('SessionEntity', { sessionToken })
    },
  }
}
