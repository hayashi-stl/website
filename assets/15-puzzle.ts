const SIZE = 4;

class Puzzle {
    arr: number[];
    bg: number;

    public constructor(bg: number) {
        this.bg = bg;

        // Add buffer on each side to make boundary checking easier
        this.arr = [...Array((SIZE + 2) * (SIZE + 2)).keys()].map((_) => -1);
        for (let y = 0; y < SIZE; ++y)
            for (let x = 0; x < SIZE; ++x)
                this.arr[(y + 1) * (SIZE + 2) + (x + 1)] = y * SIZE + x;
    }

    index(x: number, y: number): number {
        return (y + 1) * (SIZE + 2) + (x + 1);
    }

    public at(x: number, y: number): number {
        return this.arr[this.index(x, y)]
    }

    // Tries to move a tile. Returns the source and target squares if
    // it can move, and null otherwise.
    public try_move(tile: number): [[number, number], [number, number]] | null {
        for (let y = 0; y < SIZE; ++y)
            for (let x = 0; x < SIZE; ++x)
                if (this.at(x, y) == tile) {
                    for (let [dx, dy] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) 
                        if (this.at(x + dx, y + dy) == this.bg) {
                            let tmp = this.at(x, y);
                            this.arr[this.index(x, y)] = this.at(x + dx, y + dy);
                            this.arr[this.index(x + dx, y + dy)] = tmp;
                            return [[x, y], [x + dx, y + dy]];
                        }
                    return null;
                }
        throw Error(`Unexpected tile number: ${tile}`);
    }
}

async function main() {
    let svg = document.getElementById("_15-puzzle")! as HTMLElement;
    
    let elements = svg.childNodes;
    let by_tile = [...Array(SIZE * SIZE).keys()].map((_) => [] as SVGElement[]);

    for (let child of elements) {
        let element = child as SVGElement;
        let tile_str = element.getAttribute("tile");
        if (tile_str === null)
            continue;

        let tile = parseInt(tile_str);
        by_tile[tile].push(element);

        if (element.getAttribute("interact")) {
            element.addEventListener("pointerdown", onClickTile);
        }
    }

    // Background is the one with no associated tile
    let bg = -1;
    for (let y = 0; y < SIZE; ++y)
        for (let x = 0; x < SIZE; ++x)
            if (by_tile[y * SIZE + x].length == 0) {
                bg = y * SIZE + x;
                break;
            }
    let puzzle = new Puzzle(bg);

    function onClickTile(this: SVGElement, event: PointerEvent) {
        event.preventDefault();
        let tile = parseInt(this.getAttribute("tile")!);
        let result = puzzle.try_move(tile);
        if (result) {
            for (let element of by_tile[tile]) {
                element.animate([
                    { transform: `translate(${result[0][0].toString()}px, ${result[0][1].toString()}px)` },
                    { transform: `translate(${result[1][0].toString()}px, ${result[1][1].toString()}px)` },
                ], 50);
                element.setAttribute("style", `transform: translate(${result[1][0].toString()}px, ${result[1][1].toString()}px);`);
            }
        }
    }

}

main();