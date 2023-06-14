import { ReactComponent as CheckMarkIcon } from "../../../assets/icons/shared/checkMark.svg";

function showCheckMark(index) {
  const allMarks = document.querySelectorAll(".checkMarkIcon");
  for (let mark of allMarks) {
    if (!mark.classList.contains("none")) {
      mark.classList.add("none");
    }
  }
  document.getElementById(`colorRect${index}`).classList.toggle("none");
}

export function renderColors(colors, setSelectedColor) {
  return colors.map((color, index) => {
    return (
      <svg
        key={index}
        width="34"
        height="23"
        viewBox="0 0 34 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          setSelectedColor(colors[index]);
          showCheckMark(index);
        }}
      >
        <rect
          x="0"
          y="0"
          width="34"
          height="23"
          rx="5"
          fill={`url(#${index})`}
        ></rect>
        <CheckMarkIcon
          x="1.5"
          y="-3.5"
          id={`colorRect${index}`}
          className="checkMarkIcon none"
        />
        <defs>
          <linearGradient
            id={index}
            x1="0"
            y1="0"
            x2="34"
            y2="11.5"
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

export function renderSelectedColor(selectedColor) {
  return (
    <svg
      width="34"
      height="23"
      viewBox="0 0 34 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0"
        y="0"
        width="34"
        height="23"
        rx="5"
        fill={`url(#SelectedAccountColor)`}
      ></rect>
      <defs>
        <linearGradient
          id="SelectedAccountColor"
          x1="0"
          y1="0"
          x2="34"
          y2="11.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={selectedColor[0]} />
          <stop offset="1" stopColor={selectedColor[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function toggleElement(name) {
  document.getElementById(name).classList.toggle("none");
}

export function createCashType(accountType) {
  switch (accountType) {
    case "card":
      return "cards";
    case "cash":
      return "cash";
    default:
      return "all";
  }
}
