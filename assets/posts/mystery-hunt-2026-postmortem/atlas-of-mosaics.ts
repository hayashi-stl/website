export { run }

const SQRT_3_4 = Math.sqrt(3.0 / 4.0);

type R2 = [number, number]

function map_map_values<K, V1, V2>(map: Map<K, V1>, fn: (k: K, v: V1) => V2): Map<K, V2> {
    let result = new Map<K, V2>();
    for (let entry of map.entries())
        result.set(entry[0], fn(entry[0], entry[1]));
    return result
}

const ATLAS_GRID = new Map(Object.entries<R2[]>({
    "test1": [[2, 0], [4, 0], [1, 1], [3, 1], [0, 2], [2, 2], [0, 0]],
    "test2": [[5, 1], [4, 2], [5, 3]],
    "test3": [[6, 0], [8, 0], [10, 0], [7, 1], [9, 1], [11, 1]],
}))
const ATLAS_GRID_INV = (() => {
    let map = new Map<string, string>();
    for (let [name, hexes] of ATLAS_GRID.entries()) {
        for (let pos of hexes)
            map.set(pos.toString(), name);
    }
    return map;
})();

// Each tile contains a file name stub and a limit.
const TILE_INFO = new Map<string, Map<string, [filename: string, limit: number]>>(([
    ["test1", [
        ["tile1", ["test1_tile1", 1]],
        ["tile2", ["test1_tile2", 1]],
        ["tile3", ["test1_tile3", 1]],
        ["tile4", ["test1_tile4", 1]],
        ["tile5", ["test1_tile5", 1]],
        ["tile6", ["test1_tile6", 1]],
        ["tile7", ["test1_tile7", 1]],
    ]],
    ["test2", [
        ["E", ["test2_E", Infinity]],
        ["NE", ["test2_NE", Infinity]],
        ["NW", ["test2_NW", Infinity]],
        ["W", ["test2_W", Infinity]],
        ["SW", ["test2_SW", Infinity]],
        ["SE", ["test2_SE", Infinity]],
    ]],
    ["test3", [
        ["This", ["test3_This", 1]],
        ["test", ["test3_test", 1]],
        ["sen", ["test3_sen", 1]],
        ["tence", ["test3_tence", 1]],
    ]],
] as [string, [string, [string, number]][]][])
    .map(([group, tiles]) => [group, new Map(tiles)]))

const PUZZLE_NAMES = new Map(Object.entries<[string, string]>({
    "test1": ["The First Test", "Numbers"],
    "test2": ["The Second Test", "Directions"],
    "test3": ["The Third Test", "Words"],
}))

// assumes filling's top left is [0, 0]
function adjustFilling(name: string, filling: [R2, string][]): [string, Map<string, string>] {
    let grid = ATLAS_GRID.get(name)!;
    let gridTopLeft = [
        grid.map(x => x[0]).reduce((a, b) => Math.min(a, b)),
        grid.map(x => x[1]).reduce((a, b) => Math.min(a, b)),
    ]
    return [name,
        new Map(filling.map(([pos, tile]) => [[pos[0] + gridTopLeft[0], pos[1] + gridTopLeft[1]].toString(), tile]))]
}

const CORRECT_FILLINGS = new Map(([
    ["test1", [
        [[0, 0],  "tile1"],
        [[2, 0],  "tile2"],
        [[4, 0],  "tile3"],
        [[1, 1],  "tile4"],
        [[3, 1],  "tile5"],
        [[0, 2],  "tile6"],
        [[2, 2],  "tile7"],
    ]],
    ["test2", [
        [[1, 0],  "SW"],
        [[0, 1],  "SE"],
        [[1, 2],  "SE"],
    ]],
    ["test3", [
        [[0, 0],  "This"],
        [[1, 1],  "test"],
        [[3, 1],  "sen"],
        [[5, 1],  "tence"],
    ]]
] as [string, [R2, string][]][]).map(([k, v]) => adjustFilling(k, v)))

const FILLABLE = new Map<string, boolean>(Array.from(ATLAS_GRID.entries()).flatMap(([name, pos]) => {
    return pos.map(p => [p.toString(), CORRECT_FILLINGS.get(name)!.has(p.toString())])
}));

const NEIGHBOR_DIRS: R2[] = [
    [2, 0], [1, -1], [-1, -1], [-2, 0], [-1, 1], [1, 1]
];

