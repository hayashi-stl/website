#version 300 es
// Initially ported from https://www.shadertoy.com/view/XcX3DB

precision highp float;

in vec2 v_position;
out vec4 o_color;

uniform mat3 u_rotation;
uniform mat3 u_conjugate_rotation;
uniform mat3 u_interp_rotation;
uniform sampler2D u_text;
uniform ivec2 u_textures[24];
uniform ivec2 u_num_textures;

//const ivec3 ANGLES = ivec3(2, 3, 7);
const float COS_TAU_4 = 0.0;
const float COS_TAU_6 = 0.5;
const float COS_TAU_14 = 0.9009688679;
const float SIN_TAU_14 = 0.4338837391;
const float L_WIDTH = 0.07;

// Basic operations for hyperbolic (Minkowski) space

float hdot(vec3 p, vec3 q) {
    return dot(vec3(1, 1, -1) * p, q);
}

vec3 hcross(vec3 p, vec3 q) {
    // hdot(p,hcross(p,q)) = hdot(q,hcross(p,q)) = 0
    return cross(p, q) * vec3(1, 1, -1);
}

float hnorm(vec3 p) {
    return hdot(p, p);
}

vec3 hnormalize(vec3 p) {
    float t = hnorm(p);
    if (t < 0.0 && p.z < 0.0) p = -p;
    return p / sqrt(abs(t));
}

// Construct the sides of a hyperbolic triangle, for
// p, q, r the cosines of the dihedral angles.
// b·c = -p, c·a = -q, a·b = -r.
// (Side a is opposite point A at (0,0,1) etc.)
// These are inside normals so that side c is the y-axis, etc.
// Ensure everthing is properly (h)normalized.
mat3 triangle(float p, float q, float r) {
    vec3 c = vec3(1, 0, 0);
    vec3 b = vec3(-p, sqrt(1.0 - p * p), 0.0);
    // a = (x, y, z):
    // a·c = -r → x = -r
    // a·b = -q → -r * -p + y * b.y = -q
    // x² + y² - z² = -1
    vec3 a = vec3(-r, -(q + p * r) / b.y, 0.0);
    a.z = -sqrt(a.x * a.x + a.y * a.y - 1.0);
    return mat3(a, b, c);
}

// Convert hyperbolic line into a Euclidean circle.
// z component is square of radius.
vec3 to_circle(vec3 l) {
    l /= l.z;
    l.z = dot(l.xy, l.xy) - 1.0;
    return l;
}

// Convert hyperbolic line into a Euclidean line.
vec2 to_line(vec3 l) {
    return l.xy;
}

// Reflect in a euclidean line
bool do_reflect(vec2 l, inout vec2 z) {
    float k = dot(z, l);
    z -= 2.0 * k * l;
    return true;
}

// Invert in a euclidean circle
bool do_invert(vec3 c, inout vec2 z) {
    float r2 = c.z;
    vec2 z1 = z - c.xy;
    float l2 = dot(z1, z1);
    z1 *= r2 / l2;
    z = z1 + c.xy;
    return true;
}

// Reflect in a euclidean line
bool try_reflect(vec2 l, inout vec2 z) {
    float k = dot(z, l);
    if (k > 0.0) return false;
    z -= 2.0 * k * l;
    return true;
}

// Invert in a euclidean circle
bool try_invert(vec3 c, inout vec2 z) {
    float r2 = c.z;
    vec2 z1 = z - c.xy;
    float l2 = dot(z1, z1);
    if (l2 > r2) return false;
    z1 *= r2 / l2;
    z = z1 + c.xy;
    return true;
}

// Map point on plane to hyperboloid hnorm(p) = -1
vec3 unproject(vec2 z) {
    // k²|z|² - (1 - k)² = -1
    // k²|z|² - 1 + 2k - k² = -1
    // k|z|² + 2 - k = 0
    float k = 2.0 / (1.0 - dot(z, z));
    return vec3(k * z, k - 1.0);
}

vec2 hproject(vec3 z) {
    float k = z.z + 1.0;
    return z.xy / k;
}

