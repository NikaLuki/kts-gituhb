import React from "react";

import style from "./HomePage.module.scss";

const HomePage: React.FC<{ homepage: string }> = ({ homepage }) => {
  return (
    <div className={style.homepage}>
      <svg
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.8618 9.90246C8.95989 9.90246 8.04863 9.54523 7.36003 8.84073C7.0692 8.55293 7.0692 8.07671 7.36003 7.78906C7.64129 7.50126 8.09697 7.50126 8.38778 7.78906C8.79515 8.20591 9.31867 8.41412 9.86168 8.41412C10.3951 8.41412 10.9186 8.20577 11.3356 7.78906L13.9344 5.12978C14.3417 4.70317 14.5452 4.16734 14.5452 3.62159C14.5452 3.06594 14.3416 2.53012 13.9344 2.1134C13.527 1.69655 12.9938 1.48834 12.4605 1.48834C11.927 1.48834 11.3938 1.69669 10.9866 2.1134L9.68714 3.44309C9.39631 3.7309 8.94049 3.7309 8.65938 3.44309C8.36856 3.1455 8.36856 2.67907 8.65938 2.39142L9.95883 1.06173C10.6473 0.347303 11.5588 0 12.4606 0C13.3623 0 14.2738 0.347303 14.9624 1.06173C15.6509 1.76623 16 2.68903 16 3.62172C16 4.54462 15.6509 5.47708 14.9624 6.18171L12.3636 8.8406C11.675 9.54523 10.7635 9.90246 9.8618 9.90246Z"
          fill="black"
        />
        <path
          d="M8.63995 5.15926C8.92121 5.44707 8.92121 5.92328 8.63995 6.21093C8.35868 6.50853 7.8933 6.50853 7.61219 6.21093C7.20482 5.79409 6.67164 5.58587 6.1383 5.58587C5.60486 5.58587 5.07165 5.79423 4.6644 6.21093L2.06559 8.87022C1.65823 9.29683 1.45475 9.83265 1.45475 10.3784C1.45475 10.9341 1.65836 11.4699 2.06559 11.8866C2.47296 12.3034 2.99648 12.5117 3.53949 12.5117C4.07292 12.5117 4.59644 12.3033 5.01338 11.8866L6.31283 10.5569C6.5941 10.2691 7.04978 10.2691 7.34059 10.5569C7.62185 10.8545 7.62185 11.3209 7.34059 11.6086L6.04114 12.9383C5.35266 13.6527 4.44114 14 3.53936 14C2.62788 14 1.72619 13.6527 1.03758 12.9383C0.349105 12.2338 0 11.311 0 10.3783C0 9.45538 0.339405 8.52291 1.03758 7.81828L3.63639 5.15926C4.32487 4.45476 5.23639 4.09753 6.13817 4.09753C7.03986 4.09741 7.9516 4.45463 8.63995 5.15926Z"
          fill="black"
        />
      </svg>
      <a href={homepage}>{homepage.replace(/^https?:\/\//, "")}</a>
    </div>
  );
};

export default HomePage;
