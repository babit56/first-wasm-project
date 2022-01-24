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
* @returns {Universe}
*/
  static new(): Universe;
/**
*/
  tick(): void;
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
* @param {number} y
* @param {number} x
* @param {number} pattern_type
*/
  insert_pattern(y: number, x: number, pattern_type: number): void;
/**
* @param {number} row
* @param {number} column
*/
  toggle_cell(row: number, column: number): void;
/**
*/
  reset(): void;
/**
*/
  clear(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_pattern_free: (a: number) => void;
  readonly __wbg_get_pattern_width: (a: number) => number;
  readonly __wbg_set_pattern_width: (a: number, b: number) => void;
  readonly __wbg_get_pattern_height: (a: number) => number;
  readonly __wbg_set_pattern_height: (a: number, b: number) => void;
  readonly __wbg_get_pattern_pattern: (a: number) => number;
  readonly __wbg_set_pattern_pattern: (a: number, b: number) => void;
  readonly __wbg_universe_free: (a: number) => void;
  readonly universe_new: () => number;
  readonly universe_tick: (a: number) => void;
  readonly universe_width: (a: number) => number;
  readonly universe_set_width: (a: number, b: number) => void;
  readonly universe_height: (a: number) => number;
  readonly universe_set_height: (a: number, b: number) => void;
  readonly universe_cells: (a: number) => number;
  readonly universe_insert_pattern: (a: number, b: number, c: number, d: number) => void;
  readonly universe_toggle_cell: (a: number, b: number, c: number) => void;
  readonly universe_reset: (a: number) => void;
  readonly universe_clear: (a: number) => void;
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
