---
---
canvas = document.getElementsByClassName("gltf-viewer")[0];
gl = canvas.getContext("webgl2")
if not gl
    console.log("WebGL 2 not supported")
    return