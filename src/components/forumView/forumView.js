import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
    updateAvailableRawThreads,
    updateCurrentRawThread,
} from "../../actions/rawDataActions";
import { updateCurrentThread } from "../../actions/threadActions";
import json from "../../testData/threadData_s24_04.json";
import Thread from "../thread/thread";
import "./forumView.css";

export const ForumView = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateAvailableRawThreads(json));
    }, [dispatch]);

    const availableRawThreads = useSelector(state => state.rawDataReducer.availableThreads);
    const currentRawThread = useSelector(state => state.rawDataReducer.currentThread)

    useEffect(() => {
        if (currentRawThread && currentRawThread.comments) {
            const [comments, responses] = separateResponsesFromComments(currentRawThread.comments)
            const commentsWithResponses = moveResponsesToTheirParents(comments, responses);
            currentRawThread.comments = commentsWithResponses;
            dispatch(updateCurrentThread(currentRawThread));
        }
    }, [currentRawThread, dispatch]);

    const separateResponsesFromComments = (rawComments) => {
        const groupedComments = _.groupBy(rawComments, comment => {
            return comment.commentMetadata.parent_comment_id === "0";
        });

        const comments = groupedComments["true"];
        const responses = groupedComments["false"];
        return [comments, responses];
    }

    const moveResponsesToTheirParents = (comments, responses) => {
        const messageChain = [];

        _.forEach(comments, comment => {
            // Find the children of each comment
            const children = _.filter(responses, response => {
                const parentId = response.commentMetadata.parent_comment_id;
                const commentId = comment.commentMetadata.id.split(":")[1];
                return parentId === commentId
            });

            if (!_.isEmpty(children)) {
                if (_.has(comment, "children")) {
                    _.concat(comment.children, children)
                } else {
                    comment.children = children;
                }
            }
            messageChain.push(comment);
        });
        return messageChain;
    }

    useEffect(() => {
        if (!_.isEmpty(availableRawThreads)) {
            dispatch(updateCurrentRawThread(availableRawThreads[0]));
        }
    }, [availableRawThreads, dispatch]);

    return (
        <div className="forum-view">
            <Thread />
        </div>
    );
}

export default ForumView;
