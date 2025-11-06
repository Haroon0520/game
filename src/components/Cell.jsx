import clsx from 'clsx';

export default function Cell({ value, matched, selected, invalid, onClick }) {
  const hidden = matched && value === 0;
  return (
    <div
      className={clsx(
        "cell",
        selected && "selected",
        matched && "matched",
        invalid && "invalid"
      )}
      data-value={value}
      style={{ visibility: hidden ? "hidden" : "visible" }}
      onClick={onClick}
    >
      {value > 0 ? value : ""}
    </div>
  );
}
