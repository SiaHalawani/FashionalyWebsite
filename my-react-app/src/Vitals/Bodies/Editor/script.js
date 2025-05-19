
/**
 * Module Documentation: Canvas Drawing and Shape Management
 * 
 * This module provides functionality for managing a canvas, including drawing shapes, text, and images, and handling user interactions such as selection, dragging, and resizing. It supports a dynamic, layered structure for rendering and editing graphical elements.
 * 
 * ### Description
 * - Enables interaction with a canvas for graphical content creation.
 * - Provides utilities to add, modify, and remove shapes dynamically.
 * - Handles user interactions, such as dragging and selecting shapes.
 * - Maintains a structured layering system for rendering elements.
 * 
 * ### Dependencies
 * - **HTML Canvas API**: For graphical rendering and event handling.
 * - **JavaScript DOM Manipulation**: For setting up and managing the canvas environment.
 * 
 * ### Features
 * #### 1. Initialize Canvas
 * - Sets up a canvas element with predefined dimensions and event listeners.
 * - Configures an initial background color.
 * 
 * #### 2. Draw Shapes
 * - Handles rendering for rectangles, text, and images.
 * - Supports layering and rotation for elements.
 * 
 * #### 3. Add and Modify Shapes
 * - Provides methods to add rectangles, text, and images to the canvas.
 * - Allows modifying properties such as position, size, color, and rotation.
 * 
 * #### 4. User Interaction
 * - Enables shape selection, dragging, and deletion.
 * - Draws bounding boxes for selected shapes.
 * - Handles mouse events to support interactive editing.
 * 
 * ### API Functions
 * 
 * #### 1. **initializeCanvas**
 * - Sets up the canvas element and context.
 * 
 * **Parameters**:
 * - `canvasId` (String): The ID of the canvas element to initialize.
 * 
 * **Returns**:
 * - (Object): Contains the canvas and context objects.
 * 
 * **Usage**:
 * ```javascript
 * const { canvas, ctx } = initializeCanvas("editorCanvas");
 * ```
 * 
 * #### 2. **drawShapes**
 * - Renders all shapes on the canvas, maintaining the background color and layering order.
 * 
 * **Parameters**:
 * - None.
 * 
 * **Returns**:
 * - None.
 * 
 * **Usage**:
 * ```javascript
 * drawShapes();
 * ```
 * 
 * #### 3. **addRectangle**
 * - Adds a rectangle shape to the canvas.
 * 
 * **Parameters**:
 * - `x` (Number): X-coordinate.
 * - `y` (Number): Y-coordinate.
 * - `width` (Number): Width of the rectangle.
 * - `height` (Number): Height of the rectangle.
 * - `color` (String): Fill color.
 * 
 * **Returns**:
 * - None.
 * 
 * **Usage**:
 * ```javascript
 * addRectangle(50, 50, 100, 50, "blue");
 * ```
 * 
 * #### 4. **addText**
 * - Adds a text element to the canvas.
 * 
 * **Parameters**:
 * - `x` (Number): X-coordinate.
 * - `y` (Number): Y-coordinate.
 * - `text` (String): Text content.
 * - `fontSize` (Number): Font size in pixels.
 * - `color` (String): Text color.
 * 
 * **Returns**:
 * - None.
 * 
 * **Usage**:
 * ```javascript
 * addText(100, 100, "Hello World", 16, "black");
 * ```
 * 
 * #### 5. **addImage**
 * - Adds an image to the canvas.
 * 
 * **Parameters**:
 * - `image` (HTMLImageElement): The image object.
 * - `x` (Number): X-coordinate.
 * - `y` (Number): Y-coordinate.
 * - `width` (Number): Width of the image.
 * - `height` (Number): Height of the image.
 * 
 * **Returns**:
 * - None.
 * 
 * **Usage**:
 * ```javascript
 * addImage(myImage, 50, 50, 100, 100);
 * ```
 * 
 * #### 6. **deleteShape**
 * - Deletes a specified shape from the canvas.
 * 
 * **Parameters**:
 * - `shape` (Object): The shape object to delete.
 * 
 * **Returns**:
 * - None.
 * 
 * **Usage**:
 * ```javascript
 * deleteShape(selectedShape);
 * ```
 * 
 * #### 7. **setCanvasBackgroundColor**
 * - Changes the canvas background color and triggers a redraw.
 * 
 * **Parameters**:
 * - `color` (String): The new background color.
 * 
 * **Returns**:
 * - None.
 * 
 * **Usage**:
 * ```javascript
 * setCanvasBackgroundColor("#ff0000");
 * ```
 * 
 * #### 8. **isMouseOverShape**
 * - Checks if the mouse is over a specific shape.
 * 
 * **Parameters**:
 * - `shape` (Object): The shape object to check.
 * - `mouseX` (Number): X-coordinate of the mouse.
 * - `mouseY` (Number): Y-coordinate of the mouse.
 * 
 * **Returns**:
 * - (Boolean): Whether the mouse is over the shape.
 * 
 * **Usage**:
 * ```javascript
 * const isOver = isMouseOverShape(myShape, mouseX, mouseY);
 * ```
 * 
 * ### Usage Notes
 * - Ensure all shapes have a unique `layerIndex` for proper rendering order.
 * - Handle mouse events carefully to avoid conflicts during dragging and resizing.
 * - Use `setShapeSelectCallback` to synchronize shape selection with external state.
 * 
 * ### Example Integration
 * ```javascript
 * initializeCanvas("editorCanvas");
 * addRectangle(10, 10, 100, 50, "blue");
 * addText(20, 20, "Hello World", 16, "black");
 * drawShapes();
 * ```
 * 
 * ### Future Enhancements
 * - Add support for resizing shapes dynamically.
 * - Implement undo/redo functionality for better usability.
 * - Extend shape properties for gradients, border styles, and animations.
 */


