import React from "react";

/**
 * Right Arrow Icon Component
 *
 * A right-pointing arrow, typically used for internal navigation links.
 *
 * Props:
 * - className: Additional CSS classes for styling
 * - size: Width and height of the icon (default: 16)
 * - color: Color of the icon (default: currentColor)
 */
interface RightArrowProps {
  className?: string;
  size?: number;
  color?: string;
}

const RightArrow: React.FC<RightArrowProps> = ({
  className = "",
  size = 16,
  color = "#ffffff"
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
        fill={color}
      />
    </svg>
  );
};

export default RightArrow;
