import React, { useEffect, useState } from "react";
import {
  initializeCanvas,
  addRectangle,
  addText,
  addImage,
  drawShapes,
  deleteShape,
  shapes,
  setCanvasBackgroundColor,
  setShapeSelectCallback,
} from "./script";

import styles from "../../CSS/PokeStyles.module.css";

export default function ImageEditorPopup({ imageUrl, onSave, onCancel }) {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(50);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  useEffect(() => {
    initializeCanvas("editorCanvas");
    drawShapes();
    setShapeSelectCallback((shape) => setSelectedEntity(shape));
  }, []);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;
      img.onload = () => addImage(img, 50, 50, img.width, img.height);
    }
  }, [imageUrl]);

  const handleUpdate = (key, value) => {
    if (selectedEntity) {
      selectedEntity[key] = value;
      drawShapes();
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => addImage(img, 50, 50, 100, 100);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const canvas = document.getElementById("editorCanvas");
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      onSave(dataURL);
    }
  };

  return (
    <div className={styles.filterTab}>
      <h2 className={styles.title}>Edit Image</h2>

      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={() => addRectangle(50, 50, 120, 60, "#2980b9")}>
          ➕ Rectangle
        </button>
        <button className={styles.button} onClick={() => addText(100, 100, "Sample", fontSize, "#ffffff")}>
          ➕ Text
        </button>
        <input className={styles.input} type="file" accept="image/*" onChange={handleUpload} />
        <input
          type="color"
          className={styles.input}
          value={backgroundColor}
          onChange={(e) => {
            setBackgroundColor(e.target.value);
            setCanvasBackgroundColor(e.target.value);
          }}
        />
      </div>

      <canvas
        id="editorCanvas"
        style={{
          width: "100%",
          height: 400,
          borderRadius: 10,
          border: "1px solid #ccc",
          marginBottom: "1rem",
        }}
      />

      {selectedEntity && (
        <div className={styles.buttonGroup}>
          {selectedEntity.type === "text" && (
            <>
              <input
                type="text"
                className={styles.input}
                value={textValue}
                placeholder="Edit text"
                onChange={(e) => {
                  setTextValue(e.target.value);
                  handleUpdate("text", e.target.value);
                }}
              />
              <input
                type="number"
                className={styles.input}
                value={fontSize}
                min={8}
                max={200}
                onChange={(e) => {
                  setFontSize(parseInt(e.target.value));
                  handleUpdate("fontSize", parseInt(e.target.value));
                }}
              />
              <select
                className={styles.input}
                value={fontFamily}
                onChange={(e) => {
                  setFontFamily(e.target.value);
                  handleUpdate("fontFamily", e.target.value);
                }}
              >
                <option value="Arial">Arial</option>
                <option value="Impact">Impact</option>
                <option value="Courier New">Courier New</option>
              </select>
              <input
                type="color"
                className={styles.input}
                value={selectedEntity.color || "#000000"}
                onChange={(e) => handleUpdate("color", e.target.value)}
              />
            </>
          )}
          {(selectedEntity.type === "rect" || selectedEntity.type === "image") && (
            <>
              <input
                type="number"
                className={styles.input}
                value={width}
                onChange={(e) => {
                  setWidth(parseInt(e.target.value));
                  handleUpdate("width", parseInt(e.target.value));
                }}
              />
              <input
                type="number"
                className={styles.input}
                value={height}
                onChange={(e) => {
                  setHeight(parseInt(e.target.value));
                  handleUpdate("height", parseInt(e.target.value));
                }}
              />
            </>
          )}
          <button className={styles.cancelBtn} onClick={() => deleteShape(selectedEntity)}>
            🗑️ Delete
          </button>
        </div>
      )}

      <div className={styles.buttonGroup}>
        <button className={styles.cancelBtn} onClick={onCancel}>
          ← Cancel
        </button>
        <button className={styles.addBtn} onClick={handleSave}>
          💾 Save Image
        </button>
      </div>
    </div>
  );
}
