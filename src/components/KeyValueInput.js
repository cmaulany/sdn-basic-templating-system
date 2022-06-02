import React from "react";

export default function KeyValueInput({
    name,
    value,
    onChange,
    disabled
}) {

    const handleChangeKey = (index, key) => {
        const entries = Object.entries(value);
        const newEntries = entries.map(
            (entry, i) =>
                i === index ?
                    [key, entries[i][1]] :
                    entry
        );
        onChange?.({
            target: {
                name,
                value: Object.fromEntries(newEntries)
            }
        })
    };

    const handleChangeValue = (index, inputValue) => {
        const entries = Object.entries(value);
        const newEntries = entries.map(
            (entry, i) =>
                i === index ?
                    [entries[i][0], inputValue] :
                    entry
        );
        onChange?.({
            target: {
                name,
                value: Object.fromEntries(newEntries)
            }
        })
    };

    const handleAdd = () => {
        onChange?.({
            target: {
                name,
                value: {
                    ...value,
                    "newKey": "newValue"
                }
            }
        })
    };

    const handleRemove = (index) => {
        const newEntries = Object.entries(value).filter((_, i) => i !== index);
        onChange?.({
            target: {
                name,
                value: Object.fromEntries(newEntries)
            }
        });
    }

    return (
        <div>
            <ul>
                {Object.entries(value).map(([key, value], index) =>
                    <li key={index}>
                        <input
                            type="text"
                            name={`${index}.key`}
                            value={key}
                            onChange={event => handleChangeKey(index, event.target.value)}
                            disabled={disabled}
                        />
                        <input
                            type="text"
                            name={`${index}.value`}
                            value={value}
                            onChange={event => handleChangeValue(index, event.target.value)}
                            disabled={disabled}
                        />
                        {!disabled &&
                            <button onClick={() => handleRemove(index)}>
                                -
                            </button>
                        }
                    </li>
                )}
            </ul>
            {!disabled &&
                <button onClick={handleAdd}>
                    +
                </button>
            }
        </div>
    );
}