import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import type { Role } from "../api/responseTypes";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect({
  allRoles,
  usersRoles,
  setRoles,
  editing,
}: {
  allRoles: Role[];
  usersRoles: string[];
  setRoles: (je: string[]) => void;
  editing: boolean;
}) {
  const handleChange = (event: SelectChangeEvent<typeof usersRoles>) => {
    const {
      target: { value },
    } = event;
    setRoles(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl fullWidth={true} disabled={!editing}>
        <Select
          multiple
          value={usersRoles}
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {allRoles.map((role) => (
            <MenuItem key={role.role} value={role.role}>
              {role.role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
