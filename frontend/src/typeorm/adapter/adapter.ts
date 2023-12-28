import { DataSourceOptions, DataSource, EntityManager } from 'typeorm'
import { parseDataSourceConfig, updateConnectionEntities } from './utils'
import { AuthRequestEntity, SessionEntity, UserEntity } from '../../../../backend/src/user/user.entity'
import { PromocodeEntity } from '../../../../backend/src/promocode/promocode.entity';
import { OrderEntity } from '../../../../backend/src/order/order.entity';

export const entities = { AuthRequestEntity, SessionEntity, UserEntity, PromocodeEntity, OrderEntity }
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
) {
  const c: {
    dataSource: string | DataSourceOptions
    entities: Entities
  } = {
    dataSource,
    entities: {UserEntity,SessionEntity,AuthRequestEntity, PromocodeEntity, OrderEntity},
  }

  return {
    async createAuthRequest(promocode?: string): Promise<AuthRequestEntity> {
      const m = await getManager(c)
      const data: Partial<AuthRequestEntity> = {
        expires: new Date(new Date().setHours(new Date().getHours() + 1)).getTime().toString(),
        ref_promocode: promocode
      }
      const authRequest = Object.assign({}, new AuthRequestEntity(), data)      
      const ar = await m.save(AuthRequestEntity, authRequest)
      return ar
    },

    async getUserAndSessionByAuthRequestId(authRequestId: string): Promise<{user: UserEntity, session: Omit<SessionEntity, 'user'>} | null> {
      const m = await getManager(c)
      const sessionAndUser = await m.findOne<SessionEntity & {user: UserEntity}>(SessionEntity, {
        where: {
          authRequest: {
            id: authRequestId
          }
        },
        relations: {
          authRequest: true,
          user: true
        }
      })
      if (!sessionAndUser) return null
      const {user, ...session} = sessionAndUser
      return {user, session}
    },

    async getUserBySessionToken(sessionToken: string): Promise<UserEntity | null> {
      const m = await getManager(c)
      const session = await m.findOne(SessionEntity, {
        where: {
          sessionToken
        },
        relations: {
          user: true
        }
      })
      if (!session) return null
      return session.user
    },

    async getPromocodeByCode(code: string): Promise<PromocodeEntity | null> {
      const m = await getManager(c)
      return await m.findOne(PromocodeEntity, {
        where: {
          code
        },
        relations: {
          owner: true
        }
      })
    },

    async setRefPromocodeToCurrentUser(sessionToken: string, code: string): Promise<void> {
      const m = await getManager(c)
      const user = await this.getUserBySessionToken(sessionToken)
      const promocode = await this.getPromocodeByCode(code)
      if(
        !promocode || 
        !user || 
        promocode?.owner.id === user?.id || 
        user?.ref_promocode 
      ) return
      user.ref_promocode = promocode
      m.save(UserEntity, user)
    }
    // async getSessionAndUser(sessionToken) {
    //   const m = await getManager(c)
    //   const sessionAndUser = await m.findOne<
    //     AdapterSession & { user: AdapterUser }
    //   >('SessionEntity', { where: { sessionToken }, relations: ['user'] })

    //   if (!sessionAndUser) return null
    //   const { user, ...session } = sessionAndUser
    //   return { session, user }
    // },
    // async getUserByAccount(provider_providerAccountId) {
    //   const m = await getManager(c)
    //   const account = await m.findOne<AdapterAccount & { user: AdapterUser }>(
    //     'AccountEntity',
    //     { where: provider_providerAccountId, relations: ['user'] }
    //   )
    //   if (!account) return null
    //   return account.user ?? null
    // },
    // // @ts-expect-error
    // createUser: async (data) => {
    //   const m = await getManager(c)
    //   const user = await m.save('UserEntity', data)
    //   return user
    // },
    // async linkAccount(data) {
    //   const m = await getManager(c)
    //   const account = await m.save('AccountEntity', data)
    //   return account
    // },
    // // @ts-expect-error
    // async getUser(id) {
    //   const m = await getManager(c)
    //   const user = await m.findOne('UserEntity', { where: { id } })
    //   if (!user) return null
    //   return { ...user }
    // },
    // // @ts-expect-error
    // async getUserByEmail(email) {
    //   const m = await getManager(c)
    //   const user = await m.findOne('UserEntity', { where: { email } })
    //   if (!user) return null
    //   return { ...user }
    // },
    // // @ts-expect-error
    // async updateUser(data) {
    //   const m = await getManager(c)
    //   const user = await m.save('UserEntity', data)
    //   return user
    // },
    // async createSession(data) {
    //   const m = await getManager(c)
    //   const session = await m.save('SessionEntity', data)
    //   return session
    // },
    // async updateSession(data) {
    //   const m = await getManager(c)
    //   await m.update('SessionEntity', { sessionToken: data.sessionToken }, data)
    //   return null
    // },
    // async deleteSession(sessionToken) {
    //   const m = await getManager(c)
    //   await m.delete('SessionEntity', { sessionToken })
    // },
  }
}
