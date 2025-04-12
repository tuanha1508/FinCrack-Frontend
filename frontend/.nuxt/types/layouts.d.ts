import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "auth-layout" | "auth" | "dashboard" | "default"
declare module "../../node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}