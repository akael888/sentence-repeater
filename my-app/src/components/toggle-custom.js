function CustomToggle({
  onChange = null,
  checked = null,
  onClick = null,
  disabled = null,
  value = null,
}) {
  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          onChange={onChange}
          className="sr-only peer"
          onClick={onClick}
          checked={checked}
          disabled={disabled}
          value={value}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
      </label>
    </>
  );
}

export default CustomToggle;
