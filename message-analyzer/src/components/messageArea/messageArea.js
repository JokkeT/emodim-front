import React, { Component } from "react";
import { connect } from "react-redux";

import "./messageArea.css";
import Message from "../message/message";
import AnnotatedMessage from "../annotatedMessage/annotatedMessage";
import ResponseField from "../responseField/responseField";
import ResponseAnalysisDialog from "../responseAnalysisDialog/responseAnalysisDialog";
import { annotations } from "../../constants";

export class MessageArea extends Component {

    render() {
        return (
            <div className="message-area">
                <div className="thread-start">
                    {
                        this.props.startMessage.commentMetadata
                            ?
                            annotations
                                ?
                                <AnnotatedMessage
                                    data={this.props.startMessage}
                                />
                                :
                                <Message
                                    data={this.props.startMessage}
                                />
                            :
                            null
                    }
                </div>
                <div className="response-section">
                    <ResponseField />
                    <ResponseAnalysisDialog />
                </div>
                <div className="comments">
                    {
                        this.props.comments && this.props.comments.map(comment => {
                            if (comment && comment.commentMetadata) {
                                if (annotations) {
                                    return <AnnotatedMessage
                                        data={comment}
                                        key={comment.commentMetadata.id}
                                    />
                                } else {
                                    return < Message
                                        data={comment}
                                        key={comment.commentMetadata.id}
                                    />
                                }
                            } else {
                                return null;
                            }
                        })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        startMessage: state.threadReducer.thread.startMessage,
        comments: state.threadReducer.thread.comments
    };
}


export default connect(mapStateToProps)(MessageArea);
