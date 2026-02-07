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
    "bite": [[3.0, 1.0], [5.0, 1.0], [2.0, 2.0], [4.0, 2.0], [1.0, 3.0], [3.0, 3.0], [1.0, 1.0], [0.0, 0.0], [0.0, 2.0], [5.0, 3.0], [0.0, 4.0],
        [2.0, 4.0], [4.0, 4.0], [6.0, 4.0], [7.0, 3.0], [1.0, 5.0], [3.0, 5.0], [5.0, 5.0], [2.0, 6.0], [4.0, 6.0], [6.0, 6.0], [3.0, 7.0]],
    "case": [[6.0, 0.0], [8.0, 0.0], [10.0, 0.0], [7.0, 1.0], [9.0, 1.0], [11.0, 1.0], [2.0, 0.0], [4.0, 0.0], [12.0, 0.0], [14.0, 0.0], [16.0, 0.0],
        [13.0, 1.0], [15.0, 1.0], [6.0, 2.0], [8.0, 2.0], [10.0, 2.0]],
    "fence-middle": [[12.0, 2.0], [14.0, 2.0], [16.0, 2.0], [9.0, 3.0], [11.0, 3.0], [13.0, 3.0], [15.0, 3.0], [8.0, 4.0], [10.0, 4.0], [12.0, 4.0],
        [14.0, 4.0], [16.0, 4.0], [7.0, 5.0], [9.0, 5.0], [11.0, 5.0], [8.0, 6.0], [10.0, 6.0], [9.0, 7.0], [11.0, 7.0]],
    "fence-6": [[13.0, 5.0], [15.0, 5.0], [12.0, 6.0], [14.0, 6.0], [16.0, 6.0], [13.0, 7.0], [15.0, 7.0]],
    "tortured-half": [[0.0, 6.0], [1.0, 7.0], [5.0, 7.0], [7.0, 7.0], [0.0, 8.0], [2.0, 8.0], [4.0, 8.0], [6.0, 8.0], [8.0, 8.0], [10.0, 8.0], [12.0, 8.0],
        [14.0, 8.0], [16.0, 8.0], [1.0, 9.0], [3.0, 9.0], [5.0, 9.0], [7.0, 9.0], [9.0, 9.0], [11.0, 9.0], [13.0, 9.0], [15.0, 9.0], [0.0, 10.0], [2.0, 10.0],
        [4.0, 10.0], [6.0, 10.0], [8.0, 10.0], [10.0, 10.0], [12.0, 10.0], [14.0, 10.0], [16.0, 10.0], [1.0, 11.0], [3.0, 11.0], [5.0, 11.0], [7.0, 11.0],
        [9.0, 11.0], [11.0, 11.0], [13.0, 11.0], [15.0, 11.0], [0.0, 12.0], [2.0, 12.0], [4.0, 12.0], [6.0, 12.0], [8.0, 12.0], [10.0, 12.0], [12.0, 12.0],
        [14.0, 12.0], [16.0, 12.0], [1.0, 13.0], [3.0, 13.0], [5.0, 13.0], [7.0, 13.0], [13.0, 13.0], [15.0, 13.0], [2.0, 14.0], [4.0, 14.0], [6.0, 14.0],
        [8.0, 14.0], [10.0, 14.0], [12.0, 14.0], [14.0, 14.0], [16.0, 14.0]],
    "tortured-zero": [[9.0, 13.0], [11.0, 13.0]],
    "tortured-one": [[0.0, 14.0], [1.0, 15.0], [3.0, 15.0], [5.0, 15.0], [7.0, 15.0], [9.0, 15.0]],
    "tortured-separated": [[0.0, 16.0], [2.0, 16.0], [4.0, 16.0], [6.0, 16.0], [8.0, 16.0], [1.0, 17.0], [3.0, 17.0], [5.0, 17.0], [7.0, 17.0], [9.0, 17.0],
        [16.0, 18.0], [11.0, 19.0], [13.0, 19.0], [15.0, 19.0], [10.0, 20.0], [12.0, 20.0], [14.0, 20.0], [16.0, 20.0]],
    "tortured-power": [[11.0, 15.0], [13.0, 15.0], [15.0, 15.0], [10.0, 16.0], [12.0, 16.0], [14.0, 16.0], [16.0, 16.0], [11.0, 17.0], [13.0, 17.0], [15.0, 17.0],
        [0.0, 18.0], [2.0, 18.0], [4.0, 18.0], [6.0, 18.0], [8.0, 18.0], [10.0, 18.0], [12.0, 18.0], [14.0, 18.0], [1.0, 19.0], [3.0, 19.0], [5.0, 19.0],
        [7.0, 19.0], [9.0, 19.0], [0.0, 20.0], [2.0, 20.0], [4.0, 20.0], [6.0, 20.0], [8.0, 20.0]],
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
    ["bite", [
        ["NW", ["bite_NW", Infinity]],
        ["NE", ["bite_NE", Infinity]],
        ["E", ["bite_E", Infinity]],
        ["SE", ["bite_SE", Infinity]],
        ["SW", ["bite_SW", Infinity]],
        ["W", ["bite_W", Infinity]],
        ["NW-NE", ["bite_NW-NE", Infinity]],
        ["NE-E", ["bite_NE-E", Infinity]],
        ["E-SE", ["bite_E-SE", Infinity]],
        ["SE-SW", ["bite_SE-SW", Infinity]],
        ["SW-W", ["bite_SW-W", Infinity]],
        ["W-NW", ["bite_W-NW", Infinity]],
        ["NW-E", ["bite_NW-E", Infinity]],
        ["NE-SE", ["bite_NE-SE", Infinity]],
        ["E-SW", ["bite_E-SW", Infinity]],
        ["SE-W", ["bite_SE-W", Infinity]],
        ["SW-NW", ["bite_SW-NW", Infinity]],
        ["W-NE", ["bite_W-NE", Infinity]],
        ["NW-SE", ["bite_NW-SE", Infinity]],
        ["NE-SW", ["bite_NE-SW", Infinity]],
        ["E-W", ["bite_E-W", Infinity]],
    ]],
    ["case", [
        ["fav", ["case_fav", 1]],
        ["hex", ["case_hex", 1]],
        ["I", ["case_I", 2]],
        ["invest", ["case_invest", 1]],
        ["miss", ["case_miss", 1]],
        ["puzzle", ["case_puzzle", 1]],
        ["said", ["case_said", 1]],
    ]],
    ["fence", [
        ["e", ["fence_e", Infinity]],
        ["1", ["fence_1", Infinity]],
        ["2", ["fence_2", Infinity]],
        ["3", ["fence_3", Infinity]],
        ["4", ["fence_4", Infinity]],
        ["5", ["fence_5", Infinity]],
        ["6", ["fence_6", Infinity]],
        ["12", ["fence_12", Infinity]],
        ["23", ["fence_23", Infinity]],
        ["34", ["fence_34", Infinity]],
        ["45", ["fence_45", Infinity]],
        ["56", ["fence_56", Infinity]],
        ["61", ["fence_61", Infinity]],
        ["13", ["fence_13", Infinity]],
        ["24", ["fence_24", Infinity]],
        ["35", ["fence_35", Infinity]],
        ["46", ["fence_46", Infinity]],
        ["51", ["fence_51", Infinity]],
        ["62", ["fence_62", Infinity]],
        ["14", ["fence_14", Infinity]],
        ["25", ["fence_25", Infinity]],
        ["36", ["fence_36", Infinity]],
        ["123", ["fence_123", Infinity]],
        ["234", ["fence_234", Infinity]],
        ["345", ["fence_345", Infinity]],
        ["456", ["fence_456", Infinity]],
        ["561", ["fence_561", Infinity]],
        ["612", ["fence_612", Infinity]],
        ["124", ["fence_124", Infinity]],
        ["235", ["fence_235", Infinity]],
        ["346", ["fence_346", Infinity]],
        ["451", ["fence_451", Infinity]],
        ["562", ["fence_562", Infinity]],
        ["613", ["fence_613", Infinity]],
        ["125", ["fence_125", Infinity]],
        ["236", ["fence_236", Infinity]],
        ["341", ["fence_341", Infinity]],
        ["452", ["fence_452", Infinity]],
        ["563", ["fence_563", Infinity]],
        ["614", ["fence_614", Infinity]],
        ["135", ["fence_135", Infinity]],
        ["246", ["fence_246", Infinity]],
        ["1234", ["fence_1234", Infinity]],
        ["2345", ["fence_2345", Infinity]],
        ["3456", ["fence_3456", Infinity]],
        ["4561", ["fence_4561", Infinity]],
        ["5612", ["fence_5612", Infinity]],
        ["6123", ["fence_6123", Infinity]],
        ["1235", ["fence_1235", Infinity]],
        ["2346", ["fence_2346", Infinity]],
        ["3451", ["fence_3451", Infinity]],
        ["4562", ["fence_4562", Infinity]],
        ["5613", ["fence_5613", Infinity]],
        ["6124", ["fence_6124", Infinity]],
        ["1245", ["fence_1245", Infinity]],
        ["2356", ["fence_2356", Infinity]],
        ["3461", ["fence_3461", Infinity]],
        ["12345", ["fence_12345", Infinity]],
        ["23456", ["fence_23456", Infinity]],
        ["34561", ["fence_34561", Infinity]],
        ["45612", ["fence_45612", Infinity]],
        ["56123", ["fence_56123", Infinity]],
        ["61234", ["fence_61234", Infinity]],
        ["123456", ["fence_123456", Infinity]],
    ]],
    ["tortured-zero", [
        ["21", ["tortured-zero_21", 1]],
        ["40", ["tortured-zero_40", 1]],
    ]],
    ["tortured-one", [
        ["21", ["tortured-one_21", 1]],
        ["24", ["tortured-one_24", 1]],
        ["31", ["tortured-one_31", 1]],
        ["3e", ["tortured-one_3e", 1]],
        ["7c", ["tortured-one_7c", 1]],
    ]],
    ["tortured-separated", [
        ["24", ["tortured-separated_24", 1]],
        ["2a", ["tortured-separated_2a", 1]],
        ["2f", ["tortured-separated_2f", 1]],
        ["32", ["tortured-separated_32", 1]],
        ["33", ["tortured-separated_33", 1]],
        ["3b", ["tortured-separated_3b", 1]],
        ["3c", ["tortured-separated_3c", 1]],
        ["3e", ["tortured-separated_3e", 1]],
        ["40", ["tortured-separated_40", 1]],
        ["5b", ["tortured-separated_5b", 1]],
        ["5c", ["tortured-separated_5c", 1]],
        ["5d", ["tortured-separated_5d", 1]],
    ]],
    ["tortured-power", [
        ["27", ["tortured-power_27", 1]],
        ["28", ["tortured-power_28", 1]],
        ["29", ["tortured-power_29", 1]],
        ["2f", ["tortured-power_2f", 1]],
        ["30", ["tortured-power_30", 1]],
        ["3c", ["tortured-power_3c", 1]],
        ["40", ["tortured-power_40", 1]],
        ["5c", ["tortured-power_5c", 1]],
        ["5f", ["tortured-power_5f", 1]],
        ["7d", ["tortured-power_7d", 1]],
    ]],
    ["tortured-half", [
        ["22", ["tortured-half_22", 1]],
        ["24", ["tortured-half_24", 1]],
        ["27", ["tortured-half_27", 1]],
        ["2c", ["tortured-half_2c", 1]],
        ["2f", ["tortured-half_2f", 1]],
        ["31", ["tortured-half_31", 1]],
        ["3c", ["tortured-half_3c", 1]],
        ["3e", ["tortured-half_3e", 1]],
        ["5c", ["tortured-half_5c", 1]],
        ["5e", ["tortured-half_5e", 1]],
        ["5f", ["tortured-half_5f", 1]],
        ["7b", ["tortured-half_7b", 1]],
        ["7c", ["tortured-half_7c", 1]],
        ["7d", ["tortured-half_7d", 1]],
    ]]
] as [string, [string, [string, number]][]][])
    .map(([group, tiles]) => [group, new Map(tiles)]))

