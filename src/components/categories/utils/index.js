import { ReactComponent as CheckMarkIcon } from "../../../assets/icons/shared/checkMark.svg";

export function renderSelectedColor(selectedColor, Icon) {
  return selectedColor ? (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="17" cy="17" r="17" fill={`url(#selectedColor)`}></circle>
      {Icon ? <Icon height="20" width="20" x="7" y="7" /> : ""}
      <defs>
        <linearGradient
          id="selectedColor"
          x1="0"
          y1="0"
          x2="34"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={selectedColor[0]} />
          <stop offset="1" stopColor={selectedColor[1]} />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <div>No selected color</div>
  );
}

function showCheckMark(key) {
  const allMarks = document.querySelectorAll(".checkMarkIcon");
  for (let mark of allMarks) {
    if (!mark.classList.contains("none")) {
      mark.classList.add("none");
    }
  }
  document.querySelector(`.${key}`).classList.toggle("none");
}

export function renderColors(colors, setSelectedColor, initialColor) {
  let result = [];

  const isInitialColor = (color) => {
    if (!initialColor) return false;
    return initialColor[0] === color[0] && initialColor[1] === color[1];
  };

  for (let shade = 500; shade <= 900; shade += 100) {
    for (let color in colors) {
      result.push(
        <div className="color_container">
          <svg
            key={`${color}${shade}`}
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setSelectedColor(colors[color][shade]);
              showCheckMark(`${color}${shade}`);
            }}
          >
            <circle
              cx="17"
              cy="17"
              r="17"
              fill={`url(#${color}${shade})`}
            ></circle>
            <CheckMarkIcon
              className={`${color + shade} checkMarkIcon ${
                isInitialColor(colors[color][shade]) ? "" : "none"
              }`}
            />
            <defs>
              <linearGradient
                id={`${color}${shade}`}
                x1="0"
                y1="0"
                x2="34"
                y2="34"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={colors[color][shade][0]} />
                <stop offset="1" stopColor={colors[color][shade][1]} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }
  }
  return result;
}

export function renderIcons(icons, setIcon) {
  return icons.map((Icon, index) => {
    return (
      <div className="icon_container">
        <Icon key={index} id={index} onClick={() => setIcon(index)} />
      </div>
    );
  });
}

export function toggleElement(name) {
  document.querySelector(name).classList.toggle("none");
}
