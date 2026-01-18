export interface Layer {
  depth: number;
  color: string;
  particles: {
    x: number;
    y: number;
    size: number;
    speed: number;
  }[];
}

export class ParticleSystem {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  layers: Layer[] = [];
  
  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.init();
  }

  init() {
    const layerConfigs = [
      { depth: 0.1, count: 50, color: "rgba(0, 212, 255, 0.3)" },
      { depth: 0.3, count: 30, color: "rgba(0, 212, 255, 0.4)" },
      { depth: 0.5, count: 20, color: "rgba(255, 255, 255, 0.3)" },
      { depth: 0.8, count: 15, color: "rgba(0, 212, 255, 0.5)" },
      { depth: 1.2, count: 10, color: "rgba(255, 255, 255, 0.4)" },
    ];

    this.layers = layerConfigs.map(config => ({
      depth: config.depth,
      color: config.color,
      particles: Array.from({ length: config.count }).map(() => ({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
      }))
    }));
  }

  update(_scroll: number, _mouseX: number, _mouseY: number) {
    // We don't need to update individual particles here anymore
    // The parallax is handled in the draw call based on global inputs
  }

  draw(scroll: number, mouseX: number, mouseY: number) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    
    const mouseOffsetX = (mouseX - centerX) * 0.02;
    const mouseOffsetY = (mouseY - centerY) * 0.02;

    this.layers.forEach(layer => {
      this.ctx.fillStyle = layer.color;
      
      layer.particles.forEach(p => {
        // Horizontal Parallax: Mouse + Layer Depth
        let x = p.x + mouseOffsetX * layer.depth;
        
        // Vertical Parallax: Mouse + Scroll + Layer Depth
        let y = p.y - (scroll * 0.1 * layer.depth) + (mouseOffsetY * layer.depth);
        
        // Wrap around
        x = ((x % this.width) + this.width) % this.width;
        y = ((y % this.height) + this.height) % this.height;

        this.ctx.beginPath();
        this.ctx.arc(x, y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add subtle connection lines for some layers
        if (layer.depth > 0.5) {
          // This could be optimized, but for a "revert" let's keep it simple
        }
      });
    });
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.init();
  }
}
