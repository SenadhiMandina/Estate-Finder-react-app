const React = require("react");

function Box({ children, ...props }) {
  return React.createElement("div", props, children);
}

module.exports = {
  Tabs: Box,
  TabList: Box,
  Tab: Box,
  TabPanel: Box,
};