import json
from math import sqrt, floor
from inkex.transforms import Vector2d

# Determine grid size. Assume the hexagons are connected
def grid_size(hex_pos):
    return min((hex - hex_pos[0]).length for hex in hex_pos[1:])

# Determine top-left position
def grid_top_left(hex_pos):
    return Vector2d([min(hex.x for hex in hex_pos), min(hex.y for hex in hex_pos)])
    #hex_grid = [(hex - hex_pos[0]) / size for hex in hex_pos]
    #hex_grid = [(round(hex.x + hex.y * sqrt(4/3) * 0.5), round(hex.y * sqrt(4/3))) for hex in hex_grid]
    #x = min(hx for hx, hy in hex_grid)
    #y = min(hy for hx, hy in hex_grid)
    #return Vector2d(x - y * 0.5, y * sqrt(3/4)) * size + hex_pos[0]

# Position in the grid. Assumes this is a hexagon center
def grid_pos_hex(hex_pos, top_left, size):
    pos = (hex_pos - top_left) / size
    return Vector2d([round(pos.x * 2.0), round(pos.y * sqrt(4/3))])

def grid_alignment(hex_pos, top_left, size):
    pos = grid_pos_hex(hex_pos[0], top_left, size)
    return (pos.x + pos.y) % 2

# Position in the grid. Does not assumes this is a hexagon center
def grid_pos(pos, top_left, size, alignment):
    result = (pos - top_left) / size
    result.x *= 2
    result.y /= sqrt(3/4)
    candidates = [can for can in [
        Vector2d([floor(result.x)    , floor(result.y    )]),
        Vector2d([floor(result.x)    , floor(result.y + 1)]),
        Vector2d([floor(result.x + 1), floor(result.y    )]),
        Vector2d([floor(result.x + 1), floor(result.y + 1)]),
    ] if (can.x + can.y) % 2 == alignment]
    # Scale back so that the dividing line is a perpendicular bisector
    scaled = [Vector2d([c.x, c.y * sqrt(3/4) * 2]) for c in candidates]
    result.y *= sqrt(3/4) * 2
    dist0 = (result - scaled[0]).length
    dist1 = (result - scaled[1]).length
    return candidates[0] if dist0 < dist1 else candidates[1]

def print_map(shapes):
    # hexagons are grouped by color
    hexagons = []
    texts = []
    for shape in shapes:
        if shape.tag == "path":
            hexagons.append(shape)
        elif shape.tag == "text":
            texts.append(shape)

    group_names = { t.style()["fill"]: t.get_inkex_object().get_text() for t in texts }
    hex_pos = [Vector2d(hex.bounding_box().center) for hex in hexagons]
    size = grid_size(hex_pos)
    top_left = grid_top_left(hex_pos)
    groups_by_pos = { grid_pos_hex(pos, top_left, size): group_names[hex.style()["fill"]] for pos, hex in zip(hex_pos, hexagons)}
    groups = { name: [] for name in group_names.values() }
    for pos, group in groups_by_pos.items():
        groups[group].append(list(pos))
    print("{")
    for group, pos in groups.items():
        print(f'    "{group}": {pos},')
    print("}")

def print_correct_answer(shapes):
    hexagons = []
    texts = []
    for shape in shapes:
        if shape.tag == "g":
            hexagons.append(shape)
        elif shape.tag == "text":
            texts.append(shape)

    hex_pos = [Vector2d(hex.bounding_box().center) for hex in hexagons]
    size = grid_size(hex_pos)
    top_left = grid_top_left(hex_pos)
    alignment = grid_alignment(hex_pos, top_left, size)
    print("[")
    for text in texts:
        pos = grid_pos(Vector2d(text.bounding_box().center), top_left, size, alignment)
        label = text.get_inkex_object().get_text().split(":")[0]
        print(f'    [[{pos}],  "{label}"],')
    print("]")

def rename_and_print_tile_info(shapes, group = None):
    hexagons = []
    texts = []
    for shape in shapes:
        if shape.tag == "g":
            hexagons.append(shape)
        elif shape.tag == "text":
            texts.append(shape)

    hex_pos = [Vector2d(hex.bounding_box().center) for hex in hexagons]
    size = grid_size(hex_pos)
    top_left = grid_top_left(hex_pos)
    alignment = grid_alignment(hex_pos, top_left, size)
    hex_map = {tuple(int(c) for c in grid_pos_hex(pos, top_left, size)): hex for pos, hex in zip(hex_pos, hexagons)}
    rename = group != None
    text_pos = [grid_pos(Vector2d(text.bounding_box().center), top_left, size, alignment) for text in texts]
    text_with_pos = sorted(zip(text_pos, texts), key=lambda x: tuple(x[0])[::-1])
    print("[")
    for pos, text in text_with_pos:
        #pos = grid_pos(Vector2d(text.bounding_box().center), top_left, size, alignment)
        split = text.get_inkex_object().get_text().split(":")
        hex = hex_map[tuple(int(c) for c in pos)]
        if not rename:
            group = hex.get_inkex_object().get_id().split("_")[0]
        id = f"{group}_{split[0]}"
        if rename:
            hex.get_inkex_object().set_id(id)
        limit = "Infinity" if split[1] == "∞" else split[1]
        print(f'    ["{split[0]}", ["{id}", {limit}]],')
    print("]")

#print_map(selected_shapes())
#print_correct_answer(selected_shapes())
rename_and_print_tile_info(selected_shapes(), "tortured-half")