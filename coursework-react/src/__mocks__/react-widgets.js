const React = require("react");

function DatePicker({ value, onChange, ...props }) {
  return React.createElement("input", {
    type: "date",
    "aria-label": "date picker",
    value: value ? String(value).slice(0, 10) : "",
    onChange: (e) => onChange && onChange(new Date(e.target.value)),
    ...props,
  });
}

module.exports = { DatePicker };