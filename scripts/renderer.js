class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let p00 = {x: 100, y: 100};
        let p01 = {x: 100, y: 200};
        let p02 = {x: 200, y: 200};
        let p03 = {x: 200, y: 100};
        let color0 = [255, 0, 0, 255];

        let p10 = {x: 300, y: 300};
        let p11 = {x: 300, y: 400};
        let p12 = {x: 500, y: 500};
        let p13 = {x: 500, y: 400};
        let color1 = [0, 255, 0, 255];

        this.drawBezierCurve(p00, p01, p02, p03, this.num_curve_sections, color0, framebuffer);
        this.drawBezierCurve(p10, p11, p12, p13, this.num_curve_sections, color1, framebuffer);

        // Following line is example of drawing a single line
        // (this should be removed after you implement the curve)
        // this.drawLine({x: 100, y: 100}, {x: 600, y: 300}, [255, 0, 0, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        this.drawCircle({x: 300, y: 300}, 100, this.num_curve_sections, [0, 0, 255, 255], framebuffer);
        this.drawCircle({x: 500, y: 500}, 50, this.num_curve_sections, [0, 255, 127, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
    
        let hexagon_vertices = [
            {x: 217, y: 300},
            {x: 250, y: 350},
            {x: 300, y: 350},
            {x: 333, y: 300},
            {x: 300, y: 250},
            {x: 250, y: 250}
        ];

        let octagon_vertices = [
            {x: 400, y: 275},
            {x: 400, y: 325},
            {x: 450, y: 375},
            {x: 500, y: 375},
            {x: 550, y: 325},
            {x: 550, y: 275},
            {x: 500, y: 225},
            {x: 450, y: 225}
        ];
        
        this.drawConvexPolygon(hexagon_vertices, [255, 0, 0, 255], framebuffer);
        this.drawConvexPolygon(octagon_vertices, [0, 255, 0, 255], framebuffer);
        
        // Following lines are example of drawing a single triangle
        // (this should be removed after you implement the polygon)
        // let point_a = {x:  80, y:  40};
        // let point_b = {x: 320, y: 160};
        // let point_c = {x: 240, y: 360};
        // this.drawTriangle(point_a, point_c, point_b, [0, 128, 128, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        this.drawBezierCurve(
            {x: 200, y: 375},
            {x: 0, y: 600}, 
            {x: 0, y: 0}, 
            {x: 200, y: 225}, 
            this.num_curve_sections,
            [0, 0, 255, 255], 
            framebuffer
        );
        this.drawLine({x: 200, y: 175}, {x: 200, y: 250}, [0, 0, 255, 255], framebuffer);
        this.drawLine({x: 200, y: 250}, {x: 125, y: 250}, [0, 0, 255, 255], framebuffer);

        this.drawBezierCurve(
            {x: 300, y: 240},
            {x: 188, y: 300},
            {x: 188, y: 110},
            {x: 300, y: 200},
            this.num_curve_sections,
            [0, 0, 255, 255],
            framebuffer
        );
        this.drawLine({x: 300, y: 175}, {x: 300, y: 250}, [0, 0, 255, 255], framebuffer);

        this.drawLine({x: 325, y: 175}, {x: 325, y: 250}, [0, 0, 255, 255], framebuffer);
        this.drawBezierCurve(
            {x: 325, y: 235},
            {x: 325, y: 250},
            {x: 375, y: 250},
            {x: 375, y: 235},
            this.num_curve_sections,
            [0, 0, 255, 255],
            framebuffer
        );

        this.drawLine({x: 388, y: 175}, {x: 388, y: 250}, [0, 0, 255, 255], framebuffer);
        this.drawBezierCurve(
            {x: 388, y: 235},
            {x: 388, y: 250},
            {x: 433, y: 250},
            {x: 433, y: 235},
            this.num_curve_sections,
            [0, 0, 255, 255],
            framebuffer
        );

        this.drawLine({x: 450, y: 175}, {x: 450, y: 250}, [0, 0, 255, 255], framebuffer);
        this.drawCircle({x: 450, y: 265}, 5, this.num_curve_sections, [0, 0, 255, 255], framebuffer);

        this.drawBezierCurve(
            {x: 510, y: 230},
            {x: 520, y: 275},
            {x: 420, y: 240},
            {x: 490, y: 215},
            this.num_curve_sections,
            [0, 0, 255, 255],
            framebuffer
        );
        this.drawBezierCurve(
            {x: 490, y: 215},
            {x: 560, y: 175},
            {x: 460, y: 150},
            {x: 465, y: 200},
            this.num_curve_sections,
            [0, 0, 255, 255],
            framebuffer
        );

        this.drawCircle({x: 560, y: 213}, 38, this.num_curve_sections, [0, 0, 255, 255], framebuffer);

        this.drawLine({x: 615, y: 175}, {x: 615, y: 250}, [0, 0, 255, 255], framebuffer);
        this.drawBezierCurve(
            {x: 615, y: 175}, 
            {x: 615, y: 275},
            {x: 675, y: 275},
            {x: 675, y: 175},
            this.num_curve_sections,
            [0, 0, 255, 255],
            framebuffer
        );

        if (this.show_points) {
            this.drawVertex({x: 200, y: 175}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 200, y: 250}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 125, y: 250}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 300, y: 175}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 325, y: 250}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 300, y: 250}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 325, y: 175}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 388, y: 175}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 388, y: 250}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 450, y: 175}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 450, y: 250}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 615, y: 175}, [0, 0, 0, 255], framebuffer);
            this.drawVertex({x: 615, y: 250}, [0, 0, 0, 255], framebuffer);
        }
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        if (this.show_points) {
            this.drawVertex(p1, [125, 125, 125, 255], framebuffer);
            this.drawVertex(p2, [125, 125, 125, 255], framebuffer);
        }
        let t = 0.0;
        let dt = 1.0 / num_edges;
        let x0 = parseInt((1 - t) ** 3 * p0.x + 3 * (1 - t) ** 2 * t * p1.x + 3 * (1 - t) * t ** 2 * p2.x + t ** 3 * p3.x);
        let y0 = parseInt((1 - t) ** 3 * p0.y + 3 * (1 - t) ** 2 * t * p1.y + 3 * (1 - t) * t ** 2 * p2.y + t ** 3 * p3.y);
        for (let i = 0; i < num_edges; i++) {
            t += dt;
            let x1 = parseInt((1 - t) ** 3 * p0.x + 3 * (1 - t) ** 2 * t * p1.x + 3 * (1 - t) * t ** 2 * p2.x +  t ** 3 * p3.x);
            let y1 = parseInt((1 - t) ** 3 * p0.y + 3 * (1 - t) ** 2 * t * p1.y + 3 * (1 - t) * t ** 2 * p2.y +  t ** 3 * p3.y);
            this.drawLine({x: x0, y: y0}, {x: x1, y: y1}, color, framebuffer);
            if (this.show_points) {
                this.drawVertex({x: x0, y: y0}, [0, 0, 0, 255], framebuffer);
                this.drawVertex({x: x1, y: y1}, [0, 0, 0, 255], framebuffer);
            }
            x0 = x1;
            y0 = y1;
        }
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        let dphi = 2 * Math.PI / num_edges
        let phi = 0.0;
        let x0 = parseInt(center.x + radius * Math.cos(phi));
        let y0 = parseInt(center.y + radius * Math.sin(phi));
        for (let i = 0; i < num_edges; i++) {
            phi += dphi;
            let x1 = parseInt(center.x + radius * Math.cos(phi));
            let y1 = parseInt(center.y + radius * Math.sin(phi));
            this.drawLine({x: x0, y: y0}, {x: x1, y: y1}, color, framebuffer);
            if (this.show_points) {
                this.drawVertex({x: x0, y: y0}, [0, 0, 0, 255], framebuffer);
                this.drawVertex({x: x1, y: y1}, [0, 0, 0, 255], framebuffer);
            }
            x0 = x1;
            y0 = y1;
        }
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        for (let i = 0; i < vertex_list.length - 2; i++) {
            let point_a = vertex_list[0];
            let point_b = vertex_list[i + 1];
            let point_c = vertex_list[i + 2];
            this.drawTriangle(point_a, point_b, point_c, color, framebuffer);
            if (this.show_points) {
                this.drawVertex({x: point_a.x, y: point_a.y}, [0, 0, 0, 255], framebuffer);
                this.drawVertex({x: point_b.x, y: point_b.y}, [0, 0, 0, 255], framebuffer);
                this.drawVertex({x: point_c.x, y: point_c.y}, [0, 0, 0, 255], framebuffer);
            }
        }
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                this.setFramebufferColor(color, v.x + i, v.y + j, framebuffer);
            }
        }
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(color, x, y, framebuffer) {
	    let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }
    
    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }
    
    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

export { Renderer };
