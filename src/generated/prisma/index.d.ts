
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Like
 * 
 */
export type Like = $Result.DefaultSelection<Prisma.$LikePayload>
/**
 * Model Match
 * 
 */
export type Match = $Result.DefaultSelection<Prisma.$MatchPayload>
/**
 * Model Call
 * 
 */
export type Call = $Result.DefaultSelection<Prisma.$CallPayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>
/**
 * Model Block
 * 
 */
export type Block = $Result.DefaultSelection<Prisma.$BlockPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.like`: Exposes CRUD operations for the **Like** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Likes
    * const likes = await prisma.like.findMany()
    * ```
    */
  get like(): Prisma.LikeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.match`: Exposes CRUD operations for the **Match** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Matches
    * const matches = await prisma.match.findMany()
    * ```
    */
  get match(): Prisma.MatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.call`: Exposes CRUD operations for the **Call** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Calls
    * const calls = await prisma.call.findMany()
    * ```
    */
  get call(): Prisma.CallDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.block`: Exposes CRUD operations for the **Block** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Blocks
    * const blocks = await prisma.block.findMany()
    * ```
    */
  get block(): Prisma.BlockDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Like: 'Like',
    Match: 'Match',
    Call: 'Call',
    Report: 'Report',
    Block: 'Block'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "like" | "match" | "call" | "report" | "block"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Like: {
        payload: Prisma.$LikePayload<ExtArgs>
        fields: Prisma.LikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          findFirst: {
            args: Prisma.LikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          findMany: {
            args: Prisma.LikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>[]
          }
          create: {
            args: Prisma.LikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          createMany: {
            args: Prisma.LikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>[]
          }
          delete: {
            args: Prisma.LikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          update: {
            args: Prisma.LikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          deleteMany: {
            args: Prisma.LikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>[]
          }
          upsert: {
            args: Prisma.LikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          aggregate: {
            args: Prisma.LikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLike>
          }
          groupBy: {
            args: Prisma.LikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<LikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.LikeCountArgs<ExtArgs>
            result: $Utils.Optional<LikeCountAggregateOutputType> | number
          }
        }
      }
      Match: {
        payload: Prisma.$MatchPayload<ExtArgs>
        fields: Prisma.MatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findFirst: {
            args: Prisma.MatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findMany: {
            args: Prisma.MatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          create: {
            args: Prisma.MatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          createMany: {
            args: Prisma.MatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          delete: {
            args: Prisma.MatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          update: {
            args: Prisma.MatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          deleteMany: {
            args: Prisma.MatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          upsert: {
            args: Prisma.MatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          aggregate: {
            args: Prisma.MatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatch>
          }
          groupBy: {
            args: Prisma.MatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchCountArgs<ExtArgs>
            result: $Utils.Optional<MatchCountAggregateOutputType> | number
          }
        }
      }
      Call: {
        payload: Prisma.$CallPayload<ExtArgs>
        fields: Prisma.CallFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CallFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CallFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallPayload>
          }
          findFirst: {
            args: Prisma.CallFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CallFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallPayload>
          }
          findMany: {
            args: Prisma.CallFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallPayload>[]
          }
          create: {
            args: Prisma.CallCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallPayload>
          }
          createMany: {
            args: Prisma.CallCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CallCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallPayload>[]
          }
          delete: {
            args: Prisma.CallDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallPayload>
          }
          update: {
            args: Prisma.CallUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallPayload>
          }
          deleteMany: {
            args: Prisma.CallDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CallUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CallUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallPayload>[]
          }
          upsert: {
            args: Prisma.CallUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallPayload>
          }
          aggregate: {
            args: Prisma.CallAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCall>
          }
          groupBy: {
            args: Prisma.CallGroupByArgs<ExtArgs>
            result: $Utils.Optional<CallGroupByOutputType>[]
          }
          count: {
            args: Prisma.CallCountArgs<ExtArgs>
            result: $Utils.Optional<CallCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      Block: {
        payload: Prisma.$BlockPayload<ExtArgs>
        fields: Prisma.BlockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          findFirst: {
            args: Prisma.BlockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          findMany: {
            args: Prisma.BlockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>[]
          }
          create: {
            args: Prisma.BlockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          createMany: {
            args: Prisma.BlockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>[]
          }
          delete: {
            args: Prisma.BlockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          update: {
            args: Prisma.BlockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          deleteMany: {
            args: Prisma.BlockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlockUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>[]
          }
          upsert: {
            args: Prisma.BlockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          aggregate: {
            args: Prisma.BlockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlock>
          }
          groupBy: {
            args: Prisma.BlockGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlockGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlockCountArgs<ExtArgs>
            result: $Utils.Optional<BlockCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    like?: LikeOmit
    match?: MatchOmit
    call?: CallOmit
    report?: ReportOmit
    block?: BlockOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    blocks_received: number
    blocks_made: number
    calls_initiated: number
    calls_received: number
    likes_from: number
    likes_to: number
    matches_as_user1: number
    matches_as_user2: number
    reports_received: number
    reports_made: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blocks_received?: boolean | UserCountOutputTypeCountBlocks_receivedArgs
    blocks_made?: boolean | UserCountOutputTypeCountBlocks_madeArgs
    calls_initiated?: boolean | UserCountOutputTypeCountCalls_initiatedArgs
    calls_received?: boolean | UserCountOutputTypeCountCalls_receivedArgs
    likes_from?: boolean | UserCountOutputTypeCountLikes_fromArgs
    likes_to?: boolean | UserCountOutputTypeCountLikes_toArgs
    matches_as_user1?: boolean | UserCountOutputTypeCountMatches_as_user1Args
    matches_as_user2?: boolean | UserCountOutputTypeCountMatches_as_user2Args
    reports_received?: boolean | UserCountOutputTypeCountReports_receivedArgs
    reports_made?: boolean | UserCountOutputTypeCountReports_madeArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBlocks_receivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBlocks_madeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCalls_initiatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCalls_receivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikes_fromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikes_toArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMatches_as_user1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMatches_as_user2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReports_receivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReports_madeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }


  /**
   * Count Type MatchCountOutputType
   */

  export type MatchCountOutputType = {
    calls: number
  }

  export type MatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calls?: boolean | MatchCountOutputTypeCountCallsArgs
  }

  // Custom InputTypes
  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchCountOutputType
     */
    select?: MatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeCountCallsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    preferred_age_min: number | null
    preferred_age_max: number | null
    preferred_distance_km: number | null
    latitude: number | null
    longitude: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    preferred_age_min: number | null
    preferred_age_max: number | null
    preferred_distance_km: number | null
    latitude: number | null
    longitude: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password_hash: string | null
    display_name: string | null
    birth_date: Date | null
    gender: string | null
    city: string | null
    bio: string | null
    profile_image_url: string | null
    preferred_age_min: number | null
    preferred_age_max: number | null
    preferred_distance_km: number | null
    is_active: boolean | null
    is_paid: boolean | null
    paid_until: Date | null
    verified_email: boolean | null
    created_at: Date | null
    updated_at: Date | null
    last_active_at: Date | null
    last_seen_at: Date | null
    status_message: string | null
    latitude: number | null
    longitude: number | null
    is_admin: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password_hash: string | null
    display_name: string | null
    birth_date: Date | null
    gender: string | null
    city: string | null
    bio: string | null
    profile_image_url: string | null
    preferred_age_min: number | null
    preferred_age_max: number | null
    preferred_distance_km: number | null
    is_active: boolean | null
    is_paid: boolean | null
    paid_until: Date | null
    verified_email: boolean | null
    created_at: Date | null
    updated_at: Date | null
    last_active_at: Date | null
    last_seen_at: Date | null
    status_message: string | null
    latitude: number | null
    longitude: number | null
    is_admin: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password_hash: number
    display_name: number
    birth_date: number
    gender: number
    looking_for_gender: number
    relationship_type: number
    city: number
    bio: number
    profile_image_url: number
    additional_photos: number
    preferred_age_min: number
    preferred_age_max: number
    preferred_distance_km: number
    is_active: number
    is_paid: number
    paid_until: number
    verified_email: number
    consents: number
    created_at: number
    updated_at: number
    last_active_at: number
    last_seen_at: number
    status_message: number
    latitude: number
    longitude: number
    is_admin: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    preferred_age_min?: true
    preferred_age_max?: true
    preferred_distance_km?: true
    latitude?: true
    longitude?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    preferred_age_min?: true
    preferred_age_max?: true
    preferred_distance_km?: true
    latitude?: true
    longitude?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    display_name?: true
    birth_date?: true
    gender?: true
    city?: true
    bio?: true
    profile_image_url?: true
    preferred_age_min?: true
    preferred_age_max?: true
    preferred_distance_km?: true
    is_active?: true
    is_paid?: true
    paid_until?: true
    verified_email?: true
    created_at?: true
    updated_at?: true
    last_active_at?: true
    last_seen_at?: true
    status_message?: true
    latitude?: true
    longitude?: true
    is_admin?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    display_name?: true
    birth_date?: true
    gender?: true
    city?: true
    bio?: true
    profile_image_url?: true
    preferred_age_min?: true
    preferred_age_max?: true
    preferred_distance_km?: true
    is_active?: true
    is_paid?: true
    paid_until?: true
    verified_email?: true
    created_at?: true
    updated_at?: true
    last_active_at?: true
    last_seen_at?: true
    status_message?: true
    latitude?: true
    longitude?: true
    is_admin?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    display_name?: true
    birth_date?: true
    gender?: true
    looking_for_gender?: true
    relationship_type?: true
    city?: true
    bio?: true
    profile_image_url?: true
    additional_photos?: true
    preferred_age_min?: true
    preferred_age_max?: true
    preferred_distance_km?: true
    is_active?: true
    is_paid?: true
    paid_until?: true
    verified_email?: true
    consents?: true
    created_at?: true
    updated_at?: true
    last_active_at?: true
    last_seen_at?: true
    status_message?: true
    latitude?: true
    longitude?: true
    is_admin?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password_hash: string
    display_name: string
    birth_date: Date
    gender: string | null
    looking_for_gender: string[]
    relationship_type: string[]
    city: string | null
    bio: string | null
    profile_image_url: string | null
    additional_photos: JsonValue | null
    preferred_age_min: number
    preferred_age_max: number
    preferred_distance_km: number
    is_active: boolean
    is_paid: boolean
    paid_until: Date | null
    verified_email: boolean
    consents: JsonValue
    created_at: Date
    updated_at: Date
    last_active_at: Date
    last_seen_at: Date | null
    status_message: string | null
    latitude: number | null
    longitude: number | null
    is_admin: boolean
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    display_name?: boolean
    birth_date?: boolean
    gender?: boolean
    looking_for_gender?: boolean
    relationship_type?: boolean
    city?: boolean
    bio?: boolean
    profile_image_url?: boolean
    additional_photos?: boolean
    preferred_age_min?: boolean
    preferred_age_max?: boolean
    preferred_distance_km?: boolean
    is_active?: boolean
    is_paid?: boolean
    paid_until?: boolean
    verified_email?: boolean
    consents?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_active_at?: boolean
    last_seen_at?: boolean
    status_message?: boolean
    latitude?: boolean
    longitude?: boolean
    is_admin?: boolean
    blocks_received?: boolean | User$blocks_receivedArgs<ExtArgs>
    blocks_made?: boolean | User$blocks_madeArgs<ExtArgs>
    calls_initiated?: boolean | User$calls_initiatedArgs<ExtArgs>
    calls_received?: boolean | User$calls_receivedArgs<ExtArgs>
    likes_from?: boolean | User$likes_fromArgs<ExtArgs>
    likes_to?: boolean | User$likes_toArgs<ExtArgs>
    matches_as_user1?: boolean | User$matches_as_user1Args<ExtArgs>
    matches_as_user2?: boolean | User$matches_as_user2Args<ExtArgs>
    reports_received?: boolean | User$reports_receivedArgs<ExtArgs>
    reports_made?: boolean | User$reports_madeArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    display_name?: boolean
    birth_date?: boolean
    gender?: boolean
    looking_for_gender?: boolean
    relationship_type?: boolean
    city?: boolean
    bio?: boolean
    profile_image_url?: boolean
    additional_photos?: boolean
    preferred_age_min?: boolean
    preferred_age_max?: boolean
    preferred_distance_km?: boolean
    is_active?: boolean
    is_paid?: boolean
    paid_until?: boolean
    verified_email?: boolean
    consents?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_active_at?: boolean
    last_seen_at?: boolean
    status_message?: boolean
    latitude?: boolean
    longitude?: boolean
    is_admin?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    display_name?: boolean
    birth_date?: boolean
    gender?: boolean
    looking_for_gender?: boolean
    relationship_type?: boolean
    city?: boolean
    bio?: boolean
    profile_image_url?: boolean
    additional_photos?: boolean
    preferred_age_min?: boolean
    preferred_age_max?: boolean
    preferred_distance_km?: boolean
    is_active?: boolean
    is_paid?: boolean
    paid_until?: boolean
    verified_email?: boolean
    consents?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_active_at?: boolean
    last_seen_at?: boolean
    status_message?: boolean
    latitude?: boolean
    longitude?: boolean
    is_admin?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password_hash?: boolean
    display_name?: boolean
    birth_date?: boolean
    gender?: boolean
    looking_for_gender?: boolean
    relationship_type?: boolean
    city?: boolean
    bio?: boolean
    profile_image_url?: boolean
    additional_photos?: boolean
    preferred_age_min?: boolean
    preferred_age_max?: boolean
    preferred_distance_km?: boolean
    is_active?: boolean
    is_paid?: boolean
    paid_until?: boolean
    verified_email?: boolean
    consents?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_active_at?: boolean
    last_seen_at?: boolean
    status_message?: boolean
    latitude?: boolean
    longitude?: boolean
    is_admin?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password_hash" | "display_name" | "birth_date" | "gender" | "looking_for_gender" | "relationship_type" | "city" | "bio" | "profile_image_url" | "additional_photos" | "preferred_age_min" | "preferred_age_max" | "preferred_distance_km" | "is_active" | "is_paid" | "paid_until" | "verified_email" | "consents" | "created_at" | "updated_at" | "last_active_at" | "last_seen_at" | "status_message" | "latitude" | "longitude" | "is_admin", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blocks_received?: boolean | User$blocks_receivedArgs<ExtArgs>
    blocks_made?: boolean | User$blocks_madeArgs<ExtArgs>
    calls_initiated?: boolean | User$calls_initiatedArgs<ExtArgs>
    calls_received?: boolean | User$calls_receivedArgs<ExtArgs>
    likes_from?: boolean | User$likes_fromArgs<ExtArgs>
    likes_to?: boolean | User$likes_toArgs<ExtArgs>
    matches_as_user1?: boolean | User$matches_as_user1Args<ExtArgs>
    matches_as_user2?: boolean | User$matches_as_user2Args<ExtArgs>
    reports_received?: boolean | User$reports_receivedArgs<ExtArgs>
    reports_made?: boolean | User$reports_madeArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      blocks_received: Prisma.$BlockPayload<ExtArgs>[]
      blocks_made: Prisma.$BlockPayload<ExtArgs>[]
      calls_initiated: Prisma.$CallPayload<ExtArgs>[]
      calls_received: Prisma.$CallPayload<ExtArgs>[]
      likes_from: Prisma.$LikePayload<ExtArgs>[]
      likes_to: Prisma.$LikePayload<ExtArgs>[]
      matches_as_user1: Prisma.$MatchPayload<ExtArgs>[]
      matches_as_user2: Prisma.$MatchPayload<ExtArgs>[]
      reports_received: Prisma.$ReportPayload<ExtArgs>[]
      reports_made: Prisma.$ReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password_hash: string
      display_name: string
      birth_date: Date
      gender: string | null
      looking_for_gender: string[]
      relationship_type: string[]
      city: string | null
      bio: string | null
      profile_image_url: string | null
      additional_photos: Prisma.JsonValue | null
      preferred_age_min: number
      preferred_age_max: number
      preferred_distance_km: number
      is_active: boolean
      is_paid: boolean
      paid_until: Date | null
      verified_email: boolean
      consents: Prisma.JsonValue
      created_at: Date
      updated_at: Date
      last_active_at: Date
      last_seen_at: Date | null
      status_message: string | null
      latitude: number | null
      longitude: number | null
      is_admin: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    blocks_received<T extends User$blocks_receivedArgs<ExtArgs> = {}>(args?: Subset<T, User$blocks_receivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    blocks_made<T extends User$blocks_madeArgs<ExtArgs> = {}>(args?: Subset<T, User$blocks_madeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    calls_initiated<T extends User$calls_initiatedArgs<ExtArgs> = {}>(args?: Subset<T, User$calls_initiatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    calls_received<T extends User$calls_receivedArgs<ExtArgs> = {}>(args?: Subset<T, User$calls_receivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes_from<T extends User$likes_fromArgs<ExtArgs> = {}>(args?: Subset<T, User$likes_fromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes_to<T extends User$likes_toArgs<ExtArgs> = {}>(args?: Subset<T, User$likes_toArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matches_as_user1<T extends User$matches_as_user1Args<ExtArgs> = {}>(args?: Subset<T, User$matches_as_user1Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matches_as_user2<T extends User$matches_as_user2Args<ExtArgs> = {}>(args?: Subset<T, User$matches_as_user2Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reports_received<T extends User$reports_receivedArgs<ExtArgs> = {}>(args?: Subset<T, User$reports_receivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reports_made<T extends User$reports_madeArgs<ExtArgs> = {}>(args?: Subset<T, User$reports_madeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly display_name: FieldRef<"User", 'String'>
    readonly birth_date: FieldRef<"User", 'DateTime'>
    readonly gender: FieldRef<"User", 'String'>
    readonly looking_for_gender: FieldRef<"User", 'String[]'>
    readonly relationship_type: FieldRef<"User", 'String[]'>
    readonly city: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly profile_image_url: FieldRef<"User", 'String'>
    readonly additional_photos: FieldRef<"User", 'Json'>
    readonly preferred_age_min: FieldRef<"User", 'Int'>
    readonly preferred_age_max: FieldRef<"User", 'Int'>
    readonly preferred_distance_km: FieldRef<"User", 'Int'>
    readonly is_active: FieldRef<"User", 'Boolean'>
    readonly is_paid: FieldRef<"User", 'Boolean'>
    readonly paid_until: FieldRef<"User", 'DateTime'>
    readonly verified_email: FieldRef<"User", 'Boolean'>
    readonly consents: FieldRef<"User", 'Json'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
    readonly last_active_at: FieldRef<"User", 'DateTime'>
    readonly last_seen_at: FieldRef<"User", 'DateTime'>
    readonly status_message: FieldRef<"User", 'String'>
    readonly latitude: FieldRef<"User", 'Float'>
    readonly longitude: FieldRef<"User", 'Float'>
    readonly is_admin: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.blocks_received
   */
  export type User$blocks_receivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    where?: BlockWhereInput
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    cursor?: BlockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * User.blocks_made
   */
  export type User$blocks_madeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    where?: BlockWhereInput
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    cursor?: BlockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * User.calls_initiated
   */
  export type User$calls_initiatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null
    where?: CallWhereInput
    orderBy?: CallOrderByWithRelationInput | CallOrderByWithRelationInput[]
    cursor?: CallWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[]
  }

  /**
   * User.calls_received
   */
  export type User$calls_receivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null
    where?: CallWhereInput
    orderBy?: CallOrderByWithRelationInput | CallOrderByWithRelationInput[]
    cursor?: CallWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[]
  }

  /**
   * User.likes_from
   */
  export type User$likes_fromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    where?: LikeWhereInput
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    cursor?: LikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * User.likes_to
   */
  export type User$likes_toArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    where?: LikeWhereInput
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    cursor?: LikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * User.matches_as_user1
   */
  export type User$matches_as_user1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    cursor?: MatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * User.matches_as_user2
   */
  export type User$matches_as_user2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    cursor?: MatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * User.reports_received
   */
  export type User$reports_receivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * User.reports_made
   */
  export type User$reports_madeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Like
   */

  export type AggregateLike = {
    _count: LikeCountAggregateOutputType | null
    _avg: LikeAvgAggregateOutputType | null
    _sum: LikeSumAggregateOutputType | null
    _min: LikeMinAggregateOutputType | null
    _max: LikeMaxAggregateOutputType | null
  }

  export type LikeAvgAggregateOutputType = {
    id: number | null
    from_user_id: number | null
    to_user_id: number | null
  }

  export type LikeSumAggregateOutputType = {
    id: number | null
    from_user_id: number | null
    to_user_id: number | null
  }

  export type LikeMinAggregateOutputType = {
    id: number | null
    from_user_id: number | null
    to_user_id: number | null
    is_like: boolean | null
    timestamp: Date | null
  }

  export type LikeMaxAggregateOutputType = {
    id: number | null
    from_user_id: number | null
    to_user_id: number | null
    is_like: boolean | null
    timestamp: Date | null
  }

  export type LikeCountAggregateOutputType = {
    id: number
    from_user_id: number
    to_user_id: number
    is_like: number
    timestamp: number
    _all: number
  }


  export type LikeAvgAggregateInputType = {
    id?: true
    from_user_id?: true
    to_user_id?: true
  }

  export type LikeSumAggregateInputType = {
    id?: true
    from_user_id?: true
    to_user_id?: true
  }

  export type LikeMinAggregateInputType = {
    id?: true
    from_user_id?: true
    to_user_id?: true
    is_like?: true
    timestamp?: true
  }

  export type LikeMaxAggregateInputType = {
    id?: true
    from_user_id?: true
    to_user_id?: true
    is_like?: true
    timestamp?: true
  }

  export type LikeCountAggregateInputType = {
    id?: true
    from_user_id?: true
    to_user_id?: true
    is_like?: true
    timestamp?: true
    _all?: true
  }

  export type LikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Like to aggregate.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Likes
    **/
    _count?: true | LikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LikeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LikeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LikeMaxAggregateInputType
  }

  export type GetLikeAggregateType<T extends LikeAggregateArgs> = {
        [P in keyof T & keyof AggregateLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLike[P]>
      : GetScalarType<T[P], AggregateLike[P]>
  }




  export type LikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LikeWhereInput
    orderBy?: LikeOrderByWithAggregationInput | LikeOrderByWithAggregationInput[]
    by: LikeScalarFieldEnum[] | LikeScalarFieldEnum
    having?: LikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LikeCountAggregateInputType | true
    _avg?: LikeAvgAggregateInputType
    _sum?: LikeSumAggregateInputType
    _min?: LikeMinAggregateInputType
    _max?: LikeMaxAggregateInputType
  }

  export type LikeGroupByOutputType = {
    id: number
    from_user_id: number
    to_user_id: number
    is_like: boolean
    timestamp: Date
    _count: LikeCountAggregateOutputType | null
    _avg: LikeAvgAggregateOutputType | null
    _sum: LikeSumAggregateOutputType | null
    _min: LikeMinAggregateOutputType | null
    _max: LikeMaxAggregateOutputType | null
  }

  type GetLikeGroupByPayload<T extends LikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LikeGroupByOutputType[P]>
            : GetScalarType<T[P], LikeGroupByOutputType[P]>
        }
      >
    >


  export type LikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    from_user_id?: boolean
    to_user_id?: boolean
    is_like?: boolean
    timestamp?: boolean
    from_user?: boolean | UserDefaultArgs<ExtArgs>
    to_user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["like"]>

  export type LikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    from_user_id?: boolean
    to_user_id?: boolean
    is_like?: boolean
    timestamp?: boolean
    from_user?: boolean | UserDefaultArgs<ExtArgs>
    to_user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["like"]>

  export type LikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    from_user_id?: boolean
    to_user_id?: boolean
    is_like?: boolean
    timestamp?: boolean
    from_user?: boolean | UserDefaultArgs<ExtArgs>
    to_user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["like"]>

  export type LikeSelectScalar = {
    id?: boolean
    from_user_id?: boolean
    to_user_id?: boolean
    is_like?: boolean
    timestamp?: boolean
  }

  export type LikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "from_user_id" | "to_user_id" | "is_like" | "timestamp", ExtArgs["result"]["like"]>
  export type LikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from_user?: boolean | UserDefaultArgs<ExtArgs>
    to_user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from_user?: boolean | UserDefaultArgs<ExtArgs>
    to_user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from_user?: boolean | UserDefaultArgs<ExtArgs>
    to_user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Like"
    objects: {
      from_user: Prisma.$UserPayload<ExtArgs>
      to_user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      from_user_id: number
      to_user_id: number
      is_like: boolean
      timestamp: Date
    }, ExtArgs["result"]["like"]>
    composites: {}
  }

  type LikeGetPayload<S extends boolean | null | undefined | LikeDefaultArgs> = $Result.GetResult<Prisma.$LikePayload, S>

  type LikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LikeCountAggregateInputType | true
    }

  export interface LikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Like'], meta: { name: 'Like' } }
    /**
     * Find zero or one Like that matches the filter.
     * @param {LikeFindUniqueArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LikeFindUniqueArgs>(args: SelectSubset<T, LikeFindUniqueArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Like that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LikeFindUniqueOrThrowArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LikeFindUniqueOrThrowArgs>(args: SelectSubset<T, LikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Like that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindFirstArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LikeFindFirstArgs>(args?: SelectSubset<T, LikeFindFirstArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Like that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindFirstOrThrowArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LikeFindFirstOrThrowArgs>(args?: SelectSubset<T, LikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Likes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Likes
     * const likes = await prisma.like.findMany()
     * 
     * // Get first 10 Likes
     * const likes = await prisma.like.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const likeWithIdOnly = await prisma.like.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LikeFindManyArgs>(args?: SelectSubset<T, LikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Like.
     * @param {LikeCreateArgs} args - Arguments to create a Like.
     * @example
     * // Create one Like
     * const Like = await prisma.like.create({
     *   data: {
     *     // ... data to create a Like
     *   }
     * })
     * 
     */
    create<T extends LikeCreateArgs>(args: SelectSubset<T, LikeCreateArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Likes.
     * @param {LikeCreateManyArgs} args - Arguments to create many Likes.
     * @example
     * // Create many Likes
     * const like = await prisma.like.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LikeCreateManyArgs>(args?: SelectSubset<T, LikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Likes and returns the data saved in the database.
     * @param {LikeCreateManyAndReturnArgs} args - Arguments to create many Likes.
     * @example
     * // Create many Likes
     * const like = await prisma.like.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Likes and only return the `id`
     * const likeWithIdOnly = await prisma.like.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LikeCreateManyAndReturnArgs>(args?: SelectSubset<T, LikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Like.
     * @param {LikeDeleteArgs} args - Arguments to delete one Like.
     * @example
     * // Delete one Like
     * const Like = await prisma.like.delete({
     *   where: {
     *     // ... filter to delete one Like
     *   }
     * })
     * 
     */
    delete<T extends LikeDeleteArgs>(args: SelectSubset<T, LikeDeleteArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Like.
     * @param {LikeUpdateArgs} args - Arguments to update one Like.
     * @example
     * // Update one Like
     * const like = await prisma.like.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LikeUpdateArgs>(args: SelectSubset<T, LikeUpdateArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Likes.
     * @param {LikeDeleteManyArgs} args - Arguments to filter Likes to delete.
     * @example
     * // Delete a few Likes
     * const { count } = await prisma.like.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LikeDeleteManyArgs>(args?: SelectSubset<T, LikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Likes
     * const like = await prisma.like.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LikeUpdateManyArgs>(args: SelectSubset<T, LikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Likes and returns the data updated in the database.
     * @param {LikeUpdateManyAndReturnArgs} args - Arguments to update many Likes.
     * @example
     * // Update many Likes
     * const like = await prisma.like.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Likes and only return the `id`
     * const likeWithIdOnly = await prisma.like.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LikeUpdateManyAndReturnArgs>(args: SelectSubset<T, LikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Like.
     * @param {LikeUpsertArgs} args - Arguments to update or create a Like.
     * @example
     * // Update or create a Like
     * const like = await prisma.like.upsert({
     *   create: {
     *     // ... data to create a Like
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Like we want to update
     *   }
     * })
     */
    upsert<T extends LikeUpsertArgs>(args: SelectSubset<T, LikeUpsertArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeCountArgs} args - Arguments to filter Likes to count.
     * @example
     * // Count the number of Likes
     * const count = await prisma.like.count({
     *   where: {
     *     // ... the filter for the Likes we want to count
     *   }
     * })
    **/
    count<T extends LikeCountArgs>(
      args?: Subset<T, LikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Like.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LikeAggregateArgs>(args: Subset<T, LikeAggregateArgs>): Prisma.PrismaPromise<GetLikeAggregateType<T>>

    /**
     * Group by Like.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LikeGroupByArgs['orderBy'] }
        : { orderBy?: LikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Like model
   */
  readonly fields: LikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Like.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    from_user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    to_user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Like model
   */
  interface LikeFieldRefs {
    readonly id: FieldRef<"Like", 'Int'>
    readonly from_user_id: FieldRef<"Like", 'Int'>
    readonly to_user_id: FieldRef<"Like", 'Int'>
    readonly is_like: FieldRef<"Like", 'Boolean'>
    readonly timestamp: FieldRef<"Like", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Like findUnique
   */
  export type LikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like findUniqueOrThrow
   */
  export type LikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like findFirst
   */
  export type LikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Likes.
     */
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like findFirstOrThrow
   */
  export type LikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Likes.
     */
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like findMany
   */
  export type LikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Likes to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like create
   */
  export type LikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The data needed to create a Like.
     */
    data: XOR<LikeCreateInput, LikeUncheckedCreateInput>
  }

  /**
   * Like createMany
   */
  export type LikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Likes.
     */
    data: LikeCreateManyInput | LikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Like createManyAndReturn
   */
  export type LikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * The data used to create many Likes.
     */
    data: LikeCreateManyInput | LikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Like update
   */
  export type LikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The data needed to update a Like.
     */
    data: XOR<LikeUpdateInput, LikeUncheckedUpdateInput>
    /**
     * Choose, which Like to update.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like updateMany
   */
  export type LikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Likes.
     */
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyInput>
    /**
     * Filter which Likes to update
     */
    where?: LikeWhereInput
    /**
     * Limit how many Likes to update.
     */
    limit?: number
  }

  /**
   * Like updateManyAndReturn
   */
  export type LikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * The data used to update Likes.
     */
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyInput>
    /**
     * Filter which Likes to update
     */
    where?: LikeWhereInput
    /**
     * Limit how many Likes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Like upsert
   */
  export type LikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The filter to search for the Like to update in case it exists.
     */
    where: LikeWhereUniqueInput
    /**
     * In case the Like found by the `where` argument doesn't exist, create a new Like with this data.
     */
    create: XOR<LikeCreateInput, LikeUncheckedCreateInput>
    /**
     * In case the Like was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LikeUpdateInput, LikeUncheckedUpdateInput>
  }

  /**
   * Like delete
   */
  export type LikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter which Like to delete.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like deleteMany
   */
  export type LikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Likes to delete
     */
    where?: LikeWhereInput
    /**
     * Limit how many Likes to delete.
     */
    limit?: number
  }

  /**
   * Like without action
   */
  export type LikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
  }


  /**
   * Model Match
   */

  export type AggregateMatch = {
    _count: MatchCountAggregateOutputType | null
    _avg: MatchAvgAggregateOutputType | null
    _sum: MatchSumAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  export type MatchAvgAggregateOutputType = {
    id: number | null
    user1_id: number | null
    user2_id: number | null
    default_voice_call_duration_sec: number | null
    default_video_call_duration_sec: number | null
  }

  export type MatchSumAggregateOutputType = {
    id: number | null
    user1_id: number | null
    user2_id: number | null
    default_voice_call_duration_sec: number | null
    default_video_call_duration_sec: number | null
  }

  export type MatchMinAggregateOutputType = {
    id: number | null
    user1_id: number | null
    user2_id: number | null
    matched_at: Date | null
    is_active: boolean | null
    closed_at: Date | null
    close_reason: string | null
    default_voice_call_duration_sec: number | null
    default_video_call_duration_sec: number | null
    last_interaction_at: Date | null
    match_inactivity_timeout_interval: string | null
  }

  export type MatchMaxAggregateOutputType = {
    id: number | null
    user1_id: number | null
    user2_id: number | null
    matched_at: Date | null
    is_active: boolean | null
    closed_at: Date | null
    close_reason: string | null
    default_voice_call_duration_sec: number | null
    default_video_call_duration_sec: number | null
    last_interaction_at: Date | null
    match_inactivity_timeout_interval: string | null
  }

  export type MatchCountAggregateOutputType = {
    id: number
    user1_id: number
    user2_id: number
    matched_at: number
    is_active: number
    closed_at: number
    close_reason: number
    default_voice_call_duration_sec: number
    default_video_call_duration_sec: number
    last_interaction_at: number
    match_inactivity_timeout_interval: number
    _all: number
  }


  export type MatchAvgAggregateInputType = {
    id?: true
    user1_id?: true
    user2_id?: true
    default_voice_call_duration_sec?: true
    default_video_call_duration_sec?: true
  }

  export type MatchSumAggregateInputType = {
    id?: true
    user1_id?: true
    user2_id?: true
    default_voice_call_duration_sec?: true
    default_video_call_duration_sec?: true
  }

  export type MatchMinAggregateInputType = {
    id?: true
    user1_id?: true
    user2_id?: true
    matched_at?: true
    is_active?: true
    closed_at?: true
    close_reason?: true
    default_voice_call_duration_sec?: true
    default_video_call_duration_sec?: true
    last_interaction_at?: true
    match_inactivity_timeout_interval?: true
  }

  export type MatchMaxAggregateInputType = {
    id?: true
    user1_id?: true
    user2_id?: true
    matched_at?: true
    is_active?: true
    closed_at?: true
    close_reason?: true
    default_voice_call_duration_sec?: true
    default_video_call_duration_sec?: true
    last_interaction_at?: true
    match_inactivity_timeout_interval?: true
  }

  export type MatchCountAggregateInputType = {
    id?: true
    user1_id?: true
    user2_id?: true
    matched_at?: true
    is_active?: true
    closed_at?: true
    close_reason?: true
    default_voice_call_duration_sec?: true
    default_video_call_duration_sec?: true
    last_interaction_at?: true
    match_inactivity_timeout_interval?: true
    _all?: true
  }

  export type MatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Match to aggregate.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Matches
    **/
    _count?: true | MatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchMaxAggregateInputType
  }

  export type GetMatchAggregateType<T extends MatchAggregateArgs> = {
        [P in keyof T & keyof AggregateMatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatch[P]>
      : GetScalarType<T[P], AggregateMatch[P]>
  }




  export type MatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithAggregationInput | MatchOrderByWithAggregationInput[]
    by: MatchScalarFieldEnum[] | MatchScalarFieldEnum
    having?: MatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchCountAggregateInputType | true
    _avg?: MatchAvgAggregateInputType
    _sum?: MatchSumAggregateInputType
    _min?: MatchMinAggregateInputType
    _max?: MatchMaxAggregateInputType
  }

  export type MatchGroupByOutputType = {
    id: number
    user1_id: number
    user2_id: number
    matched_at: Date
    is_active: boolean
    closed_at: Date | null
    close_reason: string | null
    default_voice_call_duration_sec: number
    default_video_call_duration_sec: number
    last_interaction_at: Date
    match_inactivity_timeout_interval: string
    _count: MatchCountAggregateOutputType | null
    _avg: MatchAvgAggregateOutputType | null
    _sum: MatchSumAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  type GetMatchGroupByPayload<T extends MatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchGroupByOutputType[P]>
            : GetScalarType<T[P], MatchGroupByOutputType[P]>
        }
      >
    >


  export type MatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user1_id?: boolean
    user2_id?: boolean
    matched_at?: boolean
    is_active?: boolean
    closed_at?: boolean
    close_reason?: boolean
    default_voice_call_duration_sec?: boolean
    default_video_call_duration_sec?: boolean
    last_interaction_at?: boolean
    match_inactivity_timeout_interval?: boolean
    calls?: boolean | Match$callsArgs<ExtArgs>
    user1?: boolean | UserDefaultArgs<ExtArgs>
    user2?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | MatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user1_id?: boolean
    user2_id?: boolean
    matched_at?: boolean
    is_active?: boolean
    closed_at?: boolean
    close_reason?: boolean
    default_voice_call_duration_sec?: boolean
    default_video_call_duration_sec?: boolean
    last_interaction_at?: boolean
    match_inactivity_timeout_interval?: boolean
    user1?: boolean | UserDefaultArgs<ExtArgs>
    user2?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user1_id?: boolean
    user2_id?: boolean
    matched_at?: boolean
    is_active?: boolean
    closed_at?: boolean
    close_reason?: boolean
    default_voice_call_duration_sec?: boolean
    default_video_call_duration_sec?: boolean
    last_interaction_at?: boolean
    match_inactivity_timeout_interval?: boolean
    user1?: boolean | UserDefaultArgs<ExtArgs>
    user2?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectScalar = {
    id?: boolean
    user1_id?: boolean
    user2_id?: boolean
    matched_at?: boolean
    is_active?: boolean
    closed_at?: boolean
    close_reason?: boolean
    default_voice_call_duration_sec?: boolean
    default_video_call_duration_sec?: boolean
    last_interaction_at?: boolean
    match_inactivity_timeout_interval?: boolean
  }

  export type MatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user1_id" | "user2_id" | "matched_at" | "is_active" | "closed_at" | "close_reason" | "default_voice_call_duration_sec" | "default_video_call_duration_sec" | "last_interaction_at" | "match_inactivity_timeout_interval", ExtArgs["result"]["match"]>
  export type MatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calls?: boolean | Match$callsArgs<ExtArgs>
    user1?: boolean | UserDefaultArgs<ExtArgs>
    user2?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | MatchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user1?: boolean | UserDefaultArgs<ExtArgs>
    user2?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user1?: boolean | UserDefaultArgs<ExtArgs>
    user2?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Match"
    objects: {
      calls: Prisma.$CallPayload<ExtArgs>[]
      user1: Prisma.$UserPayload<ExtArgs>
      user2: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user1_id: number
      user2_id: number
      matched_at: Date
      is_active: boolean
      closed_at: Date | null
      close_reason: string | null
      default_voice_call_duration_sec: number
      default_video_call_duration_sec: number
      last_interaction_at: Date
      match_inactivity_timeout_interval: string
    }, ExtArgs["result"]["match"]>
    composites: {}
  }

  type MatchGetPayload<S extends boolean | null | undefined | MatchDefaultArgs> = $Result.GetResult<Prisma.$MatchPayload, S>

  type MatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchCountAggregateInputType | true
    }

  export interface MatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Match'], meta: { name: 'Match' } }
    /**
     * Find zero or one Match that matches the filter.
     * @param {MatchFindUniqueArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchFindUniqueArgs>(args: SelectSubset<T, MatchFindUniqueArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Match that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchFindUniqueOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchFindFirstArgs>(args?: SelectSubset<T, MatchFindFirstArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Matches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Matches
     * const matches = await prisma.match.findMany()
     * 
     * // Get first 10 Matches
     * const matches = await prisma.match.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchWithIdOnly = await prisma.match.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchFindManyArgs>(args?: SelectSubset<T, MatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Match.
     * @param {MatchCreateArgs} args - Arguments to create a Match.
     * @example
     * // Create one Match
     * const Match = await prisma.match.create({
     *   data: {
     *     // ... data to create a Match
     *   }
     * })
     * 
     */
    create<T extends MatchCreateArgs>(args: SelectSubset<T, MatchCreateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Matches.
     * @param {MatchCreateManyArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchCreateManyArgs>(args?: SelectSubset<T, MatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Matches and returns the data saved in the database.
     * @param {MatchCreateManyAndReturnArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Match.
     * @param {MatchDeleteArgs} args - Arguments to delete one Match.
     * @example
     * // Delete one Match
     * const Match = await prisma.match.delete({
     *   where: {
     *     // ... filter to delete one Match
     *   }
     * })
     * 
     */
    delete<T extends MatchDeleteArgs>(args: SelectSubset<T, MatchDeleteArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Match.
     * @param {MatchUpdateArgs} args - Arguments to update one Match.
     * @example
     * // Update one Match
     * const match = await prisma.match.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchUpdateArgs>(args: SelectSubset<T, MatchUpdateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Matches.
     * @param {MatchDeleteManyArgs} args - Arguments to filter Matches to delete.
     * @example
     * // Delete a few Matches
     * const { count } = await prisma.match.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchDeleteManyArgs>(args?: SelectSubset<T, MatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchUpdateManyArgs>(args: SelectSubset<T, MatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches and returns the data updated in the database.
     * @param {MatchUpdateManyAndReturnArgs} args - Arguments to update many Matches.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Match.
     * @param {MatchUpsertArgs} args - Arguments to update or create a Match.
     * @example
     * // Update or create a Match
     * const match = await prisma.match.upsert({
     *   create: {
     *     // ... data to create a Match
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Match we want to update
     *   }
     * })
     */
    upsert<T extends MatchUpsertArgs>(args: SelectSubset<T, MatchUpsertArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchCountArgs} args - Arguments to filter Matches to count.
     * @example
     * // Count the number of Matches
     * const count = await prisma.match.count({
     *   where: {
     *     // ... the filter for the Matches we want to count
     *   }
     * })
    **/
    count<T extends MatchCountArgs>(
      args?: Subset<T, MatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchAggregateArgs>(args: Subset<T, MatchAggregateArgs>): Prisma.PrismaPromise<GetMatchAggregateType<T>>

    /**
     * Group by Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchGroupByArgs['orderBy'] }
        : { orderBy?: MatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Match model
   */
  readonly fields: MatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Match.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    calls<T extends Match$callsArgs<ExtArgs> = {}>(args?: Subset<T, Match$callsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user1<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user2<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Match model
   */
  interface MatchFieldRefs {
    readonly id: FieldRef<"Match", 'Int'>
    readonly user1_id: FieldRef<"Match", 'Int'>
    readonly user2_id: FieldRef<"Match", 'Int'>
    readonly matched_at: FieldRef<"Match", 'DateTime'>
    readonly is_active: FieldRef<"Match", 'Boolean'>
    readonly closed_at: FieldRef<"Match", 'DateTime'>
    readonly close_reason: FieldRef<"Match", 'String'>
    readonly default_voice_call_duration_sec: FieldRef<"Match", 'Int'>
    readonly default_video_call_duration_sec: FieldRef<"Match", 'Int'>
    readonly last_interaction_at: FieldRef<"Match", 'DateTime'>
    readonly match_inactivity_timeout_interval: FieldRef<"Match", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Match findUnique
   */
  export type MatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findUniqueOrThrow
   */
  export type MatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findFirst
   */
  export type MatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findFirstOrThrow
   */
  export type MatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findMany
   */
  export type MatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Matches to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match create
   */
  export type MatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to create a Match.
     */
    data: XOR<MatchCreateInput, MatchUncheckedCreateInput>
  }

  /**
   * Match createMany
   */
  export type MatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Match createManyAndReturn
   */
  export type MatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Match update
   */
  export type MatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to update a Match.
     */
    data: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
    /**
     * Choose, which Match to update.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match updateMany
   */
  export type MatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
  }

  /**
   * Match updateManyAndReturn
   */
  export type MatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Match upsert
   */
  export type MatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The filter to search for the Match to update in case it exists.
     */
    where: MatchWhereUniqueInput
    /**
     * In case the Match found by the `where` argument doesn't exist, create a new Match with this data.
     */
    create: XOR<MatchCreateInput, MatchUncheckedCreateInput>
    /**
     * In case the Match was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
  }

  /**
   * Match delete
   */
  export type MatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter which Match to delete.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match deleteMany
   */
  export type MatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Matches to delete
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to delete.
     */
    limit?: number
  }

  /**
   * Match.calls
   */
  export type Match$callsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null
    where?: CallWhereInput
    orderBy?: CallOrderByWithRelationInput | CallOrderByWithRelationInput[]
    cursor?: CallWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[]
  }

  /**
   * Match without action
   */
  export type MatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
  }


  /**
   * Model Call
   */

  export type AggregateCall = {
    _count: CallCountAggregateOutputType | null
    _avg: CallAvgAggregateOutputType | null
    _sum: CallSumAggregateOutputType | null
    _min: CallMinAggregateOutputType | null
    _max: CallMaxAggregateOutputType | null
  }

  export type CallAvgAggregateOutputType = {
    id: number | null
    match_id: number | null
    initiator_user_id: number | null
    receiver_user_id: number | null
    duration_seconds: number | null
  }

  export type CallSumAggregateOutputType = {
    id: bigint | null
    match_id: number | null
    initiator_user_id: number | null
    receiver_user_id: number | null
    duration_seconds: number | null
  }

  export type CallMinAggregateOutputType = {
    id: bigint | null
    match_id: number | null
    call_segment_uuid: string | null
    previous_call_segment_uuid: string | null
    initiator_user_id: number | null
    receiver_user_id: number | null
    call_type: string | null
    status: string | null
    start_time: Date | null
    end_time: Date | null
    duration_seconds: number | null
    end_reason: string | null
    initiated_at: Date | null
  }

  export type CallMaxAggregateOutputType = {
    id: bigint | null
    match_id: number | null
    call_segment_uuid: string | null
    previous_call_segment_uuid: string | null
    initiator_user_id: number | null
    receiver_user_id: number | null
    call_type: string | null
    status: string | null
    start_time: Date | null
    end_time: Date | null
    duration_seconds: number | null
    end_reason: string | null
    initiated_at: Date | null
  }

  export type CallCountAggregateOutputType = {
    id: number
    match_id: number
    call_segment_uuid: number
    previous_call_segment_uuid: number
    initiator_user_id: number
    receiver_user_id: number
    call_type: number
    status: number
    start_time: number
    end_time: number
    duration_seconds: number
    end_reason: number
    initiated_at: number
    _all: number
  }


  export type CallAvgAggregateInputType = {
    id?: true
    match_id?: true
    initiator_user_id?: true
    receiver_user_id?: true
    duration_seconds?: true
  }

  export type CallSumAggregateInputType = {
    id?: true
    match_id?: true
    initiator_user_id?: true
    receiver_user_id?: true
    duration_seconds?: true
  }

  export type CallMinAggregateInputType = {
    id?: true
    match_id?: true
    call_segment_uuid?: true
    previous_call_segment_uuid?: true
    initiator_user_id?: true
    receiver_user_id?: true
    call_type?: true
    status?: true
    start_time?: true
    end_time?: true
    duration_seconds?: true
    end_reason?: true
    initiated_at?: true
  }

  export type CallMaxAggregateInputType = {
    id?: true
    match_id?: true
    call_segment_uuid?: true
    previous_call_segment_uuid?: true
    initiator_user_id?: true
    receiver_user_id?: true
    call_type?: true
    status?: true
    start_time?: true
    end_time?: true
    duration_seconds?: true
    end_reason?: true
    initiated_at?: true
  }

  export type CallCountAggregateInputType = {
    id?: true
    match_id?: true
    call_segment_uuid?: true
    previous_call_segment_uuid?: true
    initiator_user_id?: true
    receiver_user_id?: true
    call_type?: true
    status?: true
    start_time?: true
    end_time?: true
    duration_seconds?: true
    end_reason?: true
    initiated_at?: true
    _all?: true
  }

  export type CallAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Call to aggregate.
     */
    where?: CallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calls to fetch.
     */
    orderBy?: CallOrderByWithRelationInput | CallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Calls
    **/
    _count?: true | CallCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CallAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CallSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CallMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CallMaxAggregateInputType
  }

  export type GetCallAggregateType<T extends CallAggregateArgs> = {
        [P in keyof T & keyof AggregateCall]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCall[P]>
      : GetScalarType<T[P], AggregateCall[P]>
  }




  export type CallGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallWhereInput
    orderBy?: CallOrderByWithAggregationInput | CallOrderByWithAggregationInput[]
    by: CallScalarFieldEnum[] | CallScalarFieldEnum
    having?: CallScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CallCountAggregateInputType | true
    _avg?: CallAvgAggregateInputType
    _sum?: CallSumAggregateInputType
    _min?: CallMinAggregateInputType
    _max?: CallMaxAggregateInputType
  }

  export type CallGroupByOutputType = {
    id: bigint
    match_id: number
    call_segment_uuid: string
    previous_call_segment_uuid: string | null
    initiator_user_id: number
    receiver_user_id: number
    call_type: string
    status: string
    start_time: Date | null
    end_time: Date | null
    duration_seconds: number | null
    end_reason: string | null
    initiated_at: Date
    _count: CallCountAggregateOutputType | null
    _avg: CallAvgAggregateOutputType | null
    _sum: CallSumAggregateOutputType | null
    _min: CallMinAggregateOutputType | null
    _max: CallMaxAggregateOutputType | null
  }

  type GetCallGroupByPayload<T extends CallGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CallGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CallGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CallGroupByOutputType[P]>
            : GetScalarType<T[P], CallGroupByOutputType[P]>
        }
      >
    >


  export type CallSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    match_id?: boolean
    call_segment_uuid?: boolean
    previous_call_segment_uuid?: boolean
    initiator_user_id?: boolean
    receiver_user_id?: boolean
    call_type?: boolean
    status?: boolean
    start_time?: boolean
    end_time?: boolean
    duration_seconds?: boolean
    end_reason?: boolean
    initiated_at?: boolean
    initiator_user?: boolean | UserDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
    receiver_user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["call"]>

  export type CallSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    match_id?: boolean
    call_segment_uuid?: boolean
    previous_call_segment_uuid?: boolean
    initiator_user_id?: boolean
    receiver_user_id?: boolean
    call_type?: boolean
    status?: boolean
    start_time?: boolean
    end_time?: boolean
    duration_seconds?: boolean
    end_reason?: boolean
    initiated_at?: boolean
    initiator_user?: boolean | UserDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
    receiver_user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["call"]>

  export type CallSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    match_id?: boolean
    call_segment_uuid?: boolean
    previous_call_segment_uuid?: boolean
    initiator_user_id?: boolean
    receiver_user_id?: boolean
    call_type?: boolean
    status?: boolean
    start_time?: boolean
    end_time?: boolean
    duration_seconds?: boolean
    end_reason?: boolean
    initiated_at?: boolean
    initiator_user?: boolean | UserDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
    receiver_user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["call"]>

  export type CallSelectScalar = {
    id?: boolean
    match_id?: boolean
    call_segment_uuid?: boolean
    previous_call_segment_uuid?: boolean
    initiator_user_id?: boolean
    receiver_user_id?: boolean
    call_type?: boolean
    status?: boolean
    start_time?: boolean
    end_time?: boolean
    duration_seconds?: boolean
    end_reason?: boolean
    initiated_at?: boolean
  }

  export type CallOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "match_id" | "call_segment_uuid" | "previous_call_segment_uuid" | "initiator_user_id" | "receiver_user_id" | "call_type" | "status" | "start_time" | "end_time" | "duration_seconds" | "end_reason" | "initiated_at", ExtArgs["result"]["call"]>
  export type CallInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    initiator_user?: boolean | UserDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
    receiver_user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CallIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    initiator_user?: boolean | UserDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
    receiver_user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CallIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    initiator_user?: boolean | UserDefaultArgs<ExtArgs>
    match?: boolean | MatchDefaultArgs<ExtArgs>
    receiver_user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CallPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Call"
    objects: {
      initiator_user: Prisma.$UserPayload<ExtArgs>
      match: Prisma.$MatchPayload<ExtArgs>
      receiver_user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      match_id: number
      call_segment_uuid: string
      previous_call_segment_uuid: string | null
      initiator_user_id: number
      receiver_user_id: number
      call_type: string
      status: string
      start_time: Date | null
      end_time: Date | null
      duration_seconds: number | null
      end_reason: string | null
      initiated_at: Date
    }, ExtArgs["result"]["call"]>
    composites: {}
  }

  type CallGetPayload<S extends boolean | null | undefined | CallDefaultArgs> = $Result.GetResult<Prisma.$CallPayload, S>

  type CallCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CallFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CallCountAggregateInputType | true
    }

  export interface CallDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Call'], meta: { name: 'Call' } }
    /**
     * Find zero or one Call that matches the filter.
     * @param {CallFindUniqueArgs} args - Arguments to find a Call
     * @example
     * // Get one Call
     * const call = await prisma.call.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CallFindUniqueArgs>(args: SelectSubset<T, CallFindUniqueArgs<ExtArgs>>): Prisma__CallClient<$Result.GetResult<Prisma.$CallPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Call that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CallFindUniqueOrThrowArgs} args - Arguments to find a Call
     * @example
     * // Get one Call
     * const call = await prisma.call.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CallFindUniqueOrThrowArgs>(args: SelectSubset<T, CallFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CallClient<$Result.GetResult<Prisma.$CallPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Call that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallFindFirstArgs} args - Arguments to find a Call
     * @example
     * // Get one Call
     * const call = await prisma.call.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CallFindFirstArgs>(args?: SelectSubset<T, CallFindFirstArgs<ExtArgs>>): Prisma__CallClient<$Result.GetResult<Prisma.$CallPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Call that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallFindFirstOrThrowArgs} args - Arguments to find a Call
     * @example
     * // Get one Call
     * const call = await prisma.call.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CallFindFirstOrThrowArgs>(args?: SelectSubset<T, CallFindFirstOrThrowArgs<ExtArgs>>): Prisma__CallClient<$Result.GetResult<Prisma.$CallPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Calls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Calls
     * const calls = await prisma.call.findMany()
     * 
     * // Get first 10 Calls
     * const calls = await prisma.call.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const callWithIdOnly = await prisma.call.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CallFindManyArgs>(args?: SelectSubset<T, CallFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Call.
     * @param {CallCreateArgs} args - Arguments to create a Call.
     * @example
     * // Create one Call
     * const Call = await prisma.call.create({
     *   data: {
     *     // ... data to create a Call
     *   }
     * })
     * 
     */
    create<T extends CallCreateArgs>(args: SelectSubset<T, CallCreateArgs<ExtArgs>>): Prisma__CallClient<$Result.GetResult<Prisma.$CallPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Calls.
     * @param {CallCreateManyArgs} args - Arguments to create many Calls.
     * @example
     * // Create many Calls
     * const call = await prisma.call.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CallCreateManyArgs>(args?: SelectSubset<T, CallCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Calls and returns the data saved in the database.
     * @param {CallCreateManyAndReturnArgs} args - Arguments to create many Calls.
     * @example
     * // Create many Calls
     * const call = await prisma.call.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Calls and only return the `id`
     * const callWithIdOnly = await prisma.call.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CallCreateManyAndReturnArgs>(args?: SelectSubset<T, CallCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Call.
     * @param {CallDeleteArgs} args - Arguments to delete one Call.
     * @example
     * // Delete one Call
     * const Call = await prisma.call.delete({
     *   where: {
     *     // ... filter to delete one Call
     *   }
     * })
     * 
     */
    delete<T extends CallDeleteArgs>(args: SelectSubset<T, CallDeleteArgs<ExtArgs>>): Prisma__CallClient<$Result.GetResult<Prisma.$CallPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Call.
     * @param {CallUpdateArgs} args - Arguments to update one Call.
     * @example
     * // Update one Call
     * const call = await prisma.call.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CallUpdateArgs>(args: SelectSubset<T, CallUpdateArgs<ExtArgs>>): Prisma__CallClient<$Result.GetResult<Prisma.$CallPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Calls.
     * @param {CallDeleteManyArgs} args - Arguments to filter Calls to delete.
     * @example
     * // Delete a few Calls
     * const { count } = await prisma.call.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CallDeleteManyArgs>(args?: SelectSubset<T, CallDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Calls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Calls
     * const call = await prisma.call.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CallUpdateManyArgs>(args: SelectSubset<T, CallUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Calls and returns the data updated in the database.
     * @param {CallUpdateManyAndReturnArgs} args - Arguments to update many Calls.
     * @example
     * // Update many Calls
     * const call = await prisma.call.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Calls and only return the `id`
     * const callWithIdOnly = await prisma.call.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CallUpdateManyAndReturnArgs>(args: SelectSubset<T, CallUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Call.
     * @param {CallUpsertArgs} args - Arguments to update or create a Call.
     * @example
     * // Update or create a Call
     * const call = await prisma.call.upsert({
     *   create: {
     *     // ... data to create a Call
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Call we want to update
     *   }
     * })
     */
    upsert<T extends CallUpsertArgs>(args: SelectSubset<T, CallUpsertArgs<ExtArgs>>): Prisma__CallClient<$Result.GetResult<Prisma.$CallPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Calls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallCountArgs} args - Arguments to filter Calls to count.
     * @example
     * // Count the number of Calls
     * const count = await prisma.call.count({
     *   where: {
     *     // ... the filter for the Calls we want to count
     *   }
     * })
    **/
    count<T extends CallCountArgs>(
      args?: Subset<T, CallCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CallCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Call.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CallAggregateArgs>(args: Subset<T, CallAggregateArgs>): Prisma.PrismaPromise<GetCallAggregateType<T>>

    /**
     * Group by Call.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CallGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CallGroupByArgs['orderBy'] }
        : { orderBy?: CallGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CallGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCallGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Call model
   */
  readonly fields: CallFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Call.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CallClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    initiator_user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    match<T extends MatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MatchDefaultArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiver_user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Call model
   */
  interface CallFieldRefs {
    readonly id: FieldRef<"Call", 'BigInt'>
    readonly match_id: FieldRef<"Call", 'Int'>
    readonly call_segment_uuid: FieldRef<"Call", 'String'>
    readonly previous_call_segment_uuid: FieldRef<"Call", 'String'>
    readonly initiator_user_id: FieldRef<"Call", 'Int'>
    readonly receiver_user_id: FieldRef<"Call", 'Int'>
    readonly call_type: FieldRef<"Call", 'String'>
    readonly status: FieldRef<"Call", 'String'>
    readonly start_time: FieldRef<"Call", 'DateTime'>
    readonly end_time: FieldRef<"Call", 'DateTime'>
    readonly duration_seconds: FieldRef<"Call", 'Int'>
    readonly end_reason: FieldRef<"Call", 'String'>
    readonly initiated_at: FieldRef<"Call", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Call findUnique
   */
  export type CallFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null
    /**
     * Filter, which Call to fetch.
     */
    where: CallWhereUniqueInput
  }

  /**
   * Call findUniqueOrThrow
   */
  export type CallFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null
    /**
     * Filter, which Call to fetch.
     */
    where: CallWhereUniqueInput
  }

  /**
   * Call findFirst
   */
  export type CallFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null
    /**
     * Filter, which Call to fetch.
     */
    where?: CallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calls to fetch.
     */
    orderBy?: CallOrderByWithRelationInput | CallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Calls.
     */
    cursor?: CallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Calls.
     */
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[]
  }

  /**
   * Call findFirstOrThrow
   */
  export type CallFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null
    /**
     * Filter, which Call to fetch.
     */
    where?: CallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calls to fetch.
     */
    orderBy?: CallOrderByWithRelationInput | CallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Calls.
     */
    cursor?: CallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Calls.
     */
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[]
  }

  /**
   * Call findMany
   */
  export type CallFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null
    /**
     * Filter, which Calls to fetch.
     */
    where?: CallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calls to fetch.
     */
    orderBy?: CallOrderByWithRelationInput | CallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Calls.
     */
    cursor?: CallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calls.
     */
    skip?: number
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[]
  }

  /**
   * Call create
   */
  export type CallCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null
    /**
     * The data needed to create a Call.
     */
    data: XOR<CallCreateInput, CallUncheckedCreateInput>
  }

  /**
   * Call createMany
   */
  export type CallCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Calls.
     */
    data: CallCreateManyInput | CallCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Call createManyAndReturn
   */
  export type CallCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * The data used to create many Calls.
     */
    data: CallCreateManyInput | CallCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Call update
   */
  export type CallUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null
    /**
     * The data needed to update a Call.
     */
    data: XOR<CallUpdateInput, CallUncheckedUpdateInput>
    /**
     * Choose, which Call to update.
     */
    where: CallWhereUniqueInput
  }

  /**
   * Call updateMany
   */
  export type CallUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Calls.
     */
    data: XOR<CallUpdateManyMutationInput, CallUncheckedUpdateManyInput>
    /**
     * Filter which Calls to update
     */
    where?: CallWhereInput
    /**
     * Limit how many Calls to update.
     */
    limit?: number
  }

  /**
   * Call updateManyAndReturn
   */
  export type CallUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * The data used to update Calls.
     */
    data: XOR<CallUpdateManyMutationInput, CallUncheckedUpdateManyInput>
    /**
     * Filter which Calls to update
     */
    where?: CallWhereInput
    /**
     * Limit how many Calls to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Call upsert
   */
  export type CallUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null
    /**
     * The filter to search for the Call to update in case it exists.
     */
    where: CallWhereUniqueInput
    /**
     * In case the Call found by the `where` argument doesn't exist, create a new Call with this data.
     */
    create: XOR<CallCreateInput, CallUncheckedCreateInput>
    /**
     * In case the Call was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CallUpdateInput, CallUncheckedUpdateInput>
  }

  /**
   * Call delete
   */
  export type CallDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null
    /**
     * Filter which Call to delete.
     */
    where: CallWhereUniqueInput
  }

  /**
   * Call deleteMany
   */
  export type CallDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Calls to delete
     */
    where?: CallWhereInput
    /**
     * Limit how many Calls to delete.
     */
    limit?: number
  }

  /**
   * Call without action
   */
  export type CallDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportAvgAggregateOutputType = {
    id: number | null
    reporter_id: number | null
    reported_user_id: number | null
  }

  export type ReportSumAggregateOutputType = {
    id: number | null
    reporter_id: number | null
    reported_user_id: number | null
  }

  export type ReportMinAggregateOutputType = {
    id: number | null
    reporter_id: number | null
    reason: string | null
    created_at: Date | null
    reported_user_id: number | null
    status: string | null
  }

  export type ReportMaxAggregateOutputType = {
    id: number | null
    reporter_id: number | null
    reason: string | null
    created_at: Date | null
    reported_user_id: number | null
    status: string | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    reporter_id: number
    reason: number
    created_at: number
    reported_user_id: number
    status: number
    _all: number
  }


  export type ReportAvgAggregateInputType = {
    id?: true
    reporter_id?: true
    reported_user_id?: true
  }

  export type ReportSumAggregateInputType = {
    id?: true
    reporter_id?: true
    reported_user_id?: true
  }

  export type ReportMinAggregateInputType = {
    id?: true
    reporter_id?: true
    reason?: true
    created_at?: true
    reported_user_id?: true
    status?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    reporter_id?: true
    reason?: true
    created_at?: true
    reported_user_id?: true
    status?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    reporter_id?: true
    reason?: true
    created_at?: true
    reported_user_id?: true
    status?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _avg?: ReportAvgAggregateInputType
    _sum?: ReportSumAggregateInputType
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: number
    reporter_id: number | null
    reason: string
    created_at: Date
    reported_user_id: number | null
    status: string
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reporter_id?: boolean
    reason?: boolean
    created_at?: boolean
    reported_user_id?: boolean
    status?: boolean
    reporter?: boolean | Report$reporterArgs<ExtArgs>
    reported?: boolean | Report$reportedArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reporter_id?: boolean
    reason?: boolean
    created_at?: boolean
    reported_user_id?: boolean
    status?: boolean
    reporter?: boolean | Report$reporterArgs<ExtArgs>
    reported?: boolean | Report$reportedArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reporter_id?: boolean
    reason?: boolean
    created_at?: boolean
    reported_user_id?: boolean
    status?: boolean
    reporter?: boolean | Report$reporterArgs<ExtArgs>
    reported?: boolean | Report$reportedArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    reporter_id?: boolean
    reason?: boolean
    created_at?: boolean
    reported_user_id?: boolean
    status?: boolean
  }

  export type ReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reporter_id" | "reason" | "created_at" | "reported_user_id" | "status", ExtArgs["result"]["report"]>
  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reporter?: boolean | Report$reporterArgs<ExtArgs>
    reported?: boolean | Report$reportedArgs<ExtArgs>
  }
  export type ReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reporter?: boolean | Report$reporterArgs<ExtArgs>
    reported?: boolean | Report$reportedArgs<ExtArgs>
  }
  export type ReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reporter?: boolean | Report$reporterArgs<ExtArgs>
    reported?: boolean | Report$reportedArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      reporter: Prisma.$UserPayload<ExtArgs> | null
      reported: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      reporter_id: number | null
      reason: string
      created_at: Date
      reported_user_id: number | null
      status: string
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports and returns the data updated in the database.
     * @param {ReportUpdateManyAndReturnArgs} args - Arguments to update many Reports.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reporter<T extends Report$reporterArgs<ExtArgs> = {}>(args?: Subset<T, Report$reporterArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    reported<T extends Report$reportedArgs<ExtArgs> = {}>(args?: Subset<T, Report$reportedArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'Int'>
    readonly reporter_id: FieldRef<"Report", 'Int'>
    readonly reason: FieldRef<"Report", 'String'>
    readonly created_at: FieldRef<"Report", 'DateTime'>
    readonly reported_user_id: FieldRef<"Report", 'Int'>
    readonly status: FieldRef<"Report", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Report createManyAndReturn
   */
  export type ReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report updateManyAndReturn
   */
  export type ReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to delete.
     */
    limit?: number
  }

  /**
   * Report.reporter
   */
  export type Report$reporterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Report.reported
   */
  export type Report$reportedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Model Block
   */

  export type AggregateBlock = {
    _count: BlockCountAggregateOutputType | null
    _avg: BlockAvgAggregateOutputType | null
    _sum: BlockSumAggregateOutputType | null
    _min: BlockMinAggregateOutputType | null
    _max: BlockMaxAggregateOutputType | null
  }

  export type BlockAvgAggregateOutputType = {
    id: number | null
    blocker_id: number | null
    blocked_id: number | null
  }

  export type BlockSumAggregateOutputType = {
    id: number | null
    blocker_id: number | null
    blocked_id: number | null
  }

  export type BlockMinAggregateOutputType = {
    id: number | null
    blocker_id: number | null
    blocked_id: number | null
    created_at: Date | null
  }

  export type BlockMaxAggregateOutputType = {
    id: number | null
    blocker_id: number | null
    blocked_id: number | null
    created_at: Date | null
  }

  export type BlockCountAggregateOutputType = {
    id: number
    blocker_id: number
    blocked_id: number
    created_at: number
    _all: number
  }


  export type BlockAvgAggregateInputType = {
    id?: true
    blocker_id?: true
    blocked_id?: true
  }

  export type BlockSumAggregateInputType = {
    id?: true
    blocker_id?: true
    blocked_id?: true
  }

  export type BlockMinAggregateInputType = {
    id?: true
    blocker_id?: true
    blocked_id?: true
    created_at?: true
  }

  export type BlockMaxAggregateInputType = {
    id?: true
    blocker_id?: true
    blocked_id?: true
    created_at?: true
  }

  export type BlockCountAggregateInputType = {
    id?: true
    blocker_id?: true
    blocked_id?: true
    created_at?: true
    _all?: true
  }

  export type BlockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Block to aggregate.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Blocks
    **/
    _count?: true | BlockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlockMaxAggregateInputType
  }

  export type GetBlockAggregateType<T extends BlockAggregateArgs> = {
        [P in keyof T & keyof AggregateBlock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlock[P]>
      : GetScalarType<T[P], AggregateBlock[P]>
  }




  export type BlockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockWhereInput
    orderBy?: BlockOrderByWithAggregationInput | BlockOrderByWithAggregationInput[]
    by: BlockScalarFieldEnum[] | BlockScalarFieldEnum
    having?: BlockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlockCountAggregateInputType | true
    _avg?: BlockAvgAggregateInputType
    _sum?: BlockSumAggregateInputType
    _min?: BlockMinAggregateInputType
    _max?: BlockMaxAggregateInputType
  }

  export type BlockGroupByOutputType = {
    id: number
    blocker_id: number
    blocked_id: number
    created_at: Date
    _count: BlockCountAggregateOutputType | null
    _avg: BlockAvgAggregateOutputType | null
    _sum: BlockSumAggregateOutputType | null
    _min: BlockMinAggregateOutputType | null
    _max: BlockMaxAggregateOutputType | null
  }

  type GetBlockGroupByPayload<T extends BlockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlockGroupByOutputType[P]>
            : GetScalarType<T[P], BlockGroupByOutputType[P]>
        }
      >
    >


  export type BlockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    blocker_id?: boolean
    blocked_id?: boolean
    created_at?: boolean
    blocked?: boolean | UserDefaultArgs<ExtArgs>
    blocker?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["block"]>

  export type BlockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    blocker_id?: boolean
    blocked_id?: boolean
    created_at?: boolean
    blocked?: boolean | UserDefaultArgs<ExtArgs>
    blocker?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["block"]>

  export type BlockSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    blocker_id?: boolean
    blocked_id?: boolean
    created_at?: boolean
    blocked?: boolean | UserDefaultArgs<ExtArgs>
    blocker?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["block"]>

  export type BlockSelectScalar = {
    id?: boolean
    blocker_id?: boolean
    blocked_id?: boolean
    created_at?: boolean
  }

  export type BlockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "blocker_id" | "blocked_id" | "created_at", ExtArgs["result"]["block"]>
  export type BlockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blocked?: boolean | UserDefaultArgs<ExtArgs>
    blocker?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BlockIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blocked?: boolean | UserDefaultArgs<ExtArgs>
    blocker?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BlockIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blocked?: boolean | UserDefaultArgs<ExtArgs>
    blocker?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BlockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Block"
    objects: {
      blocked: Prisma.$UserPayload<ExtArgs>
      blocker: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      blocker_id: number
      blocked_id: number
      created_at: Date
    }, ExtArgs["result"]["block"]>
    composites: {}
  }

  type BlockGetPayload<S extends boolean | null | undefined | BlockDefaultArgs> = $Result.GetResult<Prisma.$BlockPayload, S>

  type BlockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlockCountAggregateInputType | true
    }

  export interface BlockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Block'], meta: { name: 'Block' } }
    /**
     * Find zero or one Block that matches the filter.
     * @param {BlockFindUniqueArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlockFindUniqueArgs>(args: SelectSubset<T, BlockFindUniqueArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Block that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlockFindUniqueOrThrowArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlockFindUniqueOrThrowArgs>(args: SelectSubset<T, BlockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Block that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockFindFirstArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlockFindFirstArgs>(args?: SelectSubset<T, BlockFindFirstArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Block that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockFindFirstOrThrowArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlockFindFirstOrThrowArgs>(args?: SelectSubset<T, BlockFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Blocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Blocks
     * const blocks = await prisma.block.findMany()
     * 
     * // Get first 10 Blocks
     * const blocks = await prisma.block.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blockWithIdOnly = await prisma.block.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlockFindManyArgs>(args?: SelectSubset<T, BlockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Block.
     * @param {BlockCreateArgs} args - Arguments to create a Block.
     * @example
     * // Create one Block
     * const Block = await prisma.block.create({
     *   data: {
     *     // ... data to create a Block
     *   }
     * })
     * 
     */
    create<T extends BlockCreateArgs>(args: SelectSubset<T, BlockCreateArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Blocks.
     * @param {BlockCreateManyArgs} args - Arguments to create many Blocks.
     * @example
     * // Create many Blocks
     * const block = await prisma.block.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlockCreateManyArgs>(args?: SelectSubset<T, BlockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Blocks and returns the data saved in the database.
     * @param {BlockCreateManyAndReturnArgs} args - Arguments to create many Blocks.
     * @example
     * // Create many Blocks
     * const block = await prisma.block.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Blocks and only return the `id`
     * const blockWithIdOnly = await prisma.block.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlockCreateManyAndReturnArgs>(args?: SelectSubset<T, BlockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Block.
     * @param {BlockDeleteArgs} args - Arguments to delete one Block.
     * @example
     * // Delete one Block
     * const Block = await prisma.block.delete({
     *   where: {
     *     // ... filter to delete one Block
     *   }
     * })
     * 
     */
    delete<T extends BlockDeleteArgs>(args: SelectSubset<T, BlockDeleteArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Block.
     * @param {BlockUpdateArgs} args - Arguments to update one Block.
     * @example
     * // Update one Block
     * const block = await prisma.block.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlockUpdateArgs>(args: SelectSubset<T, BlockUpdateArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Blocks.
     * @param {BlockDeleteManyArgs} args - Arguments to filter Blocks to delete.
     * @example
     * // Delete a few Blocks
     * const { count } = await prisma.block.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlockDeleteManyArgs>(args?: SelectSubset<T, BlockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Blocks
     * const block = await prisma.block.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlockUpdateManyArgs>(args: SelectSubset<T, BlockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blocks and returns the data updated in the database.
     * @param {BlockUpdateManyAndReturnArgs} args - Arguments to update many Blocks.
     * @example
     * // Update many Blocks
     * const block = await prisma.block.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Blocks and only return the `id`
     * const blockWithIdOnly = await prisma.block.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BlockUpdateManyAndReturnArgs>(args: SelectSubset<T, BlockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Block.
     * @param {BlockUpsertArgs} args - Arguments to update or create a Block.
     * @example
     * // Update or create a Block
     * const block = await prisma.block.upsert({
     *   create: {
     *     // ... data to create a Block
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Block we want to update
     *   }
     * })
     */
    upsert<T extends BlockUpsertArgs>(args: SelectSubset<T, BlockUpsertArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Blocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockCountArgs} args - Arguments to filter Blocks to count.
     * @example
     * // Count the number of Blocks
     * const count = await prisma.block.count({
     *   where: {
     *     // ... the filter for the Blocks we want to count
     *   }
     * })
    **/
    count<T extends BlockCountArgs>(
      args?: Subset<T, BlockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Block.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlockAggregateArgs>(args: Subset<T, BlockAggregateArgs>): Prisma.PrismaPromise<GetBlockAggregateType<T>>

    /**
     * Group by Block.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlockGroupByArgs['orderBy'] }
        : { orderBy?: BlockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Block model
   */
  readonly fields: BlockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Block.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    blocked<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    blocker<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Block model
   */
  interface BlockFieldRefs {
    readonly id: FieldRef<"Block", 'Int'>
    readonly blocker_id: FieldRef<"Block", 'Int'>
    readonly blocked_id: FieldRef<"Block", 'Int'>
    readonly created_at: FieldRef<"Block", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Block findUnique
   */
  export type BlockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block findUniqueOrThrow
   */
  export type BlockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block findFirst
   */
  export type BlockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blocks.
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blocks.
     */
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Block findFirstOrThrow
   */
  export type BlockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blocks.
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blocks.
     */
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Block findMany
   */
  export type BlockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Blocks to fetch.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Blocks.
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Block create
   */
  export type BlockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * The data needed to create a Block.
     */
    data: XOR<BlockCreateInput, BlockUncheckedCreateInput>
  }

  /**
   * Block createMany
   */
  export type BlockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Blocks.
     */
    data: BlockCreateManyInput | BlockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Block createManyAndReturn
   */
  export type BlockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * The data used to create many Blocks.
     */
    data: BlockCreateManyInput | BlockCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Block update
   */
  export type BlockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * The data needed to update a Block.
     */
    data: XOR<BlockUpdateInput, BlockUncheckedUpdateInput>
    /**
     * Choose, which Block to update.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block updateMany
   */
  export type BlockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Blocks.
     */
    data: XOR<BlockUpdateManyMutationInput, BlockUncheckedUpdateManyInput>
    /**
     * Filter which Blocks to update
     */
    where?: BlockWhereInput
    /**
     * Limit how many Blocks to update.
     */
    limit?: number
  }

  /**
   * Block updateManyAndReturn
   */
  export type BlockUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * The data used to update Blocks.
     */
    data: XOR<BlockUpdateManyMutationInput, BlockUncheckedUpdateManyInput>
    /**
     * Filter which Blocks to update
     */
    where?: BlockWhereInput
    /**
     * Limit how many Blocks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Block upsert
   */
  export type BlockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * The filter to search for the Block to update in case it exists.
     */
    where: BlockWhereUniqueInput
    /**
     * In case the Block found by the `where` argument doesn't exist, create a new Block with this data.
     */
    create: XOR<BlockCreateInput, BlockUncheckedCreateInput>
    /**
     * In case the Block was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlockUpdateInput, BlockUncheckedUpdateInput>
  }

  /**
   * Block delete
   */
  export type BlockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter which Block to delete.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block deleteMany
   */
  export type BlockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blocks to delete
     */
    where?: BlockWhereInput
    /**
     * Limit how many Blocks to delete.
     */
    limit?: number
  }

  /**
   * Block without action
   */
  export type BlockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Block
     */
    omit?: BlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password_hash: 'password_hash',
    display_name: 'display_name',
    birth_date: 'birth_date',
    gender: 'gender',
    looking_for_gender: 'looking_for_gender',
    relationship_type: 'relationship_type',
    city: 'city',
    bio: 'bio',
    profile_image_url: 'profile_image_url',
    additional_photos: 'additional_photos',
    preferred_age_min: 'preferred_age_min',
    preferred_age_max: 'preferred_age_max',
    preferred_distance_km: 'preferred_distance_km',
    is_active: 'is_active',
    is_paid: 'is_paid',
    paid_until: 'paid_until',
    verified_email: 'verified_email',
    consents: 'consents',
    created_at: 'created_at',
    updated_at: 'updated_at',
    last_active_at: 'last_active_at',
    last_seen_at: 'last_seen_at',
    status_message: 'status_message',
    latitude: 'latitude',
    longitude: 'longitude',
    is_admin: 'is_admin'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const LikeScalarFieldEnum: {
    id: 'id',
    from_user_id: 'from_user_id',
    to_user_id: 'to_user_id',
    is_like: 'is_like',
    timestamp: 'timestamp'
  };

  export type LikeScalarFieldEnum = (typeof LikeScalarFieldEnum)[keyof typeof LikeScalarFieldEnum]


  export const MatchScalarFieldEnum: {
    id: 'id',
    user1_id: 'user1_id',
    user2_id: 'user2_id',
    matched_at: 'matched_at',
    is_active: 'is_active',
    closed_at: 'closed_at',
    close_reason: 'close_reason',
    default_voice_call_duration_sec: 'default_voice_call_duration_sec',
    default_video_call_duration_sec: 'default_video_call_duration_sec',
    last_interaction_at: 'last_interaction_at',
    match_inactivity_timeout_interval: 'match_inactivity_timeout_interval'
  };

  export type MatchScalarFieldEnum = (typeof MatchScalarFieldEnum)[keyof typeof MatchScalarFieldEnum]


  export const CallScalarFieldEnum: {
    id: 'id',
    match_id: 'match_id',
    call_segment_uuid: 'call_segment_uuid',
    previous_call_segment_uuid: 'previous_call_segment_uuid',
    initiator_user_id: 'initiator_user_id',
    receiver_user_id: 'receiver_user_id',
    call_type: 'call_type',
    status: 'status',
    start_time: 'start_time',
    end_time: 'end_time',
    duration_seconds: 'duration_seconds',
    end_reason: 'end_reason',
    initiated_at: 'initiated_at'
  };

  export type CallScalarFieldEnum = (typeof CallScalarFieldEnum)[keyof typeof CallScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    reporter_id: 'reporter_id',
    reason: 'reason',
    created_at: 'created_at',
    reported_user_id: 'reported_user_id',
    status: 'status'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const BlockScalarFieldEnum: {
    id: 'id',
    blocker_id: 'blocker_id',
    blocked_id: 'blocked_id',
    created_at: 'created_at'
  };

  export type BlockScalarFieldEnum = (typeof BlockScalarFieldEnum)[keyof typeof BlockScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    display_name?: StringFilter<"User"> | string
    birth_date?: DateTimeFilter<"User"> | Date | string
    gender?: StringNullableFilter<"User"> | string | null
    looking_for_gender?: StringNullableListFilter<"User">
    relationship_type?: StringNullableListFilter<"User">
    city?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    profile_image_url?: StringNullableFilter<"User"> | string | null
    additional_photos?: JsonNullableFilter<"User">
    preferred_age_min?: IntFilter<"User"> | number
    preferred_age_max?: IntFilter<"User"> | number
    preferred_distance_km?: IntFilter<"User"> | number
    is_active?: BoolFilter<"User"> | boolean
    is_paid?: BoolFilter<"User"> | boolean
    paid_until?: DateTimeNullableFilter<"User"> | Date | string | null
    verified_email?: BoolFilter<"User"> | boolean
    consents?: JsonFilter<"User">
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    last_active_at?: DateTimeFilter<"User"> | Date | string
    last_seen_at?: DateTimeNullableFilter<"User"> | Date | string | null
    status_message?: StringNullableFilter<"User"> | string | null
    latitude?: FloatNullableFilter<"User"> | number | null
    longitude?: FloatNullableFilter<"User"> | number | null
    is_admin?: BoolFilter<"User"> | boolean
    blocks_received?: BlockListRelationFilter
    blocks_made?: BlockListRelationFilter
    calls_initiated?: CallListRelationFilter
    calls_received?: CallListRelationFilter
    likes_from?: LikeListRelationFilter
    likes_to?: LikeListRelationFilter
    matches_as_user1?: MatchListRelationFilter
    matches_as_user2?: MatchListRelationFilter
    reports_received?: ReportListRelationFilter
    reports_made?: ReportListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    display_name?: SortOrder
    birth_date?: SortOrder
    gender?: SortOrderInput | SortOrder
    looking_for_gender?: SortOrder
    relationship_type?: SortOrder
    city?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    profile_image_url?: SortOrderInput | SortOrder
    additional_photos?: SortOrderInput | SortOrder
    preferred_age_min?: SortOrder
    preferred_age_max?: SortOrder
    preferred_distance_km?: SortOrder
    is_active?: SortOrder
    is_paid?: SortOrder
    paid_until?: SortOrderInput | SortOrder
    verified_email?: SortOrder
    consents?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_active_at?: SortOrder
    last_seen_at?: SortOrderInput | SortOrder
    status_message?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    is_admin?: SortOrder
    blocks_received?: BlockOrderByRelationAggregateInput
    blocks_made?: BlockOrderByRelationAggregateInput
    calls_initiated?: CallOrderByRelationAggregateInput
    calls_received?: CallOrderByRelationAggregateInput
    likes_from?: LikeOrderByRelationAggregateInput
    likes_to?: LikeOrderByRelationAggregateInput
    matches_as_user1?: MatchOrderByRelationAggregateInput
    matches_as_user2?: MatchOrderByRelationAggregateInput
    reports_received?: ReportOrderByRelationAggregateInput
    reports_made?: ReportOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password_hash?: StringFilter<"User"> | string
    display_name?: StringFilter<"User"> | string
    birth_date?: DateTimeFilter<"User"> | Date | string
    gender?: StringNullableFilter<"User"> | string | null
    looking_for_gender?: StringNullableListFilter<"User">
    relationship_type?: StringNullableListFilter<"User">
    city?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    profile_image_url?: StringNullableFilter<"User"> | string | null
    additional_photos?: JsonNullableFilter<"User">
    preferred_age_min?: IntFilter<"User"> | number
    preferred_age_max?: IntFilter<"User"> | number
    preferred_distance_km?: IntFilter<"User"> | number
    is_active?: BoolFilter<"User"> | boolean
    is_paid?: BoolFilter<"User"> | boolean
    paid_until?: DateTimeNullableFilter<"User"> | Date | string | null
    verified_email?: BoolFilter<"User"> | boolean
    consents?: JsonFilter<"User">
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    last_active_at?: DateTimeFilter<"User"> | Date | string
    last_seen_at?: DateTimeNullableFilter<"User"> | Date | string | null
    status_message?: StringNullableFilter<"User"> | string | null
    latitude?: FloatNullableFilter<"User"> | number | null
    longitude?: FloatNullableFilter<"User"> | number | null
    is_admin?: BoolFilter<"User"> | boolean
    blocks_received?: BlockListRelationFilter
    blocks_made?: BlockListRelationFilter
    calls_initiated?: CallListRelationFilter
    calls_received?: CallListRelationFilter
    likes_from?: LikeListRelationFilter
    likes_to?: LikeListRelationFilter
    matches_as_user1?: MatchListRelationFilter
    matches_as_user2?: MatchListRelationFilter
    reports_received?: ReportListRelationFilter
    reports_made?: ReportListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    display_name?: SortOrder
    birth_date?: SortOrder
    gender?: SortOrderInput | SortOrder
    looking_for_gender?: SortOrder
    relationship_type?: SortOrder
    city?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    profile_image_url?: SortOrderInput | SortOrder
    additional_photos?: SortOrderInput | SortOrder
    preferred_age_min?: SortOrder
    preferred_age_max?: SortOrder
    preferred_distance_km?: SortOrder
    is_active?: SortOrder
    is_paid?: SortOrder
    paid_until?: SortOrderInput | SortOrder
    verified_email?: SortOrder
    consents?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_active_at?: SortOrder
    last_seen_at?: SortOrderInput | SortOrder
    status_message?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    is_admin?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    display_name?: StringWithAggregatesFilter<"User"> | string
    birth_date?: DateTimeWithAggregatesFilter<"User"> | Date | string
    gender?: StringNullableWithAggregatesFilter<"User"> | string | null
    looking_for_gender?: StringNullableListFilter<"User">
    relationship_type?: StringNullableListFilter<"User">
    city?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    profile_image_url?: StringNullableWithAggregatesFilter<"User"> | string | null
    additional_photos?: JsonNullableWithAggregatesFilter<"User">
    preferred_age_min?: IntWithAggregatesFilter<"User"> | number
    preferred_age_max?: IntWithAggregatesFilter<"User"> | number
    preferred_distance_km?: IntWithAggregatesFilter<"User"> | number
    is_active?: BoolWithAggregatesFilter<"User"> | boolean
    is_paid?: BoolWithAggregatesFilter<"User"> | boolean
    paid_until?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    verified_email?: BoolWithAggregatesFilter<"User"> | boolean
    consents?: JsonWithAggregatesFilter<"User">
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    last_active_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    last_seen_at?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    status_message?: StringNullableWithAggregatesFilter<"User"> | string | null
    latitude?: FloatNullableWithAggregatesFilter<"User"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"User"> | number | null
    is_admin?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type LikeWhereInput = {
    AND?: LikeWhereInput | LikeWhereInput[]
    OR?: LikeWhereInput[]
    NOT?: LikeWhereInput | LikeWhereInput[]
    id?: IntFilter<"Like"> | number
    from_user_id?: IntFilter<"Like"> | number
    to_user_id?: IntFilter<"Like"> | number
    is_like?: BoolFilter<"Like"> | boolean
    timestamp?: DateTimeFilter<"Like"> | Date | string
    from_user?: XOR<UserScalarRelationFilter, UserWhereInput>
    to_user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LikeOrderByWithRelationInput = {
    id?: SortOrder
    from_user_id?: SortOrder
    to_user_id?: SortOrder
    is_like?: SortOrder
    timestamp?: SortOrder
    from_user?: UserOrderByWithRelationInput
    to_user?: UserOrderByWithRelationInput
  }

  export type LikeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    from_user_id_to_user_id?: LikeFrom_user_idTo_user_idCompoundUniqueInput
    AND?: LikeWhereInput | LikeWhereInput[]
    OR?: LikeWhereInput[]
    NOT?: LikeWhereInput | LikeWhereInput[]
    from_user_id?: IntFilter<"Like"> | number
    to_user_id?: IntFilter<"Like"> | number
    is_like?: BoolFilter<"Like"> | boolean
    timestamp?: DateTimeFilter<"Like"> | Date | string
    from_user?: XOR<UserScalarRelationFilter, UserWhereInput>
    to_user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "from_user_id_to_user_id">

  export type LikeOrderByWithAggregationInput = {
    id?: SortOrder
    from_user_id?: SortOrder
    to_user_id?: SortOrder
    is_like?: SortOrder
    timestamp?: SortOrder
    _count?: LikeCountOrderByAggregateInput
    _avg?: LikeAvgOrderByAggregateInput
    _max?: LikeMaxOrderByAggregateInput
    _min?: LikeMinOrderByAggregateInput
    _sum?: LikeSumOrderByAggregateInput
  }

  export type LikeScalarWhereWithAggregatesInput = {
    AND?: LikeScalarWhereWithAggregatesInput | LikeScalarWhereWithAggregatesInput[]
    OR?: LikeScalarWhereWithAggregatesInput[]
    NOT?: LikeScalarWhereWithAggregatesInput | LikeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Like"> | number
    from_user_id?: IntWithAggregatesFilter<"Like"> | number
    to_user_id?: IntWithAggregatesFilter<"Like"> | number
    is_like?: BoolWithAggregatesFilter<"Like"> | boolean
    timestamp?: DateTimeWithAggregatesFilter<"Like"> | Date | string
  }

  export type MatchWhereInput = {
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    id?: IntFilter<"Match"> | number
    user1_id?: IntFilter<"Match"> | number
    user2_id?: IntFilter<"Match"> | number
    matched_at?: DateTimeFilter<"Match"> | Date | string
    is_active?: BoolFilter<"Match"> | boolean
    closed_at?: DateTimeNullableFilter<"Match"> | Date | string | null
    close_reason?: StringNullableFilter<"Match"> | string | null
    default_voice_call_duration_sec?: IntFilter<"Match"> | number
    default_video_call_duration_sec?: IntFilter<"Match"> | number
    last_interaction_at?: DateTimeFilter<"Match"> | Date | string
    match_inactivity_timeout_interval?: StringFilter<"Match"> | string
    calls?: CallListRelationFilter
    user1?: XOR<UserScalarRelationFilter, UserWhereInput>
    user2?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MatchOrderByWithRelationInput = {
    id?: SortOrder
    user1_id?: SortOrder
    user2_id?: SortOrder
    matched_at?: SortOrder
    is_active?: SortOrder
    closed_at?: SortOrderInput | SortOrder
    close_reason?: SortOrderInput | SortOrder
    default_voice_call_duration_sec?: SortOrder
    default_video_call_duration_sec?: SortOrder
    last_interaction_at?: SortOrder
    match_inactivity_timeout_interval?: SortOrder
    calls?: CallOrderByRelationAggregateInput
    user1?: UserOrderByWithRelationInput
    user2?: UserOrderByWithRelationInput
  }

  export type MatchWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    user1_id?: IntFilter<"Match"> | number
    user2_id?: IntFilter<"Match"> | number
    matched_at?: DateTimeFilter<"Match"> | Date | string
    is_active?: BoolFilter<"Match"> | boolean
    closed_at?: DateTimeNullableFilter<"Match"> | Date | string | null
    close_reason?: StringNullableFilter<"Match"> | string | null
    default_voice_call_duration_sec?: IntFilter<"Match"> | number
    default_video_call_duration_sec?: IntFilter<"Match"> | number
    last_interaction_at?: DateTimeFilter<"Match"> | Date | string
    match_inactivity_timeout_interval?: StringFilter<"Match"> | string
    calls?: CallListRelationFilter
    user1?: XOR<UserScalarRelationFilter, UserWhereInput>
    user2?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MatchOrderByWithAggregationInput = {
    id?: SortOrder
    user1_id?: SortOrder
    user2_id?: SortOrder
    matched_at?: SortOrder
    is_active?: SortOrder
    closed_at?: SortOrderInput | SortOrder
    close_reason?: SortOrderInput | SortOrder
    default_voice_call_duration_sec?: SortOrder
    default_video_call_duration_sec?: SortOrder
    last_interaction_at?: SortOrder
    match_inactivity_timeout_interval?: SortOrder
    _count?: MatchCountOrderByAggregateInput
    _avg?: MatchAvgOrderByAggregateInput
    _max?: MatchMaxOrderByAggregateInput
    _min?: MatchMinOrderByAggregateInput
    _sum?: MatchSumOrderByAggregateInput
  }

  export type MatchScalarWhereWithAggregatesInput = {
    AND?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    OR?: MatchScalarWhereWithAggregatesInput[]
    NOT?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Match"> | number
    user1_id?: IntWithAggregatesFilter<"Match"> | number
    user2_id?: IntWithAggregatesFilter<"Match"> | number
    matched_at?: DateTimeWithAggregatesFilter<"Match"> | Date | string
    is_active?: BoolWithAggregatesFilter<"Match"> | boolean
    closed_at?: DateTimeNullableWithAggregatesFilter<"Match"> | Date | string | null
    close_reason?: StringNullableWithAggregatesFilter<"Match"> | string | null
    default_voice_call_duration_sec?: IntWithAggregatesFilter<"Match"> | number
    default_video_call_duration_sec?: IntWithAggregatesFilter<"Match"> | number
    last_interaction_at?: DateTimeWithAggregatesFilter<"Match"> | Date | string
    match_inactivity_timeout_interval?: StringWithAggregatesFilter<"Match"> | string
  }

  export type CallWhereInput = {
    AND?: CallWhereInput | CallWhereInput[]
    OR?: CallWhereInput[]
    NOT?: CallWhereInput | CallWhereInput[]
    id?: BigIntFilter<"Call"> | bigint | number
    match_id?: IntFilter<"Call"> | number
    call_segment_uuid?: UuidFilter<"Call"> | string
    previous_call_segment_uuid?: UuidNullableFilter<"Call"> | string | null
    initiator_user_id?: IntFilter<"Call"> | number
    receiver_user_id?: IntFilter<"Call"> | number
    call_type?: StringFilter<"Call"> | string
    status?: StringFilter<"Call"> | string
    start_time?: DateTimeNullableFilter<"Call"> | Date | string | null
    end_time?: DateTimeNullableFilter<"Call"> | Date | string | null
    duration_seconds?: IntNullableFilter<"Call"> | number | null
    end_reason?: StringNullableFilter<"Call"> | string | null
    initiated_at?: DateTimeFilter<"Call"> | Date | string
    initiator_user?: XOR<UserScalarRelationFilter, UserWhereInput>
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
    receiver_user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CallOrderByWithRelationInput = {
    id?: SortOrder
    match_id?: SortOrder
    call_segment_uuid?: SortOrder
    previous_call_segment_uuid?: SortOrderInput | SortOrder
    initiator_user_id?: SortOrder
    receiver_user_id?: SortOrder
    call_type?: SortOrder
    status?: SortOrder
    start_time?: SortOrderInput | SortOrder
    end_time?: SortOrderInput | SortOrder
    duration_seconds?: SortOrderInput | SortOrder
    end_reason?: SortOrderInput | SortOrder
    initiated_at?: SortOrder
    initiator_user?: UserOrderByWithRelationInput
    match?: MatchOrderByWithRelationInput
    receiver_user?: UserOrderByWithRelationInput
  }

  export type CallWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    call_segment_uuid?: string
    AND?: CallWhereInput | CallWhereInput[]
    OR?: CallWhereInput[]
    NOT?: CallWhereInput | CallWhereInput[]
    match_id?: IntFilter<"Call"> | number
    previous_call_segment_uuid?: UuidNullableFilter<"Call"> | string | null
    initiator_user_id?: IntFilter<"Call"> | number
    receiver_user_id?: IntFilter<"Call"> | number
    call_type?: StringFilter<"Call"> | string
    status?: StringFilter<"Call"> | string
    start_time?: DateTimeNullableFilter<"Call"> | Date | string | null
    end_time?: DateTimeNullableFilter<"Call"> | Date | string | null
    duration_seconds?: IntNullableFilter<"Call"> | number | null
    end_reason?: StringNullableFilter<"Call"> | string | null
    initiated_at?: DateTimeFilter<"Call"> | Date | string
    initiator_user?: XOR<UserScalarRelationFilter, UserWhereInput>
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
    receiver_user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "call_segment_uuid">

  export type CallOrderByWithAggregationInput = {
    id?: SortOrder
    match_id?: SortOrder
    call_segment_uuid?: SortOrder
    previous_call_segment_uuid?: SortOrderInput | SortOrder
    initiator_user_id?: SortOrder
    receiver_user_id?: SortOrder
    call_type?: SortOrder
    status?: SortOrder
    start_time?: SortOrderInput | SortOrder
    end_time?: SortOrderInput | SortOrder
    duration_seconds?: SortOrderInput | SortOrder
    end_reason?: SortOrderInput | SortOrder
    initiated_at?: SortOrder
    _count?: CallCountOrderByAggregateInput
    _avg?: CallAvgOrderByAggregateInput
    _max?: CallMaxOrderByAggregateInput
    _min?: CallMinOrderByAggregateInput
    _sum?: CallSumOrderByAggregateInput
  }

  export type CallScalarWhereWithAggregatesInput = {
    AND?: CallScalarWhereWithAggregatesInput | CallScalarWhereWithAggregatesInput[]
    OR?: CallScalarWhereWithAggregatesInput[]
    NOT?: CallScalarWhereWithAggregatesInput | CallScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Call"> | bigint | number
    match_id?: IntWithAggregatesFilter<"Call"> | number
    call_segment_uuid?: UuidWithAggregatesFilter<"Call"> | string
    previous_call_segment_uuid?: UuidNullableWithAggregatesFilter<"Call"> | string | null
    initiator_user_id?: IntWithAggregatesFilter<"Call"> | number
    receiver_user_id?: IntWithAggregatesFilter<"Call"> | number
    call_type?: StringWithAggregatesFilter<"Call"> | string
    status?: StringWithAggregatesFilter<"Call"> | string
    start_time?: DateTimeNullableWithAggregatesFilter<"Call"> | Date | string | null
    end_time?: DateTimeNullableWithAggregatesFilter<"Call"> | Date | string | null
    duration_seconds?: IntNullableWithAggregatesFilter<"Call"> | number | null
    end_reason?: StringNullableWithAggregatesFilter<"Call"> | string | null
    initiated_at?: DateTimeWithAggregatesFilter<"Call"> | Date | string
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: IntFilter<"Report"> | number
    reporter_id?: IntNullableFilter<"Report"> | number | null
    reason?: StringFilter<"Report"> | string
    created_at?: DateTimeFilter<"Report"> | Date | string
    reported_user_id?: IntNullableFilter<"Report"> | number | null
    status?: StringFilter<"Report"> | string
    reporter?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    reported?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    reporter_id?: SortOrderInput | SortOrder
    reason?: SortOrder
    created_at?: SortOrder
    reported_user_id?: SortOrderInput | SortOrder
    status?: SortOrder
    reporter?: UserOrderByWithRelationInput
    reported?: UserOrderByWithRelationInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    reporter_id?: IntNullableFilter<"Report"> | number | null
    reason?: StringFilter<"Report"> | string
    created_at?: DateTimeFilter<"Report"> | Date | string
    reported_user_id?: IntNullableFilter<"Report"> | number | null
    status?: StringFilter<"Report"> | string
    reporter?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    reported?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    reporter_id?: SortOrderInput | SortOrder
    reason?: SortOrder
    created_at?: SortOrder
    reported_user_id?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _avg?: ReportAvgOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
    _sum?: ReportSumOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Report"> | number
    reporter_id?: IntNullableWithAggregatesFilter<"Report"> | number | null
    reason?: StringWithAggregatesFilter<"Report"> | string
    created_at?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    reported_user_id?: IntNullableWithAggregatesFilter<"Report"> | number | null
    status?: StringWithAggregatesFilter<"Report"> | string
  }

  export type BlockWhereInput = {
    AND?: BlockWhereInput | BlockWhereInput[]
    OR?: BlockWhereInput[]
    NOT?: BlockWhereInput | BlockWhereInput[]
    id?: IntFilter<"Block"> | number
    blocker_id?: IntFilter<"Block"> | number
    blocked_id?: IntFilter<"Block"> | number
    created_at?: DateTimeFilter<"Block"> | Date | string
    blocked?: XOR<UserScalarRelationFilter, UserWhereInput>
    blocker?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BlockOrderByWithRelationInput = {
    id?: SortOrder
    blocker_id?: SortOrder
    blocked_id?: SortOrder
    created_at?: SortOrder
    blocked?: UserOrderByWithRelationInput
    blocker?: UserOrderByWithRelationInput
  }

  export type BlockWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    blocker_id_blocked_id?: BlockBlocker_idBlocked_idCompoundUniqueInput
    AND?: BlockWhereInput | BlockWhereInput[]
    OR?: BlockWhereInput[]
    NOT?: BlockWhereInput | BlockWhereInput[]
    blocker_id?: IntFilter<"Block"> | number
    blocked_id?: IntFilter<"Block"> | number
    created_at?: DateTimeFilter<"Block"> | Date | string
    blocked?: XOR<UserScalarRelationFilter, UserWhereInput>
    blocker?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "blocker_id_blocked_id">

  export type BlockOrderByWithAggregationInput = {
    id?: SortOrder
    blocker_id?: SortOrder
    blocked_id?: SortOrder
    created_at?: SortOrder
    _count?: BlockCountOrderByAggregateInput
    _avg?: BlockAvgOrderByAggregateInput
    _max?: BlockMaxOrderByAggregateInput
    _min?: BlockMinOrderByAggregateInput
    _sum?: BlockSumOrderByAggregateInput
  }

  export type BlockScalarWhereWithAggregatesInput = {
    AND?: BlockScalarWhereWithAggregatesInput | BlockScalarWhereWithAggregatesInput[]
    OR?: BlockScalarWhereWithAggregatesInput[]
    NOT?: BlockScalarWhereWithAggregatesInput | BlockScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Block"> | number
    blocker_id?: IntWithAggregatesFilter<"Block"> | number
    blocked_id?: IntWithAggregatesFilter<"Block"> | number
    created_at?: DateTimeWithAggregatesFilter<"Block"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchCreateNestedManyWithoutUser2Input
    reports_received?: ReportCreateNestedManyWithoutReportedInput
    reports_made?: ReportCreateNestedManyWithoutReporterInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockUncheckedCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockUncheckedCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallUncheckedCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallUncheckedCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeUncheckedCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeUncheckedCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchUncheckedCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchUncheckedCreateNestedManyWithoutUser2Input
    reports_received?: ReportUncheckedCreateNestedManyWithoutReportedInput
    reports_made?: ReportUncheckedCreateNestedManyWithoutReporterInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUpdateManyWithoutReporterNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUncheckedUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUncheckedUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUncheckedUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUncheckedUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUncheckedUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUncheckedUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUncheckedUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUncheckedUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUncheckedUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUncheckedUpdateManyWithoutReporterNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LikeCreateInput = {
    is_like: boolean
    timestamp?: Date | string
    from_user: UserCreateNestedOneWithoutLikes_fromInput
    to_user: UserCreateNestedOneWithoutLikes_toInput
  }

  export type LikeUncheckedCreateInput = {
    id?: number
    from_user_id: number
    to_user_id: number
    is_like: boolean
    timestamp?: Date | string
  }

  export type LikeUpdateInput = {
    is_like?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_user?: UserUpdateOneRequiredWithoutLikes_fromNestedInput
    to_user?: UserUpdateOneRequiredWithoutLikes_toNestedInput
  }

  export type LikeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    from_user_id?: IntFieldUpdateOperationsInput | number
    to_user_id?: IntFieldUpdateOperationsInput | number
    is_like?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeCreateManyInput = {
    id?: number
    from_user_id: number
    to_user_id: number
    is_like: boolean
    timestamp?: Date | string
  }

  export type LikeUpdateManyMutationInput = {
    is_like?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    from_user_id?: IntFieldUpdateOperationsInput | number
    to_user_id?: IntFieldUpdateOperationsInput | number
    is_like?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchCreateInput = {
    matched_at?: Date | string
    is_active?: boolean
    closed_at?: Date | string | null
    close_reason?: string | null
    default_voice_call_duration_sec?: number
    default_video_call_duration_sec?: number
    last_interaction_at?: Date | string
    match_inactivity_timeout_interval?: string
    calls?: CallCreateNestedManyWithoutMatchInput
    user1: UserCreateNestedOneWithoutMatches_as_user1Input
    user2: UserCreateNestedOneWithoutMatches_as_user2Input
  }

  export type MatchUncheckedCreateInput = {
    id?: number
    user1_id: number
    user2_id: number
    matched_at?: Date | string
    is_active?: boolean
    closed_at?: Date | string | null
    close_reason?: string | null
    default_voice_call_duration_sec?: number
    default_video_call_duration_sec?: number
    last_interaction_at?: Date | string
    match_inactivity_timeout_interval?: string
    calls?: CallUncheckedCreateNestedManyWithoutMatchInput
  }

  export type MatchUpdateInput = {
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    closed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    close_reason?: NullableStringFieldUpdateOperationsInput | string | null
    default_voice_call_duration_sec?: IntFieldUpdateOperationsInput | number
    default_video_call_duration_sec?: IntFieldUpdateOperationsInput | number
    last_interaction_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_inactivity_timeout_interval?: StringFieldUpdateOperationsInput | string
    calls?: CallUpdateManyWithoutMatchNestedInput
    user1?: UserUpdateOneRequiredWithoutMatches_as_user1NestedInput
    user2?: UserUpdateOneRequiredWithoutMatches_as_user2NestedInput
  }

  export type MatchUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user1_id?: IntFieldUpdateOperationsInput | number
    user2_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    closed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    close_reason?: NullableStringFieldUpdateOperationsInput | string | null
    default_voice_call_duration_sec?: IntFieldUpdateOperationsInput | number
    default_video_call_duration_sec?: IntFieldUpdateOperationsInput | number
    last_interaction_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_inactivity_timeout_interval?: StringFieldUpdateOperationsInput | string
    calls?: CallUncheckedUpdateManyWithoutMatchNestedInput
  }

  export type MatchCreateManyInput = {
    id?: number
    user1_id: number
    user2_id: number
    matched_at?: Date | string
    is_active?: boolean
    closed_at?: Date | string | null
    close_reason?: string | null
    default_voice_call_duration_sec?: number
    default_video_call_duration_sec?: number
    last_interaction_at?: Date | string
    match_inactivity_timeout_interval?: string
  }

  export type MatchUpdateManyMutationInput = {
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    closed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    close_reason?: NullableStringFieldUpdateOperationsInput | string | null
    default_voice_call_duration_sec?: IntFieldUpdateOperationsInput | number
    default_video_call_duration_sec?: IntFieldUpdateOperationsInput | number
    last_interaction_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_inactivity_timeout_interval?: StringFieldUpdateOperationsInput | string
  }

  export type MatchUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user1_id?: IntFieldUpdateOperationsInput | number
    user2_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    closed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    close_reason?: NullableStringFieldUpdateOperationsInput | string | null
    default_voice_call_duration_sec?: IntFieldUpdateOperationsInput | number
    default_video_call_duration_sec?: IntFieldUpdateOperationsInput | number
    last_interaction_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_inactivity_timeout_interval?: StringFieldUpdateOperationsInput | string
  }

  export type CallCreateInput = {
    id?: bigint | number
    call_segment_uuid?: string
    previous_call_segment_uuid?: string | null
    call_type: string
    status: string
    start_time?: Date | string | null
    end_time?: Date | string | null
    duration_seconds?: number | null
    end_reason?: string | null
    initiated_at?: Date | string
    initiator_user: UserCreateNestedOneWithoutCalls_initiatedInput
    match: MatchCreateNestedOneWithoutCallsInput
    receiver_user: UserCreateNestedOneWithoutCalls_receivedInput
  }

  export type CallUncheckedCreateInput = {
    id?: bigint | number
    match_id: number
    call_segment_uuid?: string
    previous_call_segment_uuid?: string | null
    initiator_user_id: number
    receiver_user_id: number
    call_type: string
    status: string
    start_time?: Date | string | null
    end_time?: Date | string | null
    duration_seconds?: number | null
    end_reason?: string | null
    initiated_at?: Date | string
  }

  export type CallUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    call_segment_uuid?: StringFieldUpdateOperationsInput | string
    previous_call_segment_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    end_reason?: NullableStringFieldUpdateOperationsInput | string | null
    initiated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    initiator_user?: UserUpdateOneRequiredWithoutCalls_initiatedNestedInput
    match?: MatchUpdateOneRequiredWithoutCallsNestedInput
    receiver_user?: UserUpdateOneRequiredWithoutCalls_receivedNestedInput
  }

  export type CallUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    match_id?: IntFieldUpdateOperationsInput | number
    call_segment_uuid?: StringFieldUpdateOperationsInput | string
    previous_call_segment_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    initiator_user_id?: IntFieldUpdateOperationsInput | number
    receiver_user_id?: IntFieldUpdateOperationsInput | number
    call_type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    end_reason?: NullableStringFieldUpdateOperationsInput | string | null
    initiated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallCreateManyInput = {
    id?: bigint | number
    match_id: number
    call_segment_uuid?: string
    previous_call_segment_uuid?: string | null
    initiator_user_id: number
    receiver_user_id: number
    call_type: string
    status: string
    start_time?: Date | string | null
    end_time?: Date | string | null
    duration_seconds?: number | null
    end_reason?: string | null
    initiated_at?: Date | string
  }

  export type CallUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    call_segment_uuid?: StringFieldUpdateOperationsInput | string
    previous_call_segment_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    end_reason?: NullableStringFieldUpdateOperationsInput | string | null
    initiated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    match_id?: IntFieldUpdateOperationsInput | number
    call_segment_uuid?: StringFieldUpdateOperationsInput | string
    previous_call_segment_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    initiator_user_id?: IntFieldUpdateOperationsInput | number
    receiver_user_id?: IntFieldUpdateOperationsInput | number
    call_type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    end_reason?: NullableStringFieldUpdateOperationsInput | string | null
    initiated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateInput = {
    reason: string
    created_at?: Date | string
    status?: string
    reporter?: UserCreateNestedOneWithoutReports_madeInput
    reported?: UserCreateNestedOneWithoutReports_receivedInput
  }

  export type ReportUncheckedCreateInput = {
    id?: number
    reporter_id?: number | null
    reason: string
    created_at?: Date | string
    reported_user_id?: number | null
    status?: string
  }

  export type ReportUpdateInput = {
    reason?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reporter?: UserUpdateOneWithoutReports_madeNestedInput
    reported?: UserUpdateOneWithoutReports_receivedNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    reporter_id?: NullableIntFieldUpdateOperationsInput | number | null
    reason?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reported_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ReportCreateManyInput = {
    id?: number
    reporter_id?: number | null
    reason: string
    created_at?: Date | string
    reported_user_id?: number | null
    status?: string
  }

  export type ReportUpdateManyMutationInput = {
    reason?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    reporter_id?: NullableIntFieldUpdateOperationsInput | number | null
    reason?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reported_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type BlockCreateInput = {
    created_at?: Date | string
    blocked: UserCreateNestedOneWithoutBlocks_receivedInput
    blocker: UserCreateNestedOneWithoutBlocks_madeInput
  }

  export type BlockUncheckedCreateInput = {
    id?: number
    blocker_id: number
    blocked_id: number
    created_at?: Date | string
  }

  export type BlockUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    blocked?: UserUpdateOneRequiredWithoutBlocks_receivedNestedInput
    blocker?: UserUpdateOneRequiredWithoutBlocks_madeNestedInput
  }

  export type BlockUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    blocker_id?: IntFieldUpdateOperationsInput | number
    blocked_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockCreateManyInput = {
    id?: number
    blocker_id: number
    blocked_id: number
    created_at?: Date | string
  }

  export type BlockUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    blocker_id?: IntFieldUpdateOperationsInput | number
    blocked_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BlockListRelationFilter = {
    every?: BlockWhereInput
    some?: BlockWhereInput
    none?: BlockWhereInput
  }

  export type CallListRelationFilter = {
    every?: CallWhereInput
    some?: CallWhereInput
    none?: CallWhereInput
  }

  export type LikeListRelationFilter = {
    every?: LikeWhereInput
    some?: LikeWhereInput
    none?: LikeWhereInput
  }

  export type MatchListRelationFilter = {
    every?: MatchWhereInput
    some?: MatchWhereInput
    none?: MatchWhereInput
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BlockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CallOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    display_name?: SortOrder
    birth_date?: SortOrder
    gender?: SortOrder
    looking_for_gender?: SortOrder
    relationship_type?: SortOrder
    city?: SortOrder
    bio?: SortOrder
    profile_image_url?: SortOrder
    additional_photos?: SortOrder
    preferred_age_min?: SortOrder
    preferred_age_max?: SortOrder
    preferred_distance_km?: SortOrder
    is_active?: SortOrder
    is_paid?: SortOrder
    paid_until?: SortOrder
    verified_email?: SortOrder
    consents?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_active_at?: SortOrder
    last_seen_at?: SortOrder
    status_message?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    is_admin?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    preferred_age_min?: SortOrder
    preferred_age_max?: SortOrder
    preferred_distance_km?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    display_name?: SortOrder
    birth_date?: SortOrder
    gender?: SortOrder
    city?: SortOrder
    bio?: SortOrder
    profile_image_url?: SortOrder
    preferred_age_min?: SortOrder
    preferred_age_max?: SortOrder
    preferred_distance_km?: SortOrder
    is_active?: SortOrder
    is_paid?: SortOrder
    paid_until?: SortOrder
    verified_email?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_active_at?: SortOrder
    last_seen_at?: SortOrder
    status_message?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    is_admin?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    display_name?: SortOrder
    birth_date?: SortOrder
    gender?: SortOrder
    city?: SortOrder
    bio?: SortOrder
    profile_image_url?: SortOrder
    preferred_age_min?: SortOrder
    preferred_age_max?: SortOrder
    preferred_distance_km?: SortOrder
    is_active?: SortOrder
    is_paid?: SortOrder
    paid_until?: SortOrder
    verified_email?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_active_at?: SortOrder
    last_seen_at?: SortOrder
    status_message?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    is_admin?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    preferred_age_min?: SortOrder
    preferred_age_max?: SortOrder
    preferred_distance_km?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type LikeFrom_user_idTo_user_idCompoundUniqueInput = {
    from_user_id: number
    to_user_id: number
  }

  export type LikeCountOrderByAggregateInput = {
    id?: SortOrder
    from_user_id?: SortOrder
    to_user_id?: SortOrder
    is_like?: SortOrder
    timestamp?: SortOrder
  }

  export type LikeAvgOrderByAggregateInput = {
    id?: SortOrder
    from_user_id?: SortOrder
    to_user_id?: SortOrder
  }

  export type LikeMaxOrderByAggregateInput = {
    id?: SortOrder
    from_user_id?: SortOrder
    to_user_id?: SortOrder
    is_like?: SortOrder
    timestamp?: SortOrder
  }

  export type LikeMinOrderByAggregateInput = {
    id?: SortOrder
    from_user_id?: SortOrder
    to_user_id?: SortOrder
    is_like?: SortOrder
    timestamp?: SortOrder
  }

  export type LikeSumOrderByAggregateInput = {
    id?: SortOrder
    from_user_id?: SortOrder
    to_user_id?: SortOrder
  }

  export type MatchCountOrderByAggregateInput = {
    id?: SortOrder
    user1_id?: SortOrder
    user2_id?: SortOrder
    matched_at?: SortOrder
    is_active?: SortOrder
    closed_at?: SortOrder
    close_reason?: SortOrder
    default_voice_call_duration_sec?: SortOrder
    default_video_call_duration_sec?: SortOrder
    last_interaction_at?: SortOrder
    match_inactivity_timeout_interval?: SortOrder
  }

  export type MatchAvgOrderByAggregateInput = {
    id?: SortOrder
    user1_id?: SortOrder
    user2_id?: SortOrder
    default_voice_call_duration_sec?: SortOrder
    default_video_call_duration_sec?: SortOrder
  }

  export type MatchMaxOrderByAggregateInput = {
    id?: SortOrder
    user1_id?: SortOrder
    user2_id?: SortOrder
    matched_at?: SortOrder
    is_active?: SortOrder
    closed_at?: SortOrder
    close_reason?: SortOrder
    default_voice_call_duration_sec?: SortOrder
    default_video_call_duration_sec?: SortOrder
    last_interaction_at?: SortOrder
    match_inactivity_timeout_interval?: SortOrder
  }

  export type MatchMinOrderByAggregateInput = {
    id?: SortOrder
    user1_id?: SortOrder
    user2_id?: SortOrder
    matched_at?: SortOrder
    is_active?: SortOrder
    closed_at?: SortOrder
    close_reason?: SortOrder
    default_voice_call_duration_sec?: SortOrder
    default_video_call_duration_sec?: SortOrder
    last_interaction_at?: SortOrder
    match_inactivity_timeout_interval?: SortOrder
  }

  export type MatchSumOrderByAggregateInput = {
    id?: SortOrder
    user1_id?: SortOrder
    user2_id?: SortOrder
    default_voice_call_duration_sec?: SortOrder
    default_video_call_duration_sec?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MatchScalarRelationFilter = {
    is?: MatchWhereInput
    isNot?: MatchWhereInput
  }

  export type CallCountOrderByAggregateInput = {
    id?: SortOrder
    match_id?: SortOrder
    call_segment_uuid?: SortOrder
    previous_call_segment_uuid?: SortOrder
    initiator_user_id?: SortOrder
    receiver_user_id?: SortOrder
    call_type?: SortOrder
    status?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    duration_seconds?: SortOrder
    end_reason?: SortOrder
    initiated_at?: SortOrder
  }

  export type CallAvgOrderByAggregateInput = {
    id?: SortOrder
    match_id?: SortOrder
    initiator_user_id?: SortOrder
    receiver_user_id?: SortOrder
    duration_seconds?: SortOrder
  }

  export type CallMaxOrderByAggregateInput = {
    id?: SortOrder
    match_id?: SortOrder
    call_segment_uuid?: SortOrder
    previous_call_segment_uuid?: SortOrder
    initiator_user_id?: SortOrder
    receiver_user_id?: SortOrder
    call_type?: SortOrder
    status?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    duration_seconds?: SortOrder
    end_reason?: SortOrder
    initiated_at?: SortOrder
  }

  export type CallMinOrderByAggregateInput = {
    id?: SortOrder
    match_id?: SortOrder
    call_segment_uuid?: SortOrder
    previous_call_segment_uuid?: SortOrder
    initiator_user_id?: SortOrder
    receiver_user_id?: SortOrder
    call_type?: SortOrder
    status?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    duration_seconds?: SortOrder
    end_reason?: SortOrder
    initiated_at?: SortOrder
  }

  export type CallSumOrderByAggregateInput = {
    id?: SortOrder
    match_id?: SortOrder
    initiator_user_id?: SortOrder
    receiver_user_id?: SortOrder
    duration_seconds?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    reporter_id?: SortOrder
    reason?: SortOrder
    created_at?: SortOrder
    reported_user_id?: SortOrder
    status?: SortOrder
  }

  export type ReportAvgOrderByAggregateInput = {
    id?: SortOrder
    reporter_id?: SortOrder
    reported_user_id?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    reporter_id?: SortOrder
    reason?: SortOrder
    created_at?: SortOrder
    reported_user_id?: SortOrder
    status?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    reporter_id?: SortOrder
    reason?: SortOrder
    created_at?: SortOrder
    reported_user_id?: SortOrder
    status?: SortOrder
  }

  export type ReportSumOrderByAggregateInput = {
    id?: SortOrder
    reporter_id?: SortOrder
    reported_user_id?: SortOrder
  }

  export type BlockBlocker_idBlocked_idCompoundUniqueInput = {
    blocker_id: number
    blocked_id: number
  }

  export type BlockCountOrderByAggregateInput = {
    id?: SortOrder
    blocker_id?: SortOrder
    blocked_id?: SortOrder
    created_at?: SortOrder
  }

  export type BlockAvgOrderByAggregateInput = {
    id?: SortOrder
    blocker_id?: SortOrder
    blocked_id?: SortOrder
  }

  export type BlockMaxOrderByAggregateInput = {
    id?: SortOrder
    blocker_id?: SortOrder
    blocked_id?: SortOrder
    created_at?: SortOrder
  }

  export type BlockMinOrderByAggregateInput = {
    id?: SortOrder
    blocker_id?: SortOrder
    blocked_id?: SortOrder
    created_at?: SortOrder
  }

  export type BlockSumOrderByAggregateInput = {
    id?: SortOrder
    blocker_id?: SortOrder
    blocked_id?: SortOrder
  }

  export type UserCreatelooking_for_genderInput = {
    set: string[]
  }

  export type UserCreaterelationship_typeInput = {
    set: string[]
  }

  export type BlockCreateNestedManyWithoutBlockedInput = {
    create?: XOR<BlockCreateWithoutBlockedInput, BlockUncheckedCreateWithoutBlockedInput> | BlockCreateWithoutBlockedInput[] | BlockUncheckedCreateWithoutBlockedInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutBlockedInput | BlockCreateOrConnectWithoutBlockedInput[]
    createMany?: BlockCreateManyBlockedInputEnvelope
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
  }

  export type BlockCreateNestedManyWithoutBlockerInput = {
    create?: XOR<BlockCreateWithoutBlockerInput, BlockUncheckedCreateWithoutBlockerInput> | BlockCreateWithoutBlockerInput[] | BlockUncheckedCreateWithoutBlockerInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutBlockerInput | BlockCreateOrConnectWithoutBlockerInput[]
    createMany?: BlockCreateManyBlockerInputEnvelope
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
  }

  export type CallCreateNestedManyWithoutInitiator_userInput = {
    create?: XOR<CallCreateWithoutInitiator_userInput, CallUncheckedCreateWithoutInitiator_userInput> | CallCreateWithoutInitiator_userInput[] | CallUncheckedCreateWithoutInitiator_userInput[]
    connectOrCreate?: CallCreateOrConnectWithoutInitiator_userInput | CallCreateOrConnectWithoutInitiator_userInput[]
    createMany?: CallCreateManyInitiator_userInputEnvelope
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[]
  }

  export type CallCreateNestedManyWithoutReceiver_userInput = {
    create?: XOR<CallCreateWithoutReceiver_userInput, CallUncheckedCreateWithoutReceiver_userInput> | CallCreateWithoutReceiver_userInput[] | CallUncheckedCreateWithoutReceiver_userInput[]
    connectOrCreate?: CallCreateOrConnectWithoutReceiver_userInput | CallCreateOrConnectWithoutReceiver_userInput[]
    createMany?: CallCreateManyReceiver_userInputEnvelope
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[]
  }

  export type LikeCreateNestedManyWithoutFrom_userInput = {
    create?: XOR<LikeCreateWithoutFrom_userInput, LikeUncheckedCreateWithoutFrom_userInput> | LikeCreateWithoutFrom_userInput[] | LikeUncheckedCreateWithoutFrom_userInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutFrom_userInput | LikeCreateOrConnectWithoutFrom_userInput[]
    createMany?: LikeCreateManyFrom_userInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type LikeCreateNestedManyWithoutTo_userInput = {
    create?: XOR<LikeCreateWithoutTo_userInput, LikeUncheckedCreateWithoutTo_userInput> | LikeCreateWithoutTo_userInput[] | LikeUncheckedCreateWithoutTo_userInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutTo_userInput | LikeCreateOrConnectWithoutTo_userInput[]
    createMany?: LikeCreateManyTo_userInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type MatchCreateNestedManyWithoutUser1Input = {
    create?: XOR<MatchCreateWithoutUser1Input, MatchUncheckedCreateWithoutUser1Input> | MatchCreateWithoutUser1Input[] | MatchUncheckedCreateWithoutUser1Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutUser1Input | MatchCreateOrConnectWithoutUser1Input[]
    createMany?: MatchCreateManyUser1InputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type MatchCreateNestedManyWithoutUser2Input = {
    create?: XOR<MatchCreateWithoutUser2Input, MatchUncheckedCreateWithoutUser2Input> | MatchCreateWithoutUser2Input[] | MatchUncheckedCreateWithoutUser2Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutUser2Input | MatchCreateOrConnectWithoutUser2Input[]
    createMany?: MatchCreateManyUser2InputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutReportedInput = {
    create?: XOR<ReportCreateWithoutReportedInput, ReportUncheckedCreateWithoutReportedInput> | ReportCreateWithoutReportedInput[] | ReportUncheckedCreateWithoutReportedInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReportedInput | ReportCreateOrConnectWithoutReportedInput[]
    createMany?: ReportCreateManyReportedInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutReporterInput = {
    create?: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput> | ReportCreateWithoutReporterInput[] | ReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReporterInput | ReportCreateOrConnectWithoutReporterInput[]
    createMany?: ReportCreateManyReporterInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type BlockUncheckedCreateNestedManyWithoutBlockedInput = {
    create?: XOR<BlockCreateWithoutBlockedInput, BlockUncheckedCreateWithoutBlockedInput> | BlockCreateWithoutBlockedInput[] | BlockUncheckedCreateWithoutBlockedInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutBlockedInput | BlockCreateOrConnectWithoutBlockedInput[]
    createMany?: BlockCreateManyBlockedInputEnvelope
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
  }

  export type BlockUncheckedCreateNestedManyWithoutBlockerInput = {
    create?: XOR<BlockCreateWithoutBlockerInput, BlockUncheckedCreateWithoutBlockerInput> | BlockCreateWithoutBlockerInput[] | BlockUncheckedCreateWithoutBlockerInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutBlockerInput | BlockCreateOrConnectWithoutBlockerInput[]
    createMany?: BlockCreateManyBlockerInputEnvelope
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
  }

  export type CallUncheckedCreateNestedManyWithoutInitiator_userInput = {
    create?: XOR<CallCreateWithoutInitiator_userInput, CallUncheckedCreateWithoutInitiator_userInput> | CallCreateWithoutInitiator_userInput[] | CallUncheckedCreateWithoutInitiator_userInput[]
    connectOrCreate?: CallCreateOrConnectWithoutInitiator_userInput | CallCreateOrConnectWithoutInitiator_userInput[]
    createMany?: CallCreateManyInitiator_userInputEnvelope
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[]
  }

  export type CallUncheckedCreateNestedManyWithoutReceiver_userInput = {
    create?: XOR<CallCreateWithoutReceiver_userInput, CallUncheckedCreateWithoutReceiver_userInput> | CallCreateWithoutReceiver_userInput[] | CallUncheckedCreateWithoutReceiver_userInput[]
    connectOrCreate?: CallCreateOrConnectWithoutReceiver_userInput | CallCreateOrConnectWithoutReceiver_userInput[]
    createMany?: CallCreateManyReceiver_userInputEnvelope
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[]
  }

  export type LikeUncheckedCreateNestedManyWithoutFrom_userInput = {
    create?: XOR<LikeCreateWithoutFrom_userInput, LikeUncheckedCreateWithoutFrom_userInput> | LikeCreateWithoutFrom_userInput[] | LikeUncheckedCreateWithoutFrom_userInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutFrom_userInput | LikeCreateOrConnectWithoutFrom_userInput[]
    createMany?: LikeCreateManyFrom_userInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type LikeUncheckedCreateNestedManyWithoutTo_userInput = {
    create?: XOR<LikeCreateWithoutTo_userInput, LikeUncheckedCreateWithoutTo_userInput> | LikeCreateWithoutTo_userInput[] | LikeUncheckedCreateWithoutTo_userInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutTo_userInput | LikeCreateOrConnectWithoutTo_userInput[]
    createMany?: LikeCreateManyTo_userInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type MatchUncheckedCreateNestedManyWithoutUser1Input = {
    create?: XOR<MatchCreateWithoutUser1Input, MatchUncheckedCreateWithoutUser1Input> | MatchCreateWithoutUser1Input[] | MatchUncheckedCreateWithoutUser1Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutUser1Input | MatchCreateOrConnectWithoutUser1Input[]
    createMany?: MatchCreateManyUser1InputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type MatchUncheckedCreateNestedManyWithoutUser2Input = {
    create?: XOR<MatchCreateWithoutUser2Input, MatchUncheckedCreateWithoutUser2Input> | MatchCreateWithoutUser2Input[] | MatchUncheckedCreateWithoutUser2Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutUser2Input | MatchCreateOrConnectWithoutUser2Input[]
    createMany?: MatchCreateManyUser2InputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutReportedInput = {
    create?: XOR<ReportCreateWithoutReportedInput, ReportUncheckedCreateWithoutReportedInput> | ReportCreateWithoutReportedInput[] | ReportUncheckedCreateWithoutReportedInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReportedInput | ReportCreateOrConnectWithoutReportedInput[]
    createMany?: ReportCreateManyReportedInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutReporterInput = {
    create?: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput> | ReportCreateWithoutReporterInput[] | ReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReporterInput | ReportCreateOrConnectWithoutReporterInput[]
    createMany?: ReportCreateManyReporterInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdatelooking_for_genderInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdaterelationship_typeInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BlockUpdateManyWithoutBlockedNestedInput = {
    create?: XOR<BlockCreateWithoutBlockedInput, BlockUncheckedCreateWithoutBlockedInput> | BlockCreateWithoutBlockedInput[] | BlockUncheckedCreateWithoutBlockedInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutBlockedInput | BlockCreateOrConnectWithoutBlockedInput[]
    upsert?: BlockUpsertWithWhereUniqueWithoutBlockedInput | BlockUpsertWithWhereUniqueWithoutBlockedInput[]
    createMany?: BlockCreateManyBlockedInputEnvelope
    set?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    disconnect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    delete?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    update?: BlockUpdateWithWhereUniqueWithoutBlockedInput | BlockUpdateWithWhereUniqueWithoutBlockedInput[]
    updateMany?: BlockUpdateManyWithWhereWithoutBlockedInput | BlockUpdateManyWithWhereWithoutBlockedInput[]
    deleteMany?: BlockScalarWhereInput | BlockScalarWhereInput[]
  }

  export type BlockUpdateManyWithoutBlockerNestedInput = {
    create?: XOR<BlockCreateWithoutBlockerInput, BlockUncheckedCreateWithoutBlockerInput> | BlockCreateWithoutBlockerInput[] | BlockUncheckedCreateWithoutBlockerInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutBlockerInput | BlockCreateOrConnectWithoutBlockerInput[]
    upsert?: BlockUpsertWithWhereUniqueWithoutBlockerInput | BlockUpsertWithWhereUniqueWithoutBlockerInput[]
    createMany?: BlockCreateManyBlockerInputEnvelope
    set?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    disconnect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    delete?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    update?: BlockUpdateWithWhereUniqueWithoutBlockerInput | BlockUpdateWithWhereUniqueWithoutBlockerInput[]
    updateMany?: BlockUpdateManyWithWhereWithoutBlockerInput | BlockUpdateManyWithWhereWithoutBlockerInput[]
    deleteMany?: BlockScalarWhereInput | BlockScalarWhereInput[]
  }

  export type CallUpdateManyWithoutInitiator_userNestedInput = {
    create?: XOR<CallCreateWithoutInitiator_userInput, CallUncheckedCreateWithoutInitiator_userInput> | CallCreateWithoutInitiator_userInput[] | CallUncheckedCreateWithoutInitiator_userInput[]
    connectOrCreate?: CallCreateOrConnectWithoutInitiator_userInput | CallCreateOrConnectWithoutInitiator_userInput[]
    upsert?: CallUpsertWithWhereUniqueWithoutInitiator_userInput | CallUpsertWithWhereUniqueWithoutInitiator_userInput[]
    createMany?: CallCreateManyInitiator_userInputEnvelope
    set?: CallWhereUniqueInput | CallWhereUniqueInput[]
    disconnect?: CallWhereUniqueInput | CallWhereUniqueInput[]
    delete?: CallWhereUniqueInput | CallWhereUniqueInput[]
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[]
    update?: CallUpdateWithWhereUniqueWithoutInitiator_userInput | CallUpdateWithWhereUniqueWithoutInitiator_userInput[]
    updateMany?: CallUpdateManyWithWhereWithoutInitiator_userInput | CallUpdateManyWithWhereWithoutInitiator_userInput[]
    deleteMany?: CallScalarWhereInput | CallScalarWhereInput[]
  }

  export type CallUpdateManyWithoutReceiver_userNestedInput = {
    create?: XOR<CallCreateWithoutReceiver_userInput, CallUncheckedCreateWithoutReceiver_userInput> | CallCreateWithoutReceiver_userInput[] | CallUncheckedCreateWithoutReceiver_userInput[]
    connectOrCreate?: CallCreateOrConnectWithoutReceiver_userInput | CallCreateOrConnectWithoutReceiver_userInput[]
    upsert?: CallUpsertWithWhereUniqueWithoutReceiver_userInput | CallUpsertWithWhereUniqueWithoutReceiver_userInput[]
    createMany?: CallCreateManyReceiver_userInputEnvelope
    set?: CallWhereUniqueInput | CallWhereUniqueInput[]
    disconnect?: CallWhereUniqueInput | CallWhereUniqueInput[]
    delete?: CallWhereUniqueInput | CallWhereUniqueInput[]
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[]
    update?: CallUpdateWithWhereUniqueWithoutReceiver_userInput | CallUpdateWithWhereUniqueWithoutReceiver_userInput[]
    updateMany?: CallUpdateManyWithWhereWithoutReceiver_userInput | CallUpdateManyWithWhereWithoutReceiver_userInput[]
    deleteMany?: CallScalarWhereInput | CallScalarWhereInput[]
  }

  export type LikeUpdateManyWithoutFrom_userNestedInput = {
    create?: XOR<LikeCreateWithoutFrom_userInput, LikeUncheckedCreateWithoutFrom_userInput> | LikeCreateWithoutFrom_userInput[] | LikeUncheckedCreateWithoutFrom_userInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutFrom_userInput | LikeCreateOrConnectWithoutFrom_userInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutFrom_userInput | LikeUpsertWithWhereUniqueWithoutFrom_userInput[]
    createMany?: LikeCreateManyFrom_userInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutFrom_userInput | LikeUpdateWithWhereUniqueWithoutFrom_userInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutFrom_userInput | LikeUpdateManyWithWhereWithoutFrom_userInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type LikeUpdateManyWithoutTo_userNestedInput = {
    create?: XOR<LikeCreateWithoutTo_userInput, LikeUncheckedCreateWithoutTo_userInput> | LikeCreateWithoutTo_userInput[] | LikeUncheckedCreateWithoutTo_userInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutTo_userInput | LikeCreateOrConnectWithoutTo_userInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutTo_userInput | LikeUpsertWithWhereUniqueWithoutTo_userInput[]
    createMany?: LikeCreateManyTo_userInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutTo_userInput | LikeUpdateWithWhereUniqueWithoutTo_userInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutTo_userInput | LikeUpdateManyWithWhereWithoutTo_userInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type MatchUpdateManyWithoutUser1NestedInput = {
    create?: XOR<MatchCreateWithoutUser1Input, MatchUncheckedCreateWithoutUser1Input> | MatchCreateWithoutUser1Input[] | MatchUncheckedCreateWithoutUser1Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutUser1Input | MatchCreateOrConnectWithoutUser1Input[]
    upsert?: MatchUpsertWithWhereUniqueWithoutUser1Input | MatchUpsertWithWhereUniqueWithoutUser1Input[]
    createMany?: MatchCreateManyUser1InputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutUser1Input | MatchUpdateWithWhereUniqueWithoutUser1Input[]
    updateMany?: MatchUpdateManyWithWhereWithoutUser1Input | MatchUpdateManyWithWhereWithoutUser1Input[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type MatchUpdateManyWithoutUser2NestedInput = {
    create?: XOR<MatchCreateWithoutUser2Input, MatchUncheckedCreateWithoutUser2Input> | MatchCreateWithoutUser2Input[] | MatchUncheckedCreateWithoutUser2Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutUser2Input | MatchCreateOrConnectWithoutUser2Input[]
    upsert?: MatchUpsertWithWhereUniqueWithoutUser2Input | MatchUpsertWithWhereUniqueWithoutUser2Input[]
    createMany?: MatchCreateManyUser2InputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutUser2Input | MatchUpdateWithWhereUniqueWithoutUser2Input[]
    updateMany?: MatchUpdateManyWithWhereWithoutUser2Input | MatchUpdateManyWithWhereWithoutUser2Input[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type ReportUpdateManyWithoutReportedNestedInput = {
    create?: XOR<ReportCreateWithoutReportedInput, ReportUncheckedCreateWithoutReportedInput> | ReportCreateWithoutReportedInput[] | ReportUncheckedCreateWithoutReportedInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReportedInput | ReportCreateOrConnectWithoutReportedInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutReportedInput | ReportUpsertWithWhereUniqueWithoutReportedInput[]
    createMany?: ReportCreateManyReportedInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutReportedInput | ReportUpdateWithWhereUniqueWithoutReportedInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutReportedInput | ReportUpdateManyWithWhereWithoutReportedInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ReportUpdateManyWithoutReporterNestedInput = {
    create?: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput> | ReportCreateWithoutReporterInput[] | ReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReporterInput | ReportCreateOrConnectWithoutReporterInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutReporterInput | ReportUpsertWithWhereUniqueWithoutReporterInput[]
    createMany?: ReportCreateManyReporterInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutReporterInput | ReportUpdateWithWhereUniqueWithoutReporterInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutReporterInput | ReportUpdateManyWithWhereWithoutReporterInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type BlockUncheckedUpdateManyWithoutBlockedNestedInput = {
    create?: XOR<BlockCreateWithoutBlockedInput, BlockUncheckedCreateWithoutBlockedInput> | BlockCreateWithoutBlockedInput[] | BlockUncheckedCreateWithoutBlockedInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutBlockedInput | BlockCreateOrConnectWithoutBlockedInput[]
    upsert?: BlockUpsertWithWhereUniqueWithoutBlockedInput | BlockUpsertWithWhereUniqueWithoutBlockedInput[]
    createMany?: BlockCreateManyBlockedInputEnvelope
    set?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    disconnect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    delete?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    update?: BlockUpdateWithWhereUniqueWithoutBlockedInput | BlockUpdateWithWhereUniqueWithoutBlockedInput[]
    updateMany?: BlockUpdateManyWithWhereWithoutBlockedInput | BlockUpdateManyWithWhereWithoutBlockedInput[]
    deleteMany?: BlockScalarWhereInput | BlockScalarWhereInput[]
  }

  export type BlockUncheckedUpdateManyWithoutBlockerNestedInput = {
    create?: XOR<BlockCreateWithoutBlockerInput, BlockUncheckedCreateWithoutBlockerInput> | BlockCreateWithoutBlockerInput[] | BlockUncheckedCreateWithoutBlockerInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutBlockerInput | BlockCreateOrConnectWithoutBlockerInput[]
    upsert?: BlockUpsertWithWhereUniqueWithoutBlockerInput | BlockUpsertWithWhereUniqueWithoutBlockerInput[]
    createMany?: BlockCreateManyBlockerInputEnvelope
    set?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    disconnect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    delete?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    update?: BlockUpdateWithWhereUniqueWithoutBlockerInput | BlockUpdateWithWhereUniqueWithoutBlockerInput[]
    updateMany?: BlockUpdateManyWithWhereWithoutBlockerInput | BlockUpdateManyWithWhereWithoutBlockerInput[]
    deleteMany?: BlockScalarWhereInput | BlockScalarWhereInput[]
  }

  export type CallUncheckedUpdateManyWithoutInitiator_userNestedInput = {
    create?: XOR<CallCreateWithoutInitiator_userInput, CallUncheckedCreateWithoutInitiator_userInput> | CallCreateWithoutInitiator_userInput[] | CallUncheckedCreateWithoutInitiator_userInput[]
    connectOrCreate?: CallCreateOrConnectWithoutInitiator_userInput | CallCreateOrConnectWithoutInitiator_userInput[]
    upsert?: CallUpsertWithWhereUniqueWithoutInitiator_userInput | CallUpsertWithWhereUniqueWithoutInitiator_userInput[]
    createMany?: CallCreateManyInitiator_userInputEnvelope
    set?: CallWhereUniqueInput | CallWhereUniqueInput[]
    disconnect?: CallWhereUniqueInput | CallWhereUniqueInput[]
    delete?: CallWhereUniqueInput | CallWhereUniqueInput[]
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[]
    update?: CallUpdateWithWhereUniqueWithoutInitiator_userInput | CallUpdateWithWhereUniqueWithoutInitiator_userInput[]
    updateMany?: CallUpdateManyWithWhereWithoutInitiator_userInput | CallUpdateManyWithWhereWithoutInitiator_userInput[]
    deleteMany?: CallScalarWhereInput | CallScalarWhereInput[]
  }

  export type CallUncheckedUpdateManyWithoutReceiver_userNestedInput = {
    create?: XOR<CallCreateWithoutReceiver_userInput, CallUncheckedCreateWithoutReceiver_userInput> | CallCreateWithoutReceiver_userInput[] | CallUncheckedCreateWithoutReceiver_userInput[]
    connectOrCreate?: CallCreateOrConnectWithoutReceiver_userInput | CallCreateOrConnectWithoutReceiver_userInput[]
    upsert?: CallUpsertWithWhereUniqueWithoutReceiver_userInput | CallUpsertWithWhereUniqueWithoutReceiver_userInput[]
    createMany?: CallCreateManyReceiver_userInputEnvelope
    set?: CallWhereUniqueInput | CallWhereUniqueInput[]
    disconnect?: CallWhereUniqueInput | CallWhereUniqueInput[]
    delete?: CallWhereUniqueInput | CallWhereUniqueInput[]
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[]
    update?: CallUpdateWithWhereUniqueWithoutReceiver_userInput | CallUpdateWithWhereUniqueWithoutReceiver_userInput[]
    updateMany?: CallUpdateManyWithWhereWithoutReceiver_userInput | CallUpdateManyWithWhereWithoutReceiver_userInput[]
    deleteMany?: CallScalarWhereInput | CallScalarWhereInput[]
  }

  export type LikeUncheckedUpdateManyWithoutFrom_userNestedInput = {
    create?: XOR<LikeCreateWithoutFrom_userInput, LikeUncheckedCreateWithoutFrom_userInput> | LikeCreateWithoutFrom_userInput[] | LikeUncheckedCreateWithoutFrom_userInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutFrom_userInput | LikeCreateOrConnectWithoutFrom_userInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutFrom_userInput | LikeUpsertWithWhereUniqueWithoutFrom_userInput[]
    createMany?: LikeCreateManyFrom_userInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutFrom_userInput | LikeUpdateWithWhereUniqueWithoutFrom_userInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutFrom_userInput | LikeUpdateManyWithWhereWithoutFrom_userInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type LikeUncheckedUpdateManyWithoutTo_userNestedInput = {
    create?: XOR<LikeCreateWithoutTo_userInput, LikeUncheckedCreateWithoutTo_userInput> | LikeCreateWithoutTo_userInput[] | LikeUncheckedCreateWithoutTo_userInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutTo_userInput | LikeCreateOrConnectWithoutTo_userInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutTo_userInput | LikeUpsertWithWhereUniqueWithoutTo_userInput[]
    createMany?: LikeCreateManyTo_userInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutTo_userInput | LikeUpdateWithWhereUniqueWithoutTo_userInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutTo_userInput | LikeUpdateManyWithWhereWithoutTo_userInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type MatchUncheckedUpdateManyWithoutUser1NestedInput = {
    create?: XOR<MatchCreateWithoutUser1Input, MatchUncheckedCreateWithoutUser1Input> | MatchCreateWithoutUser1Input[] | MatchUncheckedCreateWithoutUser1Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutUser1Input | MatchCreateOrConnectWithoutUser1Input[]
    upsert?: MatchUpsertWithWhereUniqueWithoutUser1Input | MatchUpsertWithWhereUniqueWithoutUser1Input[]
    createMany?: MatchCreateManyUser1InputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutUser1Input | MatchUpdateWithWhereUniqueWithoutUser1Input[]
    updateMany?: MatchUpdateManyWithWhereWithoutUser1Input | MatchUpdateManyWithWhereWithoutUser1Input[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type MatchUncheckedUpdateManyWithoutUser2NestedInput = {
    create?: XOR<MatchCreateWithoutUser2Input, MatchUncheckedCreateWithoutUser2Input> | MatchCreateWithoutUser2Input[] | MatchUncheckedCreateWithoutUser2Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutUser2Input | MatchCreateOrConnectWithoutUser2Input[]
    upsert?: MatchUpsertWithWhereUniqueWithoutUser2Input | MatchUpsertWithWhereUniqueWithoutUser2Input[]
    createMany?: MatchCreateManyUser2InputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutUser2Input | MatchUpdateWithWhereUniqueWithoutUser2Input[]
    updateMany?: MatchUpdateManyWithWhereWithoutUser2Input | MatchUpdateManyWithWhereWithoutUser2Input[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutReportedNestedInput = {
    create?: XOR<ReportCreateWithoutReportedInput, ReportUncheckedCreateWithoutReportedInput> | ReportCreateWithoutReportedInput[] | ReportUncheckedCreateWithoutReportedInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReportedInput | ReportCreateOrConnectWithoutReportedInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutReportedInput | ReportUpsertWithWhereUniqueWithoutReportedInput[]
    createMany?: ReportCreateManyReportedInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutReportedInput | ReportUpdateWithWhereUniqueWithoutReportedInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutReportedInput | ReportUpdateManyWithWhereWithoutReportedInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutReporterNestedInput = {
    create?: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput> | ReportCreateWithoutReporterInput[] | ReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReporterInput | ReportCreateOrConnectWithoutReporterInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutReporterInput | ReportUpsertWithWhereUniqueWithoutReporterInput[]
    createMany?: ReportCreateManyReporterInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutReporterInput | ReportUpdateWithWhereUniqueWithoutReporterInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutReporterInput | ReportUpdateManyWithWhereWithoutReporterInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutLikes_fromInput = {
    create?: XOR<UserCreateWithoutLikes_fromInput, UserUncheckedCreateWithoutLikes_fromInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikes_fromInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutLikes_toInput = {
    create?: XOR<UserCreateWithoutLikes_toInput, UserUncheckedCreateWithoutLikes_toInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikes_toInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLikes_fromNestedInput = {
    create?: XOR<UserCreateWithoutLikes_fromInput, UserUncheckedCreateWithoutLikes_fromInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikes_fromInput
    upsert?: UserUpsertWithoutLikes_fromInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLikes_fromInput, UserUpdateWithoutLikes_fromInput>, UserUncheckedUpdateWithoutLikes_fromInput>
  }

  export type UserUpdateOneRequiredWithoutLikes_toNestedInput = {
    create?: XOR<UserCreateWithoutLikes_toInput, UserUncheckedCreateWithoutLikes_toInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikes_toInput
    upsert?: UserUpsertWithoutLikes_toInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLikes_toInput, UserUpdateWithoutLikes_toInput>, UserUncheckedUpdateWithoutLikes_toInput>
  }

  export type CallCreateNestedManyWithoutMatchInput = {
    create?: XOR<CallCreateWithoutMatchInput, CallUncheckedCreateWithoutMatchInput> | CallCreateWithoutMatchInput[] | CallUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: CallCreateOrConnectWithoutMatchInput | CallCreateOrConnectWithoutMatchInput[]
    createMany?: CallCreateManyMatchInputEnvelope
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutMatches_as_user1Input = {
    create?: XOR<UserCreateWithoutMatches_as_user1Input, UserUncheckedCreateWithoutMatches_as_user1Input>
    connectOrCreate?: UserCreateOrConnectWithoutMatches_as_user1Input
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMatches_as_user2Input = {
    create?: XOR<UserCreateWithoutMatches_as_user2Input, UserUncheckedCreateWithoutMatches_as_user2Input>
    connectOrCreate?: UserCreateOrConnectWithoutMatches_as_user2Input
    connect?: UserWhereUniqueInput
  }

  export type CallUncheckedCreateNestedManyWithoutMatchInput = {
    create?: XOR<CallCreateWithoutMatchInput, CallUncheckedCreateWithoutMatchInput> | CallCreateWithoutMatchInput[] | CallUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: CallCreateOrConnectWithoutMatchInput | CallCreateOrConnectWithoutMatchInput[]
    createMany?: CallCreateManyMatchInputEnvelope
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[]
  }

  export type CallUpdateManyWithoutMatchNestedInput = {
    create?: XOR<CallCreateWithoutMatchInput, CallUncheckedCreateWithoutMatchInput> | CallCreateWithoutMatchInput[] | CallUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: CallCreateOrConnectWithoutMatchInput | CallCreateOrConnectWithoutMatchInput[]
    upsert?: CallUpsertWithWhereUniqueWithoutMatchInput | CallUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: CallCreateManyMatchInputEnvelope
    set?: CallWhereUniqueInput | CallWhereUniqueInput[]
    disconnect?: CallWhereUniqueInput | CallWhereUniqueInput[]
    delete?: CallWhereUniqueInput | CallWhereUniqueInput[]
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[]
    update?: CallUpdateWithWhereUniqueWithoutMatchInput | CallUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: CallUpdateManyWithWhereWithoutMatchInput | CallUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: CallScalarWhereInput | CallScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutMatches_as_user1NestedInput = {
    create?: XOR<UserCreateWithoutMatches_as_user1Input, UserUncheckedCreateWithoutMatches_as_user1Input>
    connectOrCreate?: UserCreateOrConnectWithoutMatches_as_user1Input
    upsert?: UserUpsertWithoutMatches_as_user1Input
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMatches_as_user1Input, UserUpdateWithoutMatches_as_user1Input>, UserUncheckedUpdateWithoutMatches_as_user1Input>
  }

  export type UserUpdateOneRequiredWithoutMatches_as_user2NestedInput = {
    create?: XOR<UserCreateWithoutMatches_as_user2Input, UserUncheckedCreateWithoutMatches_as_user2Input>
    connectOrCreate?: UserCreateOrConnectWithoutMatches_as_user2Input
    upsert?: UserUpsertWithoutMatches_as_user2Input
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMatches_as_user2Input, UserUpdateWithoutMatches_as_user2Input>, UserUncheckedUpdateWithoutMatches_as_user2Input>
  }

  export type CallUncheckedUpdateManyWithoutMatchNestedInput = {
    create?: XOR<CallCreateWithoutMatchInput, CallUncheckedCreateWithoutMatchInput> | CallCreateWithoutMatchInput[] | CallUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: CallCreateOrConnectWithoutMatchInput | CallCreateOrConnectWithoutMatchInput[]
    upsert?: CallUpsertWithWhereUniqueWithoutMatchInput | CallUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: CallCreateManyMatchInputEnvelope
    set?: CallWhereUniqueInput | CallWhereUniqueInput[]
    disconnect?: CallWhereUniqueInput | CallWhereUniqueInput[]
    delete?: CallWhereUniqueInput | CallWhereUniqueInput[]
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[]
    update?: CallUpdateWithWhereUniqueWithoutMatchInput | CallUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: CallUpdateManyWithWhereWithoutMatchInput | CallUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: CallScalarWhereInput | CallScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCalls_initiatedInput = {
    create?: XOR<UserCreateWithoutCalls_initiatedInput, UserUncheckedCreateWithoutCalls_initiatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutCalls_initiatedInput
    connect?: UserWhereUniqueInput
  }

  export type MatchCreateNestedOneWithoutCallsInput = {
    create?: XOR<MatchCreateWithoutCallsInput, MatchUncheckedCreateWithoutCallsInput>
    connectOrCreate?: MatchCreateOrConnectWithoutCallsInput
    connect?: MatchWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCalls_receivedInput = {
    create?: XOR<UserCreateWithoutCalls_receivedInput, UserUncheckedCreateWithoutCalls_receivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutCalls_receivedInput
    connect?: UserWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutCalls_initiatedNestedInput = {
    create?: XOR<UserCreateWithoutCalls_initiatedInput, UserUncheckedCreateWithoutCalls_initiatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutCalls_initiatedInput
    upsert?: UserUpsertWithoutCalls_initiatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCalls_initiatedInput, UserUpdateWithoutCalls_initiatedInput>, UserUncheckedUpdateWithoutCalls_initiatedInput>
  }

  export type MatchUpdateOneRequiredWithoutCallsNestedInput = {
    create?: XOR<MatchCreateWithoutCallsInput, MatchUncheckedCreateWithoutCallsInput>
    connectOrCreate?: MatchCreateOrConnectWithoutCallsInput
    upsert?: MatchUpsertWithoutCallsInput
    connect?: MatchWhereUniqueInput
    update?: XOR<XOR<MatchUpdateToOneWithWhereWithoutCallsInput, MatchUpdateWithoutCallsInput>, MatchUncheckedUpdateWithoutCallsInput>
  }

  export type UserUpdateOneRequiredWithoutCalls_receivedNestedInput = {
    create?: XOR<UserCreateWithoutCalls_receivedInput, UserUncheckedCreateWithoutCalls_receivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutCalls_receivedInput
    upsert?: UserUpsertWithoutCalls_receivedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCalls_receivedInput, UserUpdateWithoutCalls_receivedInput>, UserUncheckedUpdateWithoutCalls_receivedInput>
  }

  export type UserCreateNestedOneWithoutReports_madeInput = {
    create?: XOR<UserCreateWithoutReports_madeInput, UserUncheckedCreateWithoutReports_madeInput>
    connectOrCreate?: UserCreateOrConnectWithoutReports_madeInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReports_receivedInput = {
    create?: XOR<UserCreateWithoutReports_receivedInput, UserUncheckedCreateWithoutReports_receivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutReports_receivedInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutReports_madeNestedInput = {
    create?: XOR<UserCreateWithoutReports_madeInput, UserUncheckedCreateWithoutReports_madeInput>
    connectOrCreate?: UserCreateOrConnectWithoutReports_madeInput
    upsert?: UserUpsertWithoutReports_madeInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReports_madeInput, UserUpdateWithoutReports_madeInput>, UserUncheckedUpdateWithoutReports_madeInput>
  }

  export type UserUpdateOneWithoutReports_receivedNestedInput = {
    create?: XOR<UserCreateWithoutReports_receivedInput, UserUncheckedCreateWithoutReports_receivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutReports_receivedInput
    upsert?: UserUpsertWithoutReports_receivedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReports_receivedInput, UserUpdateWithoutReports_receivedInput>, UserUncheckedUpdateWithoutReports_receivedInput>
  }

  export type UserCreateNestedOneWithoutBlocks_receivedInput = {
    create?: XOR<UserCreateWithoutBlocks_receivedInput, UserUncheckedCreateWithoutBlocks_receivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlocks_receivedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBlocks_madeInput = {
    create?: XOR<UserCreateWithoutBlocks_madeInput, UserUncheckedCreateWithoutBlocks_madeInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlocks_madeInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBlocks_receivedNestedInput = {
    create?: XOR<UserCreateWithoutBlocks_receivedInput, UserUncheckedCreateWithoutBlocks_receivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlocks_receivedInput
    upsert?: UserUpsertWithoutBlocks_receivedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBlocks_receivedInput, UserUpdateWithoutBlocks_receivedInput>, UserUncheckedUpdateWithoutBlocks_receivedInput>
  }

  export type UserUpdateOneRequiredWithoutBlocks_madeNestedInput = {
    create?: XOR<UserCreateWithoutBlocks_madeInput, UserUncheckedCreateWithoutBlocks_madeInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlocks_madeInput
    upsert?: UserUpsertWithoutBlocks_madeInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBlocks_madeInput, UserUpdateWithoutBlocks_madeInput>, UserUncheckedUpdateWithoutBlocks_madeInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BlockCreateWithoutBlockedInput = {
    created_at?: Date | string
    blocker: UserCreateNestedOneWithoutBlocks_madeInput
  }

  export type BlockUncheckedCreateWithoutBlockedInput = {
    id?: number
    blocker_id: number
    created_at?: Date | string
  }

  export type BlockCreateOrConnectWithoutBlockedInput = {
    where: BlockWhereUniqueInput
    create: XOR<BlockCreateWithoutBlockedInput, BlockUncheckedCreateWithoutBlockedInput>
  }

  export type BlockCreateManyBlockedInputEnvelope = {
    data: BlockCreateManyBlockedInput | BlockCreateManyBlockedInput[]
    skipDuplicates?: boolean
  }

  export type BlockCreateWithoutBlockerInput = {
    created_at?: Date | string
    blocked: UserCreateNestedOneWithoutBlocks_receivedInput
  }

  export type BlockUncheckedCreateWithoutBlockerInput = {
    id?: number
    blocked_id: number
    created_at?: Date | string
  }

  export type BlockCreateOrConnectWithoutBlockerInput = {
    where: BlockWhereUniqueInput
    create: XOR<BlockCreateWithoutBlockerInput, BlockUncheckedCreateWithoutBlockerInput>
  }

  export type BlockCreateManyBlockerInputEnvelope = {
    data: BlockCreateManyBlockerInput | BlockCreateManyBlockerInput[]
    skipDuplicates?: boolean
  }

  export type CallCreateWithoutInitiator_userInput = {
    id?: bigint | number
    call_segment_uuid?: string
    previous_call_segment_uuid?: string | null
    call_type: string
    status: string
    start_time?: Date | string | null
    end_time?: Date | string | null
    duration_seconds?: number | null
    end_reason?: string | null
    initiated_at?: Date | string
    match: MatchCreateNestedOneWithoutCallsInput
    receiver_user: UserCreateNestedOneWithoutCalls_receivedInput
  }

  export type CallUncheckedCreateWithoutInitiator_userInput = {
    id?: bigint | number
    match_id: number
    call_segment_uuid?: string
    previous_call_segment_uuid?: string | null
    receiver_user_id: number
    call_type: string
    status: string
    start_time?: Date | string | null
    end_time?: Date | string | null
    duration_seconds?: number | null
    end_reason?: string | null
    initiated_at?: Date | string
  }

  export type CallCreateOrConnectWithoutInitiator_userInput = {
    where: CallWhereUniqueInput
    create: XOR<CallCreateWithoutInitiator_userInput, CallUncheckedCreateWithoutInitiator_userInput>
  }

  export type CallCreateManyInitiator_userInputEnvelope = {
    data: CallCreateManyInitiator_userInput | CallCreateManyInitiator_userInput[]
    skipDuplicates?: boolean
  }

  export type CallCreateWithoutReceiver_userInput = {
    id?: bigint | number
    call_segment_uuid?: string
    previous_call_segment_uuid?: string | null
    call_type: string
    status: string
    start_time?: Date | string | null
    end_time?: Date | string | null
    duration_seconds?: number | null
    end_reason?: string | null
    initiated_at?: Date | string
    initiator_user: UserCreateNestedOneWithoutCalls_initiatedInput
    match: MatchCreateNestedOneWithoutCallsInput
  }

  export type CallUncheckedCreateWithoutReceiver_userInput = {
    id?: bigint | number
    match_id: number
    call_segment_uuid?: string
    previous_call_segment_uuid?: string | null
    initiator_user_id: number
    call_type: string
    status: string
    start_time?: Date | string | null
    end_time?: Date | string | null
    duration_seconds?: number | null
    end_reason?: string | null
    initiated_at?: Date | string
  }

  export type CallCreateOrConnectWithoutReceiver_userInput = {
    where: CallWhereUniqueInput
    create: XOR<CallCreateWithoutReceiver_userInput, CallUncheckedCreateWithoutReceiver_userInput>
  }

  export type CallCreateManyReceiver_userInputEnvelope = {
    data: CallCreateManyReceiver_userInput | CallCreateManyReceiver_userInput[]
    skipDuplicates?: boolean
  }

  export type LikeCreateWithoutFrom_userInput = {
    is_like: boolean
    timestamp?: Date | string
    to_user: UserCreateNestedOneWithoutLikes_toInput
  }

  export type LikeUncheckedCreateWithoutFrom_userInput = {
    id?: number
    to_user_id: number
    is_like: boolean
    timestamp?: Date | string
  }

  export type LikeCreateOrConnectWithoutFrom_userInput = {
    where: LikeWhereUniqueInput
    create: XOR<LikeCreateWithoutFrom_userInput, LikeUncheckedCreateWithoutFrom_userInput>
  }

  export type LikeCreateManyFrom_userInputEnvelope = {
    data: LikeCreateManyFrom_userInput | LikeCreateManyFrom_userInput[]
    skipDuplicates?: boolean
  }

  export type LikeCreateWithoutTo_userInput = {
    is_like: boolean
    timestamp?: Date | string
    from_user: UserCreateNestedOneWithoutLikes_fromInput
  }

  export type LikeUncheckedCreateWithoutTo_userInput = {
    id?: number
    from_user_id: number
    is_like: boolean
    timestamp?: Date | string
  }

  export type LikeCreateOrConnectWithoutTo_userInput = {
    where: LikeWhereUniqueInput
    create: XOR<LikeCreateWithoutTo_userInput, LikeUncheckedCreateWithoutTo_userInput>
  }

  export type LikeCreateManyTo_userInputEnvelope = {
    data: LikeCreateManyTo_userInput | LikeCreateManyTo_userInput[]
    skipDuplicates?: boolean
  }

  export type MatchCreateWithoutUser1Input = {
    matched_at?: Date | string
    is_active?: boolean
    closed_at?: Date | string | null
    close_reason?: string | null
    default_voice_call_duration_sec?: number
    default_video_call_duration_sec?: number
    last_interaction_at?: Date | string
    match_inactivity_timeout_interval?: string
    calls?: CallCreateNestedManyWithoutMatchInput
    user2: UserCreateNestedOneWithoutMatches_as_user2Input
  }

  export type MatchUncheckedCreateWithoutUser1Input = {
    id?: number
    user2_id: number
    matched_at?: Date | string
    is_active?: boolean
    closed_at?: Date | string | null
    close_reason?: string | null
    default_voice_call_duration_sec?: number
    default_video_call_duration_sec?: number
    last_interaction_at?: Date | string
    match_inactivity_timeout_interval?: string
    calls?: CallUncheckedCreateNestedManyWithoutMatchInput
  }

  export type MatchCreateOrConnectWithoutUser1Input = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutUser1Input, MatchUncheckedCreateWithoutUser1Input>
  }

  export type MatchCreateManyUser1InputEnvelope = {
    data: MatchCreateManyUser1Input | MatchCreateManyUser1Input[]
    skipDuplicates?: boolean
  }

  export type MatchCreateWithoutUser2Input = {
    matched_at?: Date | string
    is_active?: boolean
    closed_at?: Date | string | null
    close_reason?: string | null
    default_voice_call_duration_sec?: number
    default_video_call_duration_sec?: number
    last_interaction_at?: Date | string
    match_inactivity_timeout_interval?: string
    calls?: CallCreateNestedManyWithoutMatchInput
    user1: UserCreateNestedOneWithoutMatches_as_user1Input
  }

  export type MatchUncheckedCreateWithoutUser2Input = {
    id?: number
    user1_id: number
    matched_at?: Date | string
    is_active?: boolean
    closed_at?: Date | string | null
    close_reason?: string | null
    default_voice_call_duration_sec?: number
    default_video_call_duration_sec?: number
    last_interaction_at?: Date | string
    match_inactivity_timeout_interval?: string
    calls?: CallUncheckedCreateNestedManyWithoutMatchInput
  }

  export type MatchCreateOrConnectWithoutUser2Input = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutUser2Input, MatchUncheckedCreateWithoutUser2Input>
  }

  export type MatchCreateManyUser2InputEnvelope = {
    data: MatchCreateManyUser2Input | MatchCreateManyUser2Input[]
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutReportedInput = {
    reason: string
    created_at?: Date | string
    status?: string
    reporter?: UserCreateNestedOneWithoutReports_madeInput
  }

  export type ReportUncheckedCreateWithoutReportedInput = {
    id?: number
    reporter_id?: number | null
    reason: string
    created_at?: Date | string
    status?: string
  }

  export type ReportCreateOrConnectWithoutReportedInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutReportedInput, ReportUncheckedCreateWithoutReportedInput>
  }

  export type ReportCreateManyReportedInputEnvelope = {
    data: ReportCreateManyReportedInput | ReportCreateManyReportedInput[]
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutReporterInput = {
    reason: string
    created_at?: Date | string
    status?: string
    reported?: UserCreateNestedOneWithoutReports_receivedInput
  }

  export type ReportUncheckedCreateWithoutReporterInput = {
    id?: number
    reason: string
    created_at?: Date | string
    reported_user_id?: number | null
    status?: string
  }

  export type ReportCreateOrConnectWithoutReporterInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput>
  }

  export type ReportCreateManyReporterInputEnvelope = {
    data: ReportCreateManyReporterInput | ReportCreateManyReporterInput[]
    skipDuplicates?: boolean
  }

  export type BlockUpsertWithWhereUniqueWithoutBlockedInput = {
    where: BlockWhereUniqueInput
    update: XOR<BlockUpdateWithoutBlockedInput, BlockUncheckedUpdateWithoutBlockedInput>
    create: XOR<BlockCreateWithoutBlockedInput, BlockUncheckedCreateWithoutBlockedInput>
  }

  export type BlockUpdateWithWhereUniqueWithoutBlockedInput = {
    where: BlockWhereUniqueInput
    data: XOR<BlockUpdateWithoutBlockedInput, BlockUncheckedUpdateWithoutBlockedInput>
  }

  export type BlockUpdateManyWithWhereWithoutBlockedInput = {
    where: BlockScalarWhereInput
    data: XOR<BlockUpdateManyMutationInput, BlockUncheckedUpdateManyWithoutBlockedInput>
  }

  export type BlockScalarWhereInput = {
    AND?: BlockScalarWhereInput | BlockScalarWhereInput[]
    OR?: BlockScalarWhereInput[]
    NOT?: BlockScalarWhereInput | BlockScalarWhereInput[]
    id?: IntFilter<"Block"> | number
    blocker_id?: IntFilter<"Block"> | number
    blocked_id?: IntFilter<"Block"> | number
    created_at?: DateTimeFilter<"Block"> | Date | string
  }

  export type BlockUpsertWithWhereUniqueWithoutBlockerInput = {
    where: BlockWhereUniqueInput
    update: XOR<BlockUpdateWithoutBlockerInput, BlockUncheckedUpdateWithoutBlockerInput>
    create: XOR<BlockCreateWithoutBlockerInput, BlockUncheckedCreateWithoutBlockerInput>
  }

  export type BlockUpdateWithWhereUniqueWithoutBlockerInput = {
    where: BlockWhereUniqueInput
    data: XOR<BlockUpdateWithoutBlockerInput, BlockUncheckedUpdateWithoutBlockerInput>
  }

  export type BlockUpdateManyWithWhereWithoutBlockerInput = {
    where: BlockScalarWhereInput
    data: XOR<BlockUpdateManyMutationInput, BlockUncheckedUpdateManyWithoutBlockerInput>
  }

  export type CallUpsertWithWhereUniqueWithoutInitiator_userInput = {
    where: CallWhereUniqueInput
    update: XOR<CallUpdateWithoutInitiator_userInput, CallUncheckedUpdateWithoutInitiator_userInput>
    create: XOR<CallCreateWithoutInitiator_userInput, CallUncheckedCreateWithoutInitiator_userInput>
  }

  export type CallUpdateWithWhereUniqueWithoutInitiator_userInput = {
    where: CallWhereUniqueInput
    data: XOR<CallUpdateWithoutInitiator_userInput, CallUncheckedUpdateWithoutInitiator_userInput>
  }

  export type CallUpdateManyWithWhereWithoutInitiator_userInput = {
    where: CallScalarWhereInput
    data: XOR<CallUpdateManyMutationInput, CallUncheckedUpdateManyWithoutInitiator_userInput>
  }

  export type CallScalarWhereInput = {
    AND?: CallScalarWhereInput | CallScalarWhereInput[]
    OR?: CallScalarWhereInput[]
    NOT?: CallScalarWhereInput | CallScalarWhereInput[]
    id?: BigIntFilter<"Call"> | bigint | number
    match_id?: IntFilter<"Call"> | number
    call_segment_uuid?: UuidFilter<"Call"> | string
    previous_call_segment_uuid?: UuidNullableFilter<"Call"> | string | null
    initiator_user_id?: IntFilter<"Call"> | number
    receiver_user_id?: IntFilter<"Call"> | number
    call_type?: StringFilter<"Call"> | string
    status?: StringFilter<"Call"> | string
    start_time?: DateTimeNullableFilter<"Call"> | Date | string | null
    end_time?: DateTimeNullableFilter<"Call"> | Date | string | null
    duration_seconds?: IntNullableFilter<"Call"> | number | null
    end_reason?: StringNullableFilter<"Call"> | string | null
    initiated_at?: DateTimeFilter<"Call"> | Date | string
  }

  export type CallUpsertWithWhereUniqueWithoutReceiver_userInput = {
    where: CallWhereUniqueInput
    update: XOR<CallUpdateWithoutReceiver_userInput, CallUncheckedUpdateWithoutReceiver_userInput>
    create: XOR<CallCreateWithoutReceiver_userInput, CallUncheckedCreateWithoutReceiver_userInput>
  }

  export type CallUpdateWithWhereUniqueWithoutReceiver_userInput = {
    where: CallWhereUniqueInput
    data: XOR<CallUpdateWithoutReceiver_userInput, CallUncheckedUpdateWithoutReceiver_userInput>
  }

  export type CallUpdateManyWithWhereWithoutReceiver_userInput = {
    where: CallScalarWhereInput
    data: XOR<CallUpdateManyMutationInput, CallUncheckedUpdateManyWithoutReceiver_userInput>
  }

  export type LikeUpsertWithWhereUniqueWithoutFrom_userInput = {
    where: LikeWhereUniqueInput
    update: XOR<LikeUpdateWithoutFrom_userInput, LikeUncheckedUpdateWithoutFrom_userInput>
    create: XOR<LikeCreateWithoutFrom_userInput, LikeUncheckedCreateWithoutFrom_userInput>
  }

  export type LikeUpdateWithWhereUniqueWithoutFrom_userInput = {
    where: LikeWhereUniqueInput
    data: XOR<LikeUpdateWithoutFrom_userInput, LikeUncheckedUpdateWithoutFrom_userInput>
  }

  export type LikeUpdateManyWithWhereWithoutFrom_userInput = {
    where: LikeScalarWhereInput
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyWithoutFrom_userInput>
  }

  export type LikeScalarWhereInput = {
    AND?: LikeScalarWhereInput | LikeScalarWhereInput[]
    OR?: LikeScalarWhereInput[]
    NOT?: LikeScalarWhereInput | LikeScalarWhereInput[]
    id?: IntFilter<"Like"> | number
    from_user_id?: IntFilter<"Like"> | number
    to_user_id?: IntFilter<"Like"> | number
    is_like?: BoolFilter<"Like"> | boolean
    timestamp?: DateTimeFilter<"Like"> | Date | string
  }

  export type LikeUpsertWithWhereUniqueWithoutTo_userInput = {
    where: LikeWhereUniqueInput
    update: XOR<LikeUpdateWithoutTo_userInput, LikeUncheckedUpdateWithoutTo_userInput>
    create: XOR<LikeCreateWithoutTo_userInput, LikeUncheckedCreateWithoutTo_userInput>
  }

  export type LikeUpdateWithWhereUniqueWithoutTo_userInput = {
    where: LikeWhereUniqueInput
    data: XOR<LikeUpdateWithoutTo_userInput, LikeUncheckedUpdateWithoutTo_userInput>
  }

  export type LikeUpdateManyWithWhereWithoutTo_userInput = {
    where: LikeScalarWhereInput
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyWithoutTo_userInput>
  }

  export type MatchUpsertWithWhereUniqueWithoutUser1Input = {
    where: MatchWhereUniqueInput
    update: XOR<MatchUpdateWithoutUser1Input, MatchUncheckedUpdateWithoutUser1Input>
    create: XOR<MatchCreateWithoutUser1Input, MatchUncheckedCreateWithoutUser1Input>
  }

  export type MatchUpdateWithWhereUniqueWithoutUser1Input = {
    where: MatchWhereUniqueInput
    data: XOR<MatchUpdateWithoutUser1Input, MatchUncheckedUpdateWithoutUser1Input>
  }

  export type MatchUpdateManyWithWhereWithoutUser1Input = {
    where: MatchScalarWhereInput
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyWithoutUser1Input>
  }

  export type MatchScalarWhereInput = {
    AND?: MatchScalarWhereInput | MatchScalarWhereInput[]
    OR?: MatchScalarWhereInput[]
    NOT?: MatchScalarWhereInput | MatchScalarWhereInput[]
    id?: IntFilter<"Match"> | number
    user1_id?: IntFilter<"Match"> | number
    user2_id?: IntFilter<"Match"> | number
    matched_at?: DateTimeFilter<"Match"> | Date | string
    is_active?: BoolFilter<"Match"> | boolean
    closed_at?: DateTimeNullableFilter<"Match"> | Date | string | null
    close_reason?: StringNullableFilter<"Match"> | string | null
    default_voice_call_duration_sec?: IntFilter<"Match"> | number
    default_video_call_duration_sec?: IntFilter<"Match"> | number
    last_interaction_at?: DateTimeFilter<"Match"> | Date | string
    match_inactivity_timeout_interval?: StringFilter<"Match"> | string
  }

  export type MatchUpsertWithWhereUniqueWithoutUser2Input = {
    where: MatchWhereUniqueInput
    update: XOR<MatchUpdateWithoutUser2Input, MatchUncheckedUpdateWithoutUser2Input>
    create: XOR<MatchCreateWithoutUser2Input, MatchUncheckedCreateWithoutUser2Input>
  }

  export type MatchUpdateWithWhereUniqueWithoutUser2Input = {
    where: MatchWhereUniqueInput
    data: XOR<MatchUpdateWithoutUser2Input, MatchUncheckedUpdateWithoutUser2Input>
  }

  export type MatchUpdateManyWithWhereWithoutUser2Input = {
    where: MatchScalarWhereInput
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyWithoutUser2Input>
  }

  export type ReportUpsertWithWhereUniqueWithoutReportedInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutReportedInput, ReportUncheckedUpdateWithoutReportedInput>
    create: XOR<ReportCreateWithoutReportedInput, ReportUncheckedCreateWithoutReportedInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutReportedInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutReportedInput, ReportUncheckedUpdateWithoutReportedInput>
  }

  export type ReportUpdateManyWithWhereWithoutReportedInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutReportedInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    id?: IntFilter<"Report"> | number
    reporter_id?: IntNullableFilter<"Report"> | number | null
    reason?: StringFilter<"Report"> | string
    created_at?: DateTimeFilter<"Report"> | Date | string
    reported_user_id?: IntNullableFilter<"Report"> | number | null
    status?: StringFilter<"Report"> | string
  }

  export type ReportUpsertWithWhereUniqueWithoutReporterInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutReporterInput, ReportUncheckedUpdateWithoutReporterInput>
    create: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutReporterInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutReporterInput, ReportUncheckedUpdateWithoutReporterInput>
  }

  export type ReportUpdateManyWithWhereWithoutReporterInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutReporterInput>
  }

  export type UserCreateWithoutLikes_fromInput = {
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallCreateNestedManyWithoutReceiver_userInput
    likes_to?: LikeCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchCreateNestedManyWithoutUser2Input
    reports_received?: ReportCreateNestedManyWithoutReportedInput
    reports_made?: ReportCreateNestedManyWithoutReporterInput
  }

  export type UserUncheckedCreateWithoutLikes_fromInput = {
    id?: number
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockUncheckedCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockUncheckedCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallUncheckedCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallUncheckedCreateNestedManyWithoutReceiver_userInput
    likes_to?: LikeUncheckedCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchUncheckedCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchUncheckedCreateNestedManyWithoutUser2Input
    reports_received?: ReportUncheckedCreateNestedManyWithoutReportedInput
    reports_made?: ReportUncheckedCreateNestedManyWithoutReporterInput
  }

  export type UserCreateOrConnectWithoutLikes_fromInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikes_fromInput, UserUncheckedCreateWithoutLikes_fromInput>
  }

  export type UserCreateWithoutLikes_toInput = {
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeCreateNestedManyWithoutFrom_userInput
    matches_as_user1?: MatchCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchCreateNestedManyWithoutUser2Input
    reports_received?: ReportCreateNestedManyWithoutReportedInput
    reports_made?: ReportCreateNestedManyWithoutReporterInput
  }

  export type UserUncheckedCreateWithoutLikes_toInput = {
    id?: number
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockUncheckedCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockUncheckedCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallUncheckedCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallUncheckedCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeUncheckedCreateNestedManyWithoutFrom_userInput
    matches_as_user1?: MatchUncheckedCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchUncheckedCreateNestedManyWithoutUser2Input
    reports_received?: ReportUncheckedCreateNestedManyWithoutReportedInput
    reports_made?: ReportUncheckedCreateNestedManyWithoutReporterInput
  }

  export type UserCreateOrConnectWithoutLikes_toInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikes_toInput, UserUncheckedCreateWithoutLikes_toInput>
  }

  export type UserUpsertWithoutLikes_fromInput = {
    update: XOR<UserUpdateWithoutLikes_fromInput, UserUncheckedUpdateWithoutLikes_fromInput>
    create: XOR<UserCreateWithoutLikes_fromInput, UserUncheckedCreateWithoutLikes_fromInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLikes_fromInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLikes_fromInput, UserUncheckedUpdateWithoutLikes_fromInput>
  }

  export type UserUpdateWithoutLikes_fromInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUpdateManyWithoutReceiver_userNestedInput
    likes_to?: LikeUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUpdateManyWithoutReporterNestedInput
  }

  export type UserUncheckedUpdateWithoutLikes_fromInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUncheckedUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUncheckedUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUncheckedUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUncheckedUpdateManyWithoutReceiver_userNestedInput
    likes_to?: LikeUncheckedUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUncheckedUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUncheckedUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUncheckedUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUncheckedUpdateManyWithoutReporterNestedInput
  }

  export type UserUpsertWithoutLikes_toInput = {
    update: XOR<UserUpdateWithoutLikes_toInput, UserUncheckedUpdateWithoutLikes_toInput>
    create: XOR<UserCreateWithoutLikes_toInput, UserUncheckedCreateWithoutLikes_toInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLikes_toInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLikes_toInput, UserUncheckedUpdateWithoutLikes_toInput>
  }

  export type UserUpdateWithoutLikes_toInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUpdateManyWithoutFrom_userNestedInput
    matches_as_user1?: MatchUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUpdateManyWithoutReporterNestedInput
  }

  export type UserUncheckedUpdateWithoutLikes_toInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUncheckedUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUncheckedUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUncheckedUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUncheckedUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUncheckedUpdateManyWithoutFrom_userNestedInput
    matches_as_user1?: MatchUncheckedUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUncheckedUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUncheckedUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUncheckedUpdateManyWithoutReporterNestedInput
  }

  export type CallCreateWithoutMatchInput = {
    id?: bigint | number
    call_segment_uuid?: string
    previous_call_segment_uuid?: string | null
    call_type: string
    status: string
    start_time?: Date | string | null
    end_time?: Date | string | null
    duration_seconds?: number | null
    end_reason?: string | null
    initiated_at?: Date | string
    initiator_user: UserCreateNestedOneWithoutCalls_initiatedInput
    receiver_user: UserCreateNestedOneWithoutCalls_receivedInput
  }

  export type CallUncheckedCreateWithoutMatchInput = {
    id?: bigint | number
    call_segment_uuid?: string
    previous_call_segment_uuid?: string | null
    initiator_user_id: number
    receiver_user_id: number
    call_type: string
    status: string
    start_time?: Date | string | null
    end_time?: Date | string | null
    duration_seconds?: number | null
    end_reason?: string | null
    initiated_at?: Date | string
  }

  export type CallCreateOrConnectWithoutMatchInput = {
    where: CallWhereUniqueInput
    create: XOR<CallCreateWithoutMatchInput, CallUncheckedCreateWithoutMatchInput>
  }

  export type CallCreateManyMatchInputEnvelope = {
    data: CallCreateManyMatchInput | CallCreateManyMatchInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutMatches_as_user1Input = {
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeCreateNestedManyWithoutTo_userInput
    matches_as_user2?: MatchCreateNestedManyWithoutUser2Input
    reports_received?: ReportCreateNestedManyWithoutReportedInput
    reports_made?: ReportCreateNestedManyWithoutReporterInput
  }

  export type UserUncheckedCreateWithoutMatches_as_user1Input = {
    id?: number
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockUncheckedCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockUncheckedCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallUncheckedCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallUncheckedCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeUncheckedCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeUncheckedCreateNestedManyWithoutTo_userInput
    matches_as_user2?: MatchUncheckedCreateNestedManyWithoutUser2Input
    reports_received?: ReportUncheckedCreateNestedManyWithoutReportedInput
    reports_made?: ReportUncheckedCreateNestedManyWithoutReporterInput
  }

  export type UserCreateOrConnectWithoutMatches_as_user1Input = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMatches_as_user1Input, UserUncheckedCreateWithoutMatches_as_user1Input>
  }

  export type UserCreateWithoutMatches_as_user2Input = {
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchCreateNestedManyWithoutUser1Input
    reports_received?: ReportCreateNestedManyWithoutReportedInput
    reports_made?: ReportCreateNestedManyWithoutReporterInput
  }

  export type UserUncheckedCreateWithoutMatches_as_user2Input = {
    id?: number
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockUncheckedCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockUncheckedCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallUncheckedCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallUncheckedCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeUncheckedCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeUncheckedCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchUncheckedCreateNestedManyWithoutUser1Input
    reports_received?: ReportUncheckedCreateNestedManyWithoutReportedInput
    reports_made?: ReportUncheckedCreateNestedManyWithoutReporterInput
  }

  export type UserCreateOrConnectWithoutMatches_as_user2Input = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMatches_as_user2Input, UserUncheckedCreateWithoutMatches_as_user2Input>
  }

  export type CallUpsertWithWhereUniqueWithoutMatchInput = {
    where: CallWhereUniqueInput
    update: XOR<CallUpdateWithoutMatchInput, CallUncheckedUpdateWithoutMatchInput>
    create: XOR<CallCreateWithoutMatchInput, CallUncheckedCreateWithoutMatchInput>
  }

  export type CallUpdateWithWhereUniqueWithoutMatchInput = {
    where: CallWhereUniqueInput
    data: XOR<CallUpdateWithoutMatchInput, CallUncheckedUpdateWithoutMatchInput>
  }

  export type CallUpdateManyWithWhereWithoutMatchInput = {
    where: CallScalarWhereInput
    data: XOR<CallUpdateManyMutationInput, CallUncheckedUpdateManyWithoutMatchInput>
  }

  export type UserUpsertWithoutMatches_as_user1Input = {
    update: XOR<UserUpdateWithoutMatches_as_user1Input, UserUncheckedUpdateWithoutMatches_as_user1Input>
    create: XOR<UserCreateWithoutMatches_as_user1Input, UserUncheckedCreateWithoutMatches_as_user1Input>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMatches_as_user1Input = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMatches_as_user1Input, UserUncheckedUpdateWithoutMatches_as_user1Input>
  }

  export type UserUpdateWithoutMatches_as_user1Input = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUpdateManyWithoutTo_userNestedInput
    matches_as_user2?: MatchUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUpdateManyWithoutReporterNestedInput
  }

  export type UserUncheckedUpdateWithoutMatches_as_user1Input = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUncheckedUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUncheckedUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUncheckedUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUncheckedUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUncheckedUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUncheckedUpdateManyWithoutTo_userNestedInput
    matches_as_user2?: MatchUncheckedUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUncheckedUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUncheckedUpdateManyWithoutReporterNestedInput
  }

  export type UserUpsertWithoutMatches_as_user2Input = {
    update: XOR<UserUpdateWithoutMatches_as_user2Input, UserUncheckedUpdateWithoutMatches_as_user2Input>
    create: XOR<UserCreateWithoutMatches_as_user2Input, UserUncheckedCreateWithoutMatches_as_user2Input>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMatches_as_user2Input = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMatches_as_user2Input, UserUncheckedUpdateWithoutMatches_as_user2Input>
  }

  export type UserUpdateWithoutMatches_as_user2Input = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUpdateManyWithoutUser1NestedInput
    reports_received?: ReportUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUpdateManyWithoutReporterNestedInput
  }

  export type UserUncheckedUpdateWithoutMatches_as_user2Input = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUncheckedUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUncheckedUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUncheckedUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUncheckedUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUncheckedUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUncheckedUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUncheckedUpdateManyWithoutUser1NestedInput
    reports_received?: ReportUncheckedUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUncheckedUpdateManyWithoutReporterNestedInput
  }

  export type UserCreateWithoutCalls_initiatedInput = {
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockCreateNestedManyWithoutBlockerInput
    calls_received?: CallCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchCreateNestedManyWithoutUser2Input
    reports_received?: ReportCreateNestedManyWithoutReportedInput
    reports_made?: ReportCreateNestedManyWithoutReporterInput
  }

  export type UserUncheckedCreateWithoutCalls_initiatedInput = {
    id?: number
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockUncheckedCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockUncheckedCreateNestedManyWithoutBlockerInput
    calls_received?: CallUncheckedCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeUncheckedCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeUncheckedCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchUncheckedCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchUncheckedCreateNestedManyWithoutUser2Input
    reports_received?: ReportUncheckedCreateNestedManyWithoutReportedInput
    reports_made?: ReportUncheckedCreateNestedManyWithoutReporterInput
  }

  export type UserCreateOrConnectWithoutCalls_initiatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCalls_initiatedInput, UserUncheckedCreateWithoutCalls_initiatedInput>
  }

  export type MatchCreateWithoutCallsInput = {
    matched_at?: Date | string
    is_active?: boolean
    closed_at?: Date | string | null
    close_reason?: string | null
    default_voice_call_duration_sec?: number
    default_video_call_duration_sec?: number
    last_interaction_at?: Date | string
    match_inactivity_timeout_interval?: string
    user1: UserCreateNestedOneWithoutMatches_as_user1Input
    user2: UserCreateNestedOneWithoutMatches_as_user2Input
  }

  export type MatchUncheckedCreateWithoutCallsInput = {
    id?: number
    user1_id: number
    user2_id: number
    matched_at?: Date | string
    is_active?: boolean
    closed_at?: Date | string | null
    close_reason?: string | null
    default_voice_call_duration_sec?: number
    default_video_call_duration_sec?: number
    last_interaction_at?: Date | string
    match_inactivity_timeout_interval?: string
  }

  export type MatchCreateOrConnectWithoutCallsInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutCallsInput, MatchUncheckedCreateWithoutCallsInput>
  }

  export type UserCreateWithoutCalls_receivedInput = {
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallCreateNestedManyWithoutInitiator_userInput
    likes_from?: LikeCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchCreateNestedManyWithoutUser2Input
    reports_received?: ReportCreateNestedManyWithoutReportedInput
    reports_made?: ReportCreateNestedManyWithoutReporterInput
  }

  export type UserUncheckedCreateWithoutCalls_receivedInput = {
    id?: number
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockUncheckedCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockUncheckedCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallUncheckedCreateNestedManyWithoutInitiator_userInput
    likes_from?: LikeUncheckedCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeUncheckedCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchUncheckedCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchUncheckedCreateNestedManyWithoutUser2Input
    reports_received?: ReportUncheckedCreateNestedManyWithoutReportedInput
    reports_made?: ReportUncheckedCreateNestedManyWithoutReporterInput
  }

  export type UserCreateOrConnectWithoutCalls_receivedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCalls_receivedInput, UserUncheckedCreateWithoutCalls_receivedInput>
  }

  export type UserUpsertWithoutCalls_initiatedInput = {
    update: XOR<UserUpdateWithoutCalls_initiatedInput, UserUncheckedUpdateWithoutCalls_initiatedInput>
    create: XOR<UserCreateWithoutCalls_initiatedInput, UserUncheckedCreateWithoutCalls_initiatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCalls_initiatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCalls_initiatedInput, UserUncheckedUpdateWithoutCalls_initiatedInput>
  }

  export type UserUpdateWithoutCalls_initiatedInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUpdateManyWithoutBlockerNestedInput
    calls_received?: CallUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUpdateManyWithoutReporterNestedInput
  }

  export type UserUncheckedUpdateWithoutCalls_initiatedInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUncheckedUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUncheckedUpdateManyWithoutBlockerNestedInput
    calls_received?: CallUncheckedUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUncheckedUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUncheckedUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUncheckedUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUncheckedUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUncheckedUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUncheckedUpdateManyWithoutReporterNestedInput
  }

  export type MatchUpsertWithoutCallsInput = {
    update: XOR<MatchUpdateWithoutCallsInput, MatchUncheckedUpdateWithoutCallsInput>
    create: XOR<MatchCreateWithoutCallsInput, MatchUncheckedCreateWithoutCallsInput>
    where?: MatchWhereInput
  }

  export type MatchUpdateToOneWithWhereWithoutCallsInput = {
    where?: MatchWhereInput
    data: XOR<MatchUpdateWithoutCallsInput, MatchUncheckedUpdateWithoutCallsInput>
  }

  export type MatchUpdateWithoutCallsInput = {
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    closed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    close_reason?: NullableStringFieldUpdateOperationsInput | string | null
    default_voice_call_duration_sec?: IntFieldUpdateOperationsInput | number
    default_video_call_duration_sec?: IntFieldUpdateOperationsInput | number
    last_interaction_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_inactivity_timeout_interval?: StringFieldUpdateOperationsInput | string
    user1?: UserUpdateOneRequiredWithoutMatches_as_user1NestedInput
    user2?: UserUpdateOneRequiredWithoutMatches_as_user2NestedInput
  }

  export type MatchUncheckedUpdateWithoutCallsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user1_id?: IntFieldUpdateOperationsInput | number
    user2_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    closed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    close_reason?: NullableStringFieldUpdateOperationsInput | string | null
    default_voice_call_duration_sec?: IntFieldUpdateOperationsInput | number
    default_video_call_duration_sec?: IntFieldUpdateOperationsInput | number
    last_interaction_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_inactivity_timeout_interval?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutCalls_receivedInput = {
    update: XOR<UserUpdateWithoutCalls_receivedInput, UserUncheckedUpdateWithoutCalls_receivedInput>
    create: XOR<UserCreateWithoutCalls_receivedInput, UserUncheckedCreateWithoutCalls_receivedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCalls_receivedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCalls_receivedInput, UserUncheckedUpdateWithoutCalls_receivedInput>
  }

  export type UserUpdateWithoutCalls_receivedInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUpdateManyWithoutInitiator_userNestedInput
    likes_from?: LikeUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUpdateManyWithoutReporterNestedInput
  }

  export type UserUncheckedUpdateWithoutCalls_receivedInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUncheckedUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUncheckedUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUncheckedUpdateManyWithoutInitiator_userNestedInput
    likes_from?: LikeUncheckedUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUncheckedUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUncheckedUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUncheckedUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUncheckedUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUncheckedUpdateManyWithoutReporterNestedInput
  }

  export type UserCreateWithoutReports_madeInput = {
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchCreateNestedManyWithoutUser2Input
    reports_received?: ReportCreateNestedManyWithoutReportedInput
  }

  export type UserUncheckedCreateWithoutReports_madeInput = {
    id?: number
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockUncheckedCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockUncheckedCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallUncheckedCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallUncheckedCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeUncheckedCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeUncheckedCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchUncheckedCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchUncheckedCreateNestedManyWithoutUser2Input
    reports_received?: ReportUncheckedCreateNestedManyWithoutReportedInput
  }

  export type UserCreateOrConnectWithoutReports_madeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReports_madeInput, UserUncheckedCreateWithoutReports_madeInput>
  }

  export type UserCreateWithoutReports_receivedInput = {
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchCreateNestedManyWithoutUser2Input
    reports_made?: ReportCreateNestedManyWithoutReporterInput
  }

  export type UserUncheckedCreateWithoutReports_receivedInput = {
    id?: number
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockUncheckedCreateNestedManyWithoutBlockedInput
    blocks_made?: BlockUncheckedCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallUncheckedCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallUncheckedCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeUncheckedCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeUncheckedCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchUncheckedCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchUncheckedCreateNestedManyWithoutUser2Input
    reports_made?: ReportUncheckedCreateNestedManyWithoutReporterInput
  }

  export type UserCreateOrConnectWithoutReports_receivedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReports_receivedInput, UserUncheckedCreateWithoutReports_receivedInput>
  }

  export type UserUpsertWithoutReports_madeInput = {
    update: XOR<UserUpdateWithoutReports_madeInput, UserUncheckedUpdateWithoutReports_madeInput>
    create: XOR<UserCreateWithoutReports_madeInput, UserUncheckedCreateWithoutReports_madeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReports_madeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReports_madeInput, UserUncheckedUpdateWithoutReports_madeInput>
  }

  export type UserUpdateWithoutReports_madeInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUpdateManyWithoutReportedNestedInput
  }

  export type UserUncheckedUpdateWithoutReports_madeInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUncheckedUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUncheckedUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUncheckedUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUncheckedUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUncheckedUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUncheckedUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUncheckedUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUncheckedUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUncheckedUpdateManyWithoutReportedNestedInput
  }

  export type UserUpsertWithoutReports_receivedInput = {
    update: XOR<UserUpdateWithoutReports_receivedInput, UserUncheckedUpdateWithoutReports_receivedInput>
    create: XOR<UserCreateWithoutReports_receivedInput, UserUncheckedCreateWithoutReports_receivedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReports_receivedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReports_receivedInput, UserUncheckedUpdateWithoutReports_receivedInput>
  }

  export type UserUpdateWithoutReports_receivedInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUpdateManyWithoutUser2NestedInput
    reports_made?: ReportUpdateManyWithoutReporterNestedInput
  }

  export type UserUncheckedUpdateWithoutReports_receivedInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUncheckedUpdateManyWithoutBlockedNestedInput
    blocks_made?: BlockUncheckedUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUncheckedUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUncheckedUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUncheckedUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUncheckedUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUncheckedUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUncheckedUpdateManyWithoutUser2NestedInput
    reports_made?: ReportUncheckedUpdateManyWithoutReporterNestedInput
  }

  export type UserCreateWithoutBlocks_receivedInput = {
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_made?: BlockCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchCreateNestedManyWithoutUser2Input
    reports_received?: ReportCreateNestedManyWithoutReportedInput
    reports_made?: ReportCreateNestedManyWithoutReporterInput
  }

  export type UserUncheckedCreateWithoutBlocks_receivedInput = {
    id?: number
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_made?: BlockUncheckedCreateNestedManyWithoutBlockerInput
    calls_initiated?: CallUncheckedCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallUncheckedCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeUncheckedCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeUncheckedCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchUncheckedCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchUncheckedCreateNestedManyWithoutUser2Input
    reports_received?: ReportUncheckedCreateNestedManyWithoutReportedInput
    reports_made?: ReportUncheckedCreateNestedManyWithoutReporterInput
  }

  export type UserCreateOrConnectWithoutBlocks_receivedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBlocks_receivedInput, UserUncheckedCreateWithoutBlocks_receivedInput>
  }

  export type UserCreateWithoutBlocks_madeInput = {
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockCreateNestedManyWithoutBlockedInput
    calls_initiated?: CallCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchCreateNestedManyWithoutUser2Input
    reports_received?: ReportCreateNestedManyWithoutReportedInput
    reports_made?: ReportCreateNestedManyWithoutReporterInput
  }

  export type UserUncheckedCreateWithoutBlocks_madeInput = {
    id?: number
    email: string
    password_hash: string
    display_name: string
    birth_date: Date | string
    gender?: string | null
    looking_for_gender?: UserCreatelooking_for_genderInput | string[]
    relationship_type?: UserCreaterelationship_typeInput | string[]
    city?: string | null
    bio?: string | null
    profile_image_url?: string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: number
    preferred_age_max?: number
    preferred_distance_km?: number
    is_active?: boolean
    is_paid?: boolean
    paid_until?: Date | string | null
    verified_email?: boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    last_active_at?: Date | string
    last_seen_at?: Date | string | null
    status_message?: string | null
    latitude?: number | null
    longitude?: number | null
    is_admin?: boolean
    blocks_received?: BlockUncheckedCreateNestedManyWithoutBlockedInput
    calls_initiated?: CallUncheckedCreateNestedManyWithoutInitiator_userInput
    calls_received?: CallUncheckedCreateNestedManyWithoutReceiver_userInput
    likes_from?: LikeUncheckedCreateNestedManyWithoutFrom_userInput
    likes_to?: LikeUncheckedCreateNestedManyWithoutTo_userInput
    matches_as_user1?: MatchUncheckedCreateNestedManyWithoutUser1Input
    matches_as_user2?: MatchUncheckedCreateNestedManyWithoutUser2Input
    reports_received?: ReportUncheckedCreateNestedManyWithoutReportedInput
    reports_made?: ReportUncheckedCreateNestedManyWithoutReporterInput
  }

  export type UserCreateOrConnectWithoutBlocks_madeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBlocks_madeInput, UserUncheckedCreateWithoutBlocks_madeInput>
  }

  export type UserUpsertWithoutBlocks_receivedInput = {
    update: XOR<UserUpdateWithoutBlocks_receivedInput, UserUncheckedUpdateWithoutBlocks_receivedInput>
    create: XOR<UserCreateWithoutBlocks_receivedInput, UserUncheckedCreateWithoutBlocks_receivedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBlocks_receivedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBlocks_receivedInput, UserUncheckedUpdateWithoutBlocks_receivedInput>
  }

  export type UserUpdateWithoutBlocks_receivedInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_made?: BlockUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUpdateManyWithoutReporterNestedInput
  }

  export type UserUncheckedUpdateWithoutBlocks_receivedInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_made?: BlockUncheckedUpdateManyWithoutBlockerNestedInput
    calls_initiated?: CallUncheckedUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUncheckedUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUncheckedUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUncheckedUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUncheckedUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUncheckedUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUncheckedUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUncheckedUpdateManyWithoutReporterNestedInput
  }

  export type UserUpsertWithoutBlocks_madeInput = {
    update: XOR<UserUpdateWithoutBlocks_madeInput, UserUncheckedUpdateWithoutBlocks_madeInput>
    create: XOR<UserCreateWithoutBlocks_madeInput, UserUncheckedCreateWithoutBlocks_madeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBlocks_madeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBlocks_madeInput, UserUncheckedUpdateWithoutBlocks_madeInput>
  }

  export type UserUpdateWithoutBlocks_madeInput = {
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUpdateManyWithoutBlockedNestedInput
    calls_initiated?: CallUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUpdateManyWithoutReporterNestedInput
  }

  export type UserUncheckedUpdateWithoutBlocks_madeInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    display_name?: StringFieldUpdateOperationsInput | string
    birth_date?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    looking_for_gender?: UserUpdatelooking_for_genderInput | string[]
    relationship_type?: UserUpdaterelationship_typeInput | string[]
    city?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profile_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    additional_photos?: NullableJsonNullValueInput | InputJsonValue
    preferred_age_min?: IntFieldUpdateOperationsInput | number
    preferred_age_max?: IntFieldUpdateOperationsInput | number
    preferred_distance_km?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    is_paid?: BoolFieldUpdateOperationsInput | boolean
    paid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_email?: BoolFieldUpdateOperationsInput | boolean
    consents?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_active_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_message?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    is_admin?: BoolFieldUpdateOperationsInput | boolean
    blocks_received?: BlockUncheckedUpdateManyWithoutBlockedNestedInput
    calls_initiated?: CallUncheckedUpdateManyWithoutInitiator_userNestedInput
    calls_received?: CallUncheckedUpdateManyWithoutReceiver_userNestedInput
    likes_from?: LikeUncheckedUpdateManyWithoutFrom_userNestedInput
    likes_to?: LikeUncheckedUpdateManyWithoutTo_userNestedInput
    matches_as_user1?: MatchUncheckedUpdateManyWithoutUser1NestedInput
    matches_as_user2?: MatchUncheckedUpdateManyWithoutUser2NestedInput
    reports_received?: ReportUncheckedUpdateManyWithoutReportedNestedInput
    reports_made?: ReportUncheckedUpdateManyWithoutReporterNestedInput
  }

  export type BlockCreateManyBlockedInput = {
    id?: number
    blocker_id: number
    created_at?: Date | string
  }

  export type BlockCreateManyBlockerInput = {
    id?: number
    blocked_id: number
    created_at?: Date | string
  }

  export type CallCreateManyInitiator_userInput = {
    id?: bigint | number
    match_id: number
    call_segment_uuid?: string
    previous_call_segment_uuid?: string | null
    receiver_user_id: number
    call_type: string
    status: string
    start_time?: Date | string | null
    end_time?: Date | string | null
    duration_seconds?: number | null
    end_reason?: string | null
    initiated_at?: Date | string
  }

  export type CallCreateManyReceiver_userInput = {
    id?: bigint | number
    match_id: number
    call_segment_uuid?: string
    previous_call_segment_uuid?: string | null
    initiator_user_id: number
    call_type: string
    status: string
    start_time?: Date | string | null
    end_time?: Date | string | null
    duration_seconds?: number | null
    end_reason?: string | null
    initiated_at?: Date | string
  }

  export type LikeCreateManyFrom_userInput = {
    id?: number
    to_user_id: number
    is_like: boolean
    timestamp?: Date | string
  }

  export type LikeCreateManyTo_userInput = {
    id?: number
    from_user_id: number
    is_like: boolean
    timestamp?: Date | string
  }

  export type MatchCreateManyUser1Input = {
    id?: number
    user2_id: number
    matched_at?: Date | string
    is_active?: boolean
    closed_at?: Date | string | null
    close_reason?: string | null
    default_voice_call_duration_sec?: number
    default_video_call_duration_sec?: number
    last_interaction_at?: Date | string
    match_inactivity_timeout_interval?: string
  }

  export type MatchCreateManyUser2Input = {
    id?: number
    user1_id: number
    matched_at?: Date | string
    is_active?: boolean
    closed_at?: Date | string | null
    close_reason?: string | null
    default_voice_call_duration_sec?: number
    default_video_call_duration_sec?: number
    last_interaction_at?: Date | string
    match_inactivity_timeout_interval?: string
  }

  export type ReportCreateManyReportedInput = {
    id?: number
    reporter_id?: number | null
    reason: string
    created_at?: Date | string
    status?: string
  }

  export type ReportCreateManyReporterInput = {
    id?: number
    reason: string
    created_at?: Date | string
    reported_user_id?: number | null
    status?: string
  }

  export type BlockUpdateWithoutBlockedInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    blocker?: UserUpdateOneRequiredWithoutBlocks_madeNestedInput
  }

  export type BlockUncheckedUpdateWithoutBlockedInput = {
    id?: IntFieldUpdateOperationsInput | number
    blocker_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUncheckedUpdateManyWithoutBlockedInput = {
    id?: IntFieldUpdateOperationsInput | number
    blocker_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUpdateWithoutBlockerInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    blocked?: UserUpdateOneRequiredWithoutBlocks_receivedNestedInput
  }

  export type BlockUncheckedUpdateWithoutBlockerInput = {
    id?: IntFieldUpdateOperationsInput | number
    blocked_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUncheckedUpdateManyWithoutBlockerInput = {
    id?: IntFieldUpdateOperationsInput | number
    blocked_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallUpdateWithoutInitiator_userInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    call_segment_uuid?: StringFieldUpdateOperationsInput | string
    previous_call_segment_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    end_reason?: NullableStringFieldUpdateOperationsInput | string | null
    initiated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutCallsNestedInput
    receiver_user?: UserUpdateOneRequiredWithoutCalls_receivedNestedInput
  }

  export type CallUncheckedUpdateWithoutInitiator_userInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    match_id?: IntFieldUpdateOperationsInput | number
    call_segment_uuid?: StringFieldUpdateOperationsInput | string
    previous_call_segment_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    receiver_user_id?: IntFieldUpdateOperationsInput | number
    call_type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    end_reason?: NullableStringFieldUpdateOperationsInput | string | null
    initiated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallUncheckedUpdateManyWithoutInitiator_userInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    match_id?: IntFieldUpdateOperationsInput | number
    call_segment_uuid?: StringFieldUpdateOperationsInput | string
    previous_call_segment_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    receiver_user_id?: IntFieldUpdateOperationsInput | number
    call_type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    end_reason?: NullableStringFieldUpdateOperationsInput | string | null
    initiated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallUpdateWithoutReceiver_userInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    call_segment_uuid?: StringFieldUpdateOperationsInput | string
    previous_call_segment_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    end_reason?: NullableStringFieldUpdateOperationsInput | string | null
    initiated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    initiator_user?: UserUpdateOneRequiredWithoutCalls_initiatedNestedInput
    match?: MatchUpdateOneRequiredWithoutCallsNestedInput
  }

  export type CallUncheckedUpdateWithoutReceiver_userInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    match_id?: IntFieldUpdateOperationsInput | number
    call_segment_uuid?: StringFieldUpdateOperationsInput | string
    previous_call_segment_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    initiator_user_id?: IntFieldUpdateOperationsInput | number
    call_type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    end_reason?: NullableStringFieldUpdateOperationsInput | string | null
    initiated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallUncheckedUpdateManyWithoutReceiver_userInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    match_id?: IntFieldUpdateOperationsInput | number
    call_segment_uuid?: StringFieldUpdateOperationsInput | string
    previous_call_segment_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    initiator_user_id?: IntFieldUpdateOperationsInput | number
    call_type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    end_reason?: NullableStringFieldUpdateOperationsInput | string | null
    initiated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUpdateWithoutFrom_userInput = {
    is_like?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    to_user?: UserUpdateOneRequiredWithoutLikes_toNestedInput
  }

  export type LikeUncheckedUpdateWithoutFrom_userInput = {
    id?: IntFieldUpdateOperationsInput | number
    to_user_id?: IntFieldUpdateOperationsInput | number
    is_like?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUncheckedUpdateManyWithoutFrom_userInput = {
    id?: IntFieldUpdateOperationsInput | number
    to_user_id?: IntFieldUpdateOperationsInput | number
    is_like?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUpdateWithoutTo_userInput = {
    is_like?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_user?: UserUpdateOneRequiredWithoutLikes_fromNestedInput
  }

  export type LikeUncheckedUpdateWithoutTo_userInput = {
    id?: IntFieldUpdateOperationsInput | number
    from_user_id?: IntFieldUpdateOperationsInput | number
    is_like?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUncheckedUpdateManyWithoutTo_userInput = {
    id?: IntFieldUpdateOperationsInput | number
    from_user_id?: IntFieldUpdateOperationsInput | number
    is_like?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUpdateWithoutUser1Input = {
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    closed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    close_reason?: NullableStringFieldUpdateOperationsInput | string | null
    default_voice_call_duration_sec?: IntFieldUpdateOperationsInput | number
    default_video_call_duration_sec?: IntFieldUpdateOperationsInput | number
    last_interaction_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_inactivity_timeout_interval?: StringFieldUpdateOperationsInput | string
    calls?: CallUpdateManyWithoutMatchNestedInput
    user2?: UserUpdateOneRequiredWithoutMatches_as_user2NestedInput
  }

  export type MatchUncheckedUpdateWithoutUser1Input = {
    id?: IntFieldUpdateOperationsInput | number
    user2_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    closed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    close_reason?: NullableStringFieldUpdateOperationsInput | string | null
    default_voice_call_duration_sec?: IntFieldUpdateOperationsInput | number
    default_video_call_duration_sec?: IntFieldUpdateOperationsInput | number
    last_interaction_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_inactivity_timeout_interval?: StringFieldUpdateOperationsInput | string
    calls?: CallUncheckedUpdateManyWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateManyWithoutUser1Input = {
    id?: IntFieldUpdateOperationsInput | number
    user2_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    closed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    close_reason?: NullableStringFieldUpdateOperationsInput | string | null
    default_voice_call_duration_sec?: IntFieldUpdateOperationsInput | number
    default_video_call_duration_sec?: IntFieldUpdateOperationsInput | number
    last_interaction_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_inactivity_timeout_interval?: StringFieldUpdateOperationsInput | string
  }

  export type MatchUpdateWithoutUser2Input = {
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    closed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    close_reason?: NullableStringFieldUpdateOperationsInput | string | null
    default_voice_call_duration_sec?: IntFieldUpdateOperationsInput | number
    default_video_call_duration_sec?: IntFieldUpdateOperationsInput | number
    last_interaction_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_inactivity_timeout_interval?: StringFieldUpdateOperationsInput | string
    calls?: CallUpdateManyWithoutMatchNestedInput
    user1?: UserUpdateOneRequiredWithoutMatches_as_user1NestedInput
  }

  export type MatchUncheckedUpdateWithoutUser2Input = {
    id?: IntFieldUpdateOperationsInput | number
    user1_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    closed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    close_reason?: NullableStringFieldUpdateOperationsInput | string | null
    default_voice_call_duration_sec?: IntFieldUpdateOperationsInput | number
    default_video_call_duration_sec?: IntFieldUpdateOperationsInput | number
    last_interaction_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_inactivity_timeout_interval?: StringFieldUpdateOperationsInput | string
    calls?: CallUncheckedUpdateManyWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateManyWithoutUser2Input = {
    id?: IntFieldUpdateOperationsInput | number
    user1_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    closed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    close_reason?: NullableStringFieldUpdateOperationsInput | string | null
    default_voice_call_duration_sec?: IntFieldUpdateOperationsInput | number
    default_video_call_duration_sec?: IntFieldUpdateOperationsInput | number
    last_interaction_at?: DateTimeFieldUpdateOperationsInput | Date | string
    match_inactivity_timeout_interval?: StringFieldUpdateOperationsInput | string
  }

  export type ReportUpdateWithoutReportedInput = {
    reason?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reporter?: UserUpdateOneWithoutReports_madeNestedInput
  }

  export type ReportUncheckedUpdateWithoutReportedInput = {
    id?: IntFieldUpdateOperationsInput | number
    reporter_id?: NullableIntFieldUpdateOperationsInput | number | null
    reason?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ReportUncheckedUpdateManyWithoutReportedInput = {
    id?: IntFieldUpdateOperationsInput | number
    reporter_id?: NullableIntFieldUpdateOperationsInput | number | null
    reason?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ReportUpdateWithoutReporterInput = {
    reason?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    reported?: UserUpdateOneWithoutReports_receivedNestedInput
  }

  export type ReportUncheckedUpdateWithoutReporterInput = {
    id?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reported_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ReportUncheckedUpdateManyWithoutReporterInput = {
    id?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reported_user_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type CallCreateManyMatchInput = {
    id?: bigint | number
    call_segment_uuid?: string
    previous_call_segment_uuid?: string | null
    initiator_user_id: number
    receiver_user_id: number
    call_type: string
    status: string
    start_time?: Date | string | null
    end_time?: Date | string | null
    duration_seconds?: number | null
    end_reason?: string | null
    initiated_at?: Date | string
  }

  export type CallUpdateWithoutMatchInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    call_segment_uuid?: StringFieldUpdateOperationsInput | string
    previous_call_segment_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    end_reason?: NullableStringFieldUpdateOperationsInput | string | null
    initiated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    initiator_user?: UserUpdateOneRequiredWithoutCalls_initiatedNestedInput
    receiver_user?: UserUpdateOneRequiredWithoutCalls_receivedNestedInput
  }

  export type CallUncheckedUpdateWithoutMatchInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    call_segment_uuid?: StringFieldUpdateOperationsInput | string
    previous_call_segment_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    initiator_user_id?: IntFieldUpdateOperationsInput | number
    receiver_user_id?: IntFieldUpdateOperationsInput | number
    call_type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    end_reason?: NullableStringFieldUpdateOperationsInput | string | null
    initiated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallUncheckedUpdateManyWithoutMatchInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    call_segment_uuid?: StringFieldUpdateOperationsInput | string
    previous_call_segment_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    initiator_user_id?: IntFieldUpdateOperationsInput | number
    receiver_user_id?: IntFieldUpdateOperationsInput | number
    call_type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration_seconds?: NullableIntFieldUpdateOperationsInput | number | null
    end_reason?: NullableStringFieldUpdateOperationsInput | string | null
    initiated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}