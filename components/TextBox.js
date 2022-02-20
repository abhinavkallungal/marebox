import { TextField } from '@material-ui/core';

const TextBox = ({ helperText, id, onChange, type, value }) => {
  return (
    <TextField
      autoComplete={id}
      fullWidth
      helperText={helperText}
      id={id}
      InputLabelProps={{
        shrink: true,
      }}
      label={helperText}
      margin="normal"
      name={id}
      onChange={onChange}
      placeholder={helperText}
      type={type}
      value={value || ''}
      variant="outlined"
    />
  )
}

export default TextBox;