////////////////////////////////////////////////////////
export let shapes = [];
let canvas, ctx;
let selectedShape = null;
let isDragging = false;
let isResizing = false;
let offsetX = 0,
  offsetY = 0;
let resizeHandleSize = 10;
let backgroundColor = "#ffffff";
let shapeSelectCallback = null;
export const setShapeSelectCallback = (callback) => {
  shapeSelectCallback = callback;
};

// Initialize Canvas
export const initializeCanvas = (canvasId) => {
  canvas = document.getElementById(canvasId);
  if (!canvas) {
      console.error(`Canvas with id "${canvasId}" not found.`);
      return { canvas: null, ctx: null };
  }

  ctx = canvas.getContext("2d");

  canvas.width = 600;
  canvas.height = 600;
  canvas.style.border = "1px solid #ccc";

  // Set initial background color
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Register mouse event handlers
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseup", handleMouseUp);

  return { canvas, ctx };
};



// Draw Shapes
export const drawShapes = () => {
  ctx.fillStyle = backgroundColor; // Use the global background color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Redraw background

  shapes
    .slice()
    .sort((a, b) => a.layerIndex - b.layerIndex) // Draw by layerIndex
    .forEach((shape) => {
      if (shape.type === "rect") drawRectangle(ctx, shape);
      if (shape.type === "text") drawText(ctx, shape);
      if (shape.type === "image") drawImage(ctx, shape);
    });

  if (selectedShape) drawBoundingBox(selectedShape);
};

export const setCanvasBackgroundColor = (color) => {
  backgroundColor = color;
  drawShapes(); // Redraw with new background color
};


// Add Rectangle
export const addRectangle = (x, y, width, height, color) => {
  shapes.push({
    type: "rect",
    x,
    y,
    width,
    height,
    color,
    rotation: 0,
    layerIndex: shapes.length, // Initial layerIndex
  });
  drawShapes();
};

// Add Text
export const addText = (x, y, text, fontSize, color) => {
  shapes.push({
    type: "text",
    x,
    y,
    text,
    fontSize,
    color,
    fontFamily: "Arial",
    rotation: 0,
    layerIndex: shapes.length, // Initial layerIndex
  });
  drawShapes();
};

