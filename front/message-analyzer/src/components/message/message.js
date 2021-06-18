import React from "react";
import _ from "lodash";
import "./message.css";

const Message = ({ data, response }) => {

    if (data && data.commentMetadata) {

        const {
            author,
            datetime
        } = data.commentMetadata;

        const words = data.words;
        const message = _.map(words, (wordData, index) => {

            let renderedWord;
            switch (wordData.type) {
                case "WORD":
                    renderedWord =
                        <span
                            key={index}
                        >
                            {wordData.word}
                        </span>
                    break;
                case "WHITESPACE":
                    renderedWord = <span> </span>;
                    break;
                case "PUNCTUATION":
                    renderedWord = <span>{wordData.word}</span>
                    break;
                case "UNKNOWN":
                    if (wordData.word.endsWith("\\n")) {
                        renderedWord = <br />;
                    }
                    break;
                default:
                    break;
            }
            return renderedWord;
        });

        const hasChildren = data.children && !_.isEmpty(data.children);

        return (
            <div className={`message-box${response ? " response" : ""}`}>
                <div className="metadata">
                    <div className="author">
                        {author}
                    </div>
                    <div className="date">
                        {datetime}
                    </div>
                </div>
                <div className="message" key={data.commentMetadata.id}>
                    {message}
                </div>
                {
                    hasChildren && data.children.map(child => {
                        return < Message
                            data={child}
                            key={child.commentMetadata.id}
                            response
                        />
                    })
                }
            </div>
        );
    }
    return null;

}

export default Message;