// List of edges per group. Each edge is stored as [inside face, outside face] that shares it
const BOUNDARY_EDGES = new Map<string, [R2, R2][]>(Array.from(ATLAS_GRID.entries()).map(([name, faces]) => {
    let edges: [R2, R2][] = [];
    for (let face of faces)
        for (let dir of NEIGHBOR_DIRS) {
            let other: R2 = [face[0] + dir[0], face[1] + dir[1]];
            if (ATLAS_GRID_INV.get(other.toString()) !== name)
                edges.push([face, other]);
        }
    return [name, edges]
}));

// Maps each boundary edge to a start and target vertex. Vertices are just 3 * face coordinate average
const BOUNDARY_VERTEX_MAP = new Map<string, Map<string, [R2, R2]>>(Array.from(BOUNDARY_EDGES.entries()).map(([name, edges]) => {
    return [name, new Map<string, [R2, R2]>(edges.map(edge => {
        let [inF, outF] = edge
        let mid: R2 = [(inF[0] + outF[0]) / 2, (inF[1] + outF[1]) / 2]
        let diff: R2 = [outF[0] - inF[0], outF[1] - inF[1]]
        diff = [-diff[1] * 2 * SQRT_3_4, diff[0] / 2 / SQRT_3_4]
        let start : R2 = [Math.round(mid[0] + diff[0]), Math.round(mid[1] + diff[1])]
        let target: R2 = [Math.round(mid[0] - diff[0]), Math.round(mid[1] - diff[1])]
        let vertices: [R2, R2] = [
            [inF[0] + outF[0] + start [0], inF[1] + outF[1] + start [1]],
            [inF[0] + outF[0] + target[0], inF[1] + outF[1] + target[1]],
        ];
        return [edge.toString(), vertices]
    }))];
}));

const BOUNDARY_VERTICES = new Map<string, R2[]>(Array.from(BOUNDARY_VERTEX_MAP.entries()).map(([name, edges]) => {
    let duplicated = Array.from(edges.values()).flat(1);
    let set = new Set(duplicated.map(v => v.toString()));
    let vertices: R2[] = duplicated.filter(v => set.delete(v.toString()));
    return [name, vertices]
}))

// Maps each boundary vertex to its edges, in [edge where this is target, edge where this is source] order
const BOUNDARY_EDGE_MAP = new Map<string, Map<string, [[R2, R2], [R2, R2]]>>(Array.from(BOUNDARY_EDGES.entries()).map(([name, edges]) => {
    let vertices = new Map<string, [[R2, R2], [R2, R2]]>(
        BOUNDARY_VERTICES.get(name)!.map(vertex => [vertex.toString(), [[[0, 0], [0, 0]], [[0, 0], [0, 0]]]])
    );
    for (let edge of edges) {
        let v0 = BOUNDARY_VERTEX_MAP.get(name)!.get(edge.toString())![0];
        vertices.get(v0.toString())![1] = edge
        let v1 = BOUNDARY_VERTEX_MAP.get(name)!.get(edge.toString())![1];
        vertices.get(v1.toString())![0] = edge
    }
    return [name, vertices]
}));

// 0 if [0, 0] could be a grid position, 1 if [1, 0] could be a grid position. Exactly one of these is true.
const ALIGNMENT = (() => {
    let pos = ATLAS_GRID.entries().next().value![1][0];
    return (pos[0] + pos[1]) % 2;
})();

const GRID_SIZE = 100 * SQRT_3_4;
const OUTLINE_HALF_THICKNESS = 1.0;
const GRID_OFFSET: R2 = [OUTLINE_HALF_THICKNESS, OUTLINE_HALF_THICKNESS / SQRT_3_4];
const TOP_LEFT_CENTER_OFFSET: R2 = [0.5, 0.5 / SQRT_3_4]

function dot(a: R2, b: R2): number {
    return a[0] * b[0] + a[1] * b[1];
}

function norm2(a: R2): number {
    return dot(a, a);
}

