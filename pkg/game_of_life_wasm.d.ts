/* tslint:disable */
/* eslint-disable */
/**
*/
export enum PatternType {
  Glider,
}
/**
*/
export class Pattern {
  free(): void;
/**
*/
  height: number;
/**
*/
  pattern: number;
/**
*/
  width: number;
}
/**
*/
export class Universe {
  free(): void;
/**
*/
  tick(): void;
/**
* @returns {Universe}
*/
  static new(): Universe;
/**
* @returns {number}
*/
  width(): number;
/**
* @param {number} width
*/
  set_width(width: number): void;
/**
* @returns {number}
*/
  height(): number;
/**
* @param {number} height
*/
  set_height(height: number): void;
/**
* @returns {number}
*/
  cells(): number;
/**
* @param {number} x
* @param {number} y
* @param {number} pattern_type
*/
  insert_pattern(x: number, y: number, pattern_type: number): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_universe_free: (a: number) => void;
  readonly universe_tick: (a: number) => void;
  readonly universe_new: () => number;
  readonly universe_width: (a: number) => number;
  readonly universe_set_width: (a: number, b: number) => void;
  readonly universe_height: (a: number) => number;
  readonly universe_set_height: (a: number, b: number) => void;
  readonly universe_cells: (a: number) => number;
  readonly universe_insert_pattern: (a: number, b: number, c: number, d: number) => void;
  readonly __wbg_pattern_free: (a: number) => void;
  readonly __wbg_get_pattern_width: (a: number) => number;
  readonly __wbg_set_pattern_width: (a: number, b: number) => void;
  readonly __wbg_get_pattern_height: (a: number) => number;
  readonly __wbg_set_pattern_height: (a: number, b: number) => void;
  readonly __wbg_get_pattern_pattern: (a: number) => number;
  readonly __wbg_set_pattern_pattern: (a: number, b: number) => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
