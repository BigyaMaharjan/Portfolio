export {};

declare global {
  interface ScrollCraftInstance {
    readonly acts: readonly unknown[];
    readonly worlds: readonly unknown[];
    readonly clips: readonly unknown[];
    layout(): void;
    read(): void;
    destroy(): void;
  }

  interface ScrollCraftApi {
    mount(root: Element | string, options?: Record<string, unknown>): ScrollCraftInstance;
    readonly reduce: boolean;
    readonly instances: readonly ScrollCraftInstance[];
  }

  interface Window {
    ScrollCraft?: ScrollCraftApi;
  }
}
