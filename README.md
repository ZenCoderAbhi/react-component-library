# @zencoderabhi/my-react-library

Your reusable React component library.

## Installation

```bash
npm install @zencoderabhi/my-react-library
```

Import the base stylesheet once in your app's entry point:

```tsx
import "@zencoderabhi/my-react-library/dist/style.css";
```

## Components

- [Button](#button)
- [Card](#card)
- [DropDown](#dropdown)
- [Toggle](#toggle)

### Button

```tsx
import { Button } from "@zencoderabhi/my-react-library";

function Example() {
  return (
    <Button
      label="Click me"
      variant="primary"
      size="medium"
      rounded
      onClick={() => console.log("clicked")}
    />
  );
}
```

**Props**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | — | Text rendered inside the button |
| `onClick` | `() => void` | — | Click handler |
| `variant` | `"primary" \| "secondary"` | — | Visual style of the button |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Button size |
| `rounded` | `boolean` | `true` | Whether corners are rounded |
| `disabled` | `boolean` | `false` | Disables the button |
| `icon` | `React.ReactNode` | — | Optional icon rendered before the label |
| `ownStyles` | `React.CSSProperties` | — | Inline style overrides |

### Card

```tsx
import { Card } from "@zencoderabhi/my-react-library";

function Example() {
  return (
    <Card flexDirection="column">
      <h3>Title</h3>
      <p>Card content goes here.</p>
    </Card>
  );
}
```

**Props**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Content rendered inside the card |
| `flexDirection` | `"row" \| "column"` | `"column"` | Layout direction of the card's content |

### DropDown

```tsx
import { useState } from "react";
import { DropDown } from "@zencoderabhi/my-react-library";
import type { DropDownItem } from "@zencoderabhi/my-react-library";

const dropdownList: DropDownItem[] = [
  { id: 1, value: "apple" },
  { id: 2, value: "banana" },
  { id: 3, value: "cherry" },
];

function Example() {
  const [value, setValue] = useState("apple");

  return (
    <DropDown
      valueSelected={value}
      dropdownList={dropdownList}
      onChange={(item) => setValue(item.value.toString())}
      searchable
    />
  );
}
```

Multi-select mode lets users pick several options and confirm with an "OK" button:

```tsx
import { useState } from "react";
import { DropDown } from "@zencoderabhi/my-react-library";
import type { DropDownItem } from "@zencoderabhi/my-react-library";

function MultiExample() {
  const [selected, setSelected] = useState<DropDownItem[]>([]);

  return (
    <DropDown
      valueSelected={selected.length === 0 ? "Select an option" : `${selected.length} options selected`}
      dropdownList={dropdownList}
      type="multiple"
      onMultiChange={setSelected}
      searchable
    />
  );
}
```

**Props**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `valueSelected` | `string` | — | Currently selected value (or a summary label for multi-select) |
| `dropdownList` | `DropDownItem[]` | — | List of `{ id, value }` options |
| `onChange` | `(item: DropDownItem) => void` | — | Called with the selected item when `type` is `"single"` |
| `onMultiChange` | `(items: DropDownItem[]) => void` | — | Called with the selected items when the user confirms in `"multiple"` mode |
| `type` | `"single" \| "multiple"` | `"single"` | Selection mode |
| `searchable` | `boolean` | — | Shows a search input to filter options |

### Toggle

```tsx
import { useState } from "react";
import { Toggle } from "@zencoderabhi/my-react-library";

function Example() {
  const [checked, setChecked] = useState(false);

  return <Toggle checked={checked} onChange={() => setChecked((prev) => !prev)} />;
}
```

**Props**

| Prop | Type | Description |
| --- | --- | --- |
| `checked` | `boolean` | Whether the toggle is on |
| `onChange` | `() => void` | Called when the toggle is clicked |
