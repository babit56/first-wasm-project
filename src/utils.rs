// extern crate fixedbitset;

pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

pub mod patterns {
    // use fixedbitset::FixedBitSet;
    use wasm_bindgen::prelude::wasm_bindgen;

    #[wasm_bindgen]
    pub struct Pattern {
        pub width: u32,
        pub height: u32,
        pub pattern: usize,
    }

    #[wasm_bindgen]
    pub enum PatternType {
        Glider,
    }

    impl Pattern {
        pub fn get_bit(&self, row: u32, col: u32) -> bool {
            let idx = ((self.width * self.height - 1) - (row * self.width + col)) as usize;
            (self.pattern & 1 << idx) != 0
        }
    }

    // #[link_section = "patterns"]
    pub const GLIDER: Pattern = Pattern {
        width: 3,
        height: 3,
        pattern: 0b001101011, // 001101011
    };
}
