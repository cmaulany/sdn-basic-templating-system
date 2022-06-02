import React from "react";
import "./KeyValueInput.css";

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

    const handleAddValue = () => {
        let name = "newKey";
        let i = 1;
        while (value.hasOwnProperty(name)) {
            i++;
            name = `newKey ${i}`;
        }

        onChange?.({
            target: {
                name,
                value: {
                    ...value,
                    [name]: "newValue"
                }
            }
        })
    };

    const handleAddLevel = () => {
        onChange?.({
            target: {
                name,
                value: {
                    ...value,
                    "newKey": {}
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
        <div className="key-value-input-container">
            <ul className="key-value-input">
                {Object.entries(value).map(([key, value], index) =>
                    <li key={index}>
                        <input
                            type="text"
                            name={`${index}.key`}
                            value={key}
                            onChange={event => handleChangeKey(index, event.target.value)}
                            disabled={disabled}
                        />
                        {typeof value === "string" && <>
                            :&nbsp;
                            <input
                                type="text"
                                name={`${index}.value`}
                                value={value}
                                onChange={event => handleChangeValue(index, event.target.value)}
                                disabled={disabled}
                            />
                            {!disabled && <>
                                &nbsp;
                                <button onClick={() => handleRemove(index)}>
                                    -
                                </button>
                            </>}
                        </>}
                        {value !== "object" && typeof value === "object" && <>
                            {!disabled && <>
                                &nbsp;
                                <button onClick={() => handleRemove(index)}>
                                    -
                                </button>
                            </>}
                            <KeyValueInput
                                value={value}
                                onChange={event => handleChangeValue(index, event.target.value)}
                                disabled={disabled}
                            />
                        </>}
                    </li>
                )}
            </ul>
            {!disabled && <>
                <button onClick={handleAddValue}>
                    + Add value
                </button>
                <br />
                <button onClick={handleAddLevel}>
                    + Add level
                </button>
            </>}
        </div>
    );
}