function offsetToGridPos(offset: R2): R2 {
    let result: R2 = [offset[0], offset[1]];
    for (let i = 0; i < 2; ++i) result[i] = (result[i] - GRID_OFFSET[i]) / GRID_SIZE - TOP_LEFT_CENTER_OFFSET[i];
    result[0] *= 2;
    result[1] /= SQRT_3_4;
    let candidates = ([
        [Math.floor(result[0])    , Math.floor(result[1]    )],
        [Math.floor(result[0])    , Math.floor(result[1] + 1)],
        [Math.floor(result[0] + 1), Math.floor(result[1]    )],
        [Math.floor(result[0] + 1), Math.floor(result[1] + 1)],
    ] as R2[]).filter(pos => (pos[0] + pos[1]) % 2 === ALIGNMENT);
    // Scale back so that the dividing line is a perpendicular bisector
    let scaled: R2[] = [
        [candidates[0][0], candidates[0][1] * SQRT_3_4 * 2],
        [candidates[1][0], candidates[1][1] * SQRT_3_4 * 2],
    ];
    result[1] *= SQRT_3_4 * 2;
    let dist0 = norm2([result[0] - scaled[0][0], result[1] - scaled[0][1]]);
    let dist1 = norm2([result[0] - scaled[1][0], result[1] - scaled[1][1]]);
    return dist0 < dist1 ? candidates[0] : candidates[1];
}

function gridPosToOffset(pos: R2): R2 {
    let result: R2 = [pos[0], pos[1]];
    result[0] /= 2;
    result[1] *= SQRT_3_4;
    for (let i = 0; i < 2; ++i) result[i] = (result[i] + TOP_LEFT_CENTER_OFFSET[i]) * GRID_SIZE + GRID_OFFSET[i];
    return result;
}

const BOUNDARY_PATHS = new Map<string, string>(Array.from(BOUNDARY_VERTICES.entries()).map(([name, vertices]) => {
    let vertexSet = new Map(vertices.map(v => [v.toString(), v]));
    let ve = BOUNDARY_EDGE_MAP.get(name)!
    let ev = BOUNDARY_VERTEX_MAP.get(name)!
    let path = ""
    while (vertexSet.size > 0) {
        let currVertex = vertexSet.values().next().value!;
        path += "M "
        while (vertexSet.delete(currVertex.toString())) {
            path += gridPosToOffset([currVertex[0] / 3, currVertex[1] / 3]).toString() + " "
            currVertex = ev.get(ve.get(currVertex.toString())![1].toString())![1];
        }
        path += "Z "
    }
    return [name, path]
}));
// Returns the boundary path as an string that can be put in an SVG d attribute
//function boundaryPath(group: string): string {
//    let vertices = vertices = 
//}

const XMLNS = "http://www.w3.org/2000/svg"

class Tile {
    filename: string
    image: SVGImageElement;
    div: HTMLElement;
    limit: number;
    left: number;

    constructor(filename: string, limit: number, div: HTMLElement) {
        this.filename = `/assets/posts/mystery-hunt-2026-postmortem/atlas-tiles/${filename}.svg`
        this.image = document.createElementNS(XMLNS, "image")
        this.image.setAttribute("href", this.filename)
        this.limit = limit;
        this.left = limit;
        this.div = div;

        this.div.setAttribute("style", "");
        (this.div.children[0] as HTMLImageElement).src = this.filename;
        if (this.limit === Infinity)
            this.div.children[1].setAttribute("style", "display: none;")
        this.setLeft(this.left);
    }

    setLeft(left: number) {
        this.left = left;
        this.div.children[1].innerHTML = `${this.left}`
        if (left === 0)
            this.div.classList.add("ran-out")
        else
            this.div.classList.remove("ran-out")
    }
}

type TileName = [string, string];

class AtlasOfMosaics {
    div: HTMLDivElement;
    noAtlas: HTMLDivElement;
    atlas: HTMLDivElement;
    atlasSvg: SVGElement;
    fillingSvg: SVGGElement;
    hoverHex: SVGGElement;
    sidebar: HTMLDivElement;
    title: HTMLDivElement;
    draggedTile: HTMLImageElement;
    covers: Map<string, SVGElement>;
    activePuzzle: string | undefined = undefined;
    activeTile: TileName | undefined = undefined;
    tiles: Map<string, Map<string, Tile>>;
    tileSidebars: Map<string, HTMLDivElement>;
    filling: Map<string, [TileName, SVGElement]>; // maps positions to [tile name, tile element]
    noteTimeout: number = 0;
    isInit: boolean = false;

