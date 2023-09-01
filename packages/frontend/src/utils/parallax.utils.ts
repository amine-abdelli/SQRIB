export function parallax(e: MouseEvent) {
  document.querySelectorAll(".letters").forEach((layer, i) => {
    // Assert the type of 'layer' to be HTMLElement
    const htmlLayer = layer as HTMLElement;
    
    const speedStr = htmlLayer.getAttribute("data-speed");
    if (!speedStr) return;

    // Explicitly convert speed to a number
    const speed = parseFloat(speedStr);

    const x = (window.innerWidth - e.pageX * speed) / 110;
    const y = (window.innerHeight - e.pageY * speed) / 110;
    htmlLayer.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${i % 2 === 0 ? 12 : -12}deg)`;
  });
}
