//GRAPHICS LIBRARY
//requires global graphics and ctx var

function intGraphics(){

    // DRAW FUNCTIONS
    ctx.fillTriangle = function(x1, y1, x2, y2, x3, y3) {
        // Draw a filled triangle with vertices (x1, y1), (x2, y2), (x3, y3)
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.fill();
    }
    
    ctx.strokeTriangle = function(x1, y1, x2, y2, x3, y3, colour) {
        // Draw an outlined triangle with vertices (x1, y1), (x2, y2), (x3, y3)
        ctx.strokeStyle = colour;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath()
        ctx.stroke();
    }
    
    ctx.fillCircle = function (x, y, r, colour) {
        // Draw a filled circle with center (x, y) and radius (r)
        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    ctx.strokeCircle = function (x, y, r, colour) {
        // Draw an outlined circle with center (x, y) and radius (r)
        ctx.strokeStyle = colour;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    ctx.line = function (x1, y1, x2, y2) {
        // Draw a line segment from (x1, y1) to (x2, y2)
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    ctx.roundedStrokeRect = function (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7, x8, y8, x9, y9){
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.quadraticCurveTo(290, 210, x3, y3);
        ctx.lineTo(x4, y4);
        ctx.quadraticCurveTo(290, 290, x5, y5);
        ctx.lineTo(x6, y6);
        ctx.quadraticCurveTo(210, 290, x7, y7);
        ctx.lineTo(x8, y8);
        ctx.quadraticCurveTo(210, 210, x9, y9);
        ctx.stroke();
    }
    
    ctx.roundedFillRect = function (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6){
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.quadraticCurveTo(90, 10, x3, y3);
        ctx.lineTo(x4, y4);
        ctx.quadraticCurveTo(90, 90, x5, y5);
        ctx.lineTo(x6, y6);
        ctx.quadraticCurveTo(10, 90, x7, y7);
        ctx.lineTo(x8, y8);
        ctx.quadraticCurveTo(10, 10, x9, y9);
        ctx.fill();
    }
    }
    