const PUZZLE_NAMES = new Map(Object.entries<[string, string]>({
    "bite": ["Bite-Sized Logic", "Anglers (Fishing)"],
    "case": ["The Case of the Superhero Dinner Party", "Regretful Testimony"],
    "fence-6": ["On the Fence", "Six"],
    "fence-middle": ["On the Fence", "Middle"],
    "tortured-half": ["The Tortured Programmer's Department", "THE FIRST HALF <i>(Do not wrap.)</i>"],
    "tortured-zero": ["The Tortured Programmer's Department", "TRIVIAL ZERO <i>(Do not wrap.)</i>"],
    "tortured-one": ["The Tortured Programmer's Department", "ONE FOREVER <i>(Do not wrap.)</i>"],
    "tortured-power": ["The Tortured Programmer's Department", "POWER OF TEN <i>(Do not wrap.)</i>"],
    "tortured-separated": ["The Tortured Programmer's Department", "SEPARATED <i>(Do not wrap.)</i>"],
}))

const PUZZLE_TILE_GROUPS = new Map(Object.entries({
    "bite": "bite",
    "case": "case",
    "fence-6": "fence",
    "fence-middle": "fence",
    "tortured-half": "tortured-half",
    "tortured-zero": "tortured-zero",
    "tortured-one": "tortured-one",
    "tortured-power": "tortured-power",
    "tortured-separated": "tortured-separated",
}))