    constructor() {
        this.div = document.getElementById("atlas-of-mosaics")! as HTMLDivElement;
        this.noAtlas = document.getElementById("no-atlas")! as HTMLDivElement;
        this.atlas = document.getElementById("atlas")! as HTMLDivElement;
        this.sidebar = document.getElementById("atlas-sidebar")! as HTMLDivElement;
        this.title = document.getElementById("atlas-title")! as HTMLDivElement;
        this.draggedTile = document.getElementById("atlas-dragged-tile")! as HTMLImageElement;
        this.atlasSvg = this.atlas.children[1] as SVGElement;
        this.fillingSvg = document.getElementById("filling")! as unknown as SVGGElement;
        this.hoverHex = document.getElementById("hover-hex")! as unknown as SVGGElement;
        let tileTemplate = document.getElementById("tile-template")! as HTMLElement;
        this.tiles = map_map_values(TILE_INFO, (_, tiles) => map_map_values(tiles, (_, tile) => new Tile(tile[0], tile[1], 
            tileTemplate.cloneNode(true) as HTMLElement
        )));
        this.tileSidebars = map_map_values(this.tiles, (puzzle, tiles) => {
            let div = document.createElement("div")
            div.classList.add("tiles")
            div.setAttribute("style", "display: none");
            this.sidebar.appendChild(div);
            for (let [name, tile] of tiles.entries()) {
                div.appendChild(tile.div)
                tile.div.addEventListener("pointerdown", (ev: PointerEvent) => {
                    this.startDrag([puzzle, name], ev);
                })
            }
            return div
        });
        this.filling = new Map();

        let hideHexes = document.getElementById("hide-hexes")! as unknown as SVGGElement;
        this.covers = new Map<string, SVGElement>(Array.from(BOUNDARY_PATHS.entries()).map(([name, path]) => {
            let pathElem = document.createElementNS(XMLNS, "path");
            pathElem.setAttribute("d", path);
            pathElem.classList.add("hide-hex");
            hideHexes.appendChild(pathElem);
            return [name, pathElem];
        }));

        this.atlasSvg.addEventListener("pointermove", (ev: PointerEvent) => {
            let pos = offsetToGridPos([ev.offsetX, ev.offsetY]);
            this.updateHoverHex(pos);
        });

        // Prevent that full picture dragging effect
        this.atlasSvg.addEventListener("pointerdown", (ev: PointerEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
            let pos = offsetToGridPos([ev.offsetX, ev.offsetY]);
            this.handlePointerDown(ATLAS_GRID_INV.get(pos.toString()), ev)
            this.updateHoverHex(pos);
        })

        this.sidebar.addEventListener("pointerdown", (ev: PointerEvent) => ev.stopPropagation())

        // Clicking anywhere except the grid or the sidebar should disable the puzzle
        window.addEventListener("pointerdown", (ev: PointerEvent) => {
            this.handlePointerDown(undefined, ev)
        })
        
        window.addEventListener("pointermove", (ev: PointerEvent) => {
            this.drag([ev.x, ev.y]);
        })
        
        window.addEventListener("pointerup", (ev: PointerEvent) => {
            this.endDrag(undefined);
        })

        this.atlasSvg.addEventListener("pointerup", (ev: PointerEvent) => {
            this.endDrag([ev.offsetX, ev.offsetY]);
        })

        // A little Easter egg
        let note = document.getElementById("atlas-note")!
        let hyperbolic = document.getElementById("hyperbolic-navigation")!
        hyperbolic.addEventListener("pointerup", (ev: PointerEvent) => {
            if (this.activeTile === undefined) return;
            note.setAttribute("style", "");
            window.clearTimeout(this.noteTimeout);
            this.noteTimeout = window.setTimeout(() => {
                note.setAttribute("style", "display: none;")
                this.noteTimeout = 0;
            }, 5000)
        })
    }

    handlePointerDown(name: string | undefined, ev: PointerEvent) {
        if (this.activePuzzle === name) {
            let tile = this.removeTile(offsetToGridPos([ev.offsetX, ev.offsetY]))
            if (tile !== undefined)
                this.startDrag(tile, ev);
            return;
        }
        if (this.activePuzzle !== undefined) {
            this.covers.get(this.activePuzzle)!.setAttribute("style", "");
            this.tileSidebars.get(this.activePuzzle)!.setAttribute("style", "display: none;")
        }
        this.activePuzzle = name
        this.sidebar.setAttribute("style", name === undefined ? "display: none;" : "");
        this.title.children[0].innerHTML = name === undefined ? "&nbsp;" : PUZZLE_NAMES.get(name)![0];
        this.title.children[1].innerHTML = name === undefined ? "&nbsp;" : PUZZLE_NAMES.get(name)![1];
        if (this.activePuzzle !== undefined) {
            this.covers.get(this.activePuzzle)!.setAttribute("style", "display: none;");
            this.tileSidebars.get(this.activePuzzle)!.setAttribute("style", "")
            this.title.classList.add("sticky")
        } else {
            this.title.classList.remove("sticky")
        }
        this.updateCorrect();
    }

