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
      x: (Math.random() - 0.5) * 0.1, // Slower movement
      y: (Math.random() - 0.5) * 0.1
    };
    this.radius = Math.random() * 150 + 100; // Smaller radius
    this.color = this.getRandomColor();
    this.alpha = Math.random() * 0.15 + 0.05; // Lower opacity
    this.scale = Math.random() * 0.4 + 0.6; // Smaller initial scale
    this.scaleSpeed = (Math.random() - 0.5) * 0.001; // Slower scale animation
  }

  private getRandomColor(): string {
    const colorKeys = Object.keys(colors.accent) as Array<keyof typeof colors.accent>;
    return colors.accent[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.filter = 'blur(50px)'; // Less blur for sharper appearance
    
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

    if (this.scale <= 0.6 || this.scale >= 1.0) {
      this.scaleSpeed *= -1;
    }

    if (this.pos.x < -this.radius) this.pos.x = width + this.radius;
    if (this.pos.x > width + this.radius) this.pos.x = -this.radius;
    if (this.pos.y < -this.radius) this.pos.y = height + this.radius;
    if (this.pos.y > height + this.radius) this.pos.y = -this.radius;
  }
}