#![feature(test)]

extern crate test;
extern crate game_of_life_wasm;

#[bench]
fn universe_ticks(b: &mut test::Bencher) {
    let mut universe = game_of_life_wasm::Universe::new();

    b.iter(|| {
        universe.tick();
    });
}