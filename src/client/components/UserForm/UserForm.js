import React from 'react';
import { AutoComplete } from "primereact/autocomplete";
import './UserForm.css';


function renderLabel(label) {
    return <label>{label}</label>;
}

function renderElement(field){
    switch (field.tag) {
        case 'img':
            return <img className="user-form-pic" src={field.src} alt="Profile picture"/>;
        case 'input':
            return <input type={field.type} name={field.name} placeholder={field.placeholder} value={field.value}
                          autoComplete={field.autoComplete} onChange={field.onChange} onBlur={field.onBlur}
                          disabled={field.disabled}/>;
        case 'AutoComplete':
            return <AutoComplete name={field.name} placeholder={field.placeholder} value={field.value}
                                 dropdown={field.dropdown} autoComplete={field.autoComplete} suggestions={field.suggestions}
                                 onChange={field.onChange} completeMethod={field.completeMethod} />;
    }
}

function renderErrorMsg(error, idx) {
    return <p key={idx} className="error-msg">{error}</p>;
}

function renderButton(button) {
    return <button className="user-form-btn" onClick={button.onClick}>{button.label}</button>;
}

function UserForm(props){
    return (
        <div className='user-form-root'>
            {props.heading && <h1 className="user-form-heading">{props.heading}</h1>}
            {props.picture && renderElement(props.picture)}

            <table className="user-form-table">
                <tbody>
                    {props.fields.map((field, idx) =>
                        <tr className="user-form-tr" key={idx}>
                            <th>{renderLabel(field.label)}</th>
                            <td>
                                {renderElement(field)}
                            </td>
                            <td className="td-error-msg">{renderErrorMsg(field.errorMsg)}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {props.errorMsgs.map((error, idx) => error && renderErrorMsg(error, idx))}
            {props.successMsg && <p className="success-msg">{props.successMsg}</p>}

            {renderButton(props.button)}
        </div>
    );
}

export default UserForm;