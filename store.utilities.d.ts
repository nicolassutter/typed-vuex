import type { MergeDeep, OmitIndexSignature } from 'type-fest'

declare global {
  export type BasicRecord = Record<string | number | symbol, any>

  /**
   * Même principe que `Compute` de `ts-toolbelt`,
   * permet à TS de calculer les types en entier.
   * 
   * @exemple
   * ```
   * type NotComputed = { one: string } & { two: number } // { one: string } & { two: number }
   * type Computed = ComputeRecord<{ one: string } & { two: number }> // { one: string, two: number }
   * ```
   * 
   * @see https://millsp.github.io/ts-toolbelt/modules/any_compute.html
   */
  export type ComputeRecord<T extends BasicRecord> = MergeDeep<T, Record<never, never>>

  /**
   * Si deux types sont égaux ou pas
   * 
   * @see https://millsp.github.io/ts-toolbelt/modules/any_equals.html
   */
  export type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false
  
  /**
   * Si `A` est égal à `B` alors on retourne `Then`,
   * sinon on retourne `A`.
   */
  export type If<A, B, Then> = IsEqual<A, B> extends true
    ? Then
    : A

  namespace StoreUtils {
    /**
     * Permet de fusionner tous les stores,
     * tout en utilisant `OmitIndexSignature`
     * pour supprimer les { [key: string]: ... } (sinon pas d'autocomplétion).
     */
    export type TransformStore<Store> = { [K in keyof Store]: ComputeRecord<OmitIndexSignature<Store[K]>> }
  }
}

export {}