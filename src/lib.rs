mod utils;

extern crate fixedbitset;

extern crate web_sys;

use fixedbitset::FixedBitSet;

use utils::patterns;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

// #[wasm_bindgen]
// #[repr(u8)]
// #[derive(Clone, Copy, Debug, PartialEq, Eq)]
// pub enum Cell {
//     Dead = 0,
//     Alive = 1,
// }

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: FixedBitSet,
}

#[wasm_bindgen]
impl Universe {
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;
    
        let north = if row == 0 {
            self.height - 1
        } else {
            row - 1
        };
    
        let south = if row == self.height - 1 {
            0
        } else {
            row + 1
        };
    
        let west = if column == 0 {
            self.width - 1
        } else {
            column - 1
        };
    
        let east = if column == self.width - 1 {
            0
        } else {
            column + 1
        };
    
        let nw = self.get_index(north, west);
        count += self.cells[nw] as u8;
    
        let n = self.get_index(north, column);
        count += self.cells[n] as u8;
    
        let ne = self.get_index(north, east);
        count += self.cells[ne] as u8;
    
        let w = self.get_index(row, west);
        count += self.cells[w] as u8;
    
        let e = self.get_index(row, east);
        count += self.cells[e] as u8;
    
        let sw = self.get_index(south, west);
        count += self.cells[sw] as u8;
    
        let s = self.get_index(south, column);
        count += self.cells[s] as u8;
    
        let se = self.get_index(south, east);
        count += self.cells[se] as u8;
    
        count
    }

    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbors = self.live_neighbor_count(row, col);

                next.set(idx, match (cell, live_neighbors) {
                    // Alive and less than two neighbors
                    (true, x) if x < 2 => false,
                    // Alive and two or three neighbors
                    (true, 2) | (true, 3) => true,
                    // Alive and more than three neighbors
                    (true, x) if x > 3 => false,
                    // Dead and three neighbors
                    (false, 3) => true,
                    // Dead
                    (otherwise, _) => otherwise
                });
            }
        }

        self.cells = next;
    }

    pub fn new() -> Universe {
        utils::set_panic_hook();

        let width = 64;
        let height = 64;

        let size = (width * height) as usize;
        let mut cells = FixedBitSet::with_capacity(size);

        for i in 0..size {
            cells.set(i, i % 2 == 0 || i % 7 == 0)
        }
        
        log!("Universe be like {}*{}", width, height);
        

        Universe {
            width,
            height,
            cells,
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    // Set the width of the universe.
    //
    // Resets all cells to the dead state.
    pub fn set_width(&mut self, width: u32) {
        self.width = width;
        let size = (width * self.height) as usize;
        self.cells = FixedBitSet::with_capacity(size)
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    // Set the height of the universe.
    //
    // Resets all cells to the dead state.
    pub fn set_height(&mut self, height: u32) {
        self.height = height;
        let size = (self.width * height) as usize;
        self.cells = FixedBitSet::with_capacity(size)
    }

    pub fn cells(&self) -> *const u32 {
        self.cells.as_slice().as_ptr()
    }

    pub fn insert_pattern(&mut self, x: u32, y: u32, pattern_type: patterns::PatternType) {
        let pattern = match pattern_type {
            patterns::PatternType::Glider => &patterns::GLIDER,
        };
        
        for row_local in 0..pattern.height {
            for col_local in 0..pattern.width {
                let mut row = y + row_local;
                let mut col = x + col_local;
                row = if row >= self.height {
                    row - self.height
                } else {
                    row
                };
                col = if col >= self.width {
                    col - self.width
                } else {
                    col
                };
                let idx = self.get_index(row, col);
                let state = pattern.get_bit(row_local, col_local);
                self.cells.set(idx, state);
            }
        }
    }
}

impl Universe {
    /// Get the dead and alive values of the entire universe.
    pub fn get_cells(&self) -> &FixedBitSet {
        &self.cells
    }

    /// Set cells to be alive in a universe by passing the row and column
    /// of each cell as an array.
    pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
        for (row, col) in cells.iter().cloned() {
            let idx = self.get_index(row, col);
            self.cells.set(idx, true)
        }
    }

}