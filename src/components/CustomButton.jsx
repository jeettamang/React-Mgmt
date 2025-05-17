import { Button, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { memo } from "react";

const CustomButton = memo(
  ({
    variant = "success",
    label = "Label",
    disabled = false,
    loading = false,
    onClick,
  }) => {
    return (
      <Button variant={variant} disabled={disabled} onClick={onClick}>
        {loading && <Spinner animation="border" variant="light" size="sm" />}{" "}
        &nbsp;<span className="text-white">{label}</span>
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";

// Also fix this: it should be `propTypes`, not `prototype`
CustomButton.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func, // Add this too
};

export default CustomButton;
