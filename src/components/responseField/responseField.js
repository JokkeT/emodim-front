import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMessageText } from "../../actions/responseActions";
import { responseFieldPlaceHolder } from "../../constants";
import "./responseField.css";

const ResponseField = () => {

    const dispatch = useDispatch();
    const handleChange = (event) => {
        dispatch(updateMessageText(event.target.value));
    };

    const responseText = useSelector(state => state.responseReducer.responseText);

    return (
        <div className="response-field">
            <textarea
                type="text"
                className="response-text-input"
                placeholder={responseFieldPlaceHolder}
                maxLength={500}
                onChange={(event) => handleChange(event)}
                value={responseText}
            />
        </div>
    );
}

export default ResponseField;
