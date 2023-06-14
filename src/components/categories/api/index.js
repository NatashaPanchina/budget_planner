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
          x2="17"
          y2="17"
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

function showCheckMark(index) {
  const allMarks = document.querySelectorAll(".checkMarkIcon");
  for (let mark of allMarks) {
    if (!mark.classList.contains("none")) {
      mark.classList.add("none");
    }
  }
  document.getElementById(`colorCircle${index}`).classList.toggle("none");
}

export function renderColors(colors, setSelectedColor) {
  return colors.map((color, index) => {
    return (
      <svg
        key={index}
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          setSelectedColor(colors[index]);
          showCheckMark(index);
        }}
      >
        <circle cx="17" cy="17" r="17" fill={`url(#${index})`}></circle>
        <CheckMarkIcon
          id={`colorCircle${index}`}
          className="checkMarkIcon none"
        />
        <defs>
          <linearGradient
            id={index}
            x1="0"
            y1="0"
            x2="17"
            y2="17"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={color[0]} />
            <stop offset="1" stopColor={color[1]} />
          </linearGradient>
        </defs>
      </svg>
    );
  });
}

export function renderIcons(icons, setIcon) {
  return icons.map((Icon, index) => {
    return (
      <Icon
        key={index}
        id={index}
        height="30"
        width="30"
        onClick={() => setIcon(index)}
      />
    );
  });
}

export function toggleElement(name) {
  document.getElementById(name).classList.toggle("none");
}
