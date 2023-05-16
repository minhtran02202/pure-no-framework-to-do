class ColorThemes {
  constructor() {
    this.relaxingTheme = {
      bg_color: "ivory",
      txt: "#31797e",
      border: "#b3c890",
      btn: "#a2cc5f",
      btn_txt: "#a2cc5f",
      submit_btn: "#73a9ad",
    };

    this.nightOwlTheme = {
      bg_color: "black",
      txt: "#31797e",
      border: "#b3c890",
      btn: "#a2cc5f",
      btn_txt: "#a2cc5f",
      submit_btn: "#73a9ad",
    };

    this.lovelyTheme = {
      bg_color: "pink",
      txt: "#31797e",
      border: "#b3c890",
      btn: "#a2cc5f",
      btn_txt: "#a2cc5f",
      submit_btn: "#73a9ad",
    };
    this.themes = {
      relaxing: this.relaxingTheme,
      night_owl: this.nightOwlTheme,
      lovely: this.lovelyTheme,
    };
  }

  changeTheme(userTheme) {
    if (Object.values(this.themes).indexOf(userTheme)) {
      const theme = this.themes[userTheme];
      const root = document.documentElement;

      root.style.setProperty("--bg-color", theme.bg_color);
      root.style.setProperty("--txt-color", theme.txt);
      root.style.setProperty("--border-color", theme.border);
      root.style.setProperty("--btn-color", theme.btn);
      root.style.setProperty("--btn-txt-color", theme.btn_txt);
      root.style.setProperty("--submit-btn-color", theme.submit_btn);
    }
  }
}

//also set the dropdown to appropriate theme
function saveColorTheme(theme) {
  localStorage.setItem("colorTheme", JSON.stringify(theme));
}

function loadColorTheme(themes) {
  const savedColorTheme = localStorage.getItem("colorTheme");
  if (saveColorTheme) {
    const colorThemes = new ColorThemes();
    const theme = JSON.parse(savedColorTheme);
    themes.value = theme;
    console.log(themes.value);
    colorThemes.changeTheme(theme);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const themes = document.getElementById("theme_choice");
  loadColorTheme(themes);
  const colorThemes = new ColorThemes();

  themes.addEventListener("change", (e) => {
    const theme = e.target.value;
    colorThemes.changeTheme(theme);
    saveColorTheme(theme);
  });
});
