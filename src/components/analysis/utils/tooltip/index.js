export function renderTooltip(id, formattedValue) {
  return (
    <div
      style={{
        padding: 12,
        display: "flex",
        alignItems: "center",
        background: "#fff",
        border: "1px solid #F0F0F0",
        borderRadius: "5px",
        fontSize: "14px",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginRight: "5px" }}
      >
        <circle
          cx="10"
          cy="10"
          r="10"
          fill={`url(#${id.replaceAll(" ", "_")})`}
        ></circle>
      </svg>
      {id}:
      <span style={{ fontWeight: 700, marginLeft: "5px" }}>
        {formattedValue}
      </span>
    </div>
  );
}
