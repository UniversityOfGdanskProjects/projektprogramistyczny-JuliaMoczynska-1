export const Message = ({name, label, placeholder, onChange, onBlur, value }) => {
    return (
      <div className="text-sm w-full">
        <label className="text-border font-semibold">{label}</label>
        <textarea
          className="w-full h-40 mt-2 p-6 bg-main border border-border rounded"
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        ></textarea>
      </div>
    );
};
  
export const Select = ({ label, options, name, onChange, onBlur, value }) => {
    return (
      <>
        <label className="text-border font-semibold">{label}</label>
        <select
          className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded"
          name={name}          
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        >
          {options.map((o, i) => (
            <option key={i} value={o.value}>
              {o.title}
            </option>
          ))}
        </select>
      </>
    );
};


export const Input = ({
  label,
  placeholder,
  type,
  name,
  onChange,
  onBlur,
  value,
  bg
}) => {
  if (type === 'file') {
    return (
      <div className="text-sm w-full">
        <label className="text-border font-semibold">{label}</label>
        <input
          name={name}
          type="file"
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full text-sm mt-2 p-5 border border-border rounded text-white ${
            bg ? "bg-main" : "bg-dry"
          }`}
        />
      </div>
    );
  }

  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        className={`w-full text-sm mt-2 p-5 border border-border rounded text-white ${
          bg ? "bg-main" : "bg-dry"
        }`}
      />
    </div>
  );
};
  
