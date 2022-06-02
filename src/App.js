import { useMemo, useState } from 'react';
import KeyValueInput from './components/KeyValueInput/KeyValueInput';
import data from "./data.json";

const lookup = (variables, path) => {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (path.length === 0) {
    return variables;
  }

  return lookup(variables[path[0]], path.slice(1));
};

const replace = (input, variables) => Object.entries(input).reduce(
  (result, [key, value]) => {
    if (typeof value === "string" && value.startsWith("$")) {
      result[key] = lookup(variables, value.slice(1));
    } else if (typeof value === "object") {
      result[key] = replace(value, variables);
    } else {
      result[key] = value;
    }
    return result;
  },
  {}
);

function App() {
  const [variables, setVariables] = useState(data.variables);

  const [input, setInput] = useState(data.input);

  const result = useMemo(() => replace(input, variables), [variables, input]);

  return (
    <div>
      <h4>Variables</h4>
      <KeyValueInput value={variables} onChange={event => setVariables(event.target.value)} />
      <h4>Input</h4>
      <KeyValueInput value={input} onChange={event => setInput(event.target.value)} />
      <h4>Result</h4>
      <KeyValueInput value={result} onChange={event => setInput(event.target.value)} disabled={true} />
    </div>
  );
}

export default App;