// Add Image
export const addImage = (image, x, y, width, height) => {
  shapes.push({
    type: "image",
    image,
    x,
    y,
    width,
    height,
    rotation: 0,
    layerIndex: shapes.length, // Initial layerIndex
  });
  drawShapes();
};

// Draw Rectangle
const drawRectangle = (ctx, rect) => {
  ctx.save();
  ctx.translate(rect.x + rect.width / 2, rect.y + rect.height / 2);
  ctx.rotate((rect.rotation || 0) * (Math.PI / 180));
  ctx.fillStyle = rect.color;
  ctx.fillRect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
  ctx.restore();
};

// Draw Text
const drawText = (ctx, text) => {
  ctx.save();
  ctx.font = `${text.fontSize}px ${text.fontFamily}`;
  ctx.fillStyle = text.color;
  ctx.textBaseline = "top"; // Align text at the top for proper selection alignment
  ctx.fillText(text.text, text.x, text.y - text.fontSize * 1.2); // Adjust the Y position for baseline alignment
  ctx.restore();
};


// Draw Image
const drawImage = (ctx, img) => {
  ctx.save();
  ctx.translate(img.x + img.width / 2, img.y + img.height / 2);
  ctx.rotate((img.rotation || 0) * (Math.PI / 180));
  ctx.drawImage(img.image, -img.width / 2, -img.height / 2, img.width, img.height);
  ctx.restore();
};

// Draw Bounding Box for Selected Shape
const drawBoundingBox = (shape) => {
  ctx.save();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  if (shape.type === "text") {
    const textWidth = ctx.measureText(shape.text).width*shape.fontSize/10;
    const textHeight = shape.fontSize*1.3;
    ctx.strokeRect(shape.x, shape.y - textHeight, textWidth, textHeight);

    
  } else if (shape.type === "rect" || shape.type === "image") {
    ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
  }

  ctx.restore();
};

// Delete Shape
export const deleteShape = (shape) => {
  shapes = shapes.filter((s) => s !== shape);
  selectedShape = null;
  drawShapes();
};

// Mouse Events
const handleMouseDown = (e) => {
  const { offsetX: mouseX, offsetY: mouseY } = e;

  // Check if the click is on any shape
  selectedShape = shapes
    .slice()
    .sort((a, b) => b.layerIndex - a.layerIndex)
    .find((shape) => isMouseOverShape(shape, mouseX, mouseY));

  if (selectedShape) {
    isDragging = true;
    offsetX = mouseX - selectedShape.x;
    offsetY = mouseY - selectedShape.y;

    if (shapeSelectCallback) {
      shapeSelectCallback(selectedShape);
    }
  } else {
    // Clear selection if clicking outside shapes
    selectedShape = null;
    drawShapes(); // Redraw to remove the bounding box
    if (shapeSelectCallback) {
      shapeSelectCallback(null);
    }
  }
};



const handleMouseUp = () => {
  isDragging = false;
 // isResizing = false;
};


const handleMouseMove = (e) => {
  if (isDragging && selectedShape) {
      const { offsetX: mouseX, offsetY: mouseY } = e;

      // Update shape position based on mouse movement while maintaining offset
      selectedShape.x = mouseX - offsetX;
      selectedShape.y = mouseY - offsetY;

      // Redraw the shapes
      drawShapes();
  }
};




// Check if the Mouse is Over a Shape
export const isMouseOverShape = (shape, mouseX, mouseY) => {
  if (shape.type === "rect" || shape.type === "image") {
    return (
      mouseX >= shape.x &&
      mouseX <= shape.x + shape.width &&
      mouseY >= shape.y &&
      mouseY <= shape.y + shape.height
    );
  }

  if (shape.type === "text") {
    // Measure the full text width and approximate height
    const textWidth = ctx.measureText(shape.text).width*shape.fontSize/10;
    const textHeight = shape.fontSize*1.3;

    return (
      mouseX >= shape.x &&
      mouseX <= shape.x + textWidth &&
      mouseY >= shape.y - textHeight &&
      mouseY <= shape.y
    );
  }

  return false;
};