const HEPTAGON_MESSAGES = new Map(Object.entries({
    "bite": "What are you fishing for, heptagons?",
    "case": "A recent investigation has concluded that these are heptagons, not hexagons.",
    "fence": "There's a fence between 6 and 7. Heptagons are not hexagons.",
    "tortured-half":      "Are you trying to invent Heptagony?",
    "tortured-zero":      "Are you trying to invent Heptagony?",
    "tortured-one":       "Are you trying to invent Heptagony?",
    "tortured-power":     "Are you trying to invent Heptagony?",
    "tortured-separated": "Are you trying to invent Heptagony?",
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
    ["bite", [
        [[1, 1],  "NW-E"],
        [[3, 1],  "E-W"],
        [[5, 1],  "W"],
        [[2, 2],  "SW-W"],
        [[4, 2],  "SW"],
        [[1, 3],  "NE-E"],
        [[3, 3],  "W-NE"],
        [[5, 3],  "E-SE"],
        [[0, 4],  "E"],
        [[2, 4],  "SE-W"],
        [[4, 4],  "E-SW"],
        [[6, 4],  "W-NW"],
        [[1, 5],  "SE"],
        [[3, 5],  "NW-NE"],
        [[5, 5],  "SE-SW"],
        [[2, 6],  "NW-SE"],
        [[4, 6],  "NE"],
    ]],
    ["case", [
        [[0, 0],  "fav"],
        [[9, 1],  "puzzle"],
        [[13, 1],  "invest"],
        [[6, 2],  "hex"],
        [[4, 0],  "I"],
        [[8, 0],  "said"],
        [[12, 0],  "I"],
        [[5, 1],  "miss"],
    ]],
    ["fence-middle", [
        [[5, 0],  "61234"],
        [[7, 0],  "61"],
        [[9, 0],  "e"],
        [[2, 1],  "56"],
        [[4, 1],  "3456"],
        [[6, 1],  "341"],
        [[8, 1],  "561"],
        [[1, 2],  "123"],
        [[3, 2],  "235"],
        [[5, 2],  "562"],
        [[7, 2],  "563"],
        [[9, 2],  "23456"],
        [[0, 3],  "5612"],
        [[2, 3],  "46"],
        [[4, 3],  "6123"],
        [[1, 4],  "2345"],
        [[3, 4],  "3451"],
        [[2, 5],  "45612"],
        [[4, 5],  "12"],
    ]],
    ["fence-6", [
        [[2, 1],  "123456"],
        [[4, 1],  "1"],
        [[3, 2],  "2"],
        [[1, 2],  "3"],
        [[0, 1],  "4"],
        [[1, 0],  "5"],
        [[3, 0],  "6"],
    ]],
    ["tortured-zero", [
        [[0, 0],  "21"],
        [[2, 0],  "40"],
    ]],
    ["tortured-one", [
        [[0, 0],  "31"],
        [[1, 1],  "3e"],
        [[3, 1],  "24"],
        [[5, 1],  "7c"],
        [[7, 1],  "21"],
    ]],
    ["tortured-separated", [
        [[2, 0],  "32"],
        [[6, 0],  "5b"],
        [[8, 0],  "5c"],
        [[3, 1],  "33"],
        [[5, 1],  "2a"],
        [[7, 1],  "3c"],
        [[9, 1],  "24"],
        [[16, 2],  "40"],
        [[16, 4],  "2f"],
        [[14, 4],  "3b"],
        [[12, 4],  "5d"],
        [[11, 3],  "3e"],
    ]],
    ["tortured-power", [
        [[0, 5],  "5c"],
        [[2, 3],  "7d"],
        [[4, 3],  "30"],
        [[5, 4],  "28"],
        [[13, 2],  "29"],
        [[6, 5],  "40"],
        [[16, 1],  "2f"],
        [[14, 3],  "3c"],
        [[12, 3],  "27"],
        [[8, 5],  "5f"],
    ]],
    ["tortured-half", [
        [[0, 0],  "3e"],
        [[1, 1],  "5e"],
        [[4, 2],  "31"],
        [[5, 3],  "5f"],
        [[9, 5],  "24"],
        [[1, 5],  "7c"],
        [[2, 8],  "5c"],
        [[6, 8],  "7d"],
        [[4, 8],  "7b"],
        [[4, 6],  "27"],
        [[6, 6],  "22"],
        [[12, 8],  "2c"],
        [[15, 7],  "3c"],
        [[16, 8],  "2f"],
    ]],
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
const OUTLINE_HALF_THICKNESS = 2.0;
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
        this.tileSidebars = map_map_values(this.tiles, (group, tiles) => {
            let div = document.createElement("div")
            div.classList.add("tiles")
            div.setAttribute("style", "display: none");
            this.sidebar.appendChild(div);
            for (let [name, tile] of tiles.entries()) {
                div.appendChild(tile.div)
                tile.div.addEventListener("pointerdown", (ev: PointerEvent) => {
                    this.startDrag([group, name], ev);
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
            note.innerHTML = HEPTAGON_MESSAGES.get(this.activeTile[0])!;
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
            this.tileSidebars.get(PUZZLE_TILE_GROUPS.get(this.activePuzzle)!)!.setAttribute("style", "display: none;")
        }
        this.activePuzzle = name
        this.sidebar.setAttribute("style", name === undefined ? "display: none;" : "");
        this.title.children[0].innerHTML = name === undefined ? "&nbsp;" : PUZZLE_NAMES.get(name)![0];
        this.title.children[1].innerHTML = name === undefined ? "&nbsp;" : PUZZLE_NAMES.get(name)![1];
        if (this.activePuzzle !== undefined) {
            this.covers.get(this.activePuzzle)!.setAttribute("style", "display: none;");
            this.tileSidebars.get(PUZZLE_TILE_GROUPS.get(this.activePuzzle)!)!.setAttribute("style", "")
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
        if (offset !== undefined) {
            let gridPos = offsetToGridPos(offset);
            if (FILLABLE.get(gridPos.toString()))
                this.addTile(gridPos, this.activeTile);
        }
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
        if (this.activePuzzle === undefined || ATLAS_GRID_INV.get(gridPos.toString()) !== this.activePuzzle) return;
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
            this.sidebar.classList.remove("correct");
            return;
        }
        let correctFilling = Array.from(CORRECT_FILLINGS.get(this.activePuzzle)!.entries());
        let correct = correctFilling.every(([pos, tile]) => this.filling.get(pos)?.[0]?.[1] === tile);
        if (correct) {
            this.title.classList.add("correct");
            this.sidebar.classList.add("correct");
        } else {
            this.title.classList.remove("correct");
            this.sidebar.classList.remove("correct");
        }
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