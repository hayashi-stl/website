export {}

async function main() {
    // Seems like getElementsByTagName is lazy
    let images = [...document.getElementsByTagName("img")];
    images = images.filter(img => img.src.endsWith("svg"));
    console.log(images);

    function animate() {
        requestAnimationFrame(animate);
        let viewport = window.visualViewport;
        for (let image of images) {
            let rect = image.getBoundingClientRect();
            let show = viewport !== null && rect.bottom >= 0 && rect.top < viewport?.height && rect.left >= 0 && rect.right < window.outerWidth;
            image.setAttribute("style", show ? "display:none" : "");
        }
    }
    requestAnimationFrame(animate);
}

main();