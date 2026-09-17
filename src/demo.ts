import "./styles.css";

const status = document.querySelector<HTMLElement>("#status");

function showFailure(message: string) {
  if (!status) return;
  status.textContent = message;
  status.classList.add("status--visible");
}

const probe = document.createElement("canvas");
const gl = probe.getContext("webgl2");

if (!gl || !gl.getExtension("EXT_color_buffer_float")) {
  showFailure("This field requires WebGL 2 with floating-point render targets.");
} else {
  import("./main").catch((error: unknown) => {
    console.error("Reaction–diffusion field failed to start.", error);
    showFailure("The field could not start on this device.");
  });
}
