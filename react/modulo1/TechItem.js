import React from "react";
import PropTypes from "prop-types";
function TechItem({ tech, onDelete }) {
  return (
    <li>
      {tech}
      <button onClick={onDelete} type="button">
        x
      </button>
    </li>
  );
}
TechItem.defaultProps = {
  tech: "Não informado pelo cliente"
};
TechItem.propTypes = {
  tech: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};
export default TechItem;