    updateHoverHex(gridPos: R2) {
        let offset = gridPosToOffset(gridPos);
        this.hoverHex.setAttribute("style",
            this.activePuzzle !== undefined && ATLAS_GRID_INV.get(gridPos.toString()) === this.activePuzzle
                && FILLABLE.get(gridPos.toString())! ? "" : "display: none;");
        this.hoverHex.transform.baseVal[0].setTranslate(offset[0], offset[1]);
    }

    startDrag(tileName: TileName, ev: PointerEvent) {
        ev.preventDefault();
        let left = this.tiles.get(tileName[0])!.get(tileName[1])!.left;
        if (left <= 0)
            return;
        this.activeTile = tileName;
        let tile = this.tiles.get(tileName[0])!.get(tileName[1])!;
        tile.setLeft(tile.left - 1)
        this.draggedTile.src = tile.filename;
        this.draggedTile.setAttribute("style", `left: ${ev.x}px; top: ${ev.y}px;`);
    }

    drag(pointerPos: R2) {
        if (this.activeTile === undefined) return;
        this.draggedTile.setAttribute("style", `left: ${pointerPos[0]}px; top: ${pointerPos[1]}px;`);
    }

    endDrag(offset: R2 | undefined) {
        if (this.activeTile === undefined) return;
        let tile = this.tiles.get(this.activeTile[0])!.get(this.activeTile[1])!;
        tile.setLeft(tile.left + 1);
        if (offset !== undefined) 
            this.addTile(offsetToGridPos(offset), this.activeTile);
        this.draggedTile.setAttribute("style", "display: none;");
        this.activeTile = undefined;
    }

    removeTile(gridPos: R2, shouldUpdateCorrect = true): TileName | undefined {
        let tile = this.filling.get(gridPos.toString());
        this.filling.delete(gridPos.toString());
        if (tile === undefined) return undefined;
        tile[1].remove();
        let tileData = this.tiles.get(tile[0][0])!.get(tile[0][1])!;
        tileData.setLeft(tileData.left + 1);
        this.updateCorrect();
        return tile[0]
    }

    addTile(gridPos: R2, tileName: TileName) {
        if (ATLAS_GRID_INV.get(gridPos.toString()) !== tileName[0]) return;
        this.removeTile(gridPos, false);
        let tileData = this.tiles.get(tileName[0])!.get(tileName[1])!;
        tileData.setLeft(tileData.left - 1);
        let image = tileData.image.cloneNode(true) as SVGImageElement;
        this.fillingSvg.appendChild(image);
        this.filling.set(gridPos.toString(), [tileName, image]);
        let offset = gridPosToOffset(gridPos);
        image.setAttribute("x", offset[0].toString());
        image.setAttribute("y", offset[1].toString());
        this.updateCorrect();
    }

    updateCorrect() {
        if (this.activePuzzle === undefined) {
            this.title.classList.remove("correct");
            return;
        }
        let correctFilling = Array.from(CORRECT_FILLINGS.get(this.activePuzzle)!.entries());
        let correct = correctFilling.every(([pos, tile]) => this.filling.get(pos)?.[0]?.[1] === tile);
        if (correct)
            this.title.classList.add("correct");
        else
            this.title.classList.remove("correct");
        this.title.children[1].innerHTML = PUZZLE_NAMES.get(this.activePuzzle)![1] + (correct ? " (solved)" : "");
    }

    init() {
        this.isInit = true;
        this.div.className = "portal";
        this.noAtlas.setAttribute("style", "display: none;");
        this.atlas.setAttribute("style", "");
    }

    uninit() {
        this.isInit = false;
        this.div.className = ""
        this.noAtlas.setAttribute("style", "");
        this.atlas.setAttribute("style", "display: none;");
    }
}

async function run() {
    let button = document.getElementById("atlas-of-mosaics-button")! as HTMLInputElement;
    let atlas: AtlasOfMosaics | undefined = undefined;
    button.addEventListener("click", (ev: MouseEvent) => {
        if (atlas === undefined || !atlas.isInit) {
            button.value = "Accessibility: OFF"
            if (atlas === undefined) {
                atlas = new AtlasOfMosaics();
            }
            atlas.init();
        } else {
            button.value = "Accessibility: ON"
            atlas.uninit();
        }
    })
}