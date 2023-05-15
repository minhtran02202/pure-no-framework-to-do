class ColorThemes {
  #changeColor(bg, txt, border, btn, btn_txt, submit_btn) {
    var root = document.documentElement;

    root.style.setProperty("--bg-color", bg);
    root.style.setProperty("--txt-color", txt);
    root.style.setProperty("--border-color", border);
    root.style.setProperty("--btn-color", btn);
    root.style.setProperty("--btn-txt-color", btn_txt);
    root.style.setProperty("--submit-btn-color", submit_btn);
  }

  darkMode(darkMode) {
    if (darkMode) {
      this.#changeColor("#ccc", "black", "#f4f6f8", "#ccc", "white", "#ccc");
      console.log("dark mode");
    }
  }
}
