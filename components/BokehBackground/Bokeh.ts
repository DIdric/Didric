import { Vector } from './types';
import { colors } from '../../config/colors';

export class Particle {
  pos: Vector;
  vel: Vector;
  radius: number;
  color: string;
  alpha: number;
  scale: number;
  scaleSpeed: number;
  
  constructor(x: number, y: number) {
    this.pos = { x, y };
    this.vel = {
      x: (Math.random() - 0.5) * 0.2, // Even faster movement
      y: (Math.random() - 0.5) * 0.2
    };
    this.radius = Math.random() * 250 + 200; // Much larger radius
    this.color = this.getRandomColor();
    this.alpha = Math.random() * 0.2 + 0.1; // Higher opacity
    this.scale = Math.random() * 0.7 + 0.7; // Larger initial scale
    this.scaleSpeed = (Math.random() - 0.5) * 0.002; // Faster scale animation
  }

  private getRandomColor(): string {
    const colorKeys = Object.keys(colors.accent) as Array<keyof typeof colors.accent>;
    return colors.accent[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.filter = 'blur(100px)'; // Increased blur for more glow
    
    const gradient = ctx.createRadialGradient(
      this.pos.x, this.pos.y, 0,
      this.pos.x, this.pos.y, this.radius * this.scale
    );
    
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius * this.scale, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }

  update(width: number, height: number) {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.scale += this.scaleSpeed;

    if (this.scale <= 0.7 || this.scale >= 1.4) { // Increased scale range
      this.scaleSpeed *= -1;
    }

    if (this.pos.x < -this.radius) this.pos.x = width + this.radius;
    if (this.pos.x > width + this.radius) this.pos.x = -this.radius;
    if (this.pos.y < -this.radius) this.pos.y = height + this.radius;
    if (this.pos.y > height + this.radius) this.pos.y = -this.radius;
  }
}