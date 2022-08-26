import { Component, ElementRef, HostListener, OnInit, ViewChild, } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  // Declare variables
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  radius: number = 80;
  point_size: number = 4;
  context: any;
  centerX: number;
  centerY: number;
  angle: number = 240;
  distance: number = 1;
  nbOfPoints: number = 15;
  points: any[] = [];
  cursorX: number;
  cursorY: number;
  point1: any;
  point2: any;
  constructor() { }

  ngOnInit(): void {
    this.initCanvas();
  }

  // init Canvas
  initCanvas() {
    this.context = this.canvas.nativeElement.getContext("2d");
    this.centerX = this.canvas.nativeElement.width / 2;
    this.centerY = this.canvas.nativeElement.height / 2;
    this.drawCircle();
    this.generatePointsPos();
  }

  // Draw circle function 
  drawCircle() {
    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    this.context.lineWidth = 2;
    this.context.stroke();
  }

  // Generate points positions function 
  generatePointsPos() {
    for (let i = 0; i < this.nbOfPoints; i++) {
      this.angle = this.angle + 360 / this.nbOfPoints - 1;
      this.drawPoints();
    }
    console.log(this.points)
  }

  // Draw Points function
  drawPoints() {
    let posX = this.centerX + this.radius * Math.cos((this.angle * Math.PI) / 180) * this.distance;
    let posY = this.centerY + this.radius * Math.sin((this.angle * Math.PI) / 180) * this.distance;
    this.points.push({
      posX,
      posY
    })
    //  console.log(this.points)
    this.context.beginPath();
    this.context.arc(posX, posY, this.point_size, 0, 2 * Math.PI);
    this.context.fill();
  }

  // Drawing function in circle 
  canvasClicked(event: any) {
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
    // console.log(this.cursorX, this.cursorY);

    // Loop 
    this.points.forEach(point => {
      if (this.cursorX > point.posX - 15 && this.cursorX < point.posX + 15 && this.cursorY > point.posY - 15 && this.cursorY < point.posY + 15) {
        if (this.point1) {
          this.point2 = point;
          this.context.fillStyle = 'red'
          this.context.beginPath();
          this.context.arc(this.point2.posX, this.point2.posY, this.point_size, 0, 2 * Math.PI);
          this.context.fill();

        } else {
          this.point1 = point;
          this.context.fillStyle = 'red'
          this.context.beginPath();
          this.context.arc(this.point1.posX, this.point1.posY, this.point_size, 0, 2 * Math.PI);
          this.context.fill();
        }

        // Select point interaction
        if (this.point1 && this.point2) {
          this.context.beginPath();
          this.context.moveTo(this.point1.posX, this.point1.posY);
          this.context.lineTo(this.point2.posX, this.point2.posY);
          this.context.stroke();

          this.context.fillStyle = 'black'
          this.context.beginPath();
          this.context.arc(this.point1.posX, this.point1.posY, this.point_size, 0, 2 * Math.PI);
          this.context.fill();

          this.context.fillStyle = 'black'
          this.context.beginPath();
          this.context.arc(this.point2.posX, this.point2.posY, this.point_size, 0, 2 * Math.PI);
          this.context.fill();

          this.point1 = undefined;
          this.point2 = undefined;
        }
      }
    });
  }
}