int heptagon_flip(int fat_tri_index) {
    int block = fat_tri_index / 56;
    int hept = fat_tri_index % 56 / 7;
    int tri = fat_tri_index % 7;
    return hept == 7 ? (block * 8 + hept - 7 + tri) * 7 :
        tri == 0 ? (block * 8 + 7) * 7 + hept :
        tri == 1 ? (block * 8 + (hept + 6) % 7) * 7 + 6 :
        tri == 2 ? ((block + 1) % 3 * 8 + (2 * hept + 6) % 7) * 7 + 3 :
        tri == 3 ? ((block + 2) % 3 * 8 + (4 * hept + 4) % 7) * 7 + 2 :
        tri == 4 ? ((block + 2) % 3 * 8 + (4 * hept + 3) % 7) * 7 + 5 :
        tri == 5 ? ((block + 1) % 3 * 8 + (2 * hept + 1) % 7) * 7 + 4 :
                   (block * 8 + (hept + 1) % 7) * 7 + 1;
}

// Folding the Klein quartic curve:
// The 14 triangles of each heptagon are numbered counterclockwise from 14k+0 to 14k+13,
// starting with one oriented like a flipped L with its diagonal.
// The heptagons' k's are assigned arbitrary and require a map.
vec2 fold(vec2 z, int num_folds, mat3 edges, inout int tri_index) {
    // Using Poincaré model for the fold seems to be more stable
    // so convert hyperbolic lines to Euclidean lines or circles
    vec3 a = to_circle(edges[0]);
    vec2 b = to_line(edges[1]);
    vec2 c = to_line(edges[2]);
    for (int i = 0; i < num_folds; ++i) {
        bool reflected = false;
        if (try_invert(a, z)) {
            reflected = true;
            tri_index = tri_index / 14 * 14 + ((tri_index + 1 ^ 1) + 13) % 14;
        }
        if (try_reflect(c, z)) {
            reflected = true;
            tri_index ^= 1;
        }
        if (try_reflect(b, z)) {
            reflected = true;
            tri_index = heptagon_flip(tri_index / 2) * 2 + ((tri_index & 1) ^ 1);
        }
        if (!reflected) break;
    }
    return z;
}

// Unfold z into a heptagon using the triangle part of the triangle index
vec2 heptagon_unfold(vec2 z, mat3 edges, int tri) {
    vec3 a = to_circle(edges[0]);
    vec2 c = to_line(edges[2]);

    if (tri % 2 == 0) do_reflect(c, z);
    tri /= 2;
    for (int i = 0; i < tri; ++i) {
        do_reflect(c, z);
        do_invert(a, z);
    }
    return z;
}

// Hyperbolic distance from line
float hline(vec3 p, vec3 l) {
    return abs(asinh(hdot(p, l)));
}

vec2 add_poincare(vec2 z, vec2 fac) {
    z += fac;
    z *= (dot(fac, fac) - 1.0) / dot(z, z);
    z -= fac;
    z /= -dot(z, z);
    return z;
}

void main() {
    // length in Poincaré model
    float short_radius = COS_TAU_6 / SIN_TAU_14;
    short_radius = sqrt(short_radius * short_radius - 1.0) / (1.0 + short_radius);
    mat3 edges = triangle(COS_TAU_4, COS_TAU_6, COS_TAU_14);

    vec2 z = v_position;
    vec2 w = vec2(0, -short_radius);
    //vec3 pz = unproject(add_poincare(z, -w));
    vec3 pz = unproject(z);
    pz = u_rotation * u_conjugate_rotation * u_interp_rotation * transpose(u_conjugate_rotation) * pz;
    z = add_poincare(hproject(pz), -w);

    vec3 color = vec3(0.0, 0.0, 0.2);
    vec3 line_color = vec3(0.0, 2.0 / 3.0, 2.0 / 3.0);
    if (dot(z, z) > 1.0) {
        o_color = vec4(color, 1.0);
        return;
    }
    int num_folds = 30;
    int tri_index = 7 * 14 + 1;
    z = fold(z, num_folds, edges, tri_index);
    vec3 p = unproject(z);
    int hept = tri_index / 14;
    int tri = tri_index % 14;
    ivec2 tex = u_textures[hept];
    if (tex.y >= 0) {
        vec2 hept_z = heptagon_unfold(z, edges, tri);
        hept_z = add_poincare(hept_z, vec2(0, -short_radius)) / short_radius * 0.5 + 0.5;
        hept_z = (hept_z + vec2(tex)) / vec2(u_num_textures) * vec2(1, -1) + vec2(0, 1);
        color = mix(color, line_color, texture(u_text, hept_z).a);
    }
    //color = vec3(step(0.8, fract(hept_z * 8.0)), 0.0);

    float t = 1e8;
    t = min(t, hline(p, edges[1]));
    float width = dFdx(v_position.x) / (1.0 - dot(v_position, v_position));
    color = mix(line_color, color, smoothstep(0.015 - width, 0.015 + width, abs(t)));
    o_color = vec4(color, 1.0);
}