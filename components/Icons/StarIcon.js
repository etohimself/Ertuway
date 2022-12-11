export default function StarIcon(props) {
  if (props.empty == 1) {
    return (
      <svg
        width="19"
        height="18"
        viewBox="0 0 19 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
      >
        <path
          d="M9.7098 1L12.3092 6.26603L18.122 7.11566L13.9159 11.2124L14.9085 17L9.7098 14.266L4.51106 17L5.5037 11.2124L1.29761 7.11566L7.11043 6.26603L9.7098 1Z"
          stroke="#C0933C"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  } else {
    return (
      <svg
        width="19"
        height="18"
        viewBox="0 0 19 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
      >
        <path
          d="M9.41219 1L12.0116 6.26603L17.8244 7.11566L13.6183 11.2124L14.6109 17L9.41219 14.266L4.21346 17L5.20609 11.2124L1 7.11566L6.81282 6.26603L9.41219 1Z"
          fill="#FFA888"
          stroke="#C0933C"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